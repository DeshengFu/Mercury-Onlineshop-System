<?php
//Get the IP
$parts = explode('.', $_SERVER['REMOTE_ADDR']);
$adminIP = ($parts[0] << 24) + ($parts[1] << 16) + ($parts[2] << 8) + $parts[3];



//Get the server
$siteServer = $_SERVER['SERVER_NAME'];



//Initialize the information
$siteID = 0;
$siteLevel = 0;
$sitePosition = '';
$siteSerialID = 0;
$siteHost = '';
$siteName = '';
$siteEmail = '';
$adminID = 0;
$adminName = '';
$shopID = 0;
$shopState = 0;



//Function: check admin's ID
function checkAdmin($page, $version)
{
	global $feature;
	global $gsetting;
	global $currTime;
	global $siteID, $siteLevel, $sitePosition, $siteSerialID, $siteHost, $siteName, $siteEmail, $siteServer;
	global $adminID, $adminName, $adminIP;

	//Get the site
	$rs = query('Select `ID`, `Level`, `Position`, `SerialID`, `Host`, `Name`, `Email` from `system.Site` where `Host` = "' . escapeStr($siteServer) . '"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || ($page != '' && !in_array($rsInfo[1] - 1, array_slice($feature[$page]['level'][$version], 2)))) return false;
	$sID = $rsInfo[0];
	$level = $rsInfo[1];
	$position = $rsInfo[2];
	$serialID = $rsInfo[3];
	$host = $rsInfo[4];
	$name = $rsInfo[5];
	$email = $rsInfo[6];

	//Get the administrator
	$adminInfo = getVars('user', $_COOKIE);
	$aID = intval(getcookiekey('userID', $adminInfo));
	$cookiePass = getcookiekey('cookiePass', $adminInfo);
	if($aID < 1 || $cookiePass == '' || strlen($cookiePass) > 16) return false;
	$rs = query('Select `Email`, `State`, `AccessTime`, `CookiePass`, `ValidTime` from `' . $position . '.User` where `ID` = ' . $aID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[1] != 1 || $cookiePass != $rsInfo[3] || ($currTime - $rsInfo[2] > $gsetting['accessValid'] && $rsInfo[4] < $currTime)) return false;
	$adminID = $aID;
	$adminName = $rsInfo[0];
	$siteID = $sID;
	$siteLevel = $level;
	$sitePosition = $position;
	$siteSerialID = $serialID;
	$siteHost = $host;
	$siteName = $name;
	$siteEmail = $email;

	//Update the administrator
	query('Update `' . $position . '.User` set `AccessTime` = ' . $currTime . ' where `ID` = ' . $adminID, false);

	//Return
	return true;
}



//Function: get the working shop
function checkShop()
{
	global $sitePosition, $currTime;
	global $adminID;
	global $shopID, $shopState;

	//Get the shop
	$path = explode('/', $_SERVER['REQUEST_URI']);
	$sID = intval($path[count($path) - 2]);
	if($sID == 0) return false;
	$rs = query('Select `State` from `' . $sitePosition . '.Shop` where `ID` = ' . $sID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null) return false;
	$state = $rsInfo[0];

	//Get the master
	$rs = query('Select count(*) from `' . $sitePosition . '.Master` where `UserID` = ' . $adminID . ' and `ShopID` = ' . $sID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if(intval($rsInfo[0]) == 0) return false;
	$shopID = $sID;
	$shopState = $state;

	//Update the shop
	query('Update `' . $sitePosition . '.Shop` set `AccessTime` = ' . $currTime . ' where `ID` = ' . $shopID, false);
	
	//Return
	return true;
}



//Function: show result of the script
function showResult($script)
{
	global $dbQuery;
	global $siteSerialID;

	echo $script;
	echo 'adm.system(' . $siteSerialID . ', ' . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']) . ', ' . $dbQuery . ');';
	exit;
}



//Function: fast connect database then check the admin's ID and right
function fastCheck($page, $version)
{
	connectDB();
	if(!checkAdmin($page, $version)) fastResult('main.login();');
	if($page == '') return;
	if(!checkShop()) fastResult('main.shop();');
}



//Function: fast close the database then show the result
function fastResult($script)
{
	disconnectDB();
	showResult($script);
}



//Function: get the list of IDs for batch operation
function checkIDList($table, $fixedQuery, &$IDList)
{
	global $sitePosition;

	$IDs = array();
	$rs = query('Select `ID` from `' . $sitePosition . '.' . $table . '` where ' . ($fixedQuery != '' ? ('(' . $fixedQuery . ') and ') : '') . '`ID` in (' . $IDList . ')', false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		$IDs[] = $rsInfo[0];
	}
	freeResult($rs);
	$IDList = implode(',', $IDs);
}



//Function: refresh the size
function refreshSize($page, $value, $ifUpdate)
{
	global $feature;
	global $siteID, $sitePosition, $siteSerialID;

	if($ifUpdate) $siteSerialID++;
	query('Update `' . $sitePosition . '.Variable` set `Value` = `Value` + (' . $value . ') where `Name` = "benchmark.page.' . $page . '"', false);
	query('Update `system.Site` set `Size` = `Size` + (' . ($value * $feature[$page]['weight']) . ')' . ($ifUpdate ? ', `SerialID` = `SerialID` + 1' : '') . ' where `ID` = ' . $siteID, false);
}



//Function: refresh the site
function refreshSite()
{
	global $siteID, $siteSerialID;

	$siteSerialID++;
	query('Update `system.Site` set `SerialID` = `SerialID` + 1 where `ID` = ' . $siteID, false);
}



//Function: insert the log
function insertRecord($ID, $info)
{
	global $sitePosition, $currTime;
	global $shopID, $adminID, $adminIP;

	query('Insert into `' . $sitePosition . '.ShopRecord` values (NULL, ' . $ID . ', "' . escapeStr($info) . '", ' . $adminID . ', ' . $shopID . ', ' . $adminIP . ', ' . $currTime . ')', false);
}



//Function: merge lock information
function mergeLock($arr)
{
	$infoArr = array();
	for($i = 0; $i < count($arr); $i++)
	{
		for($j = 0; $j < count($arr[$i]); $j++)
		{
			if(substr($arr[$i][$j], -4) == 'read')
			{
				$name = substr($arr[$i][$j], 0, -5);
				$value = 'read';
			}
			else
			{
				$name = substr($arr[$i][$j], 0, -6);
				$value = 'write';
			}
			if(isset($infoArr[$name]) && $infoArr[$name] == 'write') continue;
			$infoArr[$name] = $value;
		}
	}
	$result = array();
	foreach($infoArr as $key => $value) $result[] = $key . ' ' . $value;
	return $result;
}



//Function: prepare search
function prepareSearch($search, $map)
{
	global $searchGetValue;

	$qsArr = array();
	$searchQI = getVars('searchQI', $_POST);
	if($search !== null && $searchQI != '')
	{	
		$qiArr = explode('|', $searchQI);
		foreach($qiArr as $qi)
		{
			$info = explode('$', $qi);
			$id = intval($info[0]);
			if($id < 0 || $id > count($map)) continue;
			$qs = $search($id, $searchGetValue[$map[$id]]($info));
			if($qs != '') $qsArr[] = $qs;
		}
	}
	return implode(' and ', $qsArr);
}



//Function: prepare sort
function prepareSort($fieldList, $defSortQI)
{
	$fields = explode('|', $fieldList);
	$sortQI = getVars('sortQI', $_POST);
	if($sortQI == '') $sortQI = $defSortQI;
	$siArr = explode('|', $sortQI);
	$flag = 0;
	foreach($siArr as $si)
	{
		$info = explode('$', $si);
		$orderBy = intval($info[0]);
		$direction = intval($info[1]);
		if($orderBy < 0 || $orderBy >= count($fields)) $orderBy = 0;
		if($direction < 0 || $direction > 1) $direction = 0;
		if($flag & (1 << $orderBy)) continue;
		$flag &= (1 << $orderBy);
		$ssArr[] = $fields[$orderBy] . ($direction == 0 ? '' : ' desc');
	}
	return implode(', ', $ssArr);
}



//Function: get the data
function getData($table, $alias, $fixedQuery, $searchQS, $sortQS, $limit, $size, &$offset, &$show, &$records, &$fullIDList, &$IDList)
{
	global $sitePosition;

	if(isset($_GET['IDList']))
	{
		$IDList = parseNumberList($_GET['IDList']);
		$records = -1;
		return;
	}

	//Get the input
	$offset = intval(getVars('offset', $_GET));
	$show = intval(getVars('show', $_GET));
	if($offset < 0) $offset = 0;
	if($show < 0) $show = 0;

	//Get the list of IDs
	$search = ($fixedQuery != '' || $searchQS != '' ? ' where ' : '') . ($fixedQuery != '' ? ('(' . $fixedQuery . ')') : '') . ($fixedQuery != '' && $searchQS != '' ? ' and ' : '') . $searchQS;
	$rs = query('Select `ID` from `' . $sitePosition . '.' . $table . '` ' . $alias . $search . ($sortQS != '' ? ' order by ' : '') . $sortQS . ' limit ' . ($offset * $size) . ', ' . ($limit * $size), false);
	$IDs = array();
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		$IDs[] = $rsInfo[0];
	}
	freeResult($rs);
	$records = count($IDs);

	//Get the number of records
	if($records == 0 || $records == $limit * $size)
	{
		$rs = query('Select count(*) from `' . $sitePosition . '.' . $table . '` ' . $alias . $search, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		$records = intval($rsInfo[0]);
	}
	else
		$records += ($offset * $size);

	//Get the list of IDs
	$fullIDList = implode(',', $IDs);
	$IDList = implode(',', array_slice($IDs, $show * $size, $size));
}



//Function: parse the list of numbers
function parseNumberList($numberList)
{
	if($numberList == '') return '';
	$numberArr = array();
	$numbers = explode(',', $numberList);
	foreach($numbers as $number) $numberArr[] = intval($number);
	return implode(',', $numberArr);
}
?>
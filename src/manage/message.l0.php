<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Get the core
$coreID = intval(getVars('coreID', $_GET));
if($coreID < 1) exit;



//Action: add message
if($action == 'add')
{
	//Get message
	$message = strtr(getVars('message', $_POST), $arrEncodeHTML);
	if($message == '' || mb_strlen($message) > 4095) return;

	//Check the account
	fastCheck('message', 0);	

	//Require extra files
	require_once('message.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Message::insert_lock()), false);

	//Insert message
	$result = Message::insert_process($ID, $coreID, $message);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('');

	//Done the process
	Message::insert_done($ID, $coreID);

	//Success
	fastResult('msg.result(0, ' . $ID . ');');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('M.`ID`', '0$1');

	//Check the account
	fastCheck('message', 0);

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the core
	$rs = query('Select `ShopID` from `' . $sitePosition . '.Support` where `ID` = ' . $coreID . ' and `ShopID` = ' . $shopID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[0] != $shopID) fastResult('');

	//Get the data
	$i = 0;
	$messageStr = array();
	getData('Message', 'M', 'M.`SupportID` = ' . $coreID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select M.*, U.`Email`, H.`Name` from `' . $sitePosition . '.Message` M left join `' . $sitePosition . '.User` U on M.`UserID` = U.`ID` left join `' . $sitePosition . '.Shop` H on M.`ShopID` = H.`ID` where M.`SupportID` = ' . $coreID . ' and M.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			
			$messageStr[] = 'msg.elem(' . $i . ', ' . $rsInfo[0] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . ($rsInfo[6] === null ? '' : strtr($rsInfo[6], $arrEncodeJS)) . '", "' . ($rsInfo[7] === null ? '' : strtr($rsInfo[7], $arrEncodeJS)) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$messageStr[0] = 'msg.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'msg.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '", ' . $coreID . ');';
	showResult('msg.top();' . implode('', $messageStr) . 'msg.bottom();');
}
?>
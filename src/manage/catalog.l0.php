<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Get the core
$coreID = intval(getVars('coreID', $_GET));
if($coreID < 0) exit;



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('C.`ShowID`', '0$0');

	//Check the account
	fastCheck('catalog', 0);

	//Get the core
	$coreShowID = 0;
	$coreLinkID = 2147483647;
	if($coreID != 0)
	{
		$rs = query('Select `ShowID`, `LinkID` from `' . $sitePosition . '.Catalog` where `ID` = ' . $coreID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null) fastResult('');
		$coreShowID = $rsInfo[0];
		$coreLinkID = $rsInfo[1];
	}

	//Get the data
	$i = 0;
	$catalogStr = array();
	getData('Catalog', 'C', 'C.`ShowID` > ' . $coreShowID . ' and C.`ShowID` <= ' . $coreLinkID . ' and C.`CatalogID` = ' . $coreID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$articles = array();
		$rs = query('Select count(*), C.`ShowID` from `' . $sitePosition . '.Article` A inner join `' . $sitePosition . '.Catalog` C on A.`CatalogID` = C.`ID` where C.`ShowID` > ' . $coreShowID . ' and C.`ShowID` <= ' . $coreLinkID . ' group by C.`ShowID`', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$articles[$rsInfo[1]] = $rsInfo[0];
		}
		freeResult($rs);

		$rs = query('Select * from `' . $sitePosition . '.Catalog` C where C.`ShowID` > ' . $coreShowID . ' and C.`ShowID` <= ' . $coreLinkID. ' and C.`CatalogID` = ' . $coreID . ' and C.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$sum = 0;
			foreach($articles as $showID => $num) $sum += ($showID >= $rsInfo[2] && $showID <= $rsInfo[3] ? $num : 0);
			$catalogStr[] = 'cata.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', "' . strtr($rsInfo[4], $arrEncodeJS) . '", ' . $rsInfo[5] . ', ' . $rsInfo[6] . ', ' . ($rsInfo[3] - $rsInfo[2]) . ', ' . $sum . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$catalogStr[0] = 'cata.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'cata.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '", ' . $coreID . ');';
	showResult('cata.top();' . implode('', $catalogStr) . 'cata.bottom();');
}
?>
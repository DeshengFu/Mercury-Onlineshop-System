<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: add support
if($action == 'add')
{
	//Get user's ID
	$userID = intval(getVars('userID', $_POST));
	if($userID < 0) exit;

	//Check the account
	fastCheck('support', 0);
	
	//Require extra files
	require_once('support.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Support::insert_lock()), false);

	//Insert support
	$result = Support::insert_process($ID, $userID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('sup.result(' . ($result - 1) . ');');

	//Done the process
	Support::insert_done($ID, $userID);

	//Success
	fastResult('sup.result(2, ' . $ID . ');');
}



//Action: relay support
if($action == 'relay')
{
	//Get support's ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) exit;

	//Get shop's ID
	$nshopID = intval(getVars('shopID', $_POST));
	if($nshopID < 0) exit;

	//Check the account
	fastCheck('support', 0);

	//Require extra files
	require_once('support.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Support::relay_lock()), false);

	//Relay support
	$result = Support::relay_process($ID, $nshopID, $userID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result == 2) fastResult('sup.result(4);');
	if($result != 0) fastResult('');

	//Done the process
	Support::relay_done($ID, $nshopID, $userID);

	//Success
	fastResult('sup.result(5, ' . $ID . ');');
}



//Action: close support
if($action == 'close')
{
	//Get support's ID
	$ID = intval(getVars('ID', $_GET));
	if($ID < 1) exit;

	//Check the account
	fastCheck('support', 0);

	//Require extra files
	require_once('support.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Support::write_lock()), false);

	//Close support
	$result = Support::close_process($ID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('');

	//Done the process
	Support::close_done($ID);

	//Success
	fastResult('sup.result(6, ' . $ID . ');');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('S.`ID`|S.`State`|S.`InsertTime`|S.`UpdateTime`', '0$1');

	//Check the account
	fastCheck('support', 0, 4, 8192);
	
	//Require extra files
	require('include.l0.inc.php');
	require('support.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$supportStr = array();
	getData('Support', 'S', 'S.`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select S.*, U.`Email` from `' . $sitePosition . '.Support` S left join `' . $sitePosition . '.User` U on S.`UserID` = U.`ID` where S.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
				
			$supportStr[] = 'sup.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$supportStr[0] = 'sup.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'sup.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('sup.top();' . implode('', $supportStr) . 'sup.bottom();');
}
?>
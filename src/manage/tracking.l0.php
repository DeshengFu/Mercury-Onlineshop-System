<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: add tracking
if($action == 'add')
{
	//Get the ID of shipment
	$shipmentID = intval(getVars('shipmentID', $_POST));
	if($shipmentID < 1) exit;

	//Get the reference ID
	$referenceID = strtr(getVars('referenceID', $_POST), $arrEncodeHTML);
	if($referenceID == '' || mb_strlen($referenceID) > 31) exit;

	//Get the type
	$type = intval(getVars('type', $_POST));
	if($type < 0 || $type > 255) exit;

	//Get the information
	$information = strtr(getVars('information', $_POST), $arrEncodeHTML);
	if(mb_strlen($information) > 1023) exit;

	//Check the account
	fastCheck('tracking', 0);
	
	//Require extra files
	require_once('tracking.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Tracking::insert_lock()), false);

	//Insert code
	$result = Tracking::insert_process($ID, $shipmentID, $type, $referenceID, $information);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('trac.result(' . ($result - 1) . ');');

	//Done the process
	Tracking::insert_done($ID, $shipmentID, $type, $referenceID);

	//Success
	fastResult('trac.result(1, "' . $ID . '");');
}



//Action: delete tracking
if($action == 'del')
{
	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;

	//Check the account
	fastCheck('tracking', 0);
	
	//Require extra files
	require_once('tracking.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Tracking::write_lock()), false);

	//Delete tracking
	Tracking::delete_check($IDList);
	if($IDList != '') Tracking::delete_process($IDList, $rows);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($IDList == '') fastResult('');

	//Done the process
	Tracking::delete_done($IDList, $rows);

	//Success
	fastResult('trac.result(2, "' . $IDList . '");');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('T.`ID`|T.`ReferenceID`|T.`Type`|T.`InsertTime`', '0$1');

	//Check the account
	fastCheck('tracking', 0);
	
	//Require extra files
	require('include.l0.inc.php');
	require('tracking.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$trackingStr = array();
	getData('Tracking', 'T', '`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select * from `' . $sitePosition . '.Tracking` T where T.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			
			$trackingStr[] = 'trac.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', "' . strtr($rsInfo[4], $arrEncodeJS) . '", "' . strtr($rsInfo[5], $arrEncodeJS) . '", ' . $rsInfo[6] . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$trackingStr[0] = 'trac.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'trac.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('trac.top();' . implode('', $trackingStr) . 'trac.bottom();');
}
?>
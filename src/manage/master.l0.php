<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: add master
if($action == 'add')
{
	//Get the user's ID
	$userID = intval(getVars('userID', $_POST));
	if($userID < 1) exit;

	//Check the account
	fastCheck('master', 0);

	//Require extra files
	require_once('master.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Master::insert_lock()), false);

	//Insert master
	$result = Master::insert_process($ID, $shopID, $userID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result == 1) fastResult('');
	if($result != 0) fastResult('mast.result(0);');

	//Done the process
	Master::insert_done($ID, $shopID, $userID);

	//Success
	fastResult('mast.result(1, ' . $ID . ');');
}



//Action: delete master
if($action == 'del')
{
	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;

	//Check the account
	fastCheck('master', 0);

	//Require extra files
	require_once('master.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Master::write_lock()), false);

	//Delete master
	Master::delete_check($IDList, $shopID);
	if($IDList != '') Master::delete_process($IDList, $shopID, $rows, $masterArr);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($IDList == '') fastResult('');

	//Done the process
	Master::delete_done($IDList, $shopID, $rows, $masterArr);

	//Success
	fastResult('mast.result(2, "' . $IDList . '");');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('M.`ID`|M.`InsertTime`', '0$0');

	//Check the account
	fastCheck('master', 0);

	//Get the data
	$i = 0;
	$masterStr = array();
	getData('Master', 'M', 'M.`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select M.*, U.`Email`, U.`State` from `' . $sitePosition . '.Master` M inner join `' . $sitePosition . '.User` U on M.`UserID` = U.`ID` where M.`ShopID` = ' . $shopID . ' and M.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
				
			$masterStr[] = 'mast.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', "' . strtr($rsInfo[4], $arrEncodeJS) . '", ' . $rsInfo[5] . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$masterStr[0] = 'mast.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'mast.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('mast.top();' . implode('', $masterStr) . 'mast.bottom();');
}
?>
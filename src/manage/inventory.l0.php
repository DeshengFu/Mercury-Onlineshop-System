<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: add inventory
if($action == 'add')
{
	//Get the article's ID
	$articleID = intval(getVars('articleID', $_POST));
	if($articleID < 1) exit;

	//Check the account
	fastCheck('inventory', 0);
	
	//Require extra files
	require_once('inventory.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Inventory::insert_lock()), false);

	//Insert inventory
	$result = Inventory::insert_process($ID, $articleID, $shopID);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('ivt.result(' . ($result - 1) . ');');

	//Done the process
	Inventory::insert_done($ID, $articleID, $shopID);

	//Success
	fastResult('ivt.result(3, ' . $ID . ');');
}



//Action: delete inventory
if($action == 'del')
{
	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;

	//Check the account
	fastCheck('inventory', 0);
	
	//Require extra files
	require_once('inventory.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Inventory::write_lock()), false);

	//Delete inventory
	Inventory::delete_check($IDList);
	if($IDList != '') Inventory::delete_process($IDList, $rows);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($IDList == '') fastResult('');

	//Done the process
	Inventory::delete_done($IDList, $rows);
}



//Action: edit inventory
if($action == 'edit')
{
	//Get inventory's ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) exit;

	//Get inventory's number
	$num = intval(getVars('num', $_POST));
	if($num < -2147483647 || $num > 2147483647) exit;

	//Check the account
	fastCheck('inventory', 0);
	
	//Require extra files
	require_once('inventory.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Inventory::write_lock()), false);

	//Edit inventory
	$result = Inventory::edit_process($ID, $num, $shopID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('');

	//Done the process
	Inventory::edit_done($ID, $num, $shopID);

	//Success
	fastResult('ivt.result(5, ' . $ID . ');');
}



//Action: export inventories
if($action == 'exp')
{
	//Connect to database
	connectDB();

	//Check the account
	if(!checkAdmin('inventory', 0) || !checkShop())
	{
		disconnectDB();
		exit;
	}

	//Require extra files
	require('include.l0.inc.php');
	require('inventory.l0.sea.php');

	//Get the query
	$_POST['searchQI'] = isset($_GET['searchQI']) ? $_GET['searchQI'] : '';
	$searchQS = prepareSearch('search', $map);

	//Send extra header
	header('Content-Disposition: attachment; filename="inventory.txt"');

	//Export records
	$rs = query('Select * from `' . $sitePosition . '.InventoryV` I where `ShopID` = ' . $shopID . ($searchQS != '' ? ' and ' : '') . $searchQS, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		echo $rsInfo[0] . ' ' . $rsInfo[1] . ' ' . $rsInfo[2] . ' ' . $rsInfo[3] . ' ' . $rsInfo[4] . ' ' . $rsInfo[5] . "\r\n";
	}
	freeResult($rs);

	//Disconnect from database
	disconnectDB();

	//Exit
	exit;
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('I.`ID`|I.`Num`|I.`InsertTime`|I.`UpdateTime`|I.`Title`|I.`SubTitle`|I.`Name`|I.`SubName`|I.`Code`', '0$0');

	//Check the account
	fastCheck('inventory', 0);

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);
	
	//Require extra files
	require('include.l0.inc.php');
	require('inventory.l0.sea.php');

	//Get the data
	$i = 0;
	$inventStr = array();
	getData('InventoryV', 'I', '`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select I.* from `' . $sitePosition . '.InventoryV` I where I.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$inventStr[] = 'ivt.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", "' . strtr($rsInfo[8], $arrEncodeJS) . '", "' . strtr($rsInfo[9], $arrEncodeJS) . '", "' . strtr($rsInfo[10], $arrEncodeJS) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$inventStr[0] = 'ivt.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'ivt.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('ivt.top();' . implode('', $inventStr) . 'ivt.bottom();');
}
?>
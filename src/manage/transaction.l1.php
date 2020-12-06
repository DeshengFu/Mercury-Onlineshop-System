<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: create shipment
if($action == 'cship')
{
	//Get element's ID
	$invoiceID = intval(getVars('invoiceID', $_GET));
	if($invoiceID < 1) exit;

	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;

	//Check the account
	fastCheck('transaction', 1);

	//Require extra files
	require_once('transaction.l0.lgc.php');
	require_once('shipment.l0.lgc.php');
	require_once('shop.l0.lgc.php');
	require_once('band.l0.lgc.php');
	require_once('article.l0.lgc.php');
	require_once('inventory.l0.lgc.php');

	//Lock tables
	autoCommitTra(false);
	query('Lock tables ' . implode(', ', mergeLock([Shipment::insert_lock(), Shop::write_lock(), Transaction::read_lock(), Band::write_lock(), Article::write_lock(), Inventory::write_lock(), ['`' . $sitePosition . '.Invoice` read']])), false);

	//Check the IDs
	Shipment::insert_check($IDList, $invoiceID, $shopID);
	if($IDList == '')
	{
		query('Unlock tables', false);
		autoCommitTra(true);
		fastResult('');
	}

	//Count the transactions
	Transaction::sum($IDList, $invoiceID, $sum, $tax, $num, $shopArr, $articleArr);

	//Get the invoice
	$rs = query('Select `OrderID`, `Address`, `ExtraAddress` from `' . $sitePosition . '.Invoice` where `ID` = ' . $invoiceID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null)
	{
		query('Unlock tables', false);
		autoCommitTra(true);
		fastResult('');
	}
	$orderID = $rsInfo[0];
	$address = $rsInfo[1];
	$extraAddress = $rsInfo[2];

	//Check the target
	if(!Shop::xedit_check($shopID, $sum, 0, 0))
	{
		query('Unlock tables', false);
		autoCommitTra(true);
		fastResult('');
	}

	//Check the shops and the bands
	foreach($shopArr as $oshopID => $fsum)
	{
		if(!Shop::xedit_check($oshopID, 0, $fsum, $fsum))
		{
			query('Unlock tables', false);
			autoCommitTra(true);
			fastResult('');
		}
		if($oshopID == $shopID) continue;
		if(!Band::update_check($oshopID, $shopID, $fsum))
		{
			query('Unlock tables', false);
			autoCommitTra(true);
			fastResult('');
		}
	}
	
	//Check the inventories
	$inventoryArr = array();
	foreach($articleArr as $articleID => $fnum)
	{
		if(!Inventory::edit_check($inventoryID, $shopID, $articleID, -$fnum))
		{
			query('Unlock tables', false);
			autoCommitTra(true);
			fastResult('');
		}
		if($inventoryID == 0) continue;
		$inventoryArr[$articleID] = $inventoryID;
	}

	//Insert shipment
	Shipment::insert_process($ID, $IDList, $orderID, $invoiceID, $shopID, $sum, $num, $address, $extraAddress);
	Shop::xedit_processex($shopID, $sum, 0, 0, $num);
	foreach($shopArr as $oshopID => $fsum)
	{
		Shop::xedit_process($oshopID, 0, $fsum, $fsum);
		if($oshopID == $shopID) continue;
		Band::update_process($oshopID, $shopID, $fsum);
	}
	foreach($articleArr as $articleID => $fnum)
	{
		Article::sell_process($articleID, $fnum);
		if(isset($inventoryArr[$articleID])) Inventory::edit_processex($inventoryArr[$articleID], -$fnum);
	}

	//Unlock tables
	commitTra();
	query('Unlock tables', false);
	autoCommitTra(true);

	//Done the process
	Shipment::insert_done($ID, $orderID, $invoiceID, $shopID, $IDList);
	Shop::xedit_done($shopID, $sum, 0, 0);
	foreach($shopArr as $oshopID => $fsum) Shop::xedit_done($oshopID, 0, $fsum, $fsum);
	foreach($articleArr as $articleID => $fnum)
	{
		if(!isset($inventoryArr[$articleID])) continue;
		Inventory::edit_done($inventoryArr[$articleID], -$fnum, $shopID);
	}

	//Success
	fastResult('tsa.result(20, ' . $IDList . ');');
}



//Modify the level and call the page
$levelArr = $feature['transaction']['level'];
$feature['transaction']['level'][0] = array_merge($levelArr[0], array_slice($levelArr[1], 2));

require('transaction.l0.php');
?>
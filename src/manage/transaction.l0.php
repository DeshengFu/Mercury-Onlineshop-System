<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: delete transaction from offer
if($action == 'delo')
{
	//Get the ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) exit;

	//Get the number
	$num = intval(getVars('num', $_POST));
	if($num < 1 || $num > 65535) exit;

	//Check the account
	fastCheck('transaction', 0);

	//Require extra files
	require_once('transaction.l0.lgc.php');

	//Lock tables
	autoCommitTra(false);
	query('Lock tables ' . implode(', ', Transaction::deleteo_lock()), false);

	//Delete transaction
	$result = Transaction::deleteo_process($newID, $ID, $num, $shopID, $offerID, $orderID, $oshopID, $bnum);

	//Unlock tables
	commitTra();
	query('Unlock tables', false);
	autoCommitTra(true);

	//Error
	if($result == 3 && $bnum == 0) fastResult('tsa.result(9);');
	if($result == 3 && $bnum > 0) fastResult('tsa.result(10, ' . $bnum . ');');
	if($result != 0) fastResult('tsa.result();');

	//Done the process
	Transaction::deleteo_done($newID, $ID, $offerID, $orderID, $num, $modifier, $oshopID);

	//Success
	fastResult('tsa.result(13, ' . $newID . ');');
}



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
	fastCheck('transaction', 0);

	//Require extra files
	require_once('transaction.l0.lgc.php');
	require_once('shipment.l0.lgc.php');
	require_once('shop.l0.lgc.php');
	require_once('band.l0.lgc.php');
	require_once('article.l0.lgc.php');

	//Lock tables
	autoCommitTra(false);
	query('Lock tables ' . implode(', ', mergeLock([Shipment::insert_lock(), Shop::write_lock(), Transaction::read_lock(), Band::write_lock(), Article::write_lock(), ['`' . $sitePosition . '.Invoice` read']])), false);

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

	//Insert shipment
	Shipment::insert_process($ID, $IDList, $orderID, $invoiceID, $shopID, $sum, $num, $address, $extraAddress);
	Shop::xedit_processex($shopID, $sum, 0, 0, $num);
	foreach($shopArr as $oshopID => $fsum)
	{
		Shop::xedit_process($oshopID, 0, $fsum, $fsum);
		if($oshopID == $shopID) continue;
		Band::update_process($oshopID, $shopID, $fsum);
	}
	foreach($articleArr as $articleID => $fnum) Article::sell_process($articleID, $fnum);

	//Unlock tables
	commitTra();
	query('Unlock tables', false);
	autoCommitTra(true);

	//Done the process
	Shipment::insert_done($ID, $orderID, $invoiceID, $shopID, $IDList);
	Shop::xedit_done($shopID, $sum, 0, 0);
	foreach($shopArr as $oshopID => $fsum) Shop::xedit_done($oshopID, 0, $fsum, $fsum);

	//Success
	fastResult('tsa.result(19, ' . $IDList . ');');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('T.`ID`|T.`ServiceID`|T.`Title`|T.`SubTitle`|T.`Name`|T.`SubName`|T.`Price`|T.`Tax`|T.`Num`|T.`InsertTime`', '0$0');

	//Check the account
	fastCheck('transaction', 0);
	
	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('transaction.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$transStr = array();
	getData('TransactionV', 'T', '(`ShopID` = ' . $shopID . ' or `TargetID` = ' . $shopID. ') and `OfferID` > 0', $searchQS, $sortQS, 20, 100, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select T.*, S.`Name`, A.`Name` from `' . $sitePosition . '.TransactionV` T left join `' . $sitePosition . '.Shop` S on T.`ShopID` = S.`ID` left join `' . $sitePosition . '.Shop` A on T.`TargetID` = A.`ID` where T.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$transStr[] = 'tsa.elem(' . $i . ', ' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '", ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', "' . strtr($rsInfo[5], $arrEncodeJS) . '", "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", "' . strtr($rsInfo[8], $arrEncodeJS) . '", ' . $rsInfo[9] . ', ' . $rsInfo[10] . ', ' . $rsInfo[11] . ', ' . $rsInfo[13] . ', ' . $rsInfo[14] . ', ' . $rsInfo[15] . ', ' . $rsInfo[16] . ', ' . $rsInfo[17] . ', ' . $rsInfo[18] . ', ' . $rsInfo[19] . ', ' . $rsInfo[20] . ', ' . $rsInfo[21] . ', ' . $rsInfo[22] . ', ' . $rsInfo[23] . ', ' . $rsInfo[24] . ', ' . $rsInfo[25] . ', ' . $rsInfo[26] . ', ' . $rsInfo[27] . ', "' . ($rsInfo[28] === null ? '' : strtr($rsInfo[28], $arrEncodeJS)) . '", "' . ($rsInfo[29] === null ? '' : strtr($rsInfo[29], $arrEncodeJS)) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$transStr[0] = 'tsa.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'tsa.buffer(20, 100, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('tsa.top();' . implode('', $transStr) . 'tsa.bottom();');
}
?>
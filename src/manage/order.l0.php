<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('O.`ID`', '0$1');

	//Check the account
	fastCheck('order', 0);

	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('order.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$orderStr = array();
	getData('TransactionO', 'O', '`ShopID` = ' . $shopID . ' or `TargetID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$selement = array();
		$rs = query('Select `OrderID`, sum(`Num`) from `' . $sitePosition . '.TransactionV` where `ShopID` = ' . $shopID . ' and `OrderID` in (' . $IDList . ') group by `OrderID`', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$selement[intval($rsInfo[0])] = $rsInfo[1];
		}
		freeResult($rs);

		$telement = array();
		$rs = query('Select `OrderID`, sum(`Num`) from `' . $sitePosition . '.TransactionV` where `InvoiceID` > 0 and `ShipmentID` = 0 and `TargetID` = ' . $shopID . ' and `OrderID` in (' . $IDList . ') group by `OrderID`', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$telement[intval($rsInfo[0])] = $rsInfo[1];
		}
		freeResult($rs);

		$rs = query('Select * from `' . $sitePosition . '.Order` O where O.`ID` in (' . $IDList . ') order by ' . $sortQS, true);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$orderStr[] = 'ord.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", ' . $rsInfo[9] . ', ' . $rsInfo[11] . ', "' . strtr($rsInfo[12], $arrEncodeJS) . '", ' . (isset($selement[$rsInfo[0]]) ? $selement[$rsInfo[0]] : 0) . ', ' . (isset($telement[$rsInfo[0]]) ? $telement[$rsInfo[0]] : 0) . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$orderStr[0] = 'ord.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'ord.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('ord.top();' . implode('', $orderStr) . 'ord.bottom();');
}
?>
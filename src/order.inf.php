<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$page = intval(getVars('page', $_GET));
if($page < 1) $page = 1;
$size = 10;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('ord.result(1);');



//Count the records
$rs = query('Select count(*) from `' . $sitePosition . '.Order` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$record = intval($rsInfo[0]);
$count = ceil($record / $size);
if($page > $count) $page = $count;



//Get the information
$i = 0;
$orderStr = array();
$subscriptionArr = array();
$invoiceArr = array();
$shipmentArr = array();
if($page > 0)
{
	$orderArr = array();

	$rs = query('Select * from `' . $sitePosition . '.Order` where `UserID` = ' . $cuID . ' order by `ID` desc limit ' . (($page - 1) * $size) . ', ' . $size, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;

		$orderArr[] = $rsInfo[0];
		$orderStr[] = 'ord.drawElem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", ' . $rsInfo[9] . ', ' . $rsInfo[10] . ', ' . $rsInfo[11] . ', "' . strtr($rsInfo[12], $arrEncodeJS) . '", "' . strtr($rsInfo[13], $arrEncodeJS) . '");';
		$i++;
	}
	freeResult($rs);
	$orderList = implode(',', $orderArr);

	if($orderList != '')
	{
		$rs = query('Select `ID`, `OrderID`, `NextTime` from `' . $sitePosition . '.Subscription` where `OrderID` in (' . $orderList . ') order by `NextTime` desc', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$subscriptionArr[] = $rsInfo[0] . '$' . $rsInfo[1];
		}
		freeResult($rs);

		$rs = query('Select `ID`, `OrderID` from `' . $sitePosition . '.Invoice` where `OrderID` in (' . $orderList . ') order by `ID` desc', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$invoiceArr[] = $rsInfo[0] . '$' . $rsInfo[1] . '$' . $rsInfo[2];
		}
		freeResult($rs);
		if($siteLevel < 7)
			$rs = query('Select `ID`, `OrderID`, 0, 0 from `' . $sitePosition . '.Shipment` where `OrderID` in (' . $orderList . ') order by `ID` desc', false);
		else
			$rs = query('Select `ID`, `OrderID`, `ReferenceID`, `Type` from `' . $sitePosition . '.ShipmentV` where `OrderID` in (' . $orderList . ') order by `ID` desc', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$shipmentArr[] = $rsInfo[0] . '$' . $rsInfo[1] . '$' . $rsInfo[2] . '$' . $rsInfo[3];
		}
		freeResult($rs);
	}
}
else
	$orderStr[0] = 'ord.drawEmpty();';



//Uninitialize
uninitialize();



//Show the page
echo 'ord.page = ' . $page . ', ord.record = ' . $record . ', ord.count = ' . $count . ', ord.invoice = "' . implode('|', $invoiceArr) . '", ord.shipment = "' . implode('|', $shipmentArr) . '", ord.subscription = "' . implode('|', $subscriptionArr) . '";';
echo 'ord.drawTop();';
echo implode('', $orderStr);
echo 'ord.drawBottom();';
?>
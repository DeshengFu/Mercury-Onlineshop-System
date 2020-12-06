<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: print shipments
if($action == 'print')
{
	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;
	
	//Get the profile's ID
	$profileID = intval(getVars('profileID', $_GET));
	if($profileID < 1) exit;

	//Connect to database
	connectDB();

	//Check the account
	if(!checkAdmin('shipment', 0) || !checkShop())
	{
		disconnectDB();
		exit;
	}

	//Require extra files
	require('pdf.inc.php');
	require('shipment.l0.inc.php');

	//Prepare shipment
	$shipment = prepareShipment($IDList, $profileID);

	//Disconnect from database
	disconnectDB();

	//Flush PDF
	if($shipment !== null) flushPDF($shipment, $IDList . '.pdf');

	//Exit
	exit;
}



//Action: export shipments
if($action == 'exp')
{
	//Connect to database
	connectDB();

	//Check the account
	if(!checkAdmin('shipment', 0) || !checkShop())
	{
		disconnectDB();
		exit;
	}

	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('shipment.l0.sea.php');

	//Get the query
	$_POST['searchQI'] = isset($_GET['searchQI']) ? $_GET['searchQI'] : '';
	$searchQS = prepareSearch('search', $map);

	//Send extra header
	header('Content-Disposition: attachment; filename="shipment.txt"');

	//Export records
	$rs = query('Select * from `' . $sitePosition . '.Shipment` S where `ShopID` = ' . $shopID . ($searchQS != '' ? ' and ' : '') . $searchQS, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		echo $rsInfo[0] . ' ' . $rsInfo[1] . ' ' . $rsInfo[2] . ' ' . $rsInfo[3] . ' ' . $rsInfo[4] . ' ' . $rsInfo[5] . ' \'' . $rsInfo[6] . '\' \'' . $rsInfo[7] . '\' ' . $rsInfo[8] . "\r\n";
	}
	freeResult($rs);

	//Disconnect from database
	disconnectDB();

	//Exit
	exit;
}



//Action: send shipment via email
if($action == 'send')
{
	//Get the ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) exit;

	//Get profile's ID
	$profileID = intval(getVars('profileID', $_POST));
	if($profileID < 1) exit;

	//Get draft's ID
	$draftID = intval(getVars('draftID', $_POST));
	if($draftID < 1) exit;

	//Check the account
	fastCheck('shipment', 0);
	
	//Get the shipment
	$rs = query('Select S.`OrderID`, S.`InvoiceID`, O.`Email` from `' . $sitePosition . '.Shipment` S inner join `' . $sitePosition . '.Order` O on S.`OrderID` = O.`ID` where S.`ID` = ' . $ID . ' and S.`ShopID` = ' . $shopID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null) fastResult('');
	$orderID = $rsInfo[0];
	$invoiceID = $rsInfo[1];
	$email = $rsInfo[2];

	//Require extra files
	require('pdf.inc.php');
	require('shipment.l0.inc.php');
	require('mail.inc.php');
	require('funmail.inc.php');

	//Prepare shipment
	$shipment = prepareShipment($ID, $profileID);
	if($shipment === null) fastResult('');

	//Prepare email
	$stArr = array(
		'%SID%' => $ID,
		'%OID%' => $orderID,
		'%IID%' => $invoiceID
	);
	$mail = prepareFunMail('', $email, array(array(getPDF($shipment), $ID . '.pdf')), $draftID, $stArr, 8);
	if($mail === null) fastResult('');

	//Disconnect from database
	disconnectDB();

	//Send the mail
	sendMail($mail);
	
	//Show result
	showResult('ship.result(1, ' . $ID . ');');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('S.`ID`|S.`Num`|S.`Sum`|S.`InsertTime`', '0$1');

	//Check the account
	fastCheck('shipment', 0);

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$shipmentStr = array();
	getData('Shipment', 'S', '`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select S.* from `' . $sitePosition . '.Shipment` S where S.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			
			$shipmentStr[] = 'ship.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", ' . $rsInfo[8] . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$shipmentStr[0] = 'ship.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'ship.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('ship.top();' . implode('', $shipmentStr) . 'ship.bottom();');
}
?>
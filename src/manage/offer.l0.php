<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: add offer
if($action == 'add')
{
	//Get the article's ID
	$articleID = intval(getVars('articleID', $_POST));
	if($articleID < 1) exit;

	//Check the account
	fastCheck('offer', 0);

	//Require extra files
	require_once('offer.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Offer::insert_lock()), false);

	//Insert offer
	$result = Offer::insert_process($ID, $articleID, $shopID);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('off.result(' . ($result - 1) . ');');

	//Done the process
	Offer::insert_done($ID, $articleID, $shopID);

	//Success
	fastResult('off.result(2, ' . $ID . ');');
}



//Action: delete offer
if($action == 'del')
{
	//Get the IDList
	$IDList = parseNumberList(getVars('IDList', $_GET));
	if($IDList == '') exit;

	//Check the account
	fastCheck('offer', 0);

	//Require extra files
	require_once('offer.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Offer::delete_lock()), false);

	//Delete offer
	Offer::delete_check($IDList);
	if($IDList != '') $result = Offer::delete_process($IDList, $rows, ['Offer', 'delete_checkfun']);

	//Unlock the table
	query('Unlock tables', false);

	//Error
	if($IDList == '') fastResult('');
	if($result != 0) fastResult('off.result(3);');

	//Done the process
	Offer::delete_done($IDList, $rows);

	//Success
	fastResult('off.result(4, "' . $IDList . '");');
}



//Action: edit offer
if($action == 'edit')
{
	//Get offer's ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) exit;

	//Get offer's discount
	$discount = intval(getVars('discount', $_POST));
	if($discount < -2147483647 || $discount > 2147483647) exit;
	
	//Get offer's price
	$price = intval(getVars('price', $_POST));
	if($price < -2147483647 || $price > 2147483647 || abs($price - $discount) > 2147483647) exit;
	
	//Get offer's flag
	$flag = intval(getVars('flag', $_POST));
	if($flag < 0) exit;

	//Get offer's inventory
	$inventory = intval(getVars('inventory', $_POST));
	if($inventory < 0 || $inventory > 2147483647) exit;

	//Get the start time and the end time
	$startTime = intval(getVars('startTime', $_POST));
	$endTime = intval(getVars('endTime', $_POST));
	if($endTime < 0 || $startTime < 0 || $endTime < $startTime) exit;

	//Get the target's ID
	$targetID = intval(getVars('targetID', $_POST));
	if($targetID < 1) exit;

	//Check the account
	fastCheck('offer', 0);

	//Require extra files
	require_once('offer.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Offer::edit_lock()), false);

	//Edit offer
	$result = Offer::edit_process($ID, $discount, $price, $flag, $inventory, $startTime, $endTime, $targetID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('');

	//Done the process
	Offer::edit_done($ID, $discount, $price, $inventory, $targetID);

	//Success
	fastResult('off.result(5, ' . $ID . ');');
}



//Action: copy offer
if($action == 'copy')
{
	//Get the ID of original offer
	$offerID = intval(getVars('offerID', $_GET));
	if($offerID < 1) exit;

	//Check the account
	fastCheck('offer', 0, 4, 8);

	//Require extra files
	require_once('offer.l0.lgc.php');

	//Lock tables
	query('Lock tables ' . implode(', ', Offer::write_lock()), false);

	//Copy offer
	$result = Offer::copy_process($ID, $offerID);

	//Unlock tables
	query('Unlock tables', false);

	//Error
	if($result != 0) fastResult('');

	//Done the process
	Offer::copy_done($ID, $offerID);

	//Success
	fastResult('off.result(6, ' . $ID . ');');
}



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('O.`ID`|O.`Discount`|O.`Price`|O.`Inventory`|O.`StartTime`|O.`EndTime`', '0$0');

	//Check the account
	fastCheck('offer', 0);
	
	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('offer.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$offerStr = array();
	getData('Offer', 'O', '`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$bands = array();
		$rs = query('Select B.`TargetID`, S.`Name` from `' . $sitePosition . '.Band` B inner join `' . $sitePosition . '.Shop` S on B.`TargetID` = S.`ID` where B.`SourceID` = ' . $shopID, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$bands[] = $rsInfo[0] . '$' . strtr($rsInfo[1], $arrEncodeJS);
		}
		freeResult($rs);

		$rs = query('Select O.*, A.`Title`, A.`SubTitle`, A.`Name`, A.`SubName` from `' . $sitePosition . '.Offer` O inner join `' . $sitePosition . '.Article` A on O.`ArticleID` = A.`ID` where O.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$offerStr[] = 'off.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', ' . $rsInfo[6] . ', ' . $rsInfo[7] . ', ' . $rsInfo[8] . ', ' . $rsInfo[9] . ', "' . strtr($rsInfo[10], $arrEncodeJS) . '", "' . strtr($rsInfo[11], $arrEncodeJS) . '", "' . strtr($rsInfo[12], $arrEncodeJS) . '", "' . strtr($rsInfo[13], $arrEncodeJS) . '", "' . implode('|', $bands) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$offerStr[0] = 'off.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'off.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('off.top();' . implode('', $offerStr) . 'off.bottom();');
}
?>
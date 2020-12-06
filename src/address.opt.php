<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('addr.result(1);');



//Action: add address
if($action == 'add')
{
	//Get information
	$address = strtr(getVars('address', $_POST), $arrEncodeHTML);
	if($address == '' || mb_strlen($address) > 4095) showResult('');

	//Lock tables
	query('Lock tables `' . $sitePosition . '.User` read, `' . $sitePosition . '.Address` write', false);

	//Check the user
	$rs = query('Select count(*) from `' . $sitePosition . '.User` where `ID` = ' . $cuID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if(intval($rsInfo[0]) == 0)
	{
		query('Unlock tables', false);
		showResult('');
	}

	//Insert address
	query('Insert into `' . $sitePosition . '.Address` values (NULL, ' . $cuID . ', "' . escapeStr($address) . '", ' . $currTime . ', ' . $currTime . ')', false);
	$ID = insertID();

	//Unlock tables
	query('Unlock tables', false);

	//Insert the record
	query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 26, "' . $ID . '", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);

	//Refresh the size
	refreshSize('address', 1);

	//Success
	showResult('addr.result(0);');
}



//Action: delete address
if($action == 'del')
{
	//Get address's ID
	$ID = intval(getVars('ID', $_GET));
	if($ID < 1) showResult('');

	//Delete records
	query('Delete from `' . $sitePosition . '.Address` where `UserID` = ' . $cuID . ' and `ID` = ' . $ID, false);
	if(affectedRows() < 1) showResult('');
	
	//Insert the record
	query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 27, "' . $ID . '", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);

	//Refresh the size
	refreshSize('address', -1);

	//Success
	showResult('addr.result(0);');
}



//Action: edit address
if($action == 'edit')
{
	//Get address's ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) showResult('');

	//Get information
	$address = strtr(getVars('address', $_POST), $arrEncodeHTML);
	if($address == '' || mb_strlen($address) > 4095) showResult('');
	
	//Update the address
	query('Update `' . $sitePosition . '.Address` set `Address` = "' . escapeStr($address) . '", `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID . ' and `UserID` = ' . $cuID, false);
	if(affectedRows() < 1) showResult('');

	//Insert the record
	query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 28, "' . $ID . '", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);

	//Success
	showResult('addr.result(0);');
}
?>
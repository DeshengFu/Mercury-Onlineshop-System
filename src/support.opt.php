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



//Action: reply message
if($action == 'reply')
{
	//Get support's ID
	$ID = intval(getVars('ID', $_POST));
	if($ID < 1) showResult('');

	//Get message
	$message = strtr(getVars('message', $_POST), $arrEncodeHTML);
	if($message == '' || mb_strlen($message) > 4095) showResult('');

	//Check the support
	$rs = query('Select * from `' . $sitePosition . '.Support` where `ID` = ' . $ID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[1] != $cuID) showResult('sup.result(2);');

	//Insert message
	query('Insert into `' . $sitePosition . '.Message` values (NULL, ' . $ID . ', "' . escapeStr($message) . '", ' . $cuID . ', 0, ' . $currTime . ')', false);
	$messageID = insertID();

	//Update support
	query('Update `' . $sitePosition . '.Support` set `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID, false);
	
	//Refresh the size
	refreshSize('message', 1, false);

	//Success
	showResult('sup.result(2, [' . $messageID . ', "' . strtr($message, $arrEncodeJS) . '", ' . $cuID . ', 0, ' . $currTime . ', ""]);');
}



//Action: show support
if($action == 'show')
{
	//Get support's ID
	$ID = intval(getVars('ID', $_GET));
	if($ID < 1) showResult('');

	//Check the support
	$rs = query('Select * from `' . $sitePosition . '.Support` where `ID` = ' . $ID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[1] != $cuID) showResult('sup.result(2);');
	
	//Get the list of messages
	$messageStr = array();
	$rs = query('Select M.*, H.`Name` from `' . $sitePosition . '.Message` M left join `' . $sitePosition . '.Shop` H on M.`ShopID` = H.`ID` where M.`SupportID` = ' . $ID, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		$messageStr[] = '[' . $rsInfo[0] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . ($rsInfo[6] === null ? '' : strtr($rsInfo[6], $arrEncodeJS)) . '"]';
	}
	freeResult($rs);

	//Success
	showResult('sup.show(' . $ID . ', [' . implode(',', $messageStr) . ']);');
}
?>
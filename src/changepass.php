<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$cPass = getVars('currPass', $_POST);
$uPass = getVars('userPass', $_POST);
if(mb_strlen($cPass) < 8 || mb_strlen($cPass) > 32 || mb_strlen($uPass) < 8 || mb_strlen($uPass) > 32) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('cp.result(2);');



//Get the user
$rs = query('Select `Pass` from `' . $sitePosition . '.User` where `ID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || md5($cPass) != $rsInfo[0]) showResult('cp.result(1);');

if($siteLevel > 6)
{
	$rs = query('Select `Type` from `' . $sitePosition . '.UserE` where `UserID` = ' . $cuID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[0] > 9) showResult('cp.result(1);');
}



//Update the user
query('Update `' . $sitePosition . '.User` set `Pass` = "' . md5($uPass) . '" where `ID` = ' . $cuID, false);



//Insert the record
query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 23, "", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Success
showResult('cp.result(0);');
?>
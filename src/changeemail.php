<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$cPass = getVars('currPass', $_POST);
$uEmail = getVars('userEmail', $_POST);
if(mb_strlen($cPass) < 8 || mb_strlen($cPass) > 32 || $uEmail == '' || strlen($uEmail) > 255) exit;
for($i = 0; $i < strlen($uEmail); $i++)
{
	if(strpos('0123456789abcdefghijklmnopqrstuvwxyz_-.@', $uEmail{$i}) === false) exit;
}
if(strpos($uEmail, '@') === false) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('ce.result(4);');
if($uEmail == $cuEmail) showResult('');



//Get the user
$rs = query('Select `Pass` from `' . $sitePosition . '.User` where `ID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || md5($cPass) != $rsInfo[0]) showResult('ce.result(2);');

$rs = query('Select `Type` from `' . $sitePosition . '.UserE` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[0] > 9) showResult('ce.result(2);');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 4 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['ireactLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['ireactLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['ireactTime'] * $gsetting['ireactLimit']) showResult('ce.result(1);');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 4 and `Parameter` = ' . $cuID . ' order by `AccessTime` desc limit ' . $gsetting['ureactLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['ureactLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['ureactTime'] * $gsetting['ureactLimit']) showResult('ce.result(1);');



//Update the state
query('Insert into `system.Access` values (NULL, 4, ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Lock tables
query('Lock tables `' . $sitePosition . '.User` write', false);



//Check the user
$rs = query('Select count(*) from `' . $sitePosition . '.User` where `Email` = "' . escapeStr($uEmail) . '" and `ID` != ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) > 0)
{
	query('Unlock tables', false);
	showResult('ce.result(3);');
}



//Update the user
query('Update `' . $sitePosition . '.User` set `Email` = "' . escapeStr($uEmail) . '", `State` = (`State` & 254) where `ID` = ' . $cuID, false);



//Unlock tables
query('Unlock tables', false);



//Insert the record
query('Insert into `' . $sitePosition . '.Record` values (NULL, 21, "' . escapeStr($uEmail) . '", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the mail information
$emailPass = getRandomCode(16);
query('Delete from `' . $sitePosition . '.Email` where `UserID` = ' . $cuID . ' and `Type` = 0', false);
query('Insert into `' . $sitePosition . '.Email` values (NULL, ' . $cuID . ', 0, "' . $emailPass . '", ' . ($currTime + $gsetting['evalidTime'] * 60) . ', "")', false);
$ID = insertID();



//Require extra files
require('mail.inc.php');
require('funmail.inc.php');



//Prepare the mail
$mail = prepareFunMail('', $cuEmail, array(), $siteSetting[5], array('%SITEURL%' => $siteServer, '%VALIDTIME%' => $gsetting['evalidTime'], '%CODE%' => $ID . '-' . $emailPass), 1);



//Uninitialize
uninitialize();



//Send the mail
if($mail !== null) sendMail($mail);



//Set the cookie
$userInfo = getVars('user', $_COOKIE);
$userInfo = setcookiekey('userEmail', $uEmail, $userInfo);
setcookie('user', $userInfo, 0, '/', $siteServer);



//Success
echo 'ce.result(0);';
?>
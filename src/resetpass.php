<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$uEmail = getVars('userEmail', $_POST);
$uPass = getVars('userPass', $_POST);
if($uEmail == '' || strlen($uEmail) > 255 || mb_strlen($uPass) < 8 || mb_strlen($uPass) > 32 || $saveCookie < 0 || $saveCookie > 65535) exit;
for($i = 0; $i < strlen($uEmail); $i++)
{
	if(strpos('0123456789abcdefghijklmnopqrstuvwxyz_-.@', $uEmail{$i}) === false) exit;
}
if($uEmail != '' && strpos($uEmail, '@') === false) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 3 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['iresetLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['iresetLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['iresetTime'] * $gsetting['iresetLimit']) showResult('rp.result(1);');



//Get the user
$rs = query('Select `ID`, `Type` from `' . $sitePosition . '.UserV` where `Email` = "' . escapeStr($uEmail) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$uID = $rsInfo === null || $rsInfo[1] > 9 ? 0 : $rsInfo[0];



//Check the state
if($uID > 0)
{
	$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 3 and `Parameter` = ' . $uID . ' order by `AccessTime` desc limit ' . $gsetting['uresetLimit'], false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if(intval($rsInfo[0]) >= $gsetting['uresetLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['uresetTime'] * $gsetting['uresetLimit']) showResult('rp.result(1);');
}



//Update the state
query('Insert into `system.Access` values (NULL, 3, ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Check the user
if($uID == 0) showResult('rp.result(2);');



//Insert the record
query('Insert into `' . $sitePosition . '.Record` values (NULL, 9, "", ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the mail information
$emailPass = getRandomCode(16);
query('Delete from `' . $sitePosition . '.Email` where `UserID` = ' . $uID . ' and `Type` = 1', false);
query('Insert into `' . $sitePosition . '.Email` values (NULL, ' . $uID . ', 1, "' . $emailPass . '", ' . ($currTime + $gsetting['evalidTime'] * 60) . ', "' . md5($uPass) . '")', false);
$ID = insertID();



//Require extra files
require('mail.inc.php');
require('funmail.inc.php');



//Prepare the mail
$mail = prepareFunMail('', $uEmail, array(), $siteSetting[6], array('%SITEURL%' => $siteServer, '%VALIDTIME%' => $gsetting['evalidTime'], '%CODE%' => $ID . '-' . $emailPass), 2);



//Uninitialize
uninitialize();



//Send the mail
if($mail !== null) sendMail($mail);



//Success
echo 'rp.result(0);';
?>
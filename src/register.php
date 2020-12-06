<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$uEmail = getVars('userEmail', $_POST);
$uPass = getVars('userPass', $_POST);
$birthday = intval(getVars('birthday', $_POST));
$address = strtr(getVars('address', $_POST), $arrEncodeHTML);
if($uEmail == '' || strlen($uEmail) > 255 || mb_strlen($uPass) < 8 || mb_strlen($uPass) > 32 || $birthday < -2147483647 || $birthday > 2147483647 || $address == '' || mb_strlen($address) > 4095) exit;
for($i = 0; $i < strlen($uEmail); $i++)
{
	if(strpos('0123456789abcdefghijklmnopqrstuvwxyz_-.@', $uEmail{$i}) === false) exit;
}
if(strpos($uEmail, '@') === false) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 2 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['registerLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['registerLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['registerTime'] * $gsetting['registerLimit']) showResult('reg.result(1);');



//Lock tables
query('Lock tables `' . $sitePosition . '.User` write', false);



//Check the user
$rs = query('Select count(*) from `' . $sitePosition . '.User` where `Email` = "' . escapeStr($uEmail) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) > 0)
{
	query('Unlock tables', false);
	showResult('reg.result(2);');
}

	

//Get the cookie information
$cookiePass = getRandomCode(16);



//Register the user
query('Insert into `' . $sitePosition . '.User` values (NULL, "' . escapeStr($uEmail) . '", "' . md5($uPass) . '", 0, ' . $currTime . ', ' . $currTime . ', 0, ' . $currTime . ', 0, 0, 0, "", "' . $cookiePass . '", 0)', false);
$uID = insertID();
query('Insert into `' . $sitePosition . '.UserE` values (NULL, ' . $uID . ', 0, "", ' . $birthday . ', "' . escapeStr($address) . '")', false);



//Unlock tables
query('Unlock tables', false);



//Update the state
query('Insert into `system.Access` values (NULL, 2, ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the record
query('Insert into `' . $sitePosition . '.Record` values (NULL, 6, "", ' . $uID . ', ' . $cuIP . ', ' . $currTime . '), (NULL, 10, "", ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the mail information
$emailPass = getRandomCode(16);
query('Delete from `' . $sitePosition . '.Email` where `UserID` = ' . $uID . ' and `Type` = 0', false);
query('Insert into `' . $sitePosition . '.Email` values (NULL, ' . $uID . ', 0, "' . $emailPass . '", ' . ($currTime + $gsetting['evalidTime'] * 60) . ', "")', false);
$ID = insertID();



//Require extra files
require('mail.inc.php');
require('funmail.inc.php');



//Prepare the mail
$mail = prepareFunMail('', $uEmail, array(), $siteSetting[5], array('%SITEURL%' => $siteServer, '%VALIDTIME%' => $gsetting['evalidTime'], '%CODE%' => $ID . '-' . $emailPass), 1);

	//Refresh the size
	///refreshSize('address', 1, false);


//Uninitialize
uninitialize();



//Send the mail
if($mail !== null) sendMail($mail);



//Write the cookie
$userInfo = setcookiekey('userID', $uID, '');
$userInfo = setcookiekey('userEmail', $uEmail, $userInfo);
$userInfo = setcookiekey('cookiePass', $cookiePass, $userInfo);
setcookie('user', $userInfo, $cookieExpire, '/', $siteServer);



//Success
echo 'reg.result(0);';
?>
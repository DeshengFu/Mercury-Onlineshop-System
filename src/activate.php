<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$type = intval(getVars('type', $_POST));
if($type < 0 || $type > 1) exit;

$code = explode('-', getVars('code', $_POST) . '-');
$ID = intval($code[0]);
$pass = $code[1];
if($ID < 1 || $ID > 2147483647 || strlen($pass) != 16) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Get the email
$rs = query('Select * from `' . $sitePosition . '.Email` where `ID` = ' . $ID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[2] != $type || $rsInfo[3] != $pass || $rsInfo[4] < $currTime) showResult('act.result(1, ' . $type . ');');
$uID = $rsInfo[1];
$information = $rsInfo[5];



//Get the user
$rs = query('Select `Email`, `Type` from `' . $sitePosition . '.UserV` where `ID` = ' . $uID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[1] > 9) showResult('act.result(1, ' . $type . ');');
$uEmail = $rsInfo[0];



//Delete the email
$rs = query('Delete from `' . $sitePosition . '.Email` where `ID` = ' . $ID, false);



//Get the cookie information
$cookiePass = getRandomCode(16);



//Update the user
if($type == 0) query('Update `' . $sitePosition . '.User` set `State` = (`State` | 1), `CookiePass` = "' . $cookiePass . '", `ValidTime` = 0 where `ID` = ' . $uID, false);
if($type == 1) query('Update `' . $sitePosition . '.User` set `Pass` = "' . $information . '", `CookiePass` = "' . $cookiePass . '", `ValidTime` = 0 where `ID` = ' . $uID, false);



//Insert the record
query('Insert into `' . $sitePosition . '.Record` values (NULL, ' . (11 + $type) . ', "", ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Uninitialize
uninitialize();



//Write the cookie
$userInfo = setcookiekey('userID', $uID, '');
$userInfo = setcookiekey('userEmail', $uEmail, $userInfo);
$userInfo = setcookiekey('cookiePass', $cookiePass, $userInfo);
setcookie('user', $userInfo, $cookieExpire, '/', $siteServer);



//Success
echo 'act.result(0, ' . $type . ');';
?>
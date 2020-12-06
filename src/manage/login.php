<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('ainclude.inc.php');



//Get the input
$uName = strtr(getVars('adminName', $_POST), $arrEncodeHTML);
$uPass = getVars('adminPass', $_POST);
$saveCookie = intval(getVars('saveCookie', $_POST));
if($uName == '' || mb_strlen($uName) > 255 || mb_strlen($uPass) < 8 || mb_strlen($uPass) > 32 || $saveCookie < 0 || $saveCookie > 65535) exit;



//Connect to database
connectDB();



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 0 and `AccessIP` = ' . $adminIP . ' order by `AccessTime` desc limit ' . $gsetting['accessLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['accessLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['accessTime'] * $gsetting['accessLimit']) fastResult('main.result(1);');



//Check the site
$rs = query('Select `Level`, `Position` from `system.Site` where `Host` = "' . escapeStr($siteServer) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null)
{
	query('Insert into `system.Access` values (NULL, 0, 0, ' . $adminIP . ', ' . $currTime . ')', false);
	fastResult('main.result(2);');
}
$siteLevel = $rsInfo[0];
$sitePosition = $rsInfo[1];



//Check the administrator
$rs = query('Select `ID`, `Pass` from `' . $sitePosition . '.User` where `Email` = "' . escapeStr($uName) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || md5($uPass) != $rsInfo[1])
{
	query('Insert into `system.Access` values (NULL, 0, 0, ' . $adminIP . ', ' . $currTime . ')', false);
	fastResult('main.result(2);');
}
$adminID = $rsInfo[0];
$adminName = $uName;



//Create a new cookie password
$cookiePass = getRandomCode(16);
$cookieExpire = $saveCookie > 0 ? $currTime + $saveCookie * 86400 : 0;



//Update the administrator
query('Update `' . $sitePosition . '.User` set `AccessTime` = ' . $currTime . ', `CookiePass` = "' . $cookiePass . '", `ValidTime` = ' . $cookieExpire . ' where `ID` = ' . $adminID, false);



//Insert log
query('Insert into `' . $sitePosition . '.Record` values (NULL, 7, "", ' . $adminID . ', ' . $adminIP . ', ' . $currTime . ')', false);



//Disconnect from database
disconnectDB();



//Write the cookie
$adminInfo = setcookiekey('siteLevel', $siteLevel, '');
$adminInfo = setcookiekey('userID', $adminID, $adminInfo);
$adminInfo = setcookiekey('userEmail', $uName, $adminInfo);
$adminInfo = setcookiekey('cookiePass', $cookiePass, $adminInfo);
setcookie('user', $adminInfo, $cookieExpire, '/', $siteServer);



//Success
showResult('main.result(0);');
?>
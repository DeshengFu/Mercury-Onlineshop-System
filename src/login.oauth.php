<?php
//$page. $resource . $token



//Initialize
if(!initialize()) exit;



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 1 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['iaccessLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['iaccessLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['iaccessTime'] * $gsetting['iaccessLimit']) showResult('li.result(1);');



//Get the user
$rs = query('Select `ID`, `Pass` from `' . $sitePosition . '.User` where `Email` = "' . escapeStr($uEmail) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$uID = $rsInfo === null ? 0 : $rsInfo[0];
$tPass = $rsInfo === null ? '' : $rsInfo[1];



//Check the state
if($uID > 0)
{
	$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 1 and `Parameter` = ' . $uID . ' order by `AccessTime` desc limit ' . $gsetting['uaccessLimit'], false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if(intval($rsInfo[0]) >= $gsetting['uaccessLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['uaccessTime'] * $gsetting['uaccessLimit']) showResult('li.result(1);');
}



//Check the user
if($uID == 0 || md5($uPass) != $tPass)
{
	query('Insert into `system.Access` values (NULL, 1, ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);
	showResult('li.result(2);');
}



//Create a new cookie password
$cookiePass = getRandomCode(16);
$cookieExpire = $saveCookie > 0 ? $currTime + $saveCookie * 86400 : 0;



//Update the user
query('Update `' . $sitePosition . '.User` set `AccessTime` = ' . $currTime . ', `CookiePass` = "' . $cookiePass . '", `ValidTime` = ' . $cookieExpire . ' where `ID` = ' . $uID, false);



//Insert record
query('Insert into `' . $sitePosition . '.Record` values (NULL, 7, "", ' . $uID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Uninitialize
uninitialize();



//Write the cookie
$userInfo = setcookiekey('userID', $uID, '');
$userInfo = setcookiekey('userEmail', $uEmail, $userInfo);
$userInfo = setcookiekey('cookiePass', $cookiePass, $userInfo);
setcookie('user', $userInfo, $cookieExpire, '/', $siteServer);



//Success
echo 'li.result(0);';
?>
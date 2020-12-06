<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Clear cookie
setcookie('user', '', 0, '/', $siteServer);



//Update user's information
if($cuID > 0) query('Update `' . $sitePosition . '.User` set `CookiePass` = "" where `ID` = ' . $cuID, false);



//Insert record
if($cuID > 0) query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 8, "", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Success
showResult('lo.result(0);');
?>
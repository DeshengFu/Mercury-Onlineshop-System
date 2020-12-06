<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('ainclude.inc.php');



//Check the administrator
fastCheck('', 0);



//Clear cookie
setcookie('user', '', 0, '/', $siteServer);



//Update administrator's information
query('Update `' . $sitePosition . '.User` set `CookiePass` = "" where `ID` = ' . $adminID, false);



//Insert log
query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 8, "", ' . $adminID . ', ' . $adminIP . ', ' . $currTime . ')', false);



//Success
fastResult('main.result(3);');
?>
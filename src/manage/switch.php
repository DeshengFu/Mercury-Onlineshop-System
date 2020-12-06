<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('ainclude.inc.php');



//Check the page
$page = basename(strtok($_SERVER['REQUEST_URI'], '?'), '.php');
if(!array_key_exists($page, $feature)) exit;



//Get the information
$adminInfo = getVars('user', $_COOKIE);
$siteLevel = intval(getcookiekey('siteLevel', $adminInfo));
if($siteLevel == 0) showResult('main.login();');



//Get the page
$levelArr = $feature[$page]['level'];
for($i = count($levelArr) - 1; $i >= 0; $i--)
{
	if(in_array($siteLevel - 1, array_slice($levelArr[$i], 2)))
	{
		require($page . '.l' . $i . '.php');
		break;
	}
}
exit;
?>
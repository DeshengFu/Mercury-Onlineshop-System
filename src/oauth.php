<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');
require('oauth.inc.php');



//Get the type
$type = intval(getVars('type', $_GET));
if($type < 0 || $type > 1) exit;



//Get the name
$name = getVars('name', $_GET);
if($name == '' || !isset($oauth[$name])) exit;



//Get the page
$page = getVars('page', $_GET);
if(strlen($page) > 31) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Uninitialize
uninitialize();



//Redirect
header('Location: ' . $oauth[$name]['authurl'] . '?client_id=' . rawurlencode($siteSetting[$oauth[$name]['id']]) . '&scope=' . $oauth[$name]['scope'] . '&state=' . rawurlencode($name . '$' . $page));
exit;
?>
<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');
require('oauth.inc.php');



//Get the name & page
$state = explode('$', getVars('state', $_GET));
$name = $state[0];
$page = $state[1];
if($name == '' || !isset($oauth[$name]) || strlen($page) > 31) exit;



//Get information
$code = getVars('code', $_GET);
if($code == '') exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 1 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['iaccessLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['iaccessLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['iaccessTime'] * $gsetting['iaccessLimit']) showResult('li.result(1);');//----



//Append




//Uninitialize
uninitialize();



//Get the resource
$cu = curl_init($oauth[$name]['tokenurl'] . '?client_id=' . rawurlencode($siteSetting[$oauth[$name]['id']]) . '&client_secret=' . rawurlencode($siteSetting[$oauth[$name]['secret']]) . '&code=' . rawurlencode($code));
curl_setopt($cu, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($cu);

$token = $oauth[$name]['tokenfun']($response);
if($token == '') exit;

$cu = curl_init($oauth[$name]['apiurl']);
curl_setopt($cu, CURLOPT_RETURNTRANSFER, true);
$headers = array('Authorization: token ' . $token, 'User-Agent: ' . $siteSetting[$oauth[$name]['agent']]);
curl_setopt($cu, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($cu);
$resource = $oauth[$name]['apifun']($response);

//Get Resource as a function, integrated to include

//Require extra files
//if($oauth[$name]['type'] == 0) require('register.oauth.php');
//if($oauth[$name]['type'] == 1) require('login.oauth.php');
var_dump($resource);
?>
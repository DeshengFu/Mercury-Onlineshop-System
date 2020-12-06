<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');
require('oauth.inc.php');



//Get the name
$name = getVars('state', $_GET);
if($name == '' || !isset($oauth[$name])) exit;



//Get information
$code = getVars('code', $_GET);
if($code == '') exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Get the resource
$siteSetting[11] = 'aa1b90a0c324727ab1a1';
$siteSetting[12] = '187d143e9e02d22bae58b4fe38f073349dda53de';
$resource = getResource($name, $code, $setting);
//807396425053-n02ij639475kem93odubpmfp8fkuhssc.apps.googleusercontent.com|9BYazrr21f20B8qq5Gjfh_58


//Uninitialize
uninitialize();



var_dump($resource);
echo 'OK';
?>
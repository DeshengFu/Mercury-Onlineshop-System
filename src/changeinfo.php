<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$address = strtr(getVars('address', $_POST), $arrEncodeHTML);
if(mb_strlen($address) > 4095) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 7) showResult('');
if($cuID == 0) showResult('ci.result(1);');



//Get the address
$rs = query('Select `Address` from `' . $sitePosition . '.UserE` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null) showResult('');
$cAddress = explode(chr(10), $rsInfo[0]);
$address = $cAddress[0] . chr(10) . (trim($cAddress[0]) != '' ? '' : ($cAddress[1] . chr(10))) . $address;



//Update the user
query('Update `' . $sitePosition . '.UserE` set `Address` = "' . escapeStr($address) . '" where `UserID` = ' . $cuID, false);



//Insert the record
query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 24, "", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Success
showResult('ci.result(0);');
?>
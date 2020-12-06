<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0 || ($cuState & 2) > 0) showResult('ra.result(2);');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 4 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['ireactLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['ireactLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['ireactTime'] * $gsetting['ireactLimit']) showResult('ra.result(1);');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 4 and `Parameter` = ' . $cuID . ' order by `AccessTime` desc limit ' . $gsetting['ureactLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['ureactLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['ureactTime'] * $gsetting['ureactLimit']) showResult('ra.result(1);');



//Update the state
query('Insert into `system.Access` values (NULL, 4, ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the record
query('Insert into `' . $sitePosition . '.Record` values (NULL, 10, "", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Insert the mail information
$emailPass = getRandomCode(16);
query('Delete from `' . $sitePosition . '.Email` where `UserID` = ' . $cuID . ' and `Type` = 0', false);
query('Insert into `' . $sitePosition . '.Email` values (NULL, ' . $cuID . ', 0, "' . $emailPass . '", ' . ($currTime + $gsetting['evalidTime'] * 60) . ', "")', false);
$ID = insertID();



//Require extra files
require('mail.inc.php');
require('funmail.inc.php');



//Prepare the mail
$mail = prepareFunMail('', $cuEmail, array(), $siteSetting[5], array('%SITEURL%' => $siteServer, '%VALIDTIME%' => $gsetting['evalidTime'], '%CODE%' => $ID . '-' . $emailPass), 1);



//Uninitialize
uninitialize();



//Send the mail
if($mail !== null) sendMail($mail);



//Success
echo 'ra.result(0);';
?>
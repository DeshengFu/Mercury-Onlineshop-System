<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$code = strtr(getVars('code', $_POST), $arrEncodeHTML);
if($code == '' || mb_strlen($code) > 32) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 5 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['codeLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['codeLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['codeTime'] * $gsetting['codeLimit']) showResult('cti.result(2);');



//Update the state
query('Insert into `system.Access` values (NULL, 5, ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Get the ticket
$rs = query('Select `ID`, `State`, `InsertTime`, `UpdateTime`, `Price`, `StartTime`, `EndTime` from `' . $sitePosition . '.Ticket` where `Code` = "' . escapeStr($code) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[1] == 0) showResult('cti.result(1);');
$ID = $rsInfo[0];
$lastTime = $rsInfo[3] > $rsInfo[2] ? $rsInfo[2] : 0;
$price = $rsInfo[4];
$startTime = $rsInfo[5];
$endTime = $rsInfo[6];



//Success
showResult('cti.result(0, "' . $ID . '$' . $lastTime . '$' . $price . '$' . $startTime . '$' . $endTime . '");');
?>
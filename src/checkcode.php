<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$code = strtr(getVars('code', $_POST), $arrEncodeHTML);
if($code == '' || mb_strlen($code) > 32) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 5) showResult('');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 5 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['codeLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['codeLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['codeTime'] * $gsetting['codeLimit']) showResult('cco.result(2);');



//Update the state
query('Insert into `system.Access` values (NULL, 5, ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Get the pass
$rs = query('Select O.`Title`, O.`SubTitle`, O.`State`, C.`ID`, C.`OrderID`, C.`StartTime`, C.`EndTime` from `' . $sitePosition . '.Code` C inner join `' . $sitePosition . '.Coupon` O on C.`CouponID` = O.`ID` where C.`Code` = "' . escapeStr($code) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[2] == 0) showResult('cco.result(1);');
$title = $rsInfo[0];
$subTitle = $rsInfo[1];
$ID = $rsInfo[3];
$state = $rsInfo[4] > 0 ? 1 : 0;
$startTime = $rsInfo[5];
$endTime = $rsInfo[6];



//Success
showResult('cco.result(0, "' . $ID . '$' . $title . '$' . $subTitle . '$' . $state . '$' . $startTime . '$' . $endTime . '");');
?>
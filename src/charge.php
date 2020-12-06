<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$pass = strtr(getVars('pass', $_POST), $arrEncodeHTML);
if($pass == '' || mb_strlen($pass) > 32) exit;



//Initialize
if(!initialize() || $cuID == 0) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('chg.result(2);');



//Check the state
$rs = query('Select count(*), min(`AccessTime`) from `system.Access` where `Type` = 5 and `AccessIP` = ' . $cuIP . ' order by `AccessTime` desc limit ' . $gsetting['codeLimit'], false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if(intval($rsInfo[0]) >= $gsetting['codeLimit'] && intval($rsInfo[1]) >= $currTime - $gsetting['codeTime'] * $gsetting['codeLimit']) showResult('chg.result(3);');



//Update the state
query('Insert into `system.Access` values (NULL, 5, ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Lock tables
autoCommitTra(false);
query('Lock tables `' . $sitePosition . '.Voucher` read, `' . $sitePosition . '.Pass` write, `' . $sitePosition . '.User` write', false);



//Get the user
$rs = query('Select `Balance` from `' . $sitePosition . '.User` where `ID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null)
{
	query('Unlock tables', false);
	showResult('');
}
$balance = $rsInfo[0];



//Get the pass
$rs = query('Select `ID`, `VoucherID`, `UserID`, `StartTime`, `EndTime` from `' . $sitePosition . '.Pass` where `Pass` = "' . escapeStr($pass) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[2] > 0 || $currTime < $rsInfo[3] || $currTime > $rsInfo[4])
{
	query('Unlock tables', false);
	showResult('chg.result(1);');
}
$passID = $rsInfo[0];
$voucherID = $rsInfo[1];



//Get the voucher
$rs = query('Select `State`, `Price` from `' . $sitePosition . '.Voucher` where `ID` = ' . $voucherID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null || $rsInfo[0] == 0 || abs($rsInfo[1] + $balance) > PHP_INT_MAX)
{
	query('Unlock tables', false);
	showResult('chg.result(1);');
}
$price = $rsInfo[1];



//Update the pass
query('Update `' . $sitePosition . '.Pass` set `UserID` = ' . $cuID . ' where `ID` = ' . $passID, false);



//Update the user
query('Update `' . $sitePosition . '.User` set `Balance` = ' . ($balance + $price) . ' where `ID` = ' . $cuID, false);



//Unlock tables
commitTra();
query('Unlock tables', false);
autoCommitTra(true);



//Insert the record
query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 33, "' . $passID . '|' . $price . '", ' . $cuID . ', ' . $cuIP . ', ' . $currTime . ')', false);



//Success
showResult('chg.result(0);');
?>
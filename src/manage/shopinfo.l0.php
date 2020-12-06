<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Buffer the page
if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $currTime - 600)
{
	header('HTTP/1.0 304 Not Modified');
	exit;
}
else
	header('Cache-control: public, max-age=600');



//Check the account
fastCheck('shopinfo', 0);



//Get the information of the site
$rs = query('Select `Setting` from `system.Site` where `ID` = ' . $siteID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null) fastResult('');
$setting = explode('|', $rsInfo[0]);



//Get the information of the shop
$rs = query('Select * from `' . $sitePosition . '.Shop` where `ID` = ' . $shopID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null) fastResult('');
$name = $rsInfo[1];
$email = $rsInfo[2];
$state = $rsInfo[3];
$sold = $rsInfo[4];
$posEval = $rsInfo[5];
$negEval = $rsInfo[6];
$registerTime = $rsInfo[9];
$updateTime = $rsInfo[10];
$orderTime = $rsInfo[11];
$accessTime = $rsInfo[12];
$balance = $rsInfo[13];
$point = $rsInfo[14];



//Get the list of benchmarks
$benchmark = array();
$benchmark['benchmark.time'] = $currTime;
$timeAdj = count($setting) > 3 ? intval($setting[3]) : 0;
$dtz = new DateTimeZone(($timeAdj >= 0 ? '+' : '-') . sprintf('%02d', floor(abs($timeAdj) / 3600)) . sprintf('%02d', floor((abs($timeAdj) % 3600) / 60)));
$dt = new DateTime('first day of this month 00:00', $dtz);
$startTime = $currTime;
for($i = 0; $i < 13; $i++)
{
	$endTime = $startTime;
	$startTime = $dt->getTimestamp();
	$rs = query('Select sum(`Num`), sum(`Price` * `Num`) from `' . $sitePosition . '.TransactionV` where `ShopID` = ' . $shopID . ' and `InsertTime` >= ' . $startTime . ' and `InsertTime` < ' . $endTime, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	$benchmark['benchmark.sale.t' . $i] = intval($rsInfo[0]);
	$benchmark['benchmark.sale.s' . $i] = intval($rsInfo[1]);
	$dt->modify('-1 month');
}



//Disconnect from database
disconnectDB();



//Show the page
foreach($benchmark as $sname => $value) echo $sname . ' = ' . $value . '; ';
showResult('shop.main({id: ' . $shopID . ', name: "' . strtr($name, $arrEncodeJS) . '", email: "' . strtr($email, $arrEncodeJS) . '", state: ' . $state . ', sold: ' . $sold . ', posEval: ' . $posEval . ', negEval: ' . $negEval . ', registerTime: ' . $registerTime . ', updateTime: ' . $updateTime . ', orderTime: ' . $orderTime . ', accessTime: ' . $accessTime . ', balance: ' . $balance . ', point: ' . $point . ', timeAdj:' . $timeAdj . '});');
?>
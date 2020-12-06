<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('user.result(0);');



//Get the information of the user
if($siteLevel < 7)
{
	$rs = query('Select * from `' . $sitePosition . '.User` where `ID` = ' . $cuID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null) showResult('user.result(0);');
	$email = $rsInfo[1];
	$state = $rsInfo[3];
	$registerTime = $rsInfo[4];
	$updateTime = $rsInfo[5];
	$orderTime = $rsInfo[6];
	$accessTime = $rsInfo[7];
	$balance = $rsInfo[8];
	$point = $rsInfo[9];
}
else
{
	$rs = query('Select * from `' . $sitePosition . '.UserV` where `ID` = ' . $cuID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null) showResult('user.result(0);');
	$email = $rsInfo[1];
	$state = $rsInfo[2];
	$registerTime = $rsInfo[3];
	$updateTime = $rsInfo[4];
	$orderTime = $rsInfo[5];
	$accessTime = $rsInfo[6];
	$balance = $rsInfo[7];
	$point = $rsInfo[8];
	$type = $rsInfo[12];
	$birthday = $rsInfo[13];
	$address = $rsInfo[14];
}
$isMaster = 0;
if($siteLevel > 4)
{
	$rs = query('Select count(*) from `' . $sitePosition . '.Master` where `UserID` = ' . $cuID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if(intval($rsInfo[0]) > 0) $isMaster = 1;
}



//Get the information
$i = 0;
$recordStr = array();
$rs = query('Select * from `' . $sitePosition . '.UserRecord` where `UserID` = ' . $cuID . ' order by `InsertTime` desc limit 5', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;

	$recordStr[] = '[' . $rsInfo[0] . ', ' . $rsInfo[1] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[4] . ', ' . $rsInfo[5] . ']';
	$i++;
}
freeResult($rs);



//Uninitialize
uninitialize();



//Show the page
if($siteLevel < 7)
	echo 'user.main({id: ' . $cuID . ', email: "' . strtr($email, $arrEncodeJS) . '", state: ' . $state . ', registerTime: "' . $registerTime . '", updateTime: "' . $updateTime . '", orderTime: ' . $orderTime . ', accessTime: ' . $accessTime . ', balance: ' . $balance . ', point: ' . $point . ', isMaster: ' . $isMaster . '}, [' . implode(',', $recordStr) . ']);';
else
	echo 'user.main({id: ' . $cuID . ', email: "' . strtr($email, $arrEncodeJS) . '", state: ' . $state . ', registerTime: "' . $registerTime . '", updateTime: "' . $updateTime . '", orderTime: ' . $orderTime . ', accessTime: ' . $accessTime . ', balance: ' . $balance . ', point: ' . $point . ', isMaster: ' . $isMaster . ', type: ' . $type . ', birthday: ' . $birthday . ', address: "' . strtr($address, $arrEncodeJS) . '"}, [' . implode(',', $recordStr) . ']);';
?>
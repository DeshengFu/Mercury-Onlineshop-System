<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the input
$page = intval(getVars('page', $_GET));
if($page < 1) $page = 1;
$size = 50;



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');
if($cuID == 0) showResult('addr.result(1);');



//Count the records
$rs = query('Select count(*) from `' . $sitePosition . '.Address` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$record = intval($rsInfo[0]);
$count = ceil($record / $size);
if($page > $count) $page = $count;



//Get the information
$i = 0;
$addressStr = array();
if($page > 0)
{
	$rs = query('Select * from `' . $sitePosition . '.Address` where `UserID` = ' . $cuID . ' order by `ID` desc limit ' . (($page - 1) * $size) . ', ' . $size, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;

		$addressStr[] = 'addr.drawElem(' . $i . ', ' . $rsInfo[0] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[3] . ', ' . $rsInfo[4] . ');';
		$i++;
	}
	freeResult($rs);
}
else
	$addressStr[0] = 'addr.drawEmpty();';



//Uninitialize
uninitialize();



//Show the page
echo 'addr.page = ' . $page . ', addr.record = ' . $record . ', addr.count = ' . $count . ';';
echo 'addr.drawTop();';
echo implode('', $addressStr);
echo 'addr.drawBottom();';
?>
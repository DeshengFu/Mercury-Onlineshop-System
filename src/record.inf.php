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
if($cuID == 0) showResult('rec.result(0);');



//Count the records
$rs = query('Select count(*) from `' . $sitePosition . '.UserRecord` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$record = intval($rsInfo[0]);
$count = ceil($record / $size);
if($page > $count) $page = $count;



//Get the information
$i = 0;
$recordStr = array();
if($page > 0)
{
	$rs = query('Select * from `' . $sitePosition . '.UserRecord` where `UserID` = ' . $cuID . ' order by `ID` desc limit ' . (($page - 1) * $size) . ', ' . $size, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;

		$recordStr[] = 'rec.drawElem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[4] . ', ' . $rsInfo[5] . ');';
		$i++;
	}
	freeResult($rs);
}
else
	$recordStr[0] = 'rec.drawEmpty();';



//Uninitialize
uninitialize();



//Show the page
echo 'rec.page = ' . $page . ', rec.record = ' . $record . ', rec.count = ' . $count . ';';
echo 'rec.drawTop();';
echo implode('', $recordStr);
echo 'rec.drawBottom();';
?>
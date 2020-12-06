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
if($siteLevel < 5) showResult('');
if($cuID == 0) showResult('sup.result(1);');



//Count the records
$rs = query('Select count(*) from `' . $sitePosition . '.Support` where `UserID` = ' . $cuID, false);
$rsInfo = fetchRow($rs);
freeResult($rs);
$record = intval($rsInfo[0]);
$count = ceil($record / $size);
if($page > $count) $page = $count;



//Get the information
$i = 0;
$supportStr = array();
if($page > 0)
{
	$rs = query('Select S.*, H.`Name` from `' . $sitePosition . '.Support` S left join `' . $sitePosition . '.Shop` H on S.`ShopID` = H.`ID` where S.`UserID` = ' . $cuID . ' order by S.`ID` desc limit ' . (($page - 1) * $size) . ', ' . $size, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;

		$supportStr[] = 'sup.drawElem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '");';
		$i++;
	}
	freeResult($rs);
}
else
	$supportStr[0] = 'sup.drawEmpty();';



//Uninitialize
uninitialize();



//Show the page
echo 'sup.page = ' . $page . ', sup.record = ' . $record . ', sup.count = ' . $count . ';';
echo 'sup.drawTop();';
echo implode('', $supportStr);
echo 'sup.drawBottom();';
?>
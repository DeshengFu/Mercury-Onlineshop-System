<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get article's ID
$ID = intval($_SERVER['QUERY_STRING']);
if($ID < 1 || $ID > 2147483647) exit;



//Initialize
if(!initialize()) exit;
if($siteLevel < 4) showResult('');



//Get the information

$rs = query('Select `CatalogID`, `Service`, `Price`, `Tax`, `Weight`, `Sold`, `PosEval`, `NegEval`, `Description` from `' . $sitePosition . '.Article` where `ID` = ' . $ID . ' and `State` > 0', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null) showResult('');
$catalogID = $rsInfo[0];
$service = $rsInfo[1];
$price = $rsInfo[2];
$tax = $rsInfo[3];
$weight = $rsInfo[4];
$sold = $rsInfo[5];
$posEval = $rsInfo[6];
$negEval = $rsInfo[7];
$description = $rsInfo[8];

$layer = array(0 => 0);
$catalogArr = array();
$rs = query('Select `ID`, `CatalogID`, `Name`, `State` from `' . $sitePosition . '.Catalog` order by `ShowID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	if(!isset($layer[$rsInfo[1]]) || $rsInfo[3] == 0) continue;
	$layer[$rsInfo[0]] = $layer[$rsInfo[1]] + 1;
	$catalogArr[$layer[$rsInfo[0]]] = $rsInfo[0] . '$' . strtr($rsInfo[2], $arrEncodeJS);
	if($rsInfo[0] == $catalogID) break;
}
freeResult($rs);
if(!isset($layer[$catalogID])) showResult('');
$catalogArr = array_slice($catalogArr, 0, $layer[$catalogID]);

$serviceArr = array();
$rs = query('Select `Index`, `Name` from `' . $sitePosition . '.Service` order by `Index`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$serviceArr[] = $rsInfo[0] . '$' . strtr($rsInfo[1], $arrEncodeJS);
}
freeResult($rs);

if($siteLevel > 4)
{
	$flagArr = array();
	$rs = query('Select `Index`, `Name` from `' . $sitePosition . '.Flag` order by `Index`', false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		$flagArr[] = $rsInfo[0] . '$' . strtr($rsInfo[1], $arrEncodeJS);
	}
	freeResult($rs);
}

$itemStr = array();
$rs = query('Select `ID`, `Name`, `Description` from `' . $sitePosition . '.Item` where `ArticleID` = ' . $ID . ' order by `ShowID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$itemStr[] = 'art.drawItem(' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '", "' . strtr($rsInfo[2], $arrEncodeJS) . '");';
}
freeResult($rs);

$pageStr = array();
if($description != '')
{
	$rs = query('Select `ID` from `' . $sitePosition . '.Static` where `Index` = "' . escapeStr($description) . '"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	$ID = $rsInfo === null ? 0 : $rsInfo[0];

	$rs = query('Select `ID`, `Title`, `Content` from `' . $sitePosition . '.Page` where `StaticID` = ' . $ID . ' order by `ShowID`', false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		$pageStr[] = 'art.drawPage(' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '", "' . strtr($rsInfo[2], $arrEncodeJS) . '");';
	}
	freeResult($rs);
}



//Uninitialize
uninitialize();



//Show the page
echo 'art.main(' . $ID . ', ' . $service . ', ' . $price . ', ' . $tax . ', ' . $weight . ', ' . $sold . ', ' . $posEval . ', ' . $negEval . ', "' . implode('|', $catalogArr) . '", "' . implode('|', $serviceArr) . '"' . ($siteLevel > 4 ? (', "' . implode('|', $flagArr) . '"') : '') . ');';
echo implode('', $itemStr);
echo implode('', $pageStr);
echo 'art.close();';
?>
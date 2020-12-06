<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Define the index
$index = basename($_SERVER['REQUEST_URI'], '.php');
if($index == '') exit;



//Initialize
if(!initialize()) exit;



//Get the information
$drawStr = array();

$rs = query('Select `ID`, `Name` from `' . $sitePosition . '.Static` where `Index` = "' . escapeStr($index) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null)
{
	header('HTTP/1.0 404 Not Found');
	uninitialize();
	exit;
}
$drawStr[] = '<div id="pg.index">' . $index . '</div>';
$drawStr[] = '<div id="pg.name">' . $rsInfo[1] . '</div>';
$ID = $rsInfo[0];
$name = $rsInfo[1];

$pageStr = array();
$i = 0;
$rs = query('Select `ID`, `Title`, `Content` from `' . $sitePosition . '.Page` where `StaticID` = ' . $ID . ' order by `ShowID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;

	$drawStr[] = '<div id="pg.tit_' . $i . '">' . $rsInfo[1] . '</div>';
	$drawStr[] = '<div id="pg.con_' . $i . '">' . $rsInfo[2] . '</div>';
	$pageStr[] = 'pg.drawPage(' . $rsInfo[0] . ', inf.pg.getTitle(' . $i . '), inf.pg.getContent(' . $i . '));';
	$i++;
}
freeResult($rs);



//Uninitialize
uninitialize();



//Show the page
writeHeader($name);
echo implode('', $drawStr);
echo '<script type="application/javascript" src="' . $tmplPath . '/page.js"></script>';
echo '<script type="application/javascript">';
echo 'pg.index = inf.pg.getIndex(), pg.name = inf.pg.getName();';
echo 'pg.drawTop();';
echo implode('', $pageStr);
echo 'pg.drawBottom();';
echo '</script>';
writeFooter();
?>
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
$drawStr = array();

$title = '';
$i = 0;
$rs = query('Select `ID`, `Title`, `SubTitle`, `Name`, `SubName`, `Code`, `Icon` from `' . $sitePosition . '.Article` where `LinkID` = ' . $ID . ' and `State` > 0', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	if($rsInfo[0] == $ID) $title = $rsInfo[1];
	
	$drawStr[] = '<div id="art.id_' . $i . '">' . $rsInfo[0] . '</div>';
	$drawStr[] = '<div id="art.tit_' . $i . '">' . $rsInfo[1] . '</div>';
	$drawStr[] = '<div id="art.subtit_' . $i . '">' . $rsInfo[2] . '</div>';
	$drawStr[] = '<div id="art.name_' . $i . '">' . $rsInfo[3] . '</div>';
	$drawStr[] = '<div id="art.subname_' . $i . '">' . $rsInfo[4] . '</div>';
	$drawStr[] = '<div id="art.code_' . $i . '">' . $rsInfo[5] . '</div>';
	if($icon != '') $drawStr[] = '<img id="art.icon_' . $i . '" src="files/a.' . $rsInfo[6] . '"/>';
	$i++;
}
freeResult($rs);
if($title == '')
{
	header('HTTP/1.0 404 Not Found');
	uninitialize();
	exit;
}

$i = 0;
$rs = query('Select I.`ID`, I.`ArticleID`, I.`Name`, I.`File` from `' . $sitePosition . '.Article` A inner join `' . $sitePosition . '.Image` I on I.`ArticleID` = A.`ID` where A.`LinkID` = ' . $ID . ' and A.`State` > 0 order by I.`ArticleID`, I.`ShowID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$drawStr[] = '<div id="art.iid_' . $i . '">' . $rsInfo[0] . '</div>';
	$drawStr[] = '<div id="art.iarticle_' . $i . '">' . $rsInfo[1] . '</div>';
	$drawStr[] = '<div id="art.iname_' . $i . '">' . $rsInfo[2] . '</div>';
	$drawStr[] = '<img id="art.ifile_' . $i . '" src="files/a.' . $rsInfo[3] . '"/>';
	$i++;
}
freeResult($rs);



//Uninitialize
uninitialize();



//Show the page
writeHeader($title);
echo implode('', $drawStr);
echo '<script type="application/javascript" src="' . $tmplPath . '/article.js"></script>';
echo '<script type="application/javascript">';
echo 'inf.art.initialize(' . $ID . ');';
echo '</script>';
writeFooter();
?>
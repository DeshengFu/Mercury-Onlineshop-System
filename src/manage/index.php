<?php
require('conf.inc.php');
require('ginclude.inc.php');



//Connect to database
connectDB();



//Get the site
$rs = query('Select `Level` from `system.Site` where `Host` = "' . escapeStr($_SERVER['SERVER_NAME']) . '"', false);
$rsInfo = fetchRow($rs);
freeResult($rs);
if($rsInfo === null) exit;
$tlevel = $rsInfo[0];



//Disconnect from database
disconnectDB();



//Get the list of scripts
/*
$arr = array();
foreach($feature as $page => $info)
{
	$levelArr = $info['level'];
	$slevel = 0;
	foreach($levelArr as $level => $linfo)
	{
		if(in_array($tlevel - 1, array_slice($linfo, 2)))
		{
			$slevel = $level + 1;
			break;
		}
	}
	for($i = 0; $i < $slevel; $i++) $arr[] = $page . '.l' . $i;
}
*/



//Show the page
echo '<!DOCTYPE HTML><html lang="' . $language . '">';
echo '<head><meta charset="' . $charSetHTML . '"/></head>';
echo '<body><script type="application/javascript" src="admin/loader.js"></script><script type="application/javascript">loader.loadx("' . $language . '", ' . $tlevel . ', "' . $version . '");</script></body>';
//echo '<body><script type="application/javascript" src="admin/loader.js"></script><script type="application/javascript">loader.load("' . $language . '", ' . $flevel . ', "' . implode(',', $arr) . '", "' . $version . '");</script></body>';
echo '</html>';
?>
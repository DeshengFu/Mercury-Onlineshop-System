<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the file
$file = basename(strtok(strval($_SERVER['REQUEST_URI']), '?'));
if(strlen($file) > 31)
{
	header('HTTP/1.0 404 Not Found');
	exit;
}



//Create the path
if(!file_exists($gsetting['filePath'] . $siteServer)) mkdir($gsetting['filePath'] . $siteServer);



//Initialize
if(!initialize())
{
	header('HTTP/1.0 404 Not Found');
	exit;
}



//Buffer files

$key = substr($file, 0, 2);
if($key == 'a.')
{
	$rs = query('Select `Data` from `' . $sitePosition . '.Image` where `File` = "' . escapeStr(substr($file, 2)) . '"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null)
	{
		header('HTTP/1.0 404 Not Found');
		uninitialize();
		exit;
	}
	file_put_contents($gsetting['filePath'] . $siteServer . '/' . $file, $rsInfo[0], LOCK_EX);
}
else if($key == 's.')
{
	$rs = query('Select `Data` from `' . $sitePosition . '.Picture` where `File` = "' . escapeStr(substr($file, 2)) . '"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null)
	{
		header('HTTP/1.0 404 Not Found');
		uninitialize();
		exit;
	}
	file_put_contents($gsetting['filePath'] . $siteServer . '/' . $file, $rsInfo[0], LOCK_EX);
}
else if($key == 'd.')
{
	$rs = query('Select `Data` from `' . $sitePosition . '.Document` where `File` = "' . escapeStr(substr($file, 2)) . '"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null)
	{
		header('HTTP/1.0 404 Not Found');
		uninitialize();
		exit;
	}
	file_put_contents($gsetting['filePath'] . $siteServer . '/' . $file, $rsInfo[0], LOCK_EX);
}
else
{
	header('HTTP/1.0 404 Not Found');
	uninitialize();
	exit;
}



//Uninitialize
uninitialize();



//Redirect
header('Location: ' . $file);
die;
?>
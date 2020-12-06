<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;



//Clear the buffer
query('Update `' . $sitePosition . '.Variable` set `Value` = 0 where `Name` = "refresh.file"', false);
$result = affectedRows() > 0;



//Refresh the buffer
if($result && file_exists($gsetting['filePath'] . $siteServer))
{
	//Get the update time
	$rs = query('Select `Value` from `' . $sitePosition . '.Variable` where `Name` = "refresh.file.time"', false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null) exit;
	$time = $rsInfo[0] - $gsetting['guardTime'];
	
	//Unlink documents
	$rs = query('Select `File` from `' . $sitePosition . '.Document` where `UpdateTime` > ' . $time, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		unlink($gsetting['filePath'] . $siteServer . '/d.' . $rsInfo[0]);	
	}
	freeResult($rs);

	//Unlink images
	$rs = query('Select `File` from `' . $sitePosition . '.Image` where `UpdateTime` > ' . $time, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		unlink($gsetting['filePath'] . $siteServer . '/a.' . $rsInfo[0]);	
	}
	freeResult($rs);

	//Unlink documents
	$rs = query('Select `File` from `' . $sitePosition . '.Picture` where `UpdateTime` > ' . $time, false);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;
		unlink($gsetting['filePath'] . $siteServer . '/s.' . $rsInfo[0]);	
	}
	freeResult($rs);

	//Updsate the update time
	query('Update `' . $sitePosition . '.Variable` set `Value` = ' . $currTime . ' where `Name` = "refresh.file.time"', false);
}



//Uninitialize
uninitialize();



//Success
echo 'OK';
?>
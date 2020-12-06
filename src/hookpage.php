<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;



//Clear the buffer
query('Update `' . $sitePosition . '.Variable` set `Value` = 0 where `Name` = "refresh.page"', false);
$result = affectedRows() > 0;



//Uninitialize
uninitialize();



//Delete the buffer
if($result && file_exists($gsetting['pagePath'] . $siteServer))
{
	$res = glob($gsetting['pagePath'] . $siteServer . '/*');
	if($res !== false) array_map('unlink', $res);
}



//Success
echo 'OK';
?>
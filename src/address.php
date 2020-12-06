<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;
if($siteLevel < 3) showResult('');



//Uninitialize
uninitialize();



//Write the frame
writeHeader('');
echo '<script type="application/javascript" src="' . $tmplPath . '/address.js"></script>';
echo '<script type="application/javascript">';
echo 'addr.initialize();';
echo '</script>';
writeFooter();
?>
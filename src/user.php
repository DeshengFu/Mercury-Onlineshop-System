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
echo '<script type="application/javascript" src="' . $tmplPath . '/user.js"></script>';
echo '<script type="application/javascript">';
echo 'user.initialize();';
echo '</script>';
writeFooter();
?>
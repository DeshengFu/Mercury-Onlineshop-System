<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Initialize
if(!initialize()) exit;
if($siteLevel < 5) showResult('');



//Uninitialize
uninitialize();



//Write the frame
writeHeader('');
echo '<script type="application/javascript" src="' . $tmplPath . '/support.js"></script>';
echo '<script type="application/javascript">';
echo 'sup.initialize();';
echo '</script>';
writeFooter();
?>
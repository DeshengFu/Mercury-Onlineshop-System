<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Modify the level and call the page
$levelArr = $feature['order']['level'];
$feature['order']['level'][0] = array_merge($levelArr[0], array_slice($levelArr[1], 2));

require('order.l0.php');
?>
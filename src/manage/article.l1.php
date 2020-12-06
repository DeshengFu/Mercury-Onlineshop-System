<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Modify the level and call the page
$levelArr = $feature['article']['level'];
$feature['article']['level'][0] = array_merge($levelArr[0], array_slice($levelArr[1], 2));

require('article.l0.php');
?>
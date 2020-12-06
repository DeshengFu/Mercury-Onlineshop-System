<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get the list of scripts
for($b = 0; $b < 8; $b++)
{
	$marr = array();
	$larr = array();

	$marr[] = file_get_contents('./admin/main.js');
	$marr[] = file_get_contents('./admin/main.l0.js');
	$marr[] = file_get_contents('./admin/main.l1.js');
	$larr[] = file_get_contents('./admin/lan.' . $language . '.js');
	$larr[] = file_get_contents('./admin/lan.l0.' . $language . '.js');
	$larr[] = file_get_contents('./admin/lan.l1.' . $language . '.js');
	for($i = 0; $i < 8; $i++) $larr[] = file_get_contents('./admin/level.l' . $i . '.' . $language . '.js');

	foreach($feature as $page => $info)
	{
		$levelArr = $info['level'];
		$slevel = 0;
		foreach($levelArr as $level => $linfo)
		{
			if(in_array($b, array_slice($linfo, 2)))
			{
				$slevel = $level + 1;
				break;
			}
		}
		for($i = 0; $i < $slevel; $i++)
		{
			$marr[] = file_get_contents('./' . $page . '.l' . $i . '/main.js');
			$larr[] = file_get_contents('./' . $page . '.l' . $i . '/lan.' . $language . '.js');
		}
	}
	file_put_contents('./release/main.l' . $b . '.js', implode("\n\n\n\n\n\n\n\n\n\n", $marr));
	file_put_contents('./release/lan.l' . $b . '.' . $language . '.js', implode("\n\n\n\n\n\n\n\n\n\n", $larr));
}
?>
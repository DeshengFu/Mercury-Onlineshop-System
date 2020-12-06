<?php
$map = array(0, 6, 6, 3, 9, 9, 1, 5, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'O.`ID` >= ' . $data[0] . ' and O.`ID` <= ' . $data[1];
		case 1: return 'O.`ArticleID` = ' . $data;
		case 2: return 'O.`TargetID` = ' . $data;
		case 3: return '(O.`Flag` & ' . (1 << $data) . ') > 0';
		case 4: return 'O.`Discount` >= ' . $data[0] . ' and O.`Discount` <= ' . $data[1];
		case 5: return 'O.`Price` >= ' . $data[0] . ' and O.`Price` <= ' . $data[1];
		case 6: return 'O.`Inventory` >= ' . $data[0] . ' and O.`Inventory` <= ' . $data[1];
		case 7: return 'O.`StartTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 8: return 'O.`EndTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
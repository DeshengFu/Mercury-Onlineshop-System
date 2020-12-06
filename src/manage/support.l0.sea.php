<?php
$map = array(0, 6, 3, 3, 5, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'S.`ID` >= ' . $data[0] . ' and S.`ID` <= ' . $data[1];
		case 1: return 'S.`UserID` = ' . $data;
		case 2: return 'S.`UserID` ' . ($data == 0 ? '>' : '=') . ' 0';
		case 3: return 'S.`State` = ' . ($data == 0 ? 0 : 1);
		case 4: return 'S.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 5: return 'S.`UpdateTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
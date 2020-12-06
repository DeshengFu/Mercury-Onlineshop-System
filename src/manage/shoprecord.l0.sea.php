<?php
$map = array(0, 3, 6, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'R.`ID` >= ' . $data[0] . ' and R.`ID` <= ' . $data[1];
		case 1: return 'R.`Type` = ' . $data;
		case 2: return 'R.`UserID` = ' . $data;
		case 3: return 'R.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
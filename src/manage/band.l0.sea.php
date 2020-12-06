<?php
$map = array(0, 6, 6, 3, 5, 9);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'B.`ID` >= ' . $data[0] . ' and B.`ID` <= ' . $data[1];
		case 1: return 'B.`SourceID` = ' . $data;
		case 2: return 'B.`TargetID` = ' . $data;
		case 3: return 'B.`State` = ' . $data;
		case 4: return 'B.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 5: return 'B.`Flow` >= ' . $data[0] . ' and B.`Flow` <= ' . $data[1];
		default: return '';
	}
}
?>
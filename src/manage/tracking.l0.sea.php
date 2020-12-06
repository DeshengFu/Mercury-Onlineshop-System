<?php
$map = array(0, 6, 3, 4, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'T.`ID` >= ' . $data[0] . ' and T.`ID` <= ' . $data[1];
		case 1: return 'T.`ShipmentID` = ' . $data;
		case 2: return 'T.`Type` = ' . $data;
		case 3: return 'T.`ReferenceID`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 4: return 'T.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
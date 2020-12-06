<?php
$map = array(0, 6, 6, 1, 9, 5, 4, 3);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'S.`ID` >= ' . $data[0] . ' and S.`ID` <= ' . $data[1];
		case 1: return 'S.`OrderID` = ' . $data;
		case 2: return 'S.`InvoiceID` = ' . $data;
		case 3: return 'S.`Num` >= ' . $data[0] . ' and S.`Num` <= ' . $data[1];
		case 4: return 'S.`Sum` >= ' . $data[0] . ' and S.`Sum` <= ' . $data[1];
		case 5: return 'S.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 6: return 'S.`ReferenceID`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 7: return 'S.`Type` = ' . $data;
		default: return '';
	}
}
?>
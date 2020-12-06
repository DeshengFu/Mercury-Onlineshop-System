<?php
$map = array(0, 6, 6, 3, 4, 4, 4, 4, 4, 3, 3, 9, 10, 1, 1, 1, 1, 5, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'A.`ID` >= ' . $data[0] . ' and A.`ID` <= ' . $data[1];
		case 1: return 'A.`LinkID` = ' . $data;
		case 2: return 'A.`CatalogID` = ' . $data;
		case 3: return 'A.`ShowLevel` = ' . $data;
		case 4: return 'A.`Title`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 5: return 'A.`SubTitle`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 6: return 'A.`Name`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 7: return 'A.`SubName`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 8: return 'A.`Code`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 9: return '(A.`Service` & ' . (1 << $data) . ') > 0';
		case 10: return 'A.`State` = ' . $data;
		case 11: return 'A.`Price` >= ' . $data[0] . ' and A.`Price` <= ' . $data[1];
		case 12: return 'A.`Tax` >= ' . $data[0] . ' and A.`Tax` <= ' . $data[1];
		case 13: return 'A.`Weight` >= ' . $data[0] . ' and A.`Weight` <= ' . $data[1];
		case 14: return 'A.`Sold` >= ' . $data[0] . ' and A.`Sold` <= ' . $data[1];
		case 15: return 'A.`PosEval` >= ' . $data[0] . ' and A.`PosEval` <= ' . $data[1];
		case 16: return 'A.`NegEval` >= ' . $data[0] . ' and A.`NegEval` <= ' . $data[1];
		case 17: return 'A.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 18: return 'A.`UpdateTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
<?php
$map = array(0, 6, 2, 5, 5, 4, 4, 4, 4, 4);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'I.`ID` >= ' . $data[0] . ' and I.`ID` <= ' . $data[1];
		case 1: return 'I.`ArticleID` = ' . $data;
		case 2: return 'I.`Num` >= ' . $data[0] . ' and I.`Num` <= ' . $data[1];
		case 3: return 'I.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 4: return 'I.`UpdateTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		case 5: return 'I.`Title`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 6: return 'I.`SubTitle`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 7: return 'I.`Name`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 8:	return 'I.`SubName`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 9: return 'I.`Code`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';	
		default: return '';
	}
}
?>
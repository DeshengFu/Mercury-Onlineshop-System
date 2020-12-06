<?php
$map = array(0, 4, 4);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'S.`ID` >= ' . $data[0] . ' and S.`ID` <= ' . $data[1];
		case 1: return 'S.`Name`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 2: return 'S.`Email`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		default: return '';
	}
}
?>
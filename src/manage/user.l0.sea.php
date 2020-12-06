<?php
$map = array(0, 4);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'U.`ID` >= ' . $data[0] . ' and U.`ID` <= ' . $data[1];
		case 1: return 'U.`Email`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		default: return '';
	}
}
?>
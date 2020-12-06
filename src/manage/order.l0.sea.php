<?php
$map = array(0, 6, 6, 6);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'O.`ID` >= ' . $data[0] . ' and O.`ID` <= ' . $data[1];
		case 1: return 'O.`UserID` = ' . $data;
		case 2: return 'O.`ShopID` = ' . $data;
		case 3: return 'O.`TargetID` = ' . $data;
		default: return '';
	}
}
?>
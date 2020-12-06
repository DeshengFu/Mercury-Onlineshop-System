<?php
//Function: parse price
$searchGetValue[9] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : -PHP_INT_MAX;
	$value2 = is_numeric($data[2]) ? intval($data[2]) : PHP_INT_MAX;
	return array($value1, $value2);
};

//Function: parse tax
$searchGetValue[10] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : -PHP_INT_MAX;
	$value2 = is_numeric($data[2]) ? intval($data[2]) : PHP_INT_MAX;
	return array($value1, $value2);
};
?>
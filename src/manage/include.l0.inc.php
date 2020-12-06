<?php
$searchGetValue = array();

//Function: parse positive range
$searchGetValue[0] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : 1;
	if($value1 < 1) $value1 = 1;
	$value2 = is_numeric($data[2]) ? intval($data[2]) : PHP_INT_MAX;
	if($value2 < 1) $value2 = PHP_INT_MAX;
	return array($value1, $value2);
};

//Function: parse non-negative range
$searchGetValue[1] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : 0;
	if($value1 < 0) $value1 = 0;
	$value2 = is_numeric($data[2]) ? intval($data[2]) : PHP_INT_MAX;
	if($value2 < 0) $value2 = PHP_INT_MAX;
	return array($value1, $value2);
};

//Function: parse integer range
$searchGetValue[2] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : -PHP_INT_MAX;
	$value2 = is_numeric($data[2]) ? intval($data[2]) : PHP_INT_MAX;
	return array($value1, $value2);
};

//Function: parse select
$searchGetValue[3] = function($data)
{
	$value1 = intval($data[1]);
	if($value1 < 0 || $value1 > 4095) $value1 = 0;
	return $value1;
};

//Function: parse string
$searchGetValue[4] = function($data)
{
	$value1 = mb_substr($data[1], 0, 255);
	$value2 = intval($data[2]);
	if($value2 < 0 || $value2 > 1) $value2 = 0;
	return array($value1, $value2);
};

//Function: parse time
$searchGetValue[5] = function($data)
{
	$value1 = intval($data[1]);
	if($value1 < 0 || $value1 > 32767) $value1 = 0;
	$value2 = intval($data[2]);
	if($value2 < 0 || $value2 > 3) $value1 = 0;
	return array($value1, $value2);
};

//Function: parse positive number
$searchGetValue[6] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) :1;
	if($value1 < 1) $value1 = 1;
	return $value1;
};

//Function: parse non-negative number
$searchGetValue[7] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : 0;
	if($value1 < 0) $value1 = 0;
	return $value1;
};

//Function: parse integer number
$searchGetValue[8] = function($data)
{
	$value1 = is_numeric($data[1]) ? intval($data[1]) : 0;
	return $value1;
};
?>
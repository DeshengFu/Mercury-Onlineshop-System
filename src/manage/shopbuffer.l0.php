﻿<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get the time
$time = intval(getVars('time', $_GET));



//Check the modification and write the header
if($time == 0)
{
	if(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) && strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) >= $currTime - $gsetting['bufferValid'])
	{
		header('HTTP/1.0 304 Not Modified');
		exit;
	}
	else
		header('Cache-control: public, max-age=' . $gsetting['bufferValid']);
}



//Connect to database
connectDB();



//Check the account
if(!checkAdmin('shopbuffer', 0)) exit;



//Write the buffer
echo 'buf.shop[0] = ' . $currTime . ';';
$rs = query('Select `ID`, `Name`, `Email` from `' . $sitePosition . '.Shop`' . ($time > 0 ? (' where `UpdateTime` > ' . $time) : '') . ' order by `UpdateTime`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	echo 'buf.shop.push([' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '", "' . strtr($rsInfo[2], $arrEncodeJS) . '"]);';
}
freeResult($rs);



//Disconnect from database
disconnectDB();
?>
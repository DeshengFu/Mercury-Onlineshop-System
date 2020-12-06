<?php
//Array for strtr: create a safe string for HTML
$arrEncodeHTML = array(
	'&' => '&amp;',
	chr(9) => '',
	chr(13) => '',
	'"' => '&quot;',
	'\'' => '&#39;',
	'>' => '&gt;',
	'<' => '&lt;',
	'$' => '&#36;',
	'|' => '&#124;',
	'/' => '&#47;'
);



//Array for strtr: create a safe string for javascript
$arrEncodeJS = array(
	'\\' => '\\\\',
	chr(9) => '',
	chr(10) => '\\n',
	chr(13) => '',
	'"' => '\\"',
	'\'' => '\\\''
);



//Array for strtr: create a show string for HTML
$arrEncodeStr = array(
	' ' => '&nbsp;',
	chr(10) => '<br>',
);



//Function: create a random code
function getRandomCode($codeLen)
{
	$chrArr = array();
	for($i = 0; $i < $codeLen; $i++) 
	{
		$tmpChr = random_int(0, 35);
		$tmpChr += ($tmpChr < 10 ? 48 : 55);
		$chrArr[] = chr($tmpChr);
	}
	return implode('', $chrArr);
}



//Function: set a key to a cookie
function setCookieKey($keyname, $value, $cookie)
{
	$cookieArr = array();
	$cookieArr[] = $keyname . '=' . $value;
	if($cookie == '') return $cookieArr[0];
	$cookiePart = explode('&', $cookie);
	for($i = 0; $i < count($cookiePart); $i++)
	{
		$cookieInfo = explode('=', $cookiePart[$i], 2);
		if(count($cookieInfo) < 2) continue;
		if($cookieInfo[0] != $keyname) $cookieArr[] = $cookiePart[$i];
	}
	return implode('&', $cookieArr);
}



//Function: get a key from a cookie
function getCookieKey($keyname, $cookie)
{
	$cookiePart = explode('&', $cookie);
	for($i = 0; $i < count($cookiePart); $i++)
	{
		$cookieInfo = explode('=', $cookiePart[$i], 2);
		if(count($cookieInfo) < 2) continue;
		if($cookieInfo[0] == $keyname) return $cookieInfo[1];
	}
	return '';
}



//Function: connect to database
function connectDB()
{
	global $dbInfo, $charSetSQL, $conn;
	$conn = mysqli_init();
	if($dbInfo['key'] != '') mysqli_ssl_set($conn, $dbInfo['key'], $dbInfo['cert'], $dbInfo['ca'], null, null);
	if(!mysqli_real_connect($conn, $dbInfo['server'], $dbInfo['username'], $dbInfo['password'], $dbInfo['database'], $dbInfo['port'])) exit;
	mysqli_set_charset($conn, $charSetSQL);
}



//Function: disconnect from database
function disconnectDB()
{
	global $conn;
	mysqli_close($conn);
}



//Function: query into the database
function query($sql, $buffered)
{
	global $conn, $dbQuery;
	$dbQuery++;
	return mysqli_query($conn, $sql, $buffered ? MYSQLI_STORE_RESULT : MYSQLI_USE_RESULT);
}



//Function: escape for query
function escapeStr($str)
{
	global $conn;
	return mysqli_real_escape_string($conn, $str);
}



//Function: get the number of affected rows
function affectedRows()
{
	global $conn;
	return mysqli_affected_rows($conn);
}



//Function: get the insert ID
function insertID()
{
	global $conn;
	return mysqli_insert_id($conn);
}



//Function: get the number of rows
function numRows($rs)
{
	return mysqli_num_rows($rs);
}



//Function: fetch row
function fetchRow($rs)
{
	return mysqli_fetch_row($rs);
}



//Function: free result
function freeResult($rs)
{
	mysqli_free_result($rs);
}



//Function: set auto-commit
function autoCommitTra($mode)
{
	global $conn;
	mysqli_autocommit($conn, $mode);
}



//Function: commit transaction
function commitTra()
{
	global $conn;
	mysqli_commit($conn);
}



//Function: get value from set
function getVars($key, $set)
{
	return isset($set[$key]) ? $set[$key] : '';
}



//Config multi-bytes strings
mb_internal_encoding($charSetPHP);



//get current time (GMT)
$currTime = time();



//Define the database connection
$conn = 0;



//Initialize the number of queries
$dbQuery = 0;
?>
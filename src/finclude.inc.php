<?php
//Get the IP
$parts = explode('.', $_SERVER['REMOTE_ADDR']);
$cuIP = ($parts[0] << 24) + ($parts[1] << 16) + ($parts[2] << 8) + $parts[3];



//Get the server
$siteServer = $_SERVER['SERVER_NAME'];



//Initialize the information
$siteID = 0;
$siteLevel = 0;
$sitePosition = '';
$siteSerialID = 0;
$siteName = '';
$siteEmail = '';
$siteHTML = '';
$siteSetting = array();
$tmplPath = '';
$tmplParameter = '';
$cuID = 0;
$cuEmail = '';
$cuState = 0;



//Function: refresh the size
function refreshSize($page, $value)
{
	global $feature;
	global $siteID, $sitePosition;

	query('Update `' . $sitePosition . '.Variable` set `Value` = `Value` + (' . $value . ') where `Name` = "benchmark.page.' . $page . '"', false);
	query('Update `system.Site` set `Size` = `Size` + (' . ($value * $feature[$page]['weight']) . ') where `ID` = ' . $siteID, false);
}



//Function: initialize the page
function initialize()
{
	global $gsetting;
	global $currTime;
	global $siteID, $siteLevel, $sitePosition, $siteSerialID, $siteName, $siteEmail, $siteHTML, $siteSetting, $siteServer;
	global $tmplPath, $tmplParameter;
	global $cuID, $cuEmail, $cuState, $cuIP;

	//Connect to the database
	connectDB();

	//Get the site
	$rs = query('Select `ID`, `Level`, `Position`, `SerialID`, `Name`, `Email`, `Size`, `License`, `ValidTime`, `HTML`, `Setting` from `system.Site` where `Host` = "' . escapeStr($siteServer) . '"', false);
	global $conn; echo mysqli_error($conn);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[1] < 2 || $rsInfo[7] < $rsInfo[6] || $rsInfo[8] < $currTime)
	{
		disconnectDB();
		return false;
	}
	$siteID = $rsInfo[0];
	$siteLevel = $rsInfo[1];
	$sitePosition = $rsInfo[2];
	$siteSerialID = $rsInfo[3];
	$siteName = $rsInfo[4];
	$siteEmail = $rsInfo[5];
	$siteHTML = $rsInfo[9];
	$siteSetting = explode('|', $rsInfo[10]);

	//Get the template
	$rs = query('Select `Path`, `Parameter` from `' . $sitePosition . '.Template` where `ID` = ' . intval($siteSetting[0]), false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null)
	{
		disconnectDB();
		return false;
	}
	$tmplPath = $rsInfo[0];
	$tmplParameter = $rsInfo[1];

	//Get the user
	if($siteLevel > 2)
	{
		$userInfo = getVars('user', $_COOKIE);
		$uID = intval(getcookiekey('userID', $userInfo));
		$cookiePass = getcookiekey('cookiePass', $userInfo);
		if($uID < 1 || $uID > 2147483647 || $cookiePass == '' || strlen($cookiePass) > 16) return true;
		$rs = query('Select `Email`, `State`, `AccessTime`, `CookiePass`, `ValidTime` from `' . $sitePosition . '.User` where `ID` = ' . $uID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $cookiePass != $rsInfo[3] || ($currTime - $rsInfo[2] > $gsetting['accessValid'] && $rsInfo[4] < $currTime))
		{
			setcookie('user', '', 0, '/', $siteServer);
			return true;
		}
		$cuID = $uID;
		$cuEmail = $rsInfo[0];
		$cuState = $rsInfo[1];
	}

	//Update the user
	if($siteLevel > 2) query('Update `' . $sitePosition . '.User` set `AccessTime` = ' . $currTime . ' where `ID` = ' . $cuID, false);

	//Return
	return true;
}



//Function: uninitialize the page
function uninitialize()
{
	//Disconnect from the database
	disconnectDB();
}



//Function: show result of the script
function showResult($script)
{
	disconnectDB();
	echo $script;
	exit;
}



//Function: write header of the page
function writeHeader($title)
{
	global $arrEncodeJS;
	global $charSetHTML, $language;
	global $siteID, $siteLevel, $siteName, $siteEmail, $siteHTML;
	global $tmplPath, $tmplParameter;

	echo '<!DOCTYPE HTML><html lang="' . $language . '">';
	echo '<head>';
	echo '<meta charset="' . $charSetHTML . '"/><meta name="format-detection" content="telephone=no"><title>' . $title . ($title == '' ? '' : ' - ') . $siteName . '</title>';
	echo '<script type="application/javascript">';
	echo 'var srv = new Object(); srv.siteID = ' . $siteID . ', srv.siteLevel = ' . $siteLevel . ', srv.siteName = "' . strtr($siteName, $arrEncodeJS) . '", srv.siteEmail= "' . strtr($siteEmail, $arrEncodeJS) . '";';
	echo 'var tmpl = new Object(); tmpl.path = "' . strtr($tmplPath, $arrEncodeJS) . '";';
	echo '</script>';
	echo '<script type="application/javascript" src="system/system.js"></script>';
	echo '<script type="application/javascript" src="template/interface.js"></script>';
	echo $tmplParameter;
	echo '</head>';
	echo '<body id="spi.body"><div style="visibility:hidden">';
	echo '<div>' . $siteName . '</div>';
	echo '<div>' . $siteHTML. '</div>';
}



//Function: write footer of the page
function writeFooter()
{
	echo '</div></body>';
	echo '</html>';
}
?>
<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Check the account
fastCheck('', 0);



//Get the list of available shops
$shopArr = array();
$rs = query('Select S.`ID`, S.`Name` from `' . $sitePosition . '.Master` M inner join `' . $sitePosition . '.Shop` S on S.`ID` = M.`ShopID` where M.`UserID` = ' . $adminID, false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$shopArr[] = '{id:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '"}';
}
freeResult($rs);
echo 'adm.shop([' . implode(', ', $shopArr) . ']);';



//Buffer the main information
echo 'adm.buffer({id:' . $siteID . ', level:' . $siteLevel . ', serialID:' . $siteSerialID . ', name:"' . strtr($siteName, $arrEncodeJS) . '", email:"' . strtr($siteEmail, $arrEncodeJS) . '"}, {id: ' . $adminID . ', name:"' . strtr($adminName, $arrEncodeJS) . '", right:"' . $adminRight . '", ip:' . $adminIP . '});';



//Buffer the extra information
foreach($feature as $page => $info)
{
	$levelArr = $info['level'];
	$slevel = 0;
	foreach($levelArr as $level => $linfo)
	{
		if(in_array($siteLevel - 1, array_slice($linfo, 2)))
		{
			$slevel = $level + 1;
			break;
		}
	}
	for($i = 0; $i < $slevel; $i++)
	{
		if($levelArr[$i][1] != '') require($page . '.l' . $i . '.sav.php');
	}
}



//Disconnect from database
disconnectDB();



//Redirect
if($action == 'redirect') echo 'adm.redirect();';
?>
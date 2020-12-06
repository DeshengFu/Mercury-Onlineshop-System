<?php
require_once('conf.inc.php');
require_once('ginclude.inc.php');
require_once('ainclude.inc.php');



//Get action
$action = getVars('action', $_GET);



//Action: show page
if($action == '')
{
	//Prepare the data
	$sortQS = prepareSort('U.`ID`|U.`Email`', '0$0');

	//Check the account
	fastCheck('user', 0);

	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('user.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$userStr = array();
	getData('User', 'U', '', $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select * from `' . $sitePosition . '.User` U where U.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
				
			$userStr[] = 'user.elem(' . $i . ', ' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$userStr[0] = 'user.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'user.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('user.top();' . implode('', $userStr) . 'user.bottom();');
}
?>
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
	$sortQS = prepareSort('S.`ID`|S.`Name`|S.`Email`', '0$0');

	//Check the account
	fastCheck('shop', 0);

	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('shop.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$shopStr = array();
	getData('Shop', 'S', '', $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select * from `' . $sitePosition . '.Shop` S where S.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
		
			$shopStr[] = 'shop.elem(' . $i . ', ' . $rsInfo[0] . ', "' . strtr($rsInfo[1], $arrEncodeJS) . '", "' . strtr($rsInfo[2], $arrEncodeJS) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$shopStr[0] = 'shop.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'shop.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('shop.top();' . implode('', $shopStr) . 'shop.bottom();');
}
?>
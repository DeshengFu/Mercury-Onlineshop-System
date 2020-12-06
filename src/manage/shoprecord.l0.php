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
	$sortQS = prepareSort('R.`ID`|R.`Type`|R.`UserID`|R.`InsertIP`|R.`InsertTime`', '0$1');

	//Check the account
	fastCheck('shoprecord', 0);
	
	//Require extra files
	require('include.l0.inc.php');
	require('shoprecord.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$recordStr = array();
	getData('ShopRecord', 'R', '`ShopID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select * from `' . $sitePosition . '.ShopRecord` R where R.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			
			$recordStr[] = 'srec.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', "' . strtr($rsInfo[2], $arrEncodeJS) . '", ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', ' . $rsInfo[6] . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$recordStr[0] = 'srec.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'srec.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('srec.top();' . implode('', $recordStr) . 'srec.bottom();');
}
?>
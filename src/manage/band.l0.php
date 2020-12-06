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
	$sortQS = prepareSort('B.`ID`|B.`InsertTime`|B.`Flow`', '0$0');

	//Check the account
	fastCheck('band', 0);
	
	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('band.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$bandStr = array();
	getData('Band', 'B', 'B.`SourceID` = ' . $shopID . ' or B.`TargetID` = ' . $shopID, $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$rs = query('Select B.*, S.`Name`, T.`Name` from `' . $sitePosition . '.Band` B inner join `' . $sitePosition . '.Shop` S on B.`SourceID` = S.`ID` inner join `' . $sitePosition . '.Shop` T on B.`TargetID` = T.`ID` where B.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			
			$bandStr[] = 'band.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', ' . $rsInfo[4] . ', ' . $rsInfo[5] . ', "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '");';
			$i++;
		}
		freeResult($rs);
	}
	else
		$bandStr[0] = 'band.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'band.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('band.top();' . implode('', $bandStr) . 'band.bottom();');
}
?>
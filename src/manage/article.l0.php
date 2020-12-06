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
	$sortQS = prepareSort('A.`ID`|A.`LinkID`|A.`ShowLevel`|A.`Title`|A.`SubTitle`|A.`Name`|A.`SubName`|A.`Code`|A.`Price`|A.`Tax`|A.`Weight`|A.`Sold`|A.`InsertTime`|A.`UpdateTime`', '0$0');

	//Check the account
	fastCheck('article', 0);

	//Require extra files
	require('include.l0.inc.php');
	require('include.l1.inc.php');
	require('article.l0.sea.php');

	//Prepare the data
	$searchQS = isset($_GET['IDList']) ? '' : prepareSearch('search', $map);

	//Get the data
	$i = 0;
	$articleStr = array();
	getData('Article', 'A', '', $searchQS, $sortQS, 20, 30, $offset, $show, $records, $fullIDList, $IDList);
	if($IDList != '')
	{
		$offer = array();
		$inventory = array();
		$rs = query('Select `ArticleID`, count(*), sum(`Inventory`) from `' . $sitePosition . '.Offer` where `ArticleID` in (' . $IDList . ') group by `ArticleID`', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$offer[intval($rsInfo[0])] = $rsInfo[1];
			$inventory[intval($rsInfo[0])] = $rsInfo[2];
		}
		freeResult($rs);

		$rs = query('Select * from `' . $sitePosition . '.Article` A where A.`ID` in (' . $IDList . ') order by ' . $sortQS, false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;

			$articleStr[] = 'art.elem(' . $i . ', ' . $rsInfo[0] . ', ' . $rsInfo[1] . ', ' . $rsInfo[2] . ', ' . $rsInfo[3] . ', "' . strtr($rsInfo[4], $arrEncodeJS) . '", "' . strtr($rsInfo[5], $arrEncodeJS) . '", "' . strtr($rsInfo[6], $arrEncodeJS) . '", "' . strtr($rsInfo[7], $arrEncodeJS) . '", "' . strtr($rsInfo[8], $arrEncodeJS) . '", ' . $rsInfo[9] . ', ' . $rsInfo[10] . ', ' . $rsInfo[11] . ', ' . $rsInfo[12] . ', ' . $rsInfo[13] . ', "' . strtr($rsInfo[14], $arrEncodeJS) . '", ' . $rsInfo[15] . ', ' . $rsInfo[16] . ', ' . $rsInfo[17] . ', ' . $rsInfo[18] . ', ' . $rsInfo[19] . ', "' . strtr($rsInfo[20], $arrEncodeJS) . '", ' . (isset($offer[$rsInfo[0]]) ? $offer[$rsInfo[0]] : 0) . ', ' . (isset($inventory[$rsInfo[0]]) ? $inventory[$rsInfo[0]] : 0) . ');';
			$i++;
		}
		freeResult($rs);
	}
	else
		$articleStr[0] = 'art.empty();';

	//Disconnect from database
	disconnectDB();

	//Show the page
	if($records >= 0) echo 'art.buffer(20, 30, ' . $offset . ', ' . $show . ', ' . $records . ', "' . $fullIDList . '");';
	showResult('art.top();' . implode('', $articleStr) . 'art.bottom();');
}
?>
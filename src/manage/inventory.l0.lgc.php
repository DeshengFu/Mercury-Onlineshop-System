<?php
class Inventory
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Inventory` write'];
	}
	
	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Article` read', '`' . $sitePosition . '.Shop` read', '`' . $sitePosition . '.Inventory` write'];
	}

	public static function insert_process(&$ID, $articleID, $shopID)
	{
		global $sitePosition, $currTime;

		//Check the article
		$rs = query('Select count(*) from `' . $sitePosition . '.Article` where `ID` = ' . $articleID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 1;

		//Check the shop
		$rs = query('Select count(*) from `' . $sitePosition . '.Shop` where `ID` = ' . $shopID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 2;

		//Check the inventory
		$rs = query('Select count(*) from `' . $sitePosition . '.Inventory` where `ShopID` = ' . $shopID . ' and `ArticleID` = ' . $articleID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) > 0) return 3;

		//Insert the inventory
		query('Insert into `' . $sitePosition . '.Inventory` values (NULL, ' . $articleID . ', ' . $shopID . ', 0, ' . $currTime . ', ' . $currTime . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function insert_done($ID, $articleID, $shopID)
	{
		//Insert the record
		insertRecord(51, $ID . '|' . $articleID);

		//Refresh the size
		refreshSize('inventory', 1, false);
	}

	public static function delete_check(&$IDList)
	{
		global $shopID;

		//Check the IDList
		checkIDList('Inventory', '`ShopID` = ' . $shopID, $IDList);
	}

	public static function delete_process($IDList, &$rows)
	{
		global $sitePosition;

		//Delete records
		query('Delete from `' . $sitePosition . '.Inventory` where `ID` in (' . $IDList . ')', false);
		$rows = affectedRows();
	}

	public static function delete_done($IDList, $rows)
	{
		//Insert the record
		insertRecord(52, $IDList);
	
		//Refresh the size
		refreshSize('inventory', -$rows, false);
	}

	public static function edit_check(&$ID, $shopID, $articleID, $num)
	{
		global $sitePosition;

		$ID = 0;
		$rs = query('Select `ID`, `Num` from `' . $sitePosition . '.Inventory` where `ShopID` = ' . $shopID . ' and `ArticleID` = ' . $articleID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null) return true;
		if(abs($rsInfo[1] + $num) > 2147483647) return false;
		$ID = $rsInfo[0];
		return true;
	}

	public static function edit_processex($ID, $num)
	{
		global $sitePosition, $currTime;

		//Update the inventory
		query('Update `' . $sitePosition . '.Inventory` set `Num` = `Num` + ' . $num . ', `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID, false);
	}

	public static function edit_process($ID, $num)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Get the inventory
		$rs = query('Select `ShopID`, `Num` from `' . $sitePosition . '.Inventory` where `ID` = ' . $ID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $shopID != $rsInfo[0] || abs($rsInfo[1] + $num) > 2147483647) return 1;

		//Update the inventory
		query('Update `' . $sitePosition . '.Inventory` set `Num` = `Num` + ' . $num . ', `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID, false);

		//Return
		return 0;
	}

	public static function edit_done($ID, $num)
	{
		//Insert the record
		insertRecord(53, $ID . '|' . $num);
	}
}
?>
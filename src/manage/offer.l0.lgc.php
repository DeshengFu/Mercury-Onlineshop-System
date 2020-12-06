<?php
class Offer
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Offer` write'];
	}
	
	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Article` read', '`' . $sitePosition . '.Shop` read', '`' . $sitePosition . '.Offer` write'];
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

		//Insert the offer
		query('Insert into `' . $sitePosition . '.Offer` values (NULL, ' . $articleID . ', ' . $shopID . ', 0, 0, 0, 0, ' . $currTime . ', ' . $currTime . ', ' . $shopID . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function insert_done($ID, $articleID, $shopID)
	{
		//Insert the record
		insertRecord(41, $ID . '|' . $articleID);

		//Refresh the size
		refreshSize('offer', 1, false);
	}

	public static function delete_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Offer` write', '`' . $sitePosition . '.Subscription` read'];
	}

	public static function delete_checkfun(&$IDList)
	{
		global $sitePosition;

		//Check the subscriptions
		$rs = query('Select count(*) from `' . $sitePosition . '.Subscription` where `OfferID` in (' . $IDList . ')', false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) > 0) return 1;

		return 0;
	}

	public static function delete_check(&$IDList)
	{
		global $shopID;

		//Check the IDList
		checkIDList('Offer', '`ShopID` = ' . $shopID, $IDList);
	}

	public static function delete_process($IDList, &$rows, $check)
	{
		global $sitePosition;
		global $shopID;

		//Check the offers
		$result = $check($IDList);
		if($result != 0) return $result;

		//Delete records
		query('Delete from `' . $sitePosition . '.Offer` where `ShopID` = ' . $shopID . ' and `ID` in (' . $IDList . ')', false);
		$rows = affectedRows();

		//Return
		return 0;
	}

	public static function delete_done($IDList, $rows)
	{
		//Insert the record
		insertRecord(42, $IDList);

		//Refresh the size
		refreshSize('offer', -$rows, false);
	}

	public static function edit_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Offer` write', '`' . $sitePosition . '.Band` read'];
	}

	public static function edit_process($ID, $discount, $price, $flag, $inventory, $startTime, $endTime, $targetID)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Get the offer
		$rs = query('Select `ShopID` from `' . $sitePosition . '.Offer` where `ID` = ' . $ID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[0] != $shopID) return 1;

		//Check the target
		if($targetID != $shopID)
		{
			$rs = query('Select `State` from `' . $sitePosition . '.Band` where `SourceID` = ' . $shopID . ' and `TargetID` = ' . $targetID, false);
			$rsInfo = fetchRow($rs);
			freeResult($rs);
			if($rsInfo === null || $rsInfo[0] == 0) return 1;
		}

		//Update the offer
		query('Update `' . $sitePosition . '.Offer` set `Discount` = ' . $discount . ', `Price` = ' . $price . ', `Flag` = ' . $flag . ', `Inventory` = ' . $inventory . ', `StartTime` = ' . $startTime . ', `EndTime` = ' . $endTime . ', `TargetID` = ' . $targetID . ' where `ID` = ' . $ID, false);

		//Return
		return 0;
	}

	public static function edit_done($ID, $discount, $price, $inventory, $targetID)
	{
		//Insert the record
		insertRecord(43, $ID . '|' . $discount . '|' . $price . '|' . $inventory . '|' . $targetID);
	}

	public static function copy_process(&$ID, $offerID)
	{
		global $sitePosition;
		global $shopID;

		//Get information
		$rs = query('Select * from `' . $sitePosition . '.Offer` where `ID` = ' . $offerID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[2] != $shopID) return 1;
		$articleID = $rsInfo[1];
		$flag = $rsInfo[3];
		$discount = $rsInfo[4];
		$price = $rsInfo[5];
		$inventory = $rsInfo[6];
		$startTime = $rsInfo[7];
		$endTime = $rsInfo[8];
		$targetID = $rsInfo[9];

		//Insert the offer
		query('Insert into `' . $sitePosition . '.Offer` values (NULL, ' . $articleID . ', ' . $shopID . ', ' . $flag . ', ' . $discount . ', ' . $price . ', ' . $inventory . ', ' . $startTime . ', ' . $endTime . ', ' . $targetID . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function copy_done($ID, $offerID)
	{
		//Insert the record
		insertRecord(44, $offerID . '|' . $ID);

		//Refresh the size
		refreshSize('offer', 1, false);
	}
}
?>
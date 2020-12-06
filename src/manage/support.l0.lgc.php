<?php
class Support
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Support` write'];
	}
	
	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Support` write', '`' . $sitePosition . '.User` read', '`' . $sitePosition . '.Shop` read'];
	}

	public static function insert_process(&$ID, $userID)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Check the user
		if($userID > 0)
		{
			$rs = query('Select count(*) from `' . $sitePosition . '.User` where `ID` = ' . $userID, false);
			$rsInfo = fetchRow($rs);
			freeResult($rs);
			if(intval($rsInfo[0]) == 0) return 1;
		}

		//Check the shop
		$rs = query('Select count(*) from `' . $sitePosition . '.Shop` where `ID` = ' . $shopID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 2;

		//Insert the support
		query('Insert into `' . $sitePosition . '.Support` values (NULL, ' . $userID . ', ' . $shopID . ', 1, ' . $currTime . ', ' . $currTime . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function insert_done($ID, $userID)
	{
		//Insert the record
		insertRecord(96, $ID . '|' . $userID);

		//Refresh the size
		refreshSize('support', 1, false);
	}
	
	public static function relay_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Support` write', '`' . $sitePosition . '.Shop` read'];
	}

	public static function relay_process($ID, $nshopID, &$userID)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Check the support
		if($nshopID == $shopID) return 1;
		$rs = query('Select `UserID`, `ShopID` from `' . $sitePosition . '.Support` where `ID` = ' . $ID . ' and `UserID` > 0', false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[1] != $shopID) return 1;
		$userID = $rsInfo[0];

		//Check the shop
		if($nshopID > 0)
		{
			$rs = query('Select count(*) from `' . $sitePosition . '.Shop` where `ID` = ' . $nshopID, false);
			$rsInfo = fetchRow($rs);
			freeResult($rs);
			if(intval($rsInfo[0]) == 0) return 2;
		}

		//Update the support
		query('Update `' . $sitePosition . '.Support` set `ShopID` = ' . $nshopID . ', `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID, false);

		//Return
		return 0;
	}

	public static function relay_done($ID, $nshopID, $userID)
	{
		global $sitePosition, $currTime;

		//Insert the record
		insertRecord(98, $ID . '|' . $nshopID);

		//Insert the record
		if($nshopID > 0) query('Insert into `' . $sitePosition . '.ShopRecord` values (NULL, 96, "' . $ID . '|' . $userID . '", 0, ' . $nshopID . ', 0, ' . $currTime . ')', false);
	}
	
	public static function close_process($ID)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Check the support
		$rs = query('Select `ShopID`, `State` from `' . $sitePosition . '.Support` where `ID` = ' . $ID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[0] != $shopID || $rsInfo[1] == 0) return 1;

		//Update the support
		query('Update `' . $sitePosition . '.Support` set `State` = 0, `UpdateTime` = ' . $currTime . ' where `ID` = ' . $ID, false);

		//Return
		return 0;
	}

	public static function close_done($ID)
	{
		//Insert the record
		insertRecord(99, $ID);
	}
}
?>
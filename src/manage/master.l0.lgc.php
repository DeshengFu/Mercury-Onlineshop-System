<?php
class Master
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Master` write'];
	}

	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Master` write', '`' . $sitePosition . '.Shop` read', '`' . $sitePosition . '.User` read'];
	}

	public static function insert_process(&$ID, $coreID, $userID)
	{
		global $sitePosition, $currTime;
	
		//Check the shop
		$rs = query('Select count(*) from `' . $sitePosition . '.Shop` where `ID` = ' . $coreID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 1;

		//Check the user
		$rs = query('Select count(*) from `' . $sitePosition . '.User` where `ID` = ' . $userID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 2;

		//Check the master
		$rs = query('Select count(*) from `' . $sitePosition . '.Master` where `ShopID` = ' . $coreID . ' and `UserID` = ' . $userID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) > 0) return 2;

		//Insert master
		query('Insert into `' . $sitePosition . '.Master` values (NULL, "' . $coreID . '", ' . $userID . ', ' . $currTime . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function insert_done($ID, $coreID, $userID)
	{	
		global $sitePosition, $currTime;
		
		//Insert the record
		insertRecord(36, $userID);

		//Insert the record
		query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 36, "' . $coreID . '", ' . $userID . ', 0, ' . $currTime . ')', false);

		//Refresh the size
		refreshSize('master', 1, false);
	}

	public static function delete_check(&$IDList, $coreID)
	{
		//Check the IDList
		checkIDList('Master', '`ShopID` = ' . $coreID, $IDList);
	}

	public static function delete_process($IDList, $coreID, &$rows, &$masterArr)
	{
		global $sitePosition;

		//Get the list of masters
		$masterArr = array();
		$rs = query('Select `UserID` from `' . $sitePosition . '.Master` where `ShopID` = ' . $coreID . ' and `ID` in (' . $IDList . ')', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
			$masterArr[] = $rsInfo[0];
		}
		freeResult($rs);

		//Delete records
		query('Delete from `' . $sitePosition . '.Master` where `ShopID` = ' . $coreID . ' and `ID` in (' . $IDList . ')', false);
		$rows = affectedRows();
	}

	public static function delete_done($IDList, $coreID, $rows, $masterArr)
	{
		global $sitePosition, $currTime;

		//Insert the record
		autoCommitTra(false);
		foreach($masterArr as $userID)
		{
			query('Insert into `' . $sitePosition . '.UserRecord` values (NULL, 37, "' . $coreID . '", ' . $userID . ', 0, ' . $currTime . ')', false);
			insertRecord(37, $userID);
		}
		commitTra();
		autoCommitTra(true);
	
		//Refresh the size
		refreshSize('master', -$rows, false);
	}
}
?>
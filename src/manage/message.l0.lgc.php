<?php
class Message
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Message` write'];
	}

	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Support` write', '`' . $sitePosition . '.Message` write'];
	}

	public static function insert_process(&$ID, $coreID, $message)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Check the support
		$rs = query('Select count(*) from `' . $sitePosition . '.Support` where `ID` = ' . $coreID. ' and `ShopID` = ' . $shopID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if(intval($rsInfo[0]) == 0) return 1;

		//Insert message
		query('Insert into `' . $sitePosition . '.Message` values (NULL, ' . $coreID . ', "' . escapeStr($message) . '", 0, ' . $shopID . ', ' . $currTime . ')', false);
		$ID = insertID();

		//Update support
		query('Update `' . $sitePosition . '.Support` set `UpdateTime` = ' . $currTime . ' where `ID` = ' . $coreID, false);

		//Return
		return 0;
	}

	public static function insert_done($ID, $coreID)
	{
		//Refresh the size
		refreshSize('message', 1, false);
	}
}
?>
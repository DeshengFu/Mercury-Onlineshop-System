<?php
class Shop
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Shop` write'];
	}

	public static function xedit_check($ID, $balance, $point, $resource)
	{
		global $sitePosition;

		//Check the shop
		$rs = query('Select `Balance`, `Point`, `Resource` from `' . $sitePosition . '.Shop` where `ID` = ' . $ID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || abs($rsInfo[0] + $balance) > PHP_INT_MAX || abs($rsInfo[1] + $point) > PHP_INT_MAX || abs($rsInfo[2] + $resource) > PHP_INT_MAX) return false;

		//Return
		return true;
	}

	public static function xedit_processex($ID, $balance, $point, $resource, $num)
	{
		global $sitePosition, $currTime;

		//Update the user
		query('Update `' . $sitePosition . '.Shop` set `OrderTime` = ' . $currTime . ', `Sold` = least(`Sold` + ' . $num . ', 2147483647), `Balance` = `Balance` + ' . $balance . ', `Point` = `Point` + ' . $point . ', `Resource` = `Resource` + ' . $resource . ' where `ID` = ' . $ID, false);
	}

	public static function xedit_process($ID, $balance, $point, $resource)
	{
		global $sitePosition;

		//Update the user
		query('Update `' . $sitePosition . '.Shop` set `Balance` = `Balance` + ' . $balance . ', `Point` = `Point` + ' . $point . ', `Resource` = `Resource` + ' . $resource . ' where `ID` = ' . $ID, false);
	}

	public static function xedit_done($ID, $balance, $point, $resource)
	{
		global $sitePosition, $currTime;

		//Insert the log
		insertLog(344, $ID . '|' . $balance . '|' . $point . '|' . $resource);

		//Insert the record
		if($balance != 0) query('Insert into `' . $sitePosition . '.ShopRecord` values (NULL, 31, "' . $balance . '", 0, ' . $ID . ', 0, ' . $currTime . ')', false);
		if($point != 0) query('Insert into `' . $sitePosition . '.ShopRecord` values (NULL, 32, "' . $point . '", 0, ' . $ID . ', 0, ' . $currTime . ')', false);
	}
}
?>
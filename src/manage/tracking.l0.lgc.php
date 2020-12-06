<?php
class Tracking
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Tracking` write'];
	}

	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Shipment` read', '`' . $sitePosition . '.Tracking` write'];
	}

	public static function insert_process(&$ID, $shipmentID, $type, $referenceID, $information)
	{
		global $sitePosition, $currTime;
		global $shopID;

		//Check the shipment
		$rs = query('Select `ShopID` from `' . $sitePosition . '.Shipment` where `ID` = ' . $shipmentID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[0] != $shopID) return 1;

		//Insert the tracking
		query('Insert into `' . $sitePosition . '.Tracking` values (NULL, ' . $shopID . ', ' . $shipmentID . ', ' . $type . ', "' . escapeStr($referenceID) . '", "' . escapeStr($information) . '", ' . $currTime . ')', false);
		$ID = insertID();

		//Return
		return 0;
	}

	public static function insert_done($ID, $shipmentID, $type, $referenceID)
	{
		//Insert the record
		insertRecord(81, $ID . '|' . $shipmentID . '|' . $referenceID . '|' . $type);

		//Refresh the size
		refreshSize('tracking', 1, false);
	}

	public static function delete_check(&$IDList)
	{
		global $shopID;

		//Check the IDList
		checkIDList('Tracking', '`ShopID` = ' . $shopID, $IDList);
	}

	public static function delete_process($IDList, &$rows)
	{
		global $sitePosition;

		//Delete records
		query('Delete from `' . $sitePosition . '.Tracking` where `ID` in (' . $IDList . ')', false);
		$rows = affectedRows();
	}

	public static function delete_done($IDList, $rows)
	{
		//Insert the record
		insertRecord(82, $IDList);

		//Refresh the size
		refreshSize('tracking', -$rows, false);
	}
}
?>
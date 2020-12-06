<?php
class Shipment1 extends Shipment
{
	public static function edit_process($ID, $referenceID, $type)
	{
		global $sitePosition;

		//Update the shipment
		query('Update `' . $sitePosition . '.ShipmentE` set `ReferenceID` = "' . escapeStr($referenceID) . '", `Type` = ' . $type . ' where `ShipmentID` = ' . $ID, false);

		//Insert the log
		insertRecord(48, $ID . '|' . $referenceID . '|' . $type);
	}
}
?>
<?php
class Shipment
{
	public static function insert_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Shipment` write', '`' . $sitePosition . '.Transaction` write', '`' . $sitePosition . '.TransactionV` read'];
	}

	public static function insert_check(&$IDList, $invoiceID, $targetID)
	{
		//Check the IDList
		checkIDList('TransactionV', '`InvoiceID` = ' . $invoiceID . ' and `TargetID` = ' . $targetID . ' and `ShipmentID` = 0', $IDList);
	}

	public static function insert_process(&$ID, $IDList, $orderID, $invoiceID, $targetID, $sum, $num, $address, $extraAddress)
	{
		global $sitePosition, $currTime;

		//Insert the invoice
		query('Insert into `' . $sitePosition . '.Shipment` values (NULL, ' . $orderID . ', ' . $invoiceID . ', ' . $targetID . ', ' . $num . ', ' . $sum . ', "' . escapeStr($address) . '", "' . escapeStr($extraAddress) . '", ' . $currTime . ')', false);
		$ID = insertID();

		//Update the transactions
		query('Update `' . $sitePosition . '.Transaction` set `ShipmentID` = ' . $ID . ' where `ElementID` in (' . $IDList . ')', false);
	}

	public static function insert_done($ID, $orderID, $invoiceID, $targetID, $IDList)
	{	
		//Insert the record
		insertRecord(47, $ID . '|' . $orderID . '|' . $invoiceID . '|' . $IDList);
		
		//Refresh the size
		refreshSize('shipment', 1, false);
	}
}
?>
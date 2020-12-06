<?php
class Transaction
{
	public static function read_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.TransactionV` read'];
	}

	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Element` write', '`' . $sitePosition . '.Transaction` write', '`' . $sitePosition . '.TransactionV` read'];
	}
	
	public static function sum($IDList, $invoiceID, &$sum, &$tax, &$num, &$shopArr, &$articleArr)
	{
		global $sitePosition;

		$sum = 0;
		$tax = 0;
		$num = 0;
		$shopArr = array();
		$articleArr = array();
		$rs = query('Select `Price`, `Tax`, `Num`, `ShopID`, `ArticleID` from `' . $sitePosition . '.TransactionV` where `InvoiceID` = ' . $invoiceID . ' and `ID` in (' . $IDList . ')', false);
		while(true)
		{
			$rsInfo = fetchRow($rs);
			if($rsInfo === null) break;
	 
			$sum += ceil($rsInfo[0] * (1000 + $rsInfo[1]) / 1000) * $rsInfo[2];
			$tax += (ceil($rsInfo[0] * (1000 + $rsInfo[1]) / 1000) - $rsInfo[0]) * $rsInfo[2];
			$num += abs($rsInfo[2]);

			if($rsInfo[3] == 0) continue;
			if(!isset($shopArr[$rsInfo[3]])) $shopArr[$rsInfo[3]] = 0;
			if(!isset($articleArr[$rsInfo[4]])) $articleArr[$rsInfo[4]] = 0;
			$shopArr[$rsInfo[3]] += ceil($rsInfo[0] * (1000 + $rsInfo[1]) / 1000) * $rsInfo[2];
			$articleArr[$rsInfo[4]] += $rsInfo[2];
		}
		freeResult($rs);
	}

	public static function deleteo_lock()
	{
		global $sitePosition;

		return mergeLock([self::refresh_lock(), ['`' . $sitePosition . '.Order` write', '`' . $sitePosition . '.Element` write', '`' . $sitePosition . '.Offer` write', '`' . $sitePosition . '.Transaction` write', '`' . $sitePosition . '.TransactionV` read']]);
	}

	public static function deleteo_process(&$ID, $elementID, $dnum, $targetID, &$offerID, &$orderID, &$shopID, &$bnum)
	{
		global $sitePosition, $currTime;

		//Get the transaction
		$rs = query('Select * from `' . $sitePosition . '.TransactionV` where `ID` = ' . $elementID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[3] == 0 || $rsInfo[15] == 0 || $rsInfo[26] != $targetID) return 1;
		$orderID = $rsInfo[2];
		$invoiceID = $rsInfo[3];
		$title = $rsInfo[5];
		$subTitle = $rsInfo[6];
		$name = $rsInfo[7];
		$subName = $rsInfo[8];
		$price = $rsInfo[9];
		$tax = $rsInfo[10];
		$num = $rsInfo[11];
		$transactionID = $rsInfo[12];
		$userID = $rsInfo[13];
		$shopID = $rsInfo[14];
		$offerID = $rsInfo[15];
		$articleID = $rsInfo[16];
		$offerPrice = $rsInfo[21];
		$sum = ceil($price * (1000 + $tax) / 1000) * $dnum;

		//Check the element
		if($invoiceID > 0)
		{
			$rs = query('Select count(*) from `' . $sitePosition . '.Element` where `OrderID` = ' . $orderID, false);
			$rsInfo = fetchRow($rs);
			freeResult($rs);
			if(intval($rsInfo[0]) > 1022) return 2;
		}

		//Check the number
		if($invoiceID > 0)
		{
			$rs = query('Select sum(`Num`) from `' . $sitePosition . '.TransactionV` where `OfferID` = ' . $offerID . ' and `OrderID` = ' . $orderID, false);
			$rsInfo = fetchRow($rs);
			freeResult($rs);
			$num = intval($rsInfo[0]);
		}
		if($num < $dnum)
		{
			$bnum = $num;
			return 3;
		}

		if($invoiceID > 0)
		{
			//Insert element
			query('Insert into `' . $sitePosition . '.Element` values (NULL, "' . $articleID . '", ' . $orderID . ', 0, 0, "' . escapeStr($title) . '", "' . escapeStr($subTitle) . '", "' . escapeStr($name) . '", "' . escapeStr($subName) . '", ' . $price . ', ' . $tax . ', -' . $dnum . ')', false);
			$ID = insertID();
			query('Update `' . $sitePosition . '.Element` set `ShowID` = `ID` where `ID` = ' . $ID, false);

			//Insert transaction
			query('Insert into `' . $sitePosition . '.Transaction` values (NULL, ' . $ID . ', ' . $userID . ', ' . $shopID . ', ' . $offerID . ', ' . $articleID . ', 0, 0, 0, 0, ' . $offerPrice . ', 0, 0, 0, ' . $currTime . ', ' . $targetID . ', 0)', false);
		}

		//Update the offer
		query('Update `' . $sitePosition . '.Offer` set `Inventory` = least(`Inventory` + ' . $dnum . ', 2147483647) where `ID` = ' . $offerID, false);

		//Update the order
		query('Update `' . $sitePosition . '.Order` set `Sum` = `Sum` - (' . $sum . '), `OpenSum` = `OpenSum` - (' . $sum . '), `Element` = `Element` + ' . ($invoiceID > 0 ? $dnum : -$dnum) . ', `OpenElement` = `OpenElement` + ' . ($invoiceID > 0 ? $dnum : -$dnum) . ' where `ID` = ' . $orderID, false);

		//Return
		return 0;
	}

	public static function deleteo_done($ID, $elementID, $offerID, $orderID, $num, $shopID)
	{
		global $sitePosition, $currTime;

		//Insert the log
		insertLog(384, $ID . '|' . $offerID . '|' . $orderID . '|' . (-$num));
	
		//Insert the record
		query('Insert into `' . $sitePosition . '.ShopRecord` values (NULL, 46, "' . $ID . '|' . $offerID . '|' . $orderID . '|' . (-$num) . '", 0, ' . $shopID . ', 0, ' . $currTime . ')', false);

		//Refresh the size
		refreshSize('element', 1, false);
		refreshSize('transaction', 1, false);
	}
}
?>
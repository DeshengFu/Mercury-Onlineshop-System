<?php
$map = array(0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 4, 4, 4, 4, 9, 10, 2, 3, 3, 5);

function search($id, $data)
{
	switch($id)
	{
		case 0: return 'T.`ID` >= ' . $data[0] . ' and T.`ID` <= ' . $data[1];
		case 1: return 'T.`UserID` = ' . $data;
		case 2: return 'T.`ShopID` = ' . $data;
		case 3: return 'T.`OfferID` = ' . $data;
		case 4: return 'T.`ArticleID` = ' . $data;
		case 5: return 'T.`CouponID` = ' . $data;
		case 6: return 'T.`CodeID` = ' . $data;
		case 7: return 'T.`OrderID` = ' . $data;
		case 8: return 'T.`InvoiceID` = ' . $data;
		case 9: return 'T.`ShipmentID` = ' . $data;
		case 10: return 'T.`TargetID` = ' . $data;
		case 11: return 'T.`ServiceID`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 12: return 'T.`Title`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 13: return 'T.`SubTitle`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 14: return 'T.`Name`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 15: return 'T.`SubName`' . ($data[1] == 0 ? ' = ' : ' like ') . '"' . escapeStr($data[0]) . '"';
		case 16: return 'T.`Price` >= ' . $data[0] . ' and T.`Price` <= ' . $data[1];
		case 17: return 'T.`Tax` >= ' . $data[0] . ' and T.`Tax` <= ' . $data[1];
		case 18: return 'T.`Num` >= ' . $data[0] . ' and T.`Num` <= ' . $data[1];
		case 19: return '(T.`Service` & ' . (1 << $data) . ') > 0';
		case 20: return '(T.`Flag` & ' . (1 << $data) . ') > 0';
		case 21: return 'T.`InsertTime`' . ($data[1] < 2 ? ' <= ' : ' >= ') . 'unix_timestamp()' . ($data[1] % 2 == 0 ? ' - ' : ' + ') . ($data[0] * 86400);
		default: return '';
	}
}
?>
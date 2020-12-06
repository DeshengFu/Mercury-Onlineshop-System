tsa.result0 = tsa.result;
tsa.result = function(id, info)
{
	switch(id)
	{
		case 20:
			tsa.result0(19, info);
			break;
		default:
			tsa.result0(id, info);
			break;
	}
}

tsa.menu0 = tsa.menu;
tsa.menu = function(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName)
{
	var arr = tsa.menu0(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName);
	
	var i = 2;
	while(arr[i].length > 0) i++;
	arr.splice(i, 0, ['javascript:ivt.searchQI = \'1$' + articleID + '|2$' + targetID + '\'; ivt.sortQI = \'\'; adm.post(\'inventory.php\', \'searchQI=1$' + articleID + '|2$' + targetID + '\');', 'admin/icon00.gif', lan.tsa.inventory_tip]);
	
	return arr;
}
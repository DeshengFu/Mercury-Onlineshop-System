art.menu0 = art.menu;
art.menu = function(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory)
{
	var arr = art.menu0(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory);
	arr.push(['javascript:ivt.searchQI = \'1$' + ID + '\'; ivt.sortQI = \'\'; adm.post(\'inventory.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.art.inventory_tip]);

	return arr;
}
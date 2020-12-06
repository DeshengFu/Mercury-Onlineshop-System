var ship = new Object();

ship.buffer = function(buffer, size, offset, show, records, list)
{
	ship.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

ship.clear = function()
{
	ship.searchQI = '';
	ship.sortQI = '';
}

ship.result = function(id, info)
{
	switch(id)
	{
		case 0:
			adm.alert('alert', lan.ship.show, '<div style="word-break:break-all;">' + info + '</div>');
			break;
		case 1:
			adm.suspend();
			adm.updbuffer(ship.buf, info.toString());
			adm.gopage(ship.buf, ship.buf.page - 1, 'shipment.php');
			break;
	}
}

ship.searchFun = function()
{
	return [
		[0, lan.ship.id, lan.ship.err[0], lan.ship.err[1], lan.ship.err[2]],		
		[6, lan.ship.order, lan.ship.err[3]],
		[6, lan.ship.invoice, lan.ship.err[4]],
		[1, lan.ship.num, lan.ship.err[6], lan.ship.err[7], lan.ship.err[8]],
		[9, lan.ship.sum, lan.ship.err[9], lan.ship.err[10], lan.ship.err[11]],
		[5, lan.ship.insert_time, 1, lan.ship.err[12]]
	];	
}

ship.sortFun = function()
{
	return [lan.ship.id, lan.ship.num, lan.ship.sum, lan.ship.insert_time];
}

ship.top = function()
{
	ship.draftOption = new Array();
	for(var i = 0; i < buf.draft.length; i++)
	{
		if(buf.draft[i].type != 8) continue;
		ship.draftOption.push('<option value="' + buf.draft[i].id + '">' + buf.draft[i].name + '</option>');
	}
	ship.profileOption = new Array();
	for(var i = 0; i < buf.profile.length; i++)
	{
		if(buf.profile[i].type != 6) continue;
		ship.profileOption.push('<option value="' + buf.profile[i].id + '">' + buf.profile[i].name + '</option>');
	}

	adm.bstate('shipment');

	adm.initialize(lan.ship.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.ship.title, adm.getSearch('shipment.php', 'ship.searchFun()', 'ship.searchQI', 'ship.sortQI') + ' ' + adm.getSort('shipment.php', 'ship.sortFun()', 'ship.searchQI', 'ship.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.ship.id + '</th><th>' + lan.ship.order + '</th><th>' + lan.ship.invoice + '</th><th>' + lan.ship.num + '</th><th>' + lan.ship.sum + '</th><th>' + lan.ship.insert_time + '</th></thead><tbody>');
}

ship.menu = function(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime)
{
	var arr = new Array();
	arr.push(['javascript:ord.searchQI = \'0$' + orderID + '$' + orderID + '\'; ord.sortQI = \'\'; adm.post(\'order.php\', \'searchQI=0$' + orderID + '$' + orderID + '\');', 'admin/icon00.gif', lan.ship.order_tip]);
	arr.push(['javascript:shop.searchQI = \'0$' + shopID + '$' + shopID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + shopID + '$' + shopID + '\');', 'admin/icon00.gif', lan.ship.shop_tip]);
	arr.push(['javascript:tsa.searchQI = \'9$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=9$' + ID + '\');', 'admin/icon00.gif', lan.ship.transaction_tip]);
	arr.push([]);
	if(ship.profileOption.length > 0) arr.push(['javascript:ship.print(\'' + ID + '\');void(0);', 'shipment.l0/icon02.gif', lan.ship.print]);
	if(ship.profileOption.length > 0 && ship.draftOption.length > 0) arr.push(['javascript:ship.send(' + ID + ');void(0);', 'shipment.l0/icon03.gif', lan.ship.send]);
	return arr;
}

ship.elem = function(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime)
{
	var menu = adm.getMenu(ship.menu(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime));
	adm.write('<tr' + (ship.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + orderID + '</td><td' + adm.getFrameStyle(listID) + '>' + invoiceID + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + num + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.pri.replace('%A%', sum / 100) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>' + adm.getFrame(listID, 8, '<tr>' + adm.getDetail(lan.ship.id, ID, 1) + adm.getDetail(lan.ship.order, orderID, 1) + adm.getDetail(lan.ship.invoice, invoiceID, 1) + adm.getDetail(lan.ship.insert_time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.ship.sum, lan.sys.pri.replace('%A%', sum / 100), 1) + adm.getDetail(lan.ship.num, num, 1) + '</tr><tr>' + adm.getDetail(lan.ship.address, address != '' ? sys.mEncode(address) : lan.gen.none, 3) + adm.getDetail(lan.ship.extra_address, extraAddress != '' ? sys.mEncode(extraAddress) : lan.gen.none, 3) + '</tr>'));
}

ship.empty = function()
{
	adm.write('<tr><td colspan="8" align="center">' + lan.ship.empty + '</td></tr>');
}

ship.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar((ship.profileOption.length > 0 ? ('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.ship.print, lan.gen.err_empty); else ship.print(adm.getAll(\'main\', \',\'));">' + lan.ship.print + '</a> ') : '') + '<a class="btn btn-outline-dark btn-sm" target="_blank" href="" onclick="this.href=\'shipment.php?action=exp&searchQI=\' + ship.searchQI;return true;">' + lan.ship.exp + '</a>', 7, '') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('ship.buf', 'shipment.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.ship.info);
}

ship.print = function(IDList)
{
	adm.showForm('main', '', lan.ship.print, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ship.print_profile, '', '<select class="form-control" id="profileID">' + ship.profileOption.join('') + '</select>', '') + '</div><input type="hidden" id="IDList" value="' + IDList + '"/></form>', lan.ship.print_submit, ship.printSubmit);
}

ship.printSubmit = function()
{
	window.open('shipment.php?action=print&profileID=' + document.getElementById('profileID').value + '&IDList=' + document.getElementById('IDList').value, "_blank");
	return null;
}

ship.send = function(ID)
{
	adm.showForm('main', '', lan.ship.send, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ship.send_draft, '', '<select class="form-control" name="draftID">' + ship.draftOption.join('') + '</select>', '') + adm.getOption(lan.ship.send_profile, '', '<select class="form-control" name="profileID">' + ship.profileOption.join('') + '</select>', '') + '</div><input type="hidden" name="ID" value="' + ID + '"/></form>', lan.ship.send_submit, ship.sendSubmit);
}

ship.sendSubmit = function()
{
	return ['shipment.php?action=send', $('form#mainform').serialize()];
}
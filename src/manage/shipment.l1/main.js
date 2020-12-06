ship.result0 = ship.result;
ship.result = function(id, info)
{
	switch(id)
	{
		case 2:
			adm.suspend();
			adm.updbuffer(ship.buf, info.toString());
			adm.gopage(ship.buf, ship.buf.page - 1, 'shipment.php');
			break;
		case 3:
			ship.result0(0, info);
			break;
		case 4:
			ship.result0(1, info);
			break;
		default:
			ship.result0(id, info);
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
		[5, lan.ship.insert_time, 1, lan.ship.err[12]],
		[4, lan.ship.reference, lan.ship.err[13]],
		[3, lan.ship.type, ship.getType]
	];	
}

ship.menu0 = ship.menu;
ship.menu = function(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime, referenceID, type)
{
	var arr = ship.menu0(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime);
	if(lan.ship.link[type]) arr.push([lan.ship.link[type].replace('%A%', referenceID), 'shipment.l0/icon02.gif', lan.ship.tracking, '_blank']);
	arr.push([]);
	arr.push(['javascript:ship.edit(' + listID + ', ' + ID + ', document.getElementById(\'referenceID.' + listID + '\').value, ' + type + ');void(0);', 'shipment.l1/icon01.gif', lan.ship.edit]);

	var i = 0;
	while(arr[i].length > 0) i++;
	arr.splice(i, 0, ['javascript:trac.searchQI = \'1$' + ID + '\'; trac.sortQI = \'\'; adm.post(\'tracking.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.ship.tracking_tip]);

	return arr;
}

ship.elem = function(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime, referenceID, type)
{
	var menu = adm.getMenu(ship.menu(listID, ID, orderID, invoiceID, shopID, num, sum, address, extraAddress, insertTime, referenceID, type));
	adm.write('<tr' + (ship.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '<input type="hidden" id="referenceID.' + listID + '" value="' + referenceID + '"></td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + orderID + '</td><td' + adm.getFrameStyle(listID) + '>' + invoiceID + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + num + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.pri.replace('%A%', sum / 100) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>' + adm.getFrame(listID, 9, '<tr>' + adm.getDetail(lan.ship.id, ID, 1) + adm.getDetail(lan.ship.order, orderID, 1) + adm.getDetail(lan.ship.invoice, invoiceID, 1) + adm.getDetail(lan.ship.insert_time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.ship.sum, lan.sys.pri.replace('%A%', sum / 100), 1) + adm.getDetail(lan.ship.num, num, 1) + adm.getDetail(lan.ship.reference, (referenceID == '' ? lan.gen.none : referenceID) + (ship.getType(type) == '' ? '' : (' (' + ship.getType(type) + ')')), 1) + '</tr><tr>' + adm.getDetail(lan.ship.address, address != '' ? sys.mEncode(adm.aEncode(address)) : lan.gen.none, 3) + adm.getDetail(lan.ship.extra_address, extraAddress != '' ? sys.mEncode(adm.aEncode(extraAddress)) : lan.gen.none, 4) + '</tr>'));
}

ship.getType = function(type)
{
	switch(parseInt(type))
	{
		case 0: return lan.ship.type_0;
		case 1: return lan.ship.type_1;
	}
	return '';
}

ship.edit = function(listID, ID, referenceID, type)
{
	var typeArr = new Array();
	for(var i = 0; i < 1024; i++)
	{
		var typeStr = ship.getType(i);
		if(typeStr == '') continue;
		typeArr.push('<option value="' + i + '"' + (type == i ? ' selected' : '') + '>' + typeStr + '</option>');
	}

	var str = new Array();
	str.push('<div class="form-row">' + adm.getOption(lan.ship.edit_title_0, '', '<input type="text" class="form-control" id="referenceID" name="referenceID" value="' + referenceID + '" autocomplete="off"/>', lan.ship.err[14]) + adm.getOption(lan.ship.edit_title_1, '', '<select name="type" class="form-control"><option value="0"></option>' + typeArr.join('') + '</select>', '') + '</div>');
	adm.showForm('main', '', lan.ship.edit, '<form id="mainform" class="was-validated">' + str.join('') + '<input type="hidden" name="ID" value="' + ID + '"/></form>', lan.ship.edit_submit, ship.editSubmit);
}

ship.editSubmit = function()
{
	var form = document.getElementById('mainform');
	var referenceID = document.getElementById('referenceID');
	referenceID.setCustomValidity(referenceID.value.length > 31 ? lan.ship.err[14] : '');
	return form.checkValidity() ? ['shipment.php?action=edit', $('form#mainform').serialize()] : null;
}
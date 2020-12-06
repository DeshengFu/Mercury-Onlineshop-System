var trac = new Object();

trac.buffer = function(buffer, size, offset, show, records, list)
{
	trac.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

trac.clear = function()
{
	trac.searchQI = '';
	trac.sortQI = '';
}

trac.result = function(id, info)
{
	switch(id)
	{
		case 1:
			adm.suspend();
			adm.mergbuffer(trac.buf, info);
			adm.gopage(trac.buf, trac.buf.page - 1, 'tracking.php');
			break;
		case 2:
			adm.suspend();
			adm.delbuffer(trac.buf, info);
			adm.gopage(trac.buf, trac.buf.page - 1, 'tracking.php');
			break;
		case 0:
			$('#main').modal('show');
			document.getElementById('shipmentID').setCustomValidity(lan.trac.err[6]);
			break;
	}
}

trac.searchFun = function()
{
	return [
		[0, lan.trac.id, lan.trac.err[0], lan.trac.err[1], lan.trac.err[2]],
		[6, lan.trac.shipment, lan.trac.err[3]],
		[3, lan.trac.type, trac.getType],
		[4, lan.trac.reference, lan.trac.err[4]],
		[5, lan.trac.insert_time, 1, lan.trac.err[5]]
	];
}

trac.sortFun = function()
{
	return [lan.trac.id, lan.trac.reference, lan.trac.type, lan.trac.insert_time];
}

trac.top = function()
{
	adm.bstate('tracking');

	adm.initialize(lan.trac.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.trac.title, adm.getSearch('tracking.php', 'trac.searchFun()', 'trac.searchQI', 'trac.sortQI') + ' ' + adm.getSort('tracking.php', 'trac.sortFun()', 'trac.searchQI', 'trac.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.trac.id + '</th><th>' + lan.trac.shipment + '</th><th>' + lan.trac.reference + '</th><th>' + lan.trac.information + '</th><th>' + lan.trac.insert_time + '</th></thead><tbody>');
}

trac.menu = function(listID, ID, shipmentID, type, referenceID, information, insertTime)
{
	var arr = new Array();
	arr.push(['javascript:ord.searchQI = \'0$' + shipmentID + '$' + shipmentID + '\'; ship.sortQI = \'\'; adm.post(\'shipment.php\', \'searchQI=0$' + shipmentID + '$' + shipmentID + '\');', 'admin/icon00.gif', lan.trac.shipment_tip]);
	if(lan.ship.link[type]) arr.push([lan.ship.link[type].replace('%A%', referenceID), 'tracking.l0/icon03.gif', lan.trac.tracking, '_blank']);
	arr.push([]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.trac.del, lan.trac.del_tip, \'tracking.php\', \'action=del&IDList=' + ID + '\');void(0);', 'tracking.l0/icon01.gif', lan.trac.del]);
	return arr;
}

trac.elem = function(listID, ID, shipmentID, type, referenceID, information, insertTime)
{
	var menu = adm.getMenu(trac.menu(listID, ID, shipmentID, type, referenceID, information, insertTime));
	adm.write('<tr' + (trac.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + shipmentID + '</td><td' + adm.getFrameStyle(listID) + '>' + (referenceID == '' ? lan.gen.none : referenceID) + (ship.getType(type) == '' ? '' : (' (' + ship.getType(type) + ')')) + '</td>' + adm.getFrameInfo(listID, 45, information) + '<td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>' + adm.getFrame(listID, 7, '<tr>' + adm.getDetail(lan.trac.id, ID, 1) + adm.getDetail(lan.trac.shipment, shipmentID, 1) + adm.getDetail(lan.trac.reference, (referenceID == '' ? lan.gen.none : referenceID) + (ship.getType(type) == '' ? '' : (' (' + ship.getType(type) + ')')), 1) + adm.getDetail(lan.trac.insert_time, adm.getTimeStr(insertTime), 1) + '</tr><tr>' + adm.getDetail(lan.trac.information, information, 4) + '</tr>'));
}

trac.empty = function()
{
	adm.write('<tr><td colspan="7" align="center">' + lan.trac.empty + '</td></tr>');
}

trac.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.trac.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.trac.del, lan.trac.del_tip, \'tracking.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.trac.del + '</a>', 5, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:trac.add();void(0);">' + lan.trac.add + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('trac.buf', 'tracking.php');
	adm.write('</div>');
	
	adm.uninitialize();

	adm.infobox(lan.trac.info);
}

trac.add = function()
{
	var typeArr = new Array();
	for(var i = 0; i < 1024; i++)
	{
		var typeStr = ship.getType(i);
		if(typeStr == '') continue;
		typeArr.push('<option value="' + i + '">' + typeStr + '</option>');
	}

	adm.showForm('main', 'modal-xl', lan.trac.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.trac.add_shipment, '', '<input type="text" class="form-control" id="shipmentID" name="shipmentID" value="' + adm.findSearch(1, 0, trac.searchQI) + '" autocomplete="off"/>', lan.trac.err[6]) + adm.getOption(lan.trac.add_reference, '', '<input type="text" class="form-control" id="referenceID" name="referenceID" autocomplete="off"/>', lan.trac.err[7]) + adm.getOption(lan.trac.add_type, '', '<select name="type" class="form-control"><option value="0"></option>' + typeArr.join('') + '</select>', '') + '</div><div class="form-row">' + adm.getOption(lan.trac.add_information, '', '<input type="text" class="form-control" id="information" name="information" autocomplete="off"/>', lan.trac.err[8]) + '</div></form>', lan.trac.add_submit, trac.addSubmit);
}

trac.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var shipmentID = document.getElementById('shipmentID');
	var referenceID = document.getElementById('referenceID');
	var information = document.getElementById('information');
	var shipmentIDv = parseInt(shipmentID.value);
	shipmentID.setCustomValidity(isNaN(shipmentIDv) || shipmentIDv < 1 ? lan.trac.err[6] : '');
	referenceID.setCustomValidity(referenceID.value.length > 31 ? lan.trac.err[7] : '');
	information.setCustomValidity(information.value.length > 31 ? lan.trac.err[8] : '');
	return form.checkValidity() ? ['tracking.php?action=add', $('form#mainform').serialize()] : null;
}





pet[81] = function(info)
{
	return lan.srecInfo[81].replace('%A%', info[0]).replace('%B%', info[1]).replace('%C%', info[2]).replace('%D%', ship.getType(parseInt(info[3])));
}

pet[82] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[82].replace('%A%', arr.join(', '));
}
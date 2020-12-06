var tsa = new Object();

tsa.buffer = function(buffer, size, offset, show, records, list)
{
	tsa.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

tsa.clear = function()
{
	tsa.searchQI = '';
	tsa.sortQI = '';
}

tsa.result = function(id, info)
{
	switch(id)
	{
		case 1:
			$('#main').modal('show');
			document.getElementById('offerID').setCustomValidity(lan.tsa.err[30]);
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('num').setCustomValidity(lan.tsa.err[31]);
			document.getElementById('num').value = info;
			break;
		case 0:
		case 4:
		case 7:
			$('#main').modal('show');
			document.getElementById('orderID').setCustomValidity(lan.tsa.err[29]);
			break;
		case 3:
		case 6:
		case 8:
		case 13:
		case 17:
			adm.suspend();
			adm.addbuffer(tsa.buf, info.toString());
			adm.gopage(tsa.buf, tsa.buf.page - 1, 'transaction.php');
			break;
		case 10:
			$('#main').modal('show');
			document.getElementById('num').setCustomValidity(lan.tsa.err[33]);
			document.getElementById('num').value = info;
			break;
		case 11:
		case 14:
		case 15:
			adm.suspend();
			adm.delbuffer(tsa.buf, info.toString());
			adm.gopage(tsa.buf, tsa.buf.page - 1, 'transaction.php');
			break;
		case 12:
		case 16:
		case 18:
		case 19:
			adm.suspend();
			adm.updbuffer(tsa.buf, info.toString());
			adm.gopage(tsa.buf, tsa.buf.page - 1, 'transaction.php');
			break;
		case 5:
			$('#main').modal('show');
			document.getElementById('code').setCustomValidity(lan.tsa.err[32]);
			break;
		case 9:
			adm.alert('alert', lan.tsa.delo, lan.tsa.err[28]);
			break;
	}
}

tsa.searchFun = function()
{
	return [
		[0, lan.tsa.id, lan.tsa.err[0], lan.tsa.err[1], lan.tsa.err[2]],
		[6, lan.tsa.user, lan.tsa.err[3]],
		[6, lan.tsa.shop, lan.tsa.err[4]],
		[6, lan.tsa.offer, lan.tsa.err[5]],
		[6, lan.tsa.article, lan.tsa.err[6]],
		[6, lan.tsa.coupon, lan.tsa.err[7]],
		[6, lan.tsa.code, lan.tsa.err[8]],
		[6, lan.tsa.order, lan.tsa.err[9]],
		[6, lan.tsa.invoice, lan.tsa.err[10]],
		[6, lan.tsa.shipment, lan.tsa.err[11]],
		[6, lan.tsa.target, lan.tsa.err[12]],
		[4, lan.tsa.service_id, lan.tsa.err[13]],
		[4, lan.tsa.tit, lan.tsa.err[14]],
		[4, lan.tsa.subtit, lan.tsa.err[15]],
		[4, lan.tsa.name, lan.tsa.err[16]],
		[4, lan.tsa.subname, lan.tsa.err[17]],
		[9, lan.tsa.price, lan.tsa.err[18], lan.tsa.err[19], lan.tsa.err[20]],
		[10, lan.tsa.tax, lan.tsa.err[21], lan.tsa.err[22], lan.tsa.err[23]],
		[2, lan.tsa.num, lan.tsa.err[24], lan.tsa.err[25], lan.tsa.err[26]],
		[3, lan.tsa.service, tsa.getService],
		[3, lan.tsa.flag, tsa.getFlag],
		[5, lan.tsa.insert_time, 1, lan.tsa.err[27]]
	];
}

tsa.sortFun = function()
{
	return [lan.tsa.id, lan.tsa.service_id, lan.tsa.tit, lan.tsa.subtit, lan.tsa.name, lan.tsa.subname, lan.tsa.price, lan.tsa.tax, lan.tsa.num, lan.tsa.insert_time];
}

tsa.top = function()
{
	adm.bstate('transaction');
	
	tsa.nsum = 0;
	tsa.psum = 0;

	adm.initialize(lan.tsa.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.tsa.title, adm.getSearch('transaction.php', 'tsa.searchFun()', 'tsa.searchQI', 'tsa.sortQI') + ' ' + adm.getSort('transaction.php', 'tsa.sortFun()', 'tsa.searchQI', 'tsa.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.tsa.id + '</th><th>' + lan.tsa.service_id + '</th><th>' + lan.tsa.invoice + '</th><th>' + lan.tsa.shipment + '</th><th>' + lan.tsa.tit + '</th><th>' + lan.tsa.name + '</th><th>' + lan.tsa.price + '</th><th>' + lan.tsa.tax + '</th><th>' + lan.tsa.num + '</th><th>' + lan.tsa.sum + '</th><th>' + lan.tsa.insert_time + '</th></thead><tbody>');
}

tsa.menu = function(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName)
{
	var arr = new Array();
	arr.push(['javascript:ord.searchQI = \'0$' + orderID + '$' + orderID + '\'; ord.sortQI = \'\'; adm.post(\'order.php\', \'searchQI=0$' + orderID + '$' + orderID + '\');', 'admin/icon00.gif', lan.tsa.order_tip]);
	if(shipmentID > 0) arr.push(['javascript:ship.searchQI = \'0$' + shipmentID + '$' + shipmentID + '\'; ship.sortQI = \'\'; adm.post(\'shipment.php\', \'searchQI=0$' + shipmentID + '$' + shipmentID + '\');', 'admin/icon00.gif', lan.tsa.shipment_tip]);
	arr.push(['javascript:user.searchQI = \'0$' + userID + '$' + userID + '\'; user.sortQI = \'\'; adm.post(\'user.php\', \'searchQI=0$' + userID + '$' + userID + '\');', 'admin/icon00.gif', lan.tsa.user_tip]);
	if(shopID != adm.cshop) arr.push(['javascript:shop.searchQI = \'0$' + shopID + '$' + shopID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + shopID + '$' + shopID + '\');', 'admin/icon00.gif', lan.tsa.shop_tip]);
	if(targetID != adm.cshop) arr.push(['javascript:shop.searchQI = \'0$' + targetID + '$' + targetID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + targetID + '$' + targetID + '\');', 'admin/icon00.gif', lan.tsa.target_tip]);
	if(targetID != shopID) arr.push(['javascript:band.searchQI = \'1$' + shopID + '|2$' + targetID + '\'; band.sortQI = \'\'; adm.post(\'band.php\', \'searchQI=1$' + shopID + '|2$' + targetID + '\');', 'admin/icon00.gif', lan.tsa.band_tip]);
	arr.push(['javascript:art.searchQI = \'0$' + articleID + '$' + articleID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=0$' + articleID + '$' + articleID + '\');', 'admin/icon00.gif', lan.tsa.article_tip]);
	if(targetID == adm.cshop) arr.push(['javascript:off.searchQI = \'0$' + offerID + '$' + offerID + '\'; off.sortQI = \'\'; adm.post(\'offer.php\', \'searchQI=0$' + offerID + '$' + offerID + '\');', 'admin/icon00.gif', lan.tsa.offer_tip]);
	arr.push([]);
	if(targetID == adm.cshop && num > 0) arr.push(['javascript:tsa.delo(' + listID + ', ' + ID + ', ' + num + ');void(0);', 'transaction.l0/icon01.gif', lan.tsa.delo]);
	return arr;
}

tsa.elem = function(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName)
{
	tsa.nsum += num;
	tsa.psum += Math.ceil(price * (1000 + tax) / 1000) * num;
	var serviceArr = new Array();
	for(var i = 0; i < buf.service.length; i++)
	{
		if(service & (1 << buf.service[i].index)) 
			serviceArr.push(buf.service[i].index < 8 ? lan.svs.sname[buf.service[i].index] : buf.service[i].name);
	}
	if(serviceArr.length == 0) serviceArr.push(lan.gen.none);
	var flagArr = new Array();
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag & (1 << buf.flag[i].index)) 
			flagArr.push(buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name);
	}
	if(flagArr.length == 0) flagArr.push(lan.gen.none);
	var menu = adm.getMenu(tsa.menu(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName));
	adm.write('<tr' + (tsa.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '<input type="hidden" id="order.' + ID + '" value="' + (invoiceID > 0 ? 0 : orderID) + '"><input type="hidden" id="serviceID.' + listID + '" value="' + serviceID + '"><input type="hidden" id="invoice.' + ID + '" value="' + (invoiceID == 0 ? 0 : invoiceID) + '"><input type="hidden" id="target.' + ID + '" value="' + (shipmentID > 0 ? 0 : targetID) + '"><input type="hidden" id="serviceID.' + listID + '" value="' + serviceID + '"><input type="hidden" id="title.' + listID + '" value="' + title + '"><input type="hidden" id="subTitle.' + listID + '" value="' + subTitle + '"><input type="hidden" id="name.' + listID + '" value="' + name + '"><input type="hidden" id="subName.' + listID + '" value="' + subName + '"></td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + serviceID + '</td><td' + adm.getFrameStyle(listID) + '>' + (invoiceID > 0 ? invoiceID : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + (shipmentID > 0 ? shipmentID : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + title + (invoiceID == 0 ? (' <span class="badge badge-secondary">' + lan.tsa.no_invoice + '</span>') : '') + '</td>' + (couponID == 0 ? ('<td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + (articleID > 0 && price != offerPrice ? ('<s>' + lan.sys.pri.replace('%A%', offerPrice / 100) + '</s>&nbsp;&nbsp;') : '') + lan.sys.pri.replace('%A%', price / 100) + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.perc.replace('%A%', tax / 10) + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + num + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + (articleID > 0 && price != offerPrice ? ('<s>' + lan.sys.pri.replace('%A%', Math.ceil(offerPrice * (1000 + tax) / 1000) * num / 100) + '</s>&nbsp;&nbsp;') : '') + lan.sys.pri.replace('%A%', Math.ceil(price * (1000 + tax) / 1000) * num / 100) + '</td>') : '<td colspan="5"></td>') + '<td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>');
	adm.write(adm.getFrame(listID, 13, '<tr>' + adm.getDetail(lan.tsa.id, ID, 1) + adm.getDetail(lan.tsa.invoice, invoiceID > 0 ? invoiceID : lan.gen.none, 1) + adm.getDetail(lan.tsa.tit, title, 1) + (couponID == 0 ? adm.getDetail(lan.tsa.name, name, 1) : '') + (couponID == 0 ? adm.getDetail(lan.tsa.price, lan.sys.pri.replace('%A%', price / 100), 1) : '') + (couponID == 0 ? adm.getDetail(lan.tsa.tax, lan.sys.perc.replace('%A%', tax / 10), 1) : '') + '</tr><tr>' + adm.getDetail(lan.tsa.service_id, serviceID, 1) + adm.getDetail(lan.ord.insert_time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.tsa.subtit, subTitle, 1) + (couponID == 0 ? adm.getDetail(lan.tsa.subname, subName, 1) : '') + (couponID == 0 ? adm.getDetail(lan.tsa.num, num, 1) : '') + (couponID == 0 ? adm.getDetail(lan.tsa.sum, lan.sys.pri.replace('%A%', Math.ceil(price * (1000 + tax) / 1000) * num / 100), 1) : '') + '</tr>' + (articleID > 0 ? ('<tr>' + adm.getDetail(lan.tsa.shop, shopName, 1) + adm.getDetail(lan.tsa.target, targetName, 1) + adm.getDetail(lan.tsa.service, serviceArr.join(', '), 1) + adm.getDetail(lan.tsa.flag, flagArr.join(', '), 1) + adm.getDetail(lan.tsa.offer_price, lan.sys.pri.replace('%A%', offerPrice / 100), 2) + '</tr>') : '')));
}

tsa.empty = function()
{
	adm.write('<tr><td colspan="13" align="center">' + lan.tsa.empty + '</td></tr>');
}

tsa.bottom = function()
{
	adm.write('<tr class="table-info"><td colspan="10" align="right"><b>' + lan.tsa.total + '</b></td><td align="right">' + tsa.nsum + '</td><td align="right">' + lan.sys.pri.replace('%A%', tsa.psum / 100) + '</td><td></td></tr>');
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.tsa.cship, lan.gen.err_empty); else if(arr = tsa.checkIDListS(lan.tsa.cship)) adm.get(\'transaction.php\', \'action=cship&invoiceID=\' + arr[0] + \'&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.tsa.cship + '</a>&nbsp;', 11, '') + adm.getFrameBar('', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('tsa.buf', 'transaction.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.tsa.info);
}
tsa.checkIDListS = function(title)
{
	var invoice = 0;
	var target = adm.cshop;
	var IDs = adm.getAll('main', ',').split(',');
	for(var i = 0; i < IDs.length; i++)
	{
		if(invoice == 0) invoice = document.getElementById('invoice.' + IDs[i]).value;
		if(invoice == 0 || document.getElementById('invoice.' + IDs[i]).value != invoice)
		{
			adm.alert('alert', title, lan.tsa.err[43]);
			return null;
		}
		if(target == 0 || document.getElementById('target.' + IDs[i]).value != target)
		{
			adm.alert('alert', title, lan.tsa.err[43]);
			return null;
		}
	}
	return [invoice, target];
}

tsa.delo = function(listID, ID, num)
{
	adm.showForm('main', '', lan.tsa.delo, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.tsa.del_num, '', '<input type="text" class="form-control" id="num" name="num" value="' + num + '" autocomplete="off"/>', lan.tsa.err[33]) + '</div><input type="hidden" name="ID" value="' + ID + '"/></form>', lan.tsa.del_submit, tsa.deloSubmit);
}

tsa.deloSubmit = function()
{
	var form = document.getElementById('mainform');
	var num = document.getElementById('num');
	var numv = parseInt(num.value);
	num.setCustomValidity(isNaN(numv) || numv < -2147483647 || numv == 0 || numv > 2147483647 ? lan.tsa.err[33] : '');
	return form.checkValidity() ? ['transaction.php?action=delo', $('form#mainform').serialize()] : null;
}

tsa.getService = function(service)
{
	for(var i = 0; i < buf.service.length; i++)
	{
		if(service == buf.service[i].index + 1) return buf.service[i].index < 8 ? lan.svs.sname[buf.service[i].index] : buf.service[i].name;
	}
	return '';
}

tsa.getFlag = function(flag)
{
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag == buf.flag[i].index + 1) return buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name;
	}
	return '';
}










pet[46] = function(info)
{
	return lan.srecInfo[46].replace('%A%', info[0]).replace('%B%', info[1]).replace('%C%', info[2]).replace('%D%', info[3]);
}

pet[47] = function(info)
{
	var tmp = info[3].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[47].replace('%A%', info[0]).replace('%B%', info[1]).replace('%C%', info[2]).replace('%D%', arr.join(', '));
}
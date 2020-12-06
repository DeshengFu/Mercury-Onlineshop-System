var ord = new Object();

pi.uarea = true;

ord.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.get('order.inf.php?page=' + ord.page);
			break;
		case 1:
			pi.alert('alert', lan.addr.title, lan.gen.login_err);
			break;
	}
}

ord.initialize = function()
{
	pi.initialize(lan.ord.title);

	pi.drawTop();

	pi.drawBar(lan.user.title + '$user.html|' + lan.ord.title + '$javascript:;', '');

	pi.drawFrame();
	
	pi.drawBottom();

	pi.uninitialize();

	pi.get('order.inf.php', 'page=1');
}

ord.drawTop = function()
{
	pi.finitialize();

	pi.write('<div class="row"><div class="col"><h5>' + lan.ord.title + '</h5></div><div class="col" align="right"></div></div><br>');

	pi.write('<table class="table"><thead><th width="8%"></th><th width="10%">' + lan.ord.id + '</th><th width="10%">' + lan.ord.sum + '</th><th width="15%">' + lan.ord.state + '</th><th width="42%">' + lan.ord.address + '</th><th width="15%">' + lan.ord.insert_time + '</th></thead><tbody>');
}

ord.drawBottom = function()
{
	pi.write('</tbody></table><br>');
	pi.pagelist(ord.page, ord.record, ord.count, 'order.inf.php');
	pi.write('<br><ol style="margin-left:-20px">');
	for(var i = 0; i < lan.ord.info.length; i++) pi.write('<li>' + lan.ord.info[i] + '</li>');
	pi.write('</ol>');

	pi.funinitialize();
}

ord.drawElem = function(listId, id, sum, openSum, element, openElement, address, email, insertTime, insertIp, updateTime, extraAddress, linkPass)
{
	var stateStr = new Array();
	if(openSum == sum) stateStr.push(lan.ord.state_0);
	if(openSum > 0 && openSum < sum) stateStr.push(lan.ord.state_1);
	if(openSum < 0) stateStr.push(lan.ord.state_2);
	if(openElement == element) stateStr.push(lan.ord.state_3);
	if(openElement < element) stateStr.push(lan.ord.state_4);

	var arr = new Array();
	arr.push(['javascript:eda.show(' + listId + ', ' + id + ');void(0);', lan.ord.show]);
	arr.push([]);
	var invoiceArr = ord.invoice == '' ? new Array() : ord.invoice.split('|');
	var shipmentArr = ord.shipment == '' ? new Array() : ord.shipment.split('|');
	var count = 0;
	for(var i = 0; i < invoiceArr.length; i++)
	{
		var invoiceInfo = invoiceArr[i].split('$');
		if(parseInt(invoiceInfo[1]) != id) continue;
		arr.push(['order.opt.php?action=printi&ID=' + invoiceInfo[0], lan.ord.download_invoice.replace('%A%', invoiceInfo[0])]);
		count++;
		if(count >= 3) break;
	}
	count = 0;
	for(var i = 0; i < shipmentArr.length; i++)
	{
		var shipmentInfo = shipmentArr[i].split('$');
		if(parseInt(shipmentInfo[1]) != id) continue;
		arr.push(['order.opt.php?action=prints&ID=' + shipmentInfo[0], lan.ord.download_shipment.replace('%A%', shipmentInfo[0])]);
		count++;
		if(count >= 3) break;
	}
	count = 0;
	if(tmpl.tracking)
	{
		arr.push([]);
		for(var i = 0; i < shipmentArr.length; i++)
		{
			var shipmentInfo = shipmentArr[i].split('$');
			if(parseInt(shipmentInfo[1]) != id) continue;
			arr.push(tmpl.trackingExt && lan.ship.link[parseInt(shipmentInfo[3])] ? [lan.ship.link[parseInt(shipmentInfo[3])].replace('%A%', shipmentInfo[2]), lan.ord.tracking_shipment.replace('%A%', shipmentInfo[0]), '_blank'] : ['void(0);', lan.ord.tracking_shipment.replace('%A%', shipmentInfo[0])]);
			count++;
			if(count >= 3) break;
		}
	}

	var subscriptionArr = ord.subscription == '' ? new Array() : ord.subscription.split('|');
	///////////////
	pi.write('<tr><td style="padding:0px;vertical-align:middle">' + pi.getInPageMenu(arr) + '</td><td>' + id + '</td><td align="right">' + lan.sys.pri.replace('%A%', sum / 100) + '</td><td>' + stateStr.join(' / ') + '</td><td>' + sys.lEncode(inf.aEncode(address)) + '</td><td>' + pi.getTimeStr(insertTime) + '</td></tr>');
}

ord.drawEmpty = function()
{
	pi.write('<tr><td colspan="6" align="center">' + lan.ord.empty + '</td></tr>');
}



var adda = new Object();

adda.show = function(listId)
{
	pi.showForm('main', '', lan.adda.title, '<form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.adda.name, '', '<input type="text" class="form-control" id="name"/>', lan.adda.err[0]) + pi.getOption(lan.adda.surname, '', '<input type="text" class="form-control" id="surname"/>', lan.adda.err[1]) + '</div><div class="form-row">' + pi.getOption(lan.adda.organization, '', '<input type="text" class="form-control" id="organization"/>', lan.adda.err[2]) + '</div><div class="form-row">' + pi.getOption(lan.adda.street, '', '<input type="text" class="form-control" id="street"/>', lan.adda.err[3], 'col-md-10') + pi.getOption(lan.adda.num, '', '<input type="text" class="form-control" id="num"/>', lan.adda.err[4], 'col-md-2') + '</div><div class="form-row">' + pi.getOption(lan.adda.extension, '', '<input type="text" class="form-control" id="extension"/>', lan.adda.err[5]) + '</div><div class="form-row">' + pi.getOption(lan.adda.zip, '', '<input type="text" class="form-control" id="zip"/>', lan.adda.err[6], 'col-md-2') + pi.getOption(lan.adda.city, '', '<input type="text" class="form-control" id="city"/>', lan.adda.err[7], 'col-md-5') + pi.getOption(lan.adda.country, '', '<input type="text" class="form-control" id="country"/>', lan.adda.err[8], 'col-md-5') + '</div><div class="form-row">' + pi.getOption(lan.adda.telephone, '', '<input type="text" class="form-control" id="telephone"/>', lan.adda.err[9]) + '</div><textarea id="address" name="address" style="display:none"></textarea></form>', lan.adda.submit, adda.submit);
}

adda.submit = function()
{
	document.getElementById('address').value = document.getElementById('name').value + '  ' + document.getElementById('surname').value + '\n' + document.getElementById('organization').value + '\n' + document.getElementById('street').value + '  ' + document.getElementById('num').value + '\n' + document.getElementById('extension').value + '\n' + document.getElementById('zip').value + '  ' + document.getElementById('city').value + '  ' + document.getElementById('country').value + '\n' + document.getElementById('telephone').value;

	var form = document.getElementById('mainform');
	var name = document.getElementById('name');
	var surname = document.getElementById('surname');
	var organization = document.getElementById('organization');
	var street = document.getElementById('street');
	var num = document.getElementById('num');
	var extension = document.getElementById('extension');
	var zip = document.getElementById('zip');
	var city = document.getElementById('city');
	var country = document.getElementById('country');
	var telephone = document.getElementById('telephone');
	name.setCustomValidity((organization.value.length == 0 && name.value.length < 1) || name.value.length > 31 ? lan.adda.err[0] : '');
	surname.setCustomValidity((organization.value.length == 0 && surname.value.length < 1) || surname.value.length > 31 ? lan.adda.err[1] : '');
	organization.setCustomValidity(organization.value.length > 255 ? lan.adda.err[2] : '');
	street.setCustomValidity(street.value.length < 1 || street.value.length > 255 ? lan.adda.err[3] : '');
	num.setCustomValidity(num.value.length < 1 || num.value.length > 7 ? lan.adda.err[4] : '');
	extension.setCustomValidity(extension.value.length > 255 ? lan.adda.err[5] : '');
	zip.setCustomValidity(zip.value.length < 1 || zip.value.length > 7 ? lan.adda.err[6] : '');
	city.setCustomValidity(city.value.length < 1 || city.value.length > 31 ? lan.adda.err[7] : '');
	country.setCustomValidity(country.value.length < 1 || country.value.length > 63 ? lan.adda.err[8] : '');
	telephone.setCustomValidity(telephone.value.length > 31 ? lan.adda.err[9] : '');
	return form.checkValidity() ? ['address.opt.php?action=add', $('form#mainform').serialize()] : null;
}



var eda = new Object();

eda.show = function(listId, id)
{
	var ainfo = (document.getElementById('address.' + listId).innerHTML + '\n\n\n\n\n').split('\n');
	ainfo[0] = (ainfo[0] + '  ').split('  ');
	ainfo[2] = (ainfo[2] + '  ').split('  ');
	ainfo[4] = (ainfo[4] + '    ').split('  ');
	pi.showForm('main', '', lan.eda.title, '<form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.eda.name, '', '<input type="text" class="form-control" id="name" value="' + ainfo[0][0] + '"/>', lan.eda.err[0]) + pi.getOption(lan.eda.surname, '', '<input type="text" class="form-control" id="surname" value="' + ainfo[0][1] + '"/>', lan.eda.err[1]) + '</div><div class="form-row">' + pi.getOption(lan.eda.organization, '', '<input type="text" class="form-control" id="organization" value="' + ainfo[1] + '"/>', lan.eda.err[2]) + '</div><div class="form-row">' + pi.getOption(lan.eda.street, '', '<input type="text" class="form-control" id="street" value="' + ainfo[2][0] + '"/>', lan.eda.err[3], 'col-md-10') + pi.getOption(lan.eda.num, '', '<input type="text" class="form-control" id="num" value="' + ainfo[2][1] + '"/>', lan.eda.err[4], 'col-md-2') + '</div><div class="form-row">' + pi.getOption(lan.eda.extension, '', '<input type="text" class="form-control" id="extension" value="' + ainfo[3] + '"/>', lan.eda.err[5]) + '</div><div class="form-row">' + pi.getOption(lan.eda.zip, '', '<input type="text" class="form-control" id="zip" value="' + ainfo[4][0] + '"/>', lan.eda.err[6], 'col-md-2') + pi.getOption(lan.eda.city, '', '<input type="text" class="form-control" id="city" value="' + ainfo[4][1] + '"/>', lan.eda.err[7], 'col-md-5') + pi.getOption(lan.eda.country, '', '<input type="text" class="form-control" id="country" value="' + ainfo[4][2] + '"/>', lan.eda.err[8], 'col-md-5') + '</div><div class="form-row">' + pi.getOption(lan.eda.telephone, '', '<input type="text" class="form-control" id="telephone" value="' + ainfo[5] + '"/>', lan.eda.err[9]) + '</div><textarea id="address" name="address" style="display:none"></textarea><input type="hidden" name="ID" value="' + id + '"/></form>', lan.eda.submit, eda.submit);
}

eda.submit = function()
{
	document.getElementById('address').value = document.getElementById('name').value + '  ' + document.getElementById('surname').value + '\n' + document.getElementById('organization').value + '\n' + document.getElementById('street').value + '  ' + document.getElementById('num').value + '\n' + document.getElementById('extension').value + '\n' + document.getElementById('zip').value + '  ' + document.getElementById('city').value + '  ' + document.getElementById('country').value + '\n' + document.getElementById('telephone').value;

	var form = document.getElementById('mainform');
	var name = document.getElementById('name');
	var surname = document.getElementById('surname');
	var organization = document.getElementById('organization');
	var street = document.getElementById('street');
	var num = document.getElementById('num');
	var extension = document.getElementById('extension');
	var zip = document.getElementById('zip');
	var city = document.getElementById('city');
	var country = document.getElementById('country');
	var telephone = document.getElementById('telephone');
	name.setCustomValidity((organization.value.length == 0 && name.value.length < 1) || name.value.length > 31 ? lan.eda.err[0] : '');
	surname.setCustomValidity((organization.value.length == 0 && surname.value.length < 1) || surname.value.length > 31 ? lan.eda.err[1] : '');
	organization.setCustomValidity(organization.value.length > 255 ? lan.eda.err[2] : '');
	street.setCustomValidity(street.value.length < 1 || street.value.length > 255 ? lan.eda.err[3] : '');
	num.setCustomValidity(num.value.length < 1 || num.value.length > 7 ? lan.eda.err[4] : '');
	extension.setCustomValidity(extension.value.length > 255 ? lan.eda.err[5] : '');
	zip.setCustomValidity(zip.value.length < 1 || zip.value.length > 7 ? lan.eda.err[6] : '');
	city.setCustomValidity(city.value.length < 1 || city.value.length > 31 ? lan.eda.err[7] : '');
	country.setCustomValidity(country.value.length < 1 || country.value.length > 63 ? lan.eda.err[8] : '');
	telephone.setCustomValidity(telephone.value.length > 31 ? lan.eda.err[9] : '');
	return form.checkValidity() ? ['address.opt.php?action=edit', $('form#mainform').serialize()] : null;
}
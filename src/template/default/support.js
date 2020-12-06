var sup = new Object();

pi.uarea = true;

sup.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.get('support.inf.php?page=' + sup.page);
			break;
		case 1:
			pi.alert('alert', lan.addr.title, lan.gen.login_err);
			break;
		case 2:
			sup.messageList.push(info);
			sup.show(id, sup.messageList);
			break;
	}
}

sup.initialize = function()
{
	pi.initialize(lan.sup.title);

	pi.drawTop();

	pi.drawBar(lan.user.title + '$user.html|' + lan.sup.title + '$javascript:;', '');

	pi.drawFrame();
	
	pi.drawBottom();

	pi.uninitialize();

	pi.get('support.inf.php', 'page=1');
}

sup.drawTop = function()
{
	pi.finitialize();

	pi.write('<div class="row"><div class="col"><h5>' + lan.sup.title + '</h5></div><div class="col" align="right"><a class="btn btn-primary btn-sm" href="javascript:adds.show();void(0);">' + lan.sup.add + '</a></div></div><br>');

	pi.write('<table class="table"><thead><th width="8%"></th><th width="15%">' + lan.sup.id + '</th><th width="47%">' + lan.sup.state + '</th><th width="15%">' + lan.sup.insert_time + '</th><th width="15%">' + lan.sup.update_time + '</th></thead><tbody>');
}

sup.drawBottom = function()
{
	pi.write('</tbody></table><br>');
	pi.pagelist(sup.page, sup.record, sup.count, 'support.inf.php');
	pi.write('<br><ol style="margin-left:-20px">');
	for(var i = 0; i < lan.sup.info.length; i++) pi.write('<li>' + lan.sup.info[i] + '</li>');
	pi.write('</ol>');

	pi.funinitialize();
}

sup.drawElem = function(listId, id, shopID, state, insertTime, updateTime)
{
	var arr = new Array();
	arr.push(['javascript:pi.get(\'support.opt.php\', \'action=show&ID=' + id + '\');void(0);', lan.sup.message]);
	pi.write('<tr><td style="padding:0px;vertical-align:middle">' + pi.getInPageMenu(arr) + '</td><td>' + id + '</td><td>' + (state > 0 ? '' : lan.sup.closed) + '</td><td>' + pi.getTimeStr(insertTime) + '</td><td>' + pi.getTimeStr(updateTime) + '</td></tr>');
}

sup.drawEmpty = function()
{
	pi.write('<tr><td colspan="5" align="center">' + lan.sup.empty + '</td></tr>');
}

sup.show = function(id, messageList)
{
	sup.messageList = messageList;

	var cuser = inf.uGet();

	var str = new Array();
	for(var i = 0; i < messageList.length; i++)
	{
		var msg = messageList[i];
		if(msg[2] == 0)
			str.push('<div class="row"><div class="col alert alert-secondary"><b>' + (msg[3] == 0 ? lan.sup.system : msg[5]) + '</b>&nbsp;&nbsp;&nbsp;&nbsp;(' + pi.getTimeStr(msg[4]) + ')<hr>' + sys.mEncode(msg[1]) + '</div><div class="col col-lg-2"></div></div>');
		else
			str.push('<div class="row"><div class="col col-lg-2"></div><div class="col alert alert-primary"><b>' + cuser.email + '</b>&nbsp;&nbsp;&nbsp;&nbsp;(' + pi.getTimeStr(msg[4]) + ')<hr>' + sys.mEncode(msg[1]) + '</div></div>');
	}
	pi.showModal('modal', 'modal-xl', lan.sup.message + '&nbsp;&nbsp;(' + id + ')', '<div class="container" id="content">' + str.join('') + '</div><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption('', '', '<textarea class="form-control" id="message" name="message" rows="5"></textarea>', lan.sup.err[0]) + '<input type="hidden" name="ID" value="' + id + '"/></form>', '<button type="button" class="btn btn-black" onclick="">' + lan.sup.close + '</button> <button type="button" class="btn btn-primary" id="submit">' + lan.sup.reply + '</button>', true);
	document.getElementById('submit').onclick = function(){var res = sup.replySubmit(); if(res != null){$('#modal').on('hidden.bs.modal', function(e){$('#modal').off('hidden.bs.modal');pi.post(res[0], res[1]);}); $('#modal').modal('hide');}};
}

sup.replySubmit = function()
{
	var form = document.getElementById('mainform');
	var message = document.getElementById('message');
	var messagev = sys.uEncode(message.value);
	message.setCustomValidity(messagev.length < 1 || messagev.length > 4095 ? lan.sup.err[0] : '');
	return form.checkValidity() ? ['support.opt.php?action=reply', $('form#mainform').serialize()] : null;
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
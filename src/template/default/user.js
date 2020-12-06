var user = new Object();

pi.uarea = true;

user.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.user.title, lan.gen.login_err);
			break;
	}
}

user.initialize = function()
{
	pi.initialize(lan.user.title);

	pi.drawTop();

	pi.drawBar(lan.user.title + '$javascript:;', '');

	pi.drawFrame();
	
	pi.drawBottom();

	pi.uninitialize();

	pi.get('user.inf.php');
}

user.main = function(data, recordArr, addressArr)
{
	var addr = (data.address + '\n\n').split('\n');
	var isOrg = addr[0].trim().length == 0;
	var name = sys.mEncode(inf.aEncode(addr.slice(0, isOrg ? 2 : 1).join('\n')));
	var address = sys.mEncode(inf.aEncode(addr.slice(isOrg ? 2 : 1).join('\n')));

	pi.finitialize();

	pi.write('<div class="row"><div class="col"><h5>' + lan.user.title + '</h5></div><div class="col" align="right"><a class="btn btn-danger btn-sm" href="/manage" target="_blank">' + lan.user.manage + '</a> <a class="btn btn-primary btn-sm" href="order.html">' + lan.ord.ftitle + '</a> <a class="btn btn-primary btn-sm" href="address.html">' + lan.addr.ftitle + '</a></div></div><br>');
	pi.write('<table class="table"><tbody><tr><th scope="row">' + lan.user.id + '</th><td>' + data.id + ((data.state & 1) == 0 ? (' <span class="badge badge-secondary">' + user.getState0(1) + '</span>') : '') + ((data.state & 2) > 0 ? (' <span class="badge badge-danger">' + user.getState1(2) + '</span>') : '') + '</td><td align="right"></td><th scope="row">' + (isOrg ? lan.user.sname : lan.user.name) + '</th><td>' + name + '</td><td align="right"></td><th scope="row">' + lan.user.type + '</th><td>' + lan.utypeName[data.type] + '</td></tr><tr><th scope="row">' + lan.user.email + '</th><td>' + data.email + '</td><td align="right">' + (data.type < 10 ? '<a href="javascript:ce.show();void(0);">' + lan.ce.stitle + '</a>' : '') + '</td><th scope="row">' + (isOrg ? lan.user.sbirthday : lan.user.birthday) + '</th><td>' + (data.birthday > -2147483648 ? pi.getUTCDateStr(data.birthday) : '') + '</td><td align="right"></td><th scope="row">' + lan.user.register_time + '</th><td>' + pi.getTimeStr(data.registerTime) + '</td></tr><tr><th scope="row">' + lan.user.pass + '</th><td>********</td><td align="right"><a href="javascript:cp.show();void(0);">' + lan.cp.stitle + '</a></td><th scope="row" rowspan="3">' + lan.user.address + '</th><td rowspan="3">' + address + '</td><td align="right" rowspan="3"><a href="javascript:ci.show();void(0);">' + lan.ci.stitle + '</a></td><th scope="row">' + lan.user.update_time + '</th><td>' + pi.getTimeStr(data.updateTime) + '</td></tr><tr><th scope="row">' + lan.user.state + '</th><td>' + user.getState0(((data.state & 1) > 0 ? 1 : 0) + 1) + ' ' + user.getState1(((data.state & 2) > 0 ? 1 : 0) + 1) + '</td><td align="right">' + ((data.state & 1) == 0 ? ('<a href="javascript:pi.get(\'reactivate.php\');void(0);">' + lan.ra.stitle + '</a>') : '') + '</td><th scope="row">' + lan.user.access_time + '</th><td>' + (data.accessTime > 0 ? pi.getTimeStr(data.accessTime) : '') + '</td></tr><tr><th scope="row">' + lan.user.balance + '</th><td>' + lan.sys.pri.replace('%A%', data.balance / 100) + '</td><td align="right"><a href="javascript:chg.show();void(0);">' + lan.chg.stitle + '</a></td><th scope="row">' + lan.user.order_time + '</th><td>' + (data.orderTime > 0 ? pi.getTimeStr(data.orderTime) : '') + '</td></tr></tbody></table><textarea style="display:none" id="address.main">' + data.address + '</textarea><br>');
	
	pi.write('<div class="row"><div class="col"><h5>' + lan.rec.utitle + '</h5></div><div class="col" align="right"><a class="btn btn-primary btn-sm" href="record.html">' + lan.rec.ftitle + '</a></div></div><br>');
	pi.write('<table class="table"><thead><th width="20%">' + lan.rec.uname + '</th><th width="50%">' + lan.rec.uinf + '</th><th width="15%">' + lan.rec.utime + '</th><th width="15%">' + lan.rec.uip + '</th></thead><tbody>');
	for(var i = 0; i < recordArr.length; i++)
	{
		var listId = i;
		var id = recordArr[i][0];
		var type = recordArr[i][1];
		var info = recordArr[i][2];
		var insertIp = recordArr[i][3];
		var insertTime = recordArr[i][4];
		var nameStr = lan.recName[type] ? lan.recName[type] : lan.rec.unknown;
		var infoStr = put[type] ? put[type](info) : '';

		pi.write('<tr><td>' + nameStr + (insertIp == 0 ? (' <span class="badge badge-secondary">' + lan.rec.background + '</span>') : '') + '</td><td>' + infoStr + '</td><td>' + pi.getTimeStr(insertTime) + '</td><td>' + (insertIp > 0 ? pi.getIPStr(insertIp) : '') + '</td></tr>');
	}
	pi.write('</tbody></table><br>');

	pi.write('<br><ol style="margin-left:-20px">');
	for(var i = 0; i < lan.user.info.length; i++) pi.write('<li>' + lan.user.info[i] + '</li>');
	pi.write('</ol>');

	pi.funinitialize();

	if(user.cb)
	{
		user.cb = false;
		act.show(0);
	}
}

user.getState0 = function(state)
{
	switch(state)
	{
		case 1: return lan.user.state_0;
		case 2: return lan.user.state_1;
	}
	return '';
}

user.getState1 = function(state)
{
	switch(state)
	{
		case 1: return '';
		case 2: return lan.user.state_3;
	}
	return '';
}



var ra = new Object();

ra.result = function(id, info)
{
	switch(id)
	{
		case 0:
			act.show(0);
			break;
		case 1:
			pi.alert('alert', lan.ra.title, lan.ra.err[0]);
			break;
		case 2:
			pi.alert('alert', lan.ra.title, lan.gen.login_err);
			break;
	}
}



var cp = new Object();

cp.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.cp.title, lan.cp.succ);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('currPass').setCustomValidity(lan.cp.err[0]);
			break;
		case 2:
			pi.alert('alert', lan.cp.title, lan.gen.login_err);
			break;
	}
}

cp.show = function()
{
	pi.showForm('main', '', lan.cp.title, lan.cp.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.cp.passwordi, '', '<input type="password" class="form-control" id="currPass" name="currPass"/>', lan.cp.err[0]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.cp.password, '', '<input type="password" class="form-control" id="userPass" name="userPass"/>', lan.cp.err[1]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.cp.passwordc, '', '<input type="password" class="form-control" id="userPassc" name="userPassc"/>', lan.cp.err[2]) + '<div class="form-group col"></div></div></form>', lan.cp.submit, cp.submit);
}

cp.submit = function()
{
	var form = document.getElementById('mainform');
	var passi = document.getElementById('currPass');
	var pass = document.getElementById('userPass');
	var passc = document.getElementById('userPassc');
	passi.setCustomValidity(passi.value.length < 8 || passi.value.length > 32 ? lan.cp.err[0] : '');
	pass.setCustomValidity(pass.value.length < 8 || pass.value.length > 32 ? lan.cp.err[1] : '');
	passc.setCustomValidity(pass.value.length >= 8 && pass.value.length <= 32 && pass.value != passc.value ? lan.cp.err[2] : '');
	return form.checkValidity() ? ['changepass.php', $('form#mainform').serialize()] : null;
}



var chg = new Object();

chg.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.chg.title, lan.chg.succ);
			pi.get('user.inf.php');
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('pass').setCustomValidity(lan.chg.err[0]);
			break;
		case 2:
			pi.alert('alert', lan.chg.title, lan.gen.login_err);
			break;
		case 3:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
	}
}

chg.show = function()
{
	pi.showForm('main', '', lan.chg.title, lan.chg.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.chg.pass, '', '<input type="password" class="form-control" id="pass" name="pass"/>', lan.chg.err[0]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.chg.err[1] + '</div></form>', lan.chg.submit, chg.submit);
}

chg.submit = function()
{
	document.getElementById('mainError').style.display = 'none';
	var form = document.getElementById('mainform');
	var pass = document.getElementById('pass');
	pass.setCustomValidity(pass.value.length < 1 || pass.value.length > 32 ? lan.chg.err[0] : '');
	return form.checkValidity() ? ['charge.php', $('form#mainform').serialize()] : null;
}



var ce = new Object();

ce.result = function(id, info)
{
	switch(id)
	{
		case 0:
			document.getElementById('pi.umenu').innerHTML = pi.getUserMenu();
			pi.get('user.inf.php');
			user.cb = true;
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('currPass').setCustomValidity(lan.ce.err[1]);
			break;
		case 3:
			$('#main').modal('show');
			document.getElementById('userEmail').setCustomValidity(lan.ce.err[2]);
			break;
		case 4:
			pi.alert('alert', lan.ce.title, lan.gen.login_err);
			break;
	}
}

ce.show = function()
{
	var cuser = inf.uGet();
	pi.showForm('main', '', lan.ce.title, lan.ce.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.ce.passwordi, '', '<input type="password" class="form-control" id="currPass" name="currPass"/>', lan.ce.err[1]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.ce.email, '', '<input type="text" class="form-control" id="userEmail" name="userEmail" value="' + cuser.email + '"/>', lan.ce.err[2]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.ce.err[0] + '</div></form>', lan.ce.submit, ce.submit);
}

ce.submit = function()
{
	var form = document.getElementById('mainform');
	var passi = document.getElementById('currPass');
	var email = document.getElementById('userEmail');
	passi.setCustomValidity(passi.value.length < 8 || passi.value.length > 32 ? lan.ce.err[1] : '');
	email.setCustomValidity(!pi.checkEmail(email.value, 255) ? lan.ce.err[2] : '');
	return form.checkValidity() ? ['changeemail.php', $('form#mainform').serialize()] : null;
}



var ci = new Object();

ci.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.get('user.inf.php');
			break;
		case 1:
			pi.alert('alert', lan.ci.title, lan.gen.login_err);
			break;
	}
}

ci.show = function()
{
	var ainfo = (document.getElementById('address.main').innerHTML + '\n\n\n\n\n').split('\n');
	ainfo[2] = (ainfo[2] + '  ').split('  ');
	ainfo[4] = (ainfo[4] + '    ').split('  ');
	pi.showForm('main', '', lan.ci.title, '<form id="mainform" class="was-validated">' + (ainfo[0].trim() != '' ? ('<div class="form-row">' + pi.getOption(lan.ci.organization, '', '<input type="text" class="form-control" id="organization" value="' + ainfo[1] + '"/>', lan.ci.err[0]) + '</div>') : '') + '<div class="form-row">' + pi.getOption(lan.ci.street, '', '<input type="text" class="form-control" id="street" value="' + ainfo[2][0] + '"/>', lan.ci.err[1], 'col-md-10') + pi.getOption(lan.ci.num, '', '<input type="text" class="form-control" id="num" value="' + ainfo[2][1] + '"/>', lan.ci.err[2], 'col-md-2') + '</div><div class="form-row">' + pi.getOption(lan.ci.extension, '', '<input type="text" class="form-control" id="extension" value="' + ainfo[3] + '"/>', lan.ci.err[3]) + '</div><div class="form-row">' + pi.getOption(lan.ci.zip, '', '<input type="text" class="form-control" id="zip" value="' + ainfo[4][0] + '"/>', lan.ci.err[4], 'col-md-2') + pi.getOption(lan.ci.city, '', '<input type="text" class="form-control" id="city" value="' + ainfo[4][1] + '"/>', lan.ci.err[5], 'col-md-5') + pi.getOption(lan.ci.country, '', '<input type="text" class="form-control" id="country" value="' + ainfo[4][2] + '"/>', lan.ci.err[6], 'col-md-5') + '</div><div class="form-row">' + pi.getOption(lan.ci.telephone, '', '<input type="text" class="form-control" id="telephone" value="' + ainfo[5] + '"/>', lan.ci.err[7]) + '</div><textarea id="address" name="address" style="display:none"></textarea></form>', lan.ci.submit, ci.submit);
}

ci.submit = function()
{
	document.getElementById('address').value = (document.getElementById('organization') ? (document.getElementById('organization').value + '\n') : '') + document.getElementById('street').value + '  ' + document.getElementById('num').value + '\n' + document.getElementById('extension').value + '\n' + document.getElementById('zip').value + '  ' + document.getElementById('city').value + '  ' + document.getElementById('country').value + '\n' + document.getElementById('telephone').value;

	var form = document.getElementById('mainform');
	var organization = document.getElementById('organization');
	var street = document.getElementById('street');
	var num = document.getElementById('num');
	var extension = document.getElementById('extension');
	var zip = document.getElementById('zip');
	var city = document.getElementById('city');
	var country = document.getElementById('country');
	var telephone = document.getElementById('telephone');
	if(document.getElementById('organization')) organization.setCustomValidity(organization.value.length > 255 ? lan.ci.err[0] : '');
	street.setCustomValidity(street.value.length < 1 || street.value.length > 255 ? lan.ci.err[1] : '');
	num.setCustomValidity(num.value.length < 1 || num.value.length > 7 ? lan.ci.err[2] : '');
	extension.setCustomValidity(extension.value.length > 255 ? lan.ci.err[3] : '');
	zip.setCustomValidity(zip.value.length < 1 || zip.value.length > 7 ? lan.ci.err[4] : '');
	city.setCustomValidity(city.value.length < 1 || city.value.length > 31 ? lan.ci.err[5] : '');
	country.setCustomValidity(country.value.length < 1 || country.value.length > 63 ? lan.ci.err[6] : '');
	telephone.setCustomValidity(telephone.value.length > 31 ? lan.ci.err[7] : '');
	return form.checkValidity() ? ['changeinfo.php', $('form#mainform').serialize()] : null;
}
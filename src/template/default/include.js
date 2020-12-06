var pi = new Object();

pi.uarea = false;

pi.get = function(url, data = '', hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	pi.loading();
	sys.rGet(url, data, function(){pi.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

pi.post = function(url, data = '', hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	pi.loading();
	sys.rPost(url, data, function(){pi.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

pi.file = function(url, obj, hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	pi.loading();
	sys.rFile(url, new FormData(obj), function(){pi.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

pi.loading = function()
{
	$('#loading').modal({backdrop:'static'});
	$('#loading').modal('show');
}

pi.loaded = function()
{
	$('#loading').modal('hide');
}

pi.initialize = function(title)
{
	pi.isMobile = inf.dMobile();
	if(title != null) document.title = title + (title == '' ? '' : ' - ') + srv.siteName;
	inf.bInitialize();
}

pi.uninitialize = function()
{
	inf.bUninitialize();
}

pi.write = function(str)
{
	sys.bWrite(str);
}

pi.getConfirm = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + lan.gen.cancel + '</button><button type="button" class="btn btn-primary" id="' + id + '.action" onclick="void(0);">' + lan.gen.submit + '</button></div></div></div></div>';
}

pi.getAlert = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal" id="' + id + '.action">' + lan.gen.close + '</button></div></div></div></div>';
}

pi.getForm = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" id="' + id + '.frame" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + lan.gen.cancel + '</button><button type="button" class="btn btn-primary" id="' + id + '.submit"></button></div></div></div></div>';
}

pi.getModal = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" id="' + id + '.frame" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer" id="' + id + '.footer"></div></div></div></div>';
}

pi.confirm = function(id, title, str, url, data)
{
	document.getElementById(id + '.action').onclick = function(){$('#' + id).modal('hide');pi.get(url, data);};
	pi.alert(id, title, str);
}

pi.alert = function(id, title, str)
{
	document.getElementById(id + '.title').innerHTML = title;
	document.getElementById(id + '.body').innerHTML = str;
	$('#' + id).modal('show');
}

pi.showForm = function(id, size, title, body, submit, fun)
{
	document.getElementById(id + '.title').innerHTML = title;
	document.getElementById(id + '.body').innerHTML = body;
	document.getElementById(id + '.submit').style.display = submit == '' ? 'none' : 'inline';
	document.getElementById(id + '.submit').innerHTML = submit;
	document.getElementById(id + '.submit').onclick = function(){var res = fun(); if(res != null){$('#' + id).on('hidden.bs.modal', function(e){$('#' + id).off('hidden.bs.modal');if(typeof(res[1]) == 'string') pi.post(res[0], res[1]); else pi.file(res[0], res[1]);}); $('#' + id).modal('hide');}};
	document.getElementById(id + '.frame').classList.remove('modal-sm', 'modal-lg', 'modal-xl');
	if(size != '') document.getElementById(id + '.frame').classList.add(size);
	$('#' + id).modal('show');
	$('#' + id).modal('handleUpdate');
}

pi.showModal = function(id, size, title, body, footer, scroll)
{
	document.getElementById(id + '.title').innerHTML = title;
	document.getElementById(id + '.body').innerHTML = body;
	document.getElementById(id + '.footer').innerHTML = footer;
	document.getElementById(id + '.frame').classList.remove('modal-sm', 'modal-lg', 'modal-xl');
	if(size != '') document.getElementById(id + '.frame').classList.add(size);
	$('#' + id).modal('show');
	$('#' + id).modal('handleUpdate');
	if(scroll) $('#' + id).on('shown.bs.modal', function(){$('#' + id).animate({scrollTop:$('#' + id + ' .modal-content').height()}, 0);});
}

pi.getOption = function(title, info, code, err, ext = 'col')
{
	return '<div class="form-group ' + ext + '">' + (title != '' ? ('<label><b>' + title + '</b></label>') : '') + (info != '' ? ('<p class="text-secondary">' + info + '</p>') : '') + '<div class="input-group input-group-sm">' + code + '<div class="invalid-feedback">' + err + '</div></div></div>';
}

pi.getOptionEmpty = function()
{
	return '<div class="form-group col"></div>';
}

pi.pagelist = function(page, record, count, name)
{
	if(count == 0)
	{
		pi.write('<div class="row"><div class="col">&nbsp;</div></div>');
		return;
	}

	var start = page > 3 ? (page - 3) : 1;
	var end = page < (count - 3) ? (page + 3) : count;
	if(end - start < 6 && start == 1) end = start + 6 < count ? (start + 6) : count;
	if(end - start < 6 && end == count) start = end - 6 > 1 ? (end - 6) : 1;
	
	pi.write('<div class="row"><div class="col"></div><div class="col"><nav><ul class="pagination pagination-sm justify-content-center">');
	if(start > 1) pi.write('<li class="page-item"><a class="page-link" href="javascript:pi.get(\'' + name + '\', \'page=' + 1 + '\');">1' + (start > 2 ? ' ...' : '') + '</a></li>');
	for(var i = start; i < page; i++) pi.write('<li class="page-item"><a class="page-link" href="javascript:pi.get(\'' + name + '\', \'page=' + i + '\');">' + i + '</a></li>');
	pi.write('<li class="page-item active"><a class="page-link" href="javascript:$(\'html,body\').scrollTop(0);void(0);">' + page + '</a></li>');
	for(var i = page + 1; i <= end; i++) pi.write('<li class="page-item"><a class="page-link" href="javascript:pi.get(\'' + name + '\', \'page=' + i + '\');">' + i + '</a></li>');
	if(end < count) pi.write('<li class="page-item"><a class="page-link" href="javascript:pi.get(\'' + name + '\', \'page=' + count + '\');">' + (end < count - 1 ? '... ' : '') + count + '</a></li>');
	pi.write('</ul></nav></div><div class="col d-flex justify-content-end"><div><div class="input-group input-group-sm"><input type="text" id="pi.page" class="form-control" style="width:80px" value="' + page + '"><input type="button" class="btn btn-primary btn-sm" value="' + lan.gen.page_go + '" onclick="pi.get(\'' + name + '\', \'page=\' + parseInt(document.getElementById(\'pi.page\').value));"/><div class="input-group-prepend"><span class="input-group-text">' + lan.gen.page_info.replace('%A%', record).replace('%B%', count) + '</span></div></div></div></div></div>');
}

pi.replaceInput = function(str, gpat, pat)
{
	if(pat.length == 0) return str == '' ? '' : gpat.replace('%A%', str);
	var strpart = str.split(pat[0][0]);
	var arr = new Array();
	for(var i = 0; i < strpart.length; i++) arr.push(adm.replaceInput(strpart[i], gpat, pat.slice(1)));
	return arr.join(pat[0][1]);
}

pi.checkEmail = function(email, size)
{
	if(email.length > size) return false;
	for(var i = 0; i < email.length; i++)
	{
		if('0123456789abcdefghijklmnopqrstuvwxyz_-.@'.search(email.charAt(i)) < 0) return false;
	}
	if(email.search('@') < 0) return false;
	return true;
}

pi.getTimeStr = function(timeVal)
{
	var time = new Date(timeVal * 1000);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	if(month < 10) month = '0' + month;
	if(date < 10) date = '0' + date;
	if(hour < 10) hour = '0' + hour;
	if(minute < 10) minute = '0' + minute;
	return lan.sys.time.replace('%A%', year).replace('%B%', month).replace('%C%', date).replace('%D%', hour).replace('%E%', minute);
}

pi.getUTCDateStr = function(timeVal)
{
	var time = new Date(timeVal * 1000);
	var year = time.getUTCFullYear();
	var month = time.getUTCMonth() + 1;
	var date = time.getUTCDate();
	if(month < 10) month = '0' + month;
	if(date < 10) date = '0' + date;
	return lan.sys.utcdate.replace('%A%', year).replace('%B%', month).replace('%C%', date);
}

pi.getIPStr = function(ip)
{
	if(ip < 0) ip += 0x100000000;
	return Math.floor(ip / 16777216) + '.' + Math.floor((ip % 16777216) / 65536) + '.' + Math.floor((ip % 65536) / 256) + '.' + Math.floor(ip % 256);
}

pi.drawTop = function()
{
	pi.write('<div style="background:url(' + tmpl.path + '/top.gif) bottom center no-repeat,#404040;">');
	pi.write('<div class="container-fluid p-2 d-flex justify-content-between main-width"><div><a href="/"><img class="rounded float-left" src="' + tmpl.logo + '" title="' + srv.siteName + '" style="height:85px;padding:8px;padding-bottom:0px"/></a></div><div></div><div id="pi.umenu">' + pi.getUserMenu() + '</div></div>');
	pi.write('<div class="container-fluid d-flex justify-content-between main-width"><div>');
	var menuList = tmpl.menu_left.split('|');
	var hasMenu = false;
	for(var i = 0; i < menuList.length; i++)
	{
		var menuInfo = menuList[i].split('$');
		if(menuInfo[0] == '0')
		{
			if(hasMenu) pi.write('</div></div>');
			pi.write('<a class="btn btn-link" href="' + menuInfo[2] + '">' + menuInfo[1] + '</a>');
			hasMenu = false;
		}
		else if(menuInfo[0] == '1')
		{
			if(hasMenu) pi.write('</div></div>');
			pi.write('<div class="btn-group" role="group"><button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">' + menuInfo[1] + '</button><div class="dropdown-menu">');
			hasMenu = true;
		}
		else if(menuInfo[0] == '2')
		{
			if(!hasMenu) continue;
			pi.write('<a class="dropdown-item" href="' + menuInfo[2] + '">' + menuInfo[1] + '</a>');
		}
	}
	if(hasMenu) pi.write('</div></div>');
	pi.write('</div><div>');
	var menuList = tmpl.menu_right.split('|');
	var hasMenu = false;
	for(var i = 0; i < menuList.length; i++)
	{
		var menuInfo = menuList[i].split('$');
		if(menuInfo[0] == '0')
		{
			if(hasMenu) pi.write('</div></div>');
			pi.write('<a class="btn btn-link" href="' + menuInfo[2] + '">' + menuInfo[1] + '</a>');
			hasMenu = false;
		}
		else if(menuInfo[0] == '1')
		{
			if(hasMenu) pi.write('</div></div>');
			pi.write('<div class="btn-group" role="group"><button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">' + menuInfo[1] + '</button><div class="dropdown-menu">');
			hasMenu = true;
		}
		else if(menuInfo[0] == '2')
		{
			if(!hasMenu) continue;
			pi.write('<a class="dropdown-item" href="' + menuInfo[2] + '">' + menuInfo[1] + '</a>');
		}
	}
	if(hasMenu) pi.write('</div></div>');
	pi.write('</div></div>');
	pi.write('</div>');
}

pi.getUserMenu = function()
{
	var cuser = inf.uGet();

	var arr = new Array();
	if(cuser.id == 0)
		arr.push('<a class="btn btn-link" href="javascript:reg.show();void(0);" role="button">' + lan.reg.stitle + '</a> <a class="btn btn-link" href="javascript:li.show();void(0);" role="button">' + lan.li.stitle + '</a>');
	else
		arr.push('<div class="btn-group" role="group"><button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">' + cuser.email + '</button><div class="dropdown-menu"><a class="dropdown-item" href="user.html">' + lan.user.title + '</a><a class="dropdown-item" href="record.html">' + lan.rec.stitle + '</a><a class="dropdown-item" href="order.html">' + lan.ord.stitle + '</a><a class="dropdown-item" href="address.html">' + lan.addr.stitle + '</a><a class="dropdown-item" href="support.html">' + lan.sup.stitle + '</a><a class="dropdown-item" href="javascript:pi.get(\'logout.php\');void(0);">' + lan.lo.stitle + '</a></div></div>');
	arr.push('&nbsp;&nbsp;&nbsp;&nbsp;');
	return arr.join('');
}

pi.drawBottom = function()
{
	pi.write('<div style="background:url(' + tmpl.path + '/bottom.gif) top center no-repeat; #808080">');

	pi.write('<div class="container-fluid d-flex justify-content-between main-bar py-2 px-4 main-width">');
	var fs = tmpl.func.split('|');
	var inMenu = false;
	for(var i = 0; i < fs.length; i++)
	{
		var funInfo = fs[i].split('$');
		if(funInfo.length == 1 && inMenu)
		{
			pi.write('</div>');
			inMenu = false;
		}
		if(!inMenu)
			pi.write('<div class="text-barinfo"><img src="' + tmpl.path + '/bicon.gif">&nbsp;' + funInfo[0]);
		else
			pi.write('<div style="margin-left:18px;width:200px"><a class="text-barinfo" href="' + funInfo[0] + '">' + funInfo[1] + '</a></div>');
		inMenu = true;
	}
	if(inMenu) pi.write('</div>');
	pi.write('</div>');

	pi.write('<div class="container-fluid main-width py-1" align="center"><div style="border-top:1px solid #A0A0A0;width:99%"></div></div>');

	pi.write('<div class="container-fluid d-flex justify-content-between main-bar py-1 px-4 main-width"><div class="d-flex text-special">' + (document.getElementById('pi.bottomleft') ? document.getElementById('pi.bottomleft').innerHTML : '') + '<br>&nbsp;</div><div class="d-flex text-special">' + (document.getElementById('pi.bottomright') ? document.getElementById('pi.bottomright').innerHTML : '') + '<br>&nbsp;</div></div><div class="modal" id="loading" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-body" align="center"><div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div></div></div></div><div class="modal" id="loading" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-body" align="center"><div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div></div></div></div>');
	
	pi.write('</div>');
	pi.write(pi.getConfirm('confirm') + pi.getAlert('alert') + pi.getForm('main') + pi.getModal('modal'));
}

pi.drawBar = function(pos, extra)
{
	pi.write('<div style="background:url(' + tmpl.path + '/middle.gif) repeat-y center,#FFFFFF;">');
	pi.write('<div class="container-fluid d-flex justify-content-between p-4 main-width"><div class="d-flex" id="pi.bar">&nbsp;');
	pos = tmpl.pos + (tmpl.pos != '' && pos != '' ? '|' : '') + pos;
	var posArr = pos == '' ? new Array() : pos.split('|');
	for(var i = 0; i < posArr.length; i++)
	{
		if(i > 0) pi.write('&nbsp;&gt;&nbsp;');
		var posInfo = posArr[i].split('$');
		pi.write('<a href="' + posInfo[1] + '">' + posInfo[0] + '</a>');
	}
	pi.write('</div><div class="d-flex">' + extra + '</div></div>');
	pi.write('</div>');
}

pi.updateBar = function(pos)
{
	var arr = new Array();
	pos = tmpl.pos + (tmpl.pos != '' && pos != '' ? '|' : '') + pos;
	var posArr = pos == '' ? new Array() : pos.split('|');
	for(var i = 0; i < posArr.length; i++)
	{
		if(i > 0) arr.push('&nbsp;&gt;&nbsp;');
		var posInfo = posArr[i].split('$');
		arr.push('<a href="' + posInfo[1] + '">' + posInfo[0] + '</a>');
	}
	document.getElementById('pi.bar').innerHTML = '&nbsp;' + arr.join('');
}

pi.drawFrame = function()
{
	pi.write('<div style="background:url(' + tmpl.path + '/middle.gif) repeat-y center,#FFFFFF;">');
	pi.write('<div class="container-fluid p-4 main-width" style="min-height:500px" id="pi.frame"></div>');
	pi.write('</div>');
}

pi.getInPageMenu = function(arr)
{
	var hasElem = false;
	var nextMark = false;
	var str = new Array();
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i].length == 0)
		{
			nextMark = hasElem;
			continue;
		}
		str.push('<a class="dropdown-item" href="' + arr[i][0] + '"' + (arr[i].length == 3 ? (' target="' + arr[i][2] + '"') : '') + (nextMark ? ' style="border-top:1px solid #D0D0D0"' : '') + '>' + arr[i][1] + '</a>');
		nextMark = false;
		hasElem = true;
	}
	return '<div class="btn-group-sm" role="group"><div class="btn-group-sm" role="group"><button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">' + lan.gen.operation + '</button><div class="dropdown-menu">' + str.join('') + '</div></div></div>';
}

pi.finitialize = function()
{
	inf.bInitialize();
}

pi.funinitialize = function()
{
	document.getElementById('pi.frame').innerHTML = inf.bReturn();
}



var li = new Object();

li.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.li.title, lan.li.succ);
			if(pi.uarea)
			{
				location.reload();
				break;
			}
			document.getElementById('pi.umenu').innerHTML = pi.getUserMenu();
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('userPass').setCustomValidity(lan.li.err[1]);
			break;
	}
}

li.show = function()
{
	pi.showForm('main', '', lan.li.title, lan.li.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.li.email, '', '<input type="text" class="form-control" id="userEmail" name="userEmail"/>', lan.li.err[0]) + '<div class="form-group col align-self-end"><a class="btn btn-light" href="javascript:reg.show();void(0);" role="button">' + lan.li.register + '</a></div></div><div class="form-row">' + pi.getOption(lan.li.password, '', '<input type="password" class="form-control" id="userPass" name="userPass"/>', lan.li.err[1]) + '<div class="form-group col align-self-end"><a class="btn btn-light" href="javascript:rp.show();void(0);" role="button">' + lan.li.reset_pass + '</a></div></div><div class="form-row">' + pi.getOption('', '', '<div class="form-check"><input class="form-check-input" type="checkbox" value="30" id="saveCookie" name="saveCookie"><label class="form-check-label" for="saveCookie">' + lan.li.save_cookie + '</label></div>', '') + '</div><div class="invalid-feedback" id="mainError">' + lan.li.err[2] + '</div></form>', lan.li.submit, li.submit);
}

li.submit = function()
{
	document.getElementById('mainError').style.display = 'none';
	var form = document.getElementById('mainform');
	var email = document.getElementById('userEmail');
	var pass = document.getElementById('userPass');
	email.setCustomValidity(!pi.checkEmail(email.value, 255) ? lan.li.err[0] : '');
	pass.setCustomValidity(pass.value.length < 8 || pass.value.length > 32 ? lan.li.err[1] : '');
	return form.checkValidity() ? ['login.php', $('form#mainform').serialize()] : null;
}



var lo = new Object();

lo.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.lo.title, lan.lo.succ);
			if(pi.uarea)
			{
				location.reload();
				break;
			}
			document.getElementById('pi.umenu').innerHTML = pi.getUserMenu();
			break;
	}
}



var reg = new Object();

reg.result = function(id, info)
{
	switch(id)
	{
		case 0:
			act.show(0);
			document.getElementById('pi.umenu').innerHTML = pi.getUserMenu();
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('userEmail').setCustomValidity(lan.reg.err[0]);
			break;
	}
}

reg.show = function()
{
	pi.showForm('main', '', lan.reg.title, lan.reg.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.reg.email, '', '<input type="text" class="form-control" id="userEmail" name="userEmail"/>', lan.reg.err[0]) + '<div class="form-group col"><a href="oauth.php?type=0&name=google_login">G</a></div></div><div class="form-row">' + pi.getOption(lan.reg.password, '', '<input type="password" class="form-control" id="userPass" name="userPass"/>', lan.reg.err[1]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.reg.passwordc, '', '<input type="password" class="form-control" id="userPassc" name="userPassc"/>', lan.reg.err[2]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption('', '', '<div class="form-check"><input class="form-check-input" type="checkbox" value="1" id="agreement" name="agreement"><label class="form-check-label" for="agreement">' + tmpl.agreement + '</label><div class="invalid-feedback">' + lan.reg.err[3] + '</div></div>', '') + '</div><div class="invalid-feedback" id="mainError">' + lan.reg.err[4] + '</div></form>', lan.reg.submit, reg.submit);
}

reg.submit = function()
{
	document.getElementById('mainError').style.display = 'none';
	var form = document.getElementById('mainform');
	var email = document.getElementById('userEmail');
	var pass = document.getElementById('userPass');
	var passc = document.getElementById('userPassc');
	var agreement = document.getElementById('agreement');
	email.setCustomValidity(!pi.checkEmail(email.value, 255) ? lan.reg.err[0] : '');
	pass.setCustomValidity(pass.value.length < 8 || pass.value.length > 32 ? lan.reg.err[1] : '');
	passc.setCustomValidity(pass.value.length >= 8 && pass.value.length <= 32 && pass.value != passc.value ? lan.reg.err[2] : '');
	agreement.setCustomValidity(!agreement.checked ? lan.reg.err[3] : '');
	return form.checkValidity() ? ['register.php', $('form#mainform').serialize()] : null;
}



var rp = new Object();

rp.result = function(id, info)
{
	switch(id)
	{
		case 0:
			act.show(1);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('userEmail').setCustomValidity(lan.rp.err[0]);
			break;
	}
}

rp.show = function()
{
	pi.showForm('main', '', lan.rp.title, lan.rp.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.rp.email, '', '<input type="text" class="form-control" id="userEmail" name="userEmail"/>', lan.rp.err[0]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.rp.password, '', '<input type="password" class="form-control" id="userPass" name="userPass"/>', lan.rp.err[1]) + '<div class="form-group col"></div></div><div class="form-row">' + pi.getOption(lan.rp.passwordc, '', '<input type="password" class="form-control" id="userPassc" name="userPassc"/>', lan.rp.err[2]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.rp.err[3] + '</div></form>', lan.rp.submit, rp.submit);
}

rp.submit = function()
{
	document.getElementById('mainError').style.display = 'none';
	var form = document.getElementById('mainform');
	var email = document.getElementById('userEmail');
	var pass = document.getElementById('userPass');
	var passc = document.getElementById('userPassc');
	email.setCustomValidity(!pi.checkEmail(email.value, 255) ? lan.rp.err[0] : '');
	pass.setCustomValidity(pass.value.length < 8 || pass.value.length > 32 ? lan.rp.err[1] : '');
	passc.setCustomValidity(pass.value.length >= 8 && pass.value.length <= 32 && pass.value != passc.value ? lan.rp.err[2] : '');
	return form.checkValidity() ? ['resetpass.php', $('form#mainform').serialize()] : null;
}



var act = new Object();

act.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.act['title_' + info], lan.act['succ_' + info]);
			document.getElementById('pi.umenu').innerHTML = pi.getUserMenu();
			break;
		case 1:
			pi.alert('alert', lan.act['title_' + info], lan.act.err[0]);
			break;
	}
}

act.show = function(type)
{
	pi.showForm('main', '', lan.act['title_' + type], lan.act['tip_' + type] + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.act.code, '', '<input type="text" class="form-control" id="code" name="code"/>', lan.act.err[0]) + '<div class="form-group col"></div></div><input type="hidden" name="type" value="' + type + '"></form>', lan.act.submit, act.submit);
}

act.submit = function()
{
	var form = document.getElementById('mainform');
	var code = document.getElementById('code');
	var cinfo = (code.value + '-').split('-');
	var cinfov = parseInt(cinfo[0]);
	code.setCustomValidity(isNaN(cinfov) || cinfov < 1 || cinfov > 2147483647 || cinfo[1].length != 16 ? lan.act.err[0] : '');
	return form.checkValidity() ? ['activate.php', $('form#mainform').serialize()] : null;
}










var cti = new Object();

cti.result = function(id, info)
{
	switch(id)
	{
		case 0:
			var part = info.split('$');
			pi.alert('alert', lan.cti.title, lan.cti.info.replace('%A%', part[0]).replace('%B%', parseInt(part[1]) > 0 ? pi.getTimeStr(parseInt(part[1])) : '-').replace('%C%', lan.sys.pri.replace('%A%', parseInt(part[2]) / 100)).replace('%D%', pi.getTimeStr(parseInt(part[3]))).replace('%E%', pi.getTimeStr(parseInt(part[4]))));
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('code').setCustomValidity(lan.cti.err[0]);
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
	}
}

cti.show = function()
{
	pi.showForm('main', '', lan.cti.title, lan.cti.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.cti.code, '', '<input type="password" class="form-control" id="code" name="code" autocomplete="off"/>', lan.cti.err[0]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.cti.err[1] + '</div></form>', lan.cti.submit, cti.submit);
}

cti.submit = function()
{
	var form = document.getElementById('mainform');
	var code = document.getElementById('code');
	code.setCustomValidity(code.value.length < 1 || code.value.length > 32 ? lan.cti.err[0] : '');
	return form.checkValidity() ? ['checkticket.php', $('form#mainform').serialize()] : null;
}



var cps = new Object();

cps.result = function(id, info)
{
	switch(id)
	{
		case 0:
			var part = info.split('$');
			pi.alert('alert', lan.cps.title, lan.cps.info.replace('%A%', part[0]).replace('%B%', part[1]).replace('%C%', part[2]).replace('%D%', parseInt(part[3]) > 0 ? lan.cps.state1 : lan.cps.state0).replace('%E%', pi.getTimeStr(parseInt(part[4]))).replace('%F%', pi.getTimeStr(parseInt(part[5]))));
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('pass').setCustomValidity(lan.cps.err[0]);
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
	}
}

cps.show = function()
{
	pi.showForm('main', '', lan.cps.title, lan.cps.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.cps.pass, '', '<input type="password" class="form-control" id="pass" name="pass" autocomplete="off"/>', lan.cps.err[0]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.cps.err[1] + '</div></form>', lan.cps.submit, cps.submit);
}

cps.submit = function()
{
	var form = document.getElementById('mainform');
	var pass = document.getElementById('pass');
	pass.setCustomValidity(pass.value.length < 1 || pass.value.length > 32 ? lan.cps.err[0] : '');
	return form.checkValidity() ? ['checkpass.php', $('form#mainform').serialize()] : null;
}



var cco = new Object();

cco.result = function(id, info)
{
	switch(id)
	{
		case 0:
			var part = info.split('$');
			pi.alert('alert', lan.cco.title, lan.cco.info.replace('%A%', part[0]).replace('%B%', part[1]).replace('%C%', part[2]).replace('%D%', parseInt(part[3]) > 0 ? lan.cco.state1 : lan.cco.state0).replace('%E%', pi.getTimeStr(parseInt(part[4]))).replace('%F%', pi.getTimeStr(parseInt(part[5]))));
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('code').setCustomValidity(lan.cco.err[0]);
			break;
		case 2:
			$('#main').modal('show');
			document.getElementById('mainError').style.display = 'inline';
			break;
	}
}

cco.show = function()
{
	pi.showForm('main', '', lan.cco.title, lan.cco.tip + '<br><br><form id="mainform" class="was-validated"><div class="form-row">' + pi.getOption(lan.cco.code, '', '<input type="password" class="form-control" id="code" name="code" autocomplete="off"/>', lan.cco.err[0]) + '<div class="form-group col"></div></div><div class="invalid-feedback" id="mainError">' + lan.cco.err[1] + '</div></form>', lan.cco.submit, cco.submit);
}

cco.submit = function()
{
	var form = document.getElementById('mainform');
	var code = document.getElementById('code');
	code.setCustomValidity(code.value.length < 1 || code.value.length > 32 ? lan.cco.err[0] : '');
	return form.checkValidity() ? ['checkcode.php', $('form#mainform').serialize()] : null;
}

















var put = new Array();

put[21] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[21].replace('%A%', '<a href="mailto:' + info[0] + '">' + info[0] + '</a>');
}

put[22] = function(infoStr)
{
	var info = infoStr.split('|');
	var state = parseInt(info[0]);
	return lan.recInfo[22].replace('%A%', ((state & 1) ? lan.user.state_1 : lan.user.state_0) + ' ' + ((state & 2) ? lan.user.state_3 : lan.user.state_2));
}

put[26] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[26].replace('%A%', info[0]);
}

put[27] = function(infoStr)
{
	var info = infoStr.split('|');
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.recInfo[27].replace('%A%', arr.join(', '));
}

put[28] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[28].replace('%A%', info[0]);
}

put[31] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[31].replace('%A%', lan.sys.pri.replace('%A%', (info[0] > 0 ? '+' : '') + (parseInt(info[0]) / 100)));
}

put[32] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[32].replace('%A%', (info[0] > 0 ? '+' : '') + info[0]);
}

put[33] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[33].replace('%A%', info[0]).replace('%B%', lan.sys.pri.replace('%A%', parseInt(info[1]) / 100));
}

put[36] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[36].replace('%A%', info[0]);
}

put[37] = function(infoStr)
{
	var info = infoStr.split('|');
	return lan.recInfo[37].replace('%A%', info[0]);
}
var adm = new Object();
var buf = new Object();

adm.cshop = 0;

adm.back = false;

window.onpopstate = function(event)
{
	adm.back = true;
	adm.get('main.php', 'action=redirect', false);
}

adm.bstate = function(url)
{
	if(!adm.back) history.pushState(null, null, url);
	adm.back = false;
}

adm.frame = function()
{
	$('head').append('<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>');
	$('head').append('<link type="/image/x-icon" rel="icon" href="favicon.ico"/>');

	document.title = lan.sys.title;
	document.body.innerHTML = '<div class="container-fluid main-title p-2 d-flex justify-content-between"><div class="d-flex align-items-center"><div><img class="rounded float-left" src="logo.gif" title="' + lan.sys.title + '"/></div><div class="text-large" id="adm.title"></div></div><div id="adm.menu"></div><div id="adm.tip"></div></div><div id="adm.main"></div><div id="adm.infobox"></div><div class="container-fluid d-flex justify-content-between main-bar py-1 px-2"><div class="d-flex text-special">' + lan.sys.copyright + '</div><div class="d-flex text-special" id="adm.systembar"></div></div><div class="modal" id="loading" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-body" align="center"><div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div> <div class="spinner-grow text-light" role="status"></div></div></div></div>' + adm.getConfirm('confirm') + adm.getAlert('alert') + adm.getForm('main');

	adm.get('main.php', 'action=redirect', false);
}

adm.initialize = function(title)
{
	document.title = title + ' - ' + lan.sys.title;
	document.getElementById('adm.title').innerHTML = '&nbsp;' + title;
	sys.bInitialize();
}

adm.uninitialize = function()
{
	document.getElementById('adm.main').innerHTML = sys.bReturn();
}

adm.write = function(str)
{
	sys.bWrite(str);
}

adm.get = function(url, data = '', hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	adm.loading();
	sys.rGet(url, data, function(){adm.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

adm.post = function(url, data = '', hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	adm.loading();
	sys.rPost(url, data, function(){adm.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

adm.file = function(url, obj, hold = true, callback = null)
{
	var top = hold ? $('html,body').scrollTop() : 0;
	adm.loading();
	sys.rFile(url, new FormData(obj), function(){adm.loaded();}, function(){$('html,body').scrollTop(top); if(callback != null) callback();});
}

adm.loading = function()
{
	$('#loading').modal({backdrop:'static'});
	$('#loading').modal('show');
}

adm.loaded = function()
{
	$('#loading').modal('hide');
}

adm.redirect = function()
{
	var path = window.location.pathname.substr(1).split('/');
	var pathx = (path[path.length - 1] == '' ? 'shopinfo' : path[path.length - 1]).split('-');
	var page = pathx[0] + '.php';
	var menuList = lan.menuList[buf.siti.level - 1];
	for(var i = 0; i < menuList.length; i++)
	{
		if(menuList[i].length > 3 && menuList[i][2] == page)
		{
			eval(menuList[i][3]);
			break;
		}
	}
	adm.get(page, pathx.length > 1 ? ('coreID=' + pathx[1]) : '', false);
}

adm.buffer = function(siti, admi)
{
	buf.siti = siti;
	buf.admi = admi;

	var path = window.location.pathname.substr(1).split('/');
	var shopID = path.length > 2 ? parseInt(path[1]) : 0;
	adm.cshop = isNaN(shopID) ? 0 : shopID;

	sys.bInitialize();
	sys.bWrite('<a class="btn btn-light" href="javascript:adm.redirect();">' + lan.gen.refresh + '</a>&nbsp;&nbsp;<a class="btn btn-light" href="javascript:window.open(location.href, \'_blank\');void(0);">' + lan.gen.window + '</a>&nbsp;&nbsp;&nbsp;&nbsp;');
	if(admi.id > 0)
	{
		sys.bWrite('<div class="btn-group" role="group">');
		if(buf.shop.length == 1) sys.bWrite('<button type="button" class="btn btn-outline-secondary" disabled>' + buf.shop[0].name + '</button>');
		if(buf.shop.length > 1)
		{
			var name = lan.gen.process;
			var arr = new Array();
			for(var i = 0; i < buf.shop.length; i++)
			{
				arr.push('<a class="dropdown-item" href="javascript:adm.setShop(' + buf.shop[i].id + ');"><img src="shop.l0/icon05.gif" style="vertical-align:top"> ' + buf.shop[i].name + '</a>');
				if(buf.shop[i].id == adm.cshop) name = buf.shop[i].name;
			}
			sys.bWrite('<div class="btn-group" role="group"><button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">' + name + '</button><div class="dropdown-menu">' + arr.join('') + '</div></div>');
		}
		sys.bWrite('<div class="btn-group" role="group"><button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown">' + admi.name + '</button><div class="dropdown-menu"><a class="dropdown-item" href="javascript:adm.get(\'logout.php\');"><img src="admin/icon02.gif" style="vertical-align:top"> ' + lan.gen.logout + '</a></div></div>');
		sys.bWrite('</div>');
	}
	document.getElementById('adm.tip').innerHTML = sys.bReturn();

	sys.bInitialize();
	sys.bWrite('<div class="btn-group" role="group">');
	var menuList = lan.menuList[buf.siti.level - 1];
	var right = buf.admi.right.split(',');
	var hasElement = false;
	for(var i = 0; i < menuList.length; i++)
	{
		if(menuList[i][0] == '') continue;
		if(menuList[i].length > 3)
			sys.bWrite('<a class="dropdown-item" href="javascript:' + menuList[i][3] + 'adm.get(\'' + menuList[i][2] + '\');"' + (menuList[i][1].charAt(0) == '-' ? ' style="border-top:1px solid #D0D0D0"' : '') + '><img src="' + menuList[i][1].substr(menuList[i][1].charAt(0) == '-' ? 1 : 0) + '" style="vertical-align:top"> ' + menuList[i][0] + '</a>');
		else
			sys.bWrite((hasElement ? '</div></div>' : '') + '<div class="btn-group" role="group"><button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">' + menuList[i][0] + '</button><div class="dropdown-menu">');
		hasElement = true;
	}
	sys.bWrite((hasElement ? '</div></div>' : '') + '</div>');
	document.getElementById('adm.menu').innerHTML = sys.bReturn();
}

adm.setShop = function(shopID)
{
	adm.cshop = shopID;
	var path = window.location.pathname.substr(1).split('/');
	if(path.length == 2) path[2] = path[1];
	path[1] = shopID;
	window.history.replaceState(null, null, '/' + path.join('/'));
	adm.redirect();
}

adm.checkMenu = function(right, menuRight)
{
	for(var i = 0; i < menuRight.length; i++)
	{
		if(i < right.length && (menuRight[i] & parseInt(right[i])) > 0) return true;
	}
	return menuRight.length == 0;
}

adm.clear = function()
{
	document.getElementById('adm.menu').innerHTML = '';
	document.getElementById('adm.tip').innerHTML = '';
}

adm.state = 0;
adm.executionTime = 0;
adm.dbQuery = 0;

adm.system = function(siteSerialID, executionTime, dbQuery)
{
	adm.executionTime += executionTime;
	adm.dbQuery += dbQuery;
	if(adm.state > 0)
	{
		adm.state = 0;
		return;
	}
	document.getElementById('adm.systembar').innerHTML = lan.sys.systembar.replace('%A%', (adm.executionTime * 1000).toFixed(3)).replace('%B%', adm.dbQuery);
	adm.executionTime = 0;
	adm.dbQuery = 0;
	if(buf.siti && siteSerialID > buf.siti.serialID) adm.get('main.php', '');
}

adm.suspend = function()
{
	adm.state = 1;
}

adm.shop = function(shop)
{
	buf.shop = shop;
}

adm.infobox = function(strList)
{
	sys.bInitialize();
	sys.bWrite('<div class="container-fluid main-infobox py-2"><ol style="margin-left:-20px">');
	for(var i = 0; i < strList.length; i++) sys.bWrite('<li>' + strList[i] + '</li>');
	sys.bWrite('</ol></div>');
	document.getElementById('adm.infobox').innerHTML = sys.bReturn();
}

adm.navi = function(posStr, infoStr)
{
	sys.bWrite('<div class="container-fluid d-flex justify-content-between align-items-center main-infobar"><div class="main-infobar py-3">' + posStr + '</div><div class="main-infobar py-3">' + infoStr + '</div></div>');
}

adm.pagelist = function(name, link)
{
	var buffer = eval(name);
	if(buffer.count == 0)
	{
		sys.bWrite('<div class="row"><div class="col">&nbsp;</div></div>');
		return;
	}

	var start = buffer.page > 3 ? (buffer.page - 3) : 1;
	var end = buffer.page < (buffer.count - 3) ? (buffer.page + 3) : buffer.count;
	if(end - start < 6 && start == 1) end = start + 6 < buffer.count ? (start + 6) : buffer.count;
	if(end - start < 6 && end == buffer.count) start = end - 6 > 1 ? (end - 6) : 1;
	
	sys.bWrite('<div class="row"><div class="col"></div><div class="col"><nav><ul class="pagination pagination-sm justify-content-center">');
	if(start > 1) sys.bWrite('<li class="page-item"><a class="page-link" href="javascript:adm.gopage(' + name + ', 0, \'' + link + '\', false);">1' + (start > 2 ? ' ...' : '') + '</a></li>');
	for(var i = start; i < buffer.page; i++) sys.bWrite('<li class="page-item"><a class="page-link" href="javascript:adm.gopage(' + name + ', ' + (i - 1) + ', \'' + link + '\', false);">' + i + '</a></li>');
	sys.bWrite('<li class="page-item active"><a class="page-link" href="javascript:$(\'html,body\').scrollTop(0);void(0);">' + buffer.page + '</a></li>');
	for(var i = buffer.page + 1; i <= end; i++) sys.bWrite('<li class="page-item"><a class="page-link" href="javascript:adm.gopage(' + name + ', ' + (i - 1) + ', \'' + link + '\', false);">' + i + '</a></li>');
	if(end < buffer.count) sys.bWrite('<li class="page-item"><a class="page-link" href="javascript:adm.gopage(' + name + ', ' + (buffer.count - 1) + ', \'' + link + '\', false);">' + (end < buffer.count - 1 ? '... ' : '') + buffer.count + '</a></li>');
	sys.bWrite('</ul></nav></div><div class="col d-flex justify-content-end"><div><div class="input-group input-group-sm"><input type="text" id="adm.page" class="form-control" style="width:80px" value="' + buffer.page + '" autocomplete="off"><input type="button" class="btn btn-primary btn-sm" value="' + lan.gen.page_go + '" onclick="adm.gopage(' + name + ', parseInt(document.getElementById(\'adm.page\').value) - 1, \'' + link + '\', false);"/><div class="input-group-prepend"><span class="input-group-text">' + lan.gen.page_info.replace('%A%', buffer.records).replace('%B%', buffer.count) + '</span></div></div></div></div></div>');
}

adm.gopage = function(buffer, i, link, hold = true)
{
	if(buffer.count == 0)
	{
		adm.get(link, 'IDList=', hold);
		return;
	}
	if(isNaN(i) || i < 0) i = 0;
	if(i > buffer.count - 1) i = buffer.count - 1;

	if(buffer.offset <= i && (i + 1 == buffer.count || i < buffer.offset + Math.floor(buffer.ids.length / buffer.size)))
	{
		buffer.page = i + 1;
		var base = (i - buffer.offset) * buffer.size;
		adm.get(link, 'IDList=' + buffer.ids.slice(base, base + buffer.size).join(','), hold);
	}
	else
	{
		var back = Math.ceil(buffer.buffer / 2);
		if(i < back)
			adm.get(link, 'offset=0&show=' + i, hold);
		else
			adm.get(link, 'offset=' + (i - back + 1) + '&show=' + (back - 1), hold);
	}
}

adm.setbuffer = function(buffer, size, offset, show, records, list)
{
	return {buffer: buffer, size: size, offset:offset, records: records, ids: list == '' ? new Array() : list.split(','), page: offset + show + 1, count: Math.ceil(records / size), eids: []};
}

adm.addbuffer = function(buffer, id)
{
	buffer.records += 1;
	buffer.count = Math.ceil(buffer.records / buffer.size);
	if(buffer.page < 1) buffer.page = 1;
	buffer.ids.splice(buffer.page * buffer.size - 1, 0, id);
	buffer.eids.push(id);
}

adm.mergbuffer = function(buffer, list)
{
	if(list == '') return;
	var ids = list.split(',');
	buffer.records += ids.length;
	buffer.count = Math.ceil(buffer.records / buffer.size);
	if(buffer.page < 1) buffer.page = 1;
	buffer.ids = buffer.ids.slice(0, buffer.page * buffer.size - ids.length).concat(ids).concat(buffer.ids.slice(buffer.page * buffer.size - ids.length));
	buffer.eids = buffer.eids.concat(ids);
}

adm.pushbuffer = function(buffer, id)
{
	buffer.records += 1;
	buffer.count = Math.ceil(buffer.records / buffer.size);
	if(buffer.page < 1) buffer.page = 1;
	buffer.ids.push(id);
}

adm.swapbuffer = function(buffer, id1, id2)
{
	var pos1 = buffer.ids.indexOf(id1);
	var pos2 = buffer.ids.indexOf(id2);
	if(pos1 < 0 || pos2 < 0) return;
	buffer.ids[pos1] = id2;
	buffer.ids[pos2] = id1;
}

adm.delbuffer = function(buffer, list)
{
	if(list == '') return;
	var ids = list.split(',');
	buffer.records -= ids.length;
	buffer.count = Math.ceil(buffer.records / buffer.size);
	if(buffer.page > buffer.count) buffer.page = buffer.count;
	buffer.ids = $(buffer.ids).not(ids).get();
	buffer.eids = $(buffer.eids).not(ids).get();
}

adm.updbuffer = function(buffer, list)
{
	if(list == '') return;
	var ids = list.split(',');
	buffer.eids = $.merge(buffer.eids, ids);
}

adm.getFrame = function(listID, colspan, str)
{
	return '<tr><td colspan="' + colspan + '" style="padding:0px;border-top:0px;"><div class="collapse" id="frameline_' + listID + '"><table class="table table-secondary" style="margin-bottom:0px;"><tbody>' + str + '</tbody></table></div></td></tr>';
}

adm.getFrameInfo = function(listID, width, str)
{
	return '<td' + adm.getFrameStyle(listID) + ' style="width:' + width + 'vw"><div class="overflow-hidden" style="width:' + width + 'vw;white-space:nowrap">' + str + '</div></td>';
}

adm.getFrameOperation = function(str)
{
	return '<td style="padding:0px;vertical-align:middle"><div class="btn-group-sm" role="group"><div class="btn-group-sm" role="group"><button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">' + lan.gen.operation + '</button><div class="dropdown-menu">' + str + '</div></div></div></td>';
}

adm.getFrameLink = function(link, name)
{
	return '<a href="' + link + '" onclick="event.stopPropagation();" target="_blank">' + name + '</a>';
}

adm.getFrameBar = function(str, colspan, align)
{
	return '<td colspan="' + colspan + '" style="padding:0px;vertical-align:middle" align="' + align + '">' + str + '</td>';
}

adm.getFrameStyle = function(listID)
{
	return ' data-toggle="collapse" data-target="#frameline_' + listID + '" onclick="$(\'#frameline_' + listID + '\').collapse(\'toggle\');"';
}

adm.getFrameControl = function()
{
	return '<button type="button" class="btn btn-outline-secondary btn-sm" onclick="this.innerText = adm.controlFrame() == 0 ? lan.gen.frame_show : lan.gen.frame_hide;">' + lan.gen.frame_show + '</button><input type="hidden" id="adm.framecontrol" value="0"/>';
}

adm.getMenu = function(arr)
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
		str.push('<a class="dropdown-item" href="' + arr[i][0] + '"' + (arr[i].length == 4 ? (' target="' + arr[i][3] + '"') : '') + (nextMark ? ' style="border-top:1px solid #D0D0D0"' : '') + '><img src="' + arr[i][1] + '" style="vertical-align:top"> ' + arr[i][2] + '</a>');
		nextMark = false;
		hasElem = true;
	}
	return str.join('');
}

adm.controlFrame = function()
{
	var obj = document.getElementById('adm.framecontrol');
	var control = parseInt(obj.value) == 1 ? 0 : 1;
	obj.value = control;
	var listID = 0;
	while(document.getElementById('frameline_' + listID))
	{
		$('#frameline_' + listID).collapse(control == 1 ? 'show' : 'hide');
		listID++;
	}
	return control;
}

adm.getDetail = function(name, info, colspan)
{
	return '<td colspan="' + colspan + '"><b>' + name + '</b>:<br>' + info + '</td>';
}

adm.getElem = function(name, listID, value)
{
	return '<div class="form-check"><input class="form-check-input position-static" type="checkbox" id="adm.elem.' + name + '.' + listID + '" value="' + value + '"/></div>';
}

adm.getCheckAll = function(name)
{
	return '<div class="form-check"><input class="form-check-input position-static" type="checkbox" id="adm.elem.' + name + '" onclick="adm.checkAll(\'' + name + '\', this.checked);"/></div>';
}

adm.checkAll = function(name, isChecked)
{
	var i = 0;
	while(true)
	{
		var elem = document.getElementById('adm.elem.' + name + '.' + i);
		if(!elem) break;
		elem.checked = isChecked;
		i++;
	}
}

adm.getAll = function(name, separator)
{
	var i = 0;
	var elemArr = new Array();
	while(true)
	{
		var elem = document.getElementById('adm.elem.' + name + '.' + i);
		if(!elem) break;
		if(elem.checked) elemArr.push(elem.value);
		i++;
	}
	return elemArr.join(separator);
}

adm.getConfirm = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + lan.gen.cancel + '</button><button type="button" class="btn btn-primary" id="' + id + '.action" onclick="void(0);">' + lan.gen.submit + '</button></div></div></div></div>';
}

adm.getAlert = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal" id="' + id + '.action">' + lan.gen.close + '</button></div></div></div></div>';
}

adm.getForm = function(id)
{
	return '<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog"><div class="modal-dialog modal-dialog-centered" id="' + id + '.frame" role="document"><div class="modal-content"><div class="modal-header"><h6 class="modal-title" id="' + id + '.title"></h6><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button></div><div class="modal-body" id="' + id + '.body"></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">' + lan.gen.cancel + '</button><button type="button" class="btn btn-primary" id="' + id + '.submit"></button></div></div></div></div>';
}

adm.confirm = function(id, title, str, url, data)
{
	document.getElementById(id + '.action').onclick = function(){$('#' + id).modal('hide');adm.get(url, data);};
	adm.alert(id, title, str);
}

adm.confirn = function(id, title, str, url, data)
{
	document.getElementById(id + '.action').onclick = function(){$('#' + id).modal('hide');adm.post(url, data);};
	adm.alert(id, title, str);
}

adm.alert = function(id, title, str)
{
	document.getElementById(id + '.title').innerHTML = title;
	document.getElementById(id + '.body').innerHTML = str;
	$('#' + id).modal('show');
}

adm.showForm = function(id, size, title, body, submit, fun)
{
	document.getElementById(id + '.title').innerHTML = title;
	document.getElementById(id + '.body').innerHTML = body;
	document.getElementById(id + '.submit').style.display = submit == '' ? 'none' : 'inline';
	document.getElementById(id + '.submit').innerHTML = submit;
	document.getElementById(id + '.submit').onclick = function(){var res = fun(); if(res != null){$('#' + id).on('hidden.bs.modal', function(e){$('#' + id).off('hidden.bs.modal');if(typeof(res[1]) == 'string') adm.post(res[0], res[1]); else adm.file(res[0], res[1]);}); $('#' + id).modal('hide');}};
	document.getElementById(id + '.frame').classList.remove('modal-sm', 'modal-lg', 'modal-xl');
	if(size != '') document.getElementById(id + '.frame').classList.add(size);
	$('#' + id).modal('show');
}

adm.addElem = function(id, i, elem)
{
	var obj = document.getElementById(id);
	var str = obj.value == '' ? new Array() : obj.value.split('|');
	if(i < 0)
		str.push(elem);
	else
		str.splice(i, 0, elem);
	obj.value = str.join('|');
}

adm.deleteElem = function(id, i)
{
	var obj = document.getElementById(id);
	var str = obj.value == '' ? new Array() : obj.value.split('|');
	str.splice(i, 1);
	obj.value = str.join('|');
}

adm.countElem = function(id)
{
	var obj = document.getElementById(id);
	var str = obj.value == '' ? new Array() : obj.value.split('|');
	return str.length;
}

adm.getSearch = function(page, infoName, searchName, sortName)
{
	var searchQI = eval(searchName);
	return '<button type="button" id="search.button" class="btn btn-sm ' + (searchQI == '' ? 'btn-outline-secondary' : 'btn-outline-primary') + '" onclick="adm.showSearch(\'' + page + '\', \'' + infoName + '\', \'' + searchName + '\', \'' + sortName + '\');">' + lan.ssi.search + '</button>';
}

adm.getSort = function(page, infoName, searchName, sortName)
{
	var sortQI = eval(sortName);
	return '<button type="button" id="sort.button" class="btn btn-sm ' + (sortQI == '' ? 'btn-outline-secondary' : 'btn-outline-primary') + '" onclick="adm.showSort(\'' + page + '\', \'' + infoName + '\', \'' + searchName + '\', \'' + sortName + '\');">' + lan.ssi.sort + '</button>';
}

adm.findSearch = function(index, offset, searchStr)
{
	if(searchStr == '') return '';
	var searchPart = searchStr.split('|');
	for(var i = 0; i < searchPart.length; i++)
	{
		var searchInfo = searchPart[i].split('$');
		if(parseInt(searchInfo[0]) != index) continue;
		return searchInfo[offset + 1];
	}
	return '';
}

adm.refreshSearch = function(infoName)
{
	var info = eval(infoName);

	var arr = new Array();
	var searchStr = document.getElementById('search').value;
	if(searchStr != '')
	{
		var searchPart = searchStr.split('|');
		for(var i = 0; i < searchPart.length; i++)
		{
			var searchInfo = searchPart[i].split('$');
			arr.push('<tr><td>' + (i + 1) + '.</td><td>' + info[searchInfo[0]][1] + '</td><td>' + sesf[info[searchInfo[0]][0]](info[searchInfo[0]].slice(2), searchInfo.slice(1)) + '</td><td align="right"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="adm.deleteElem(\'search\', ' + i + ');adm.refreshSearch(\'' + infoName + '\');">' + lan.ssi.del + '</button></td></tr>');
		}
	}
	else
		arr.push('<tr><td></td><td colspan="3">' + lan.ssi.defsearch + '</td></tr>');
	document.getElementById('search.current').innerHTML = arr.join('');
	$('#main').modal('handleUpdate');
}

adm.refreshSort = function()
{
	var arr = new Array();
	var sortStr = document.getElementById('sort').value;
	if(sortStr != '')
	{
		var sortPart = sortStr.split('|');
		var obj = document.getElementById('sort.list');
		for(var i = 0; i < sortPart.length; i++)
		{
			var sortInfo = sortPart[i].split('$');
			arr.push('<tr><td>' + (i + 1) + '.</td><td>' + obj.options[parseInt(sortInfo[0])].innerHTML + '</td><td>' +(parseInt(sortInfo[1]) == 0 ? lan.ssi.increasing : lan.ssi.decreasing) + '</td><td align="right"><button type="button" class="btn btn-sm btn-outline-secondary" onclick="adm.deleteElem(\'sort\', ' + i + ');adm.refreshSort();">' + lan.ssi.del + '</button></td></tr>');
		}
	}
	else
		arr.push('<tr><td></td><td colspan="3">' + lan.ssi.defsort + '</td></tr>');
	document.getElementById('sort.current').innerHTML = arr.join('');
	$('#main').modal('handleUpdate');
}

adm.showSearch = function(page, infoName, searchName, sortName)
{	
	var info = eval(infoName);
	var searchQI = decodeURIComponent(eval(searchName));
	
	var arr = new Array();
	for(var i = 0; i < info.length; i++) arr.push('<option value=' + i + '>' + info[i][1] + '</option>');
	adm.showForm('main', 'modal-lg', lan.ssi.search, '<table class="table table-borderless"><tbody id="search.current"></tbody><tfoot class="table-active"><td></td><td><select class="form-control form-control-sm" id="search.list" onchange="var info = ' + infoName + '; document.getElementById(\'search.box\').innerHTML = setf[info[this.selectedIndex][0]](\'search\', info[this.selectedIndex].slice(2)); document.getElementById(\'search.error\').innerHTML = \'\';">' + arr.join('') + '</select></td><td><div id="search.box">' + setf[info[0][0]]('search', info[0].slice(2)) + '</div><div class="invalid-feedback" id="search.error" style="display:block"></div></td><td align="right"><input type="hidden" id="search" value="' + searchQI + '"/><button type="button" class="btn btn-outline-primary btn-sm" onclick="var info = ' + infoName + '; var i = document.getElementById(\'search.list\').selectedIndex; var msg = secf[info[i][0]](\'search\', info[i].slice(2)); var count = adm.countElem(\'search\'); document.getElementById(\'search.error\').innerHTML = msg[0] == 0 ? (count < 10 ? \'\' : lan.ssi.overflow) : msg[1]; if(msg[0] == 0 && count < 10){adm.addElem(\'search\', -1, i + \'$\' + msg[1]);adm.refreshSearch(\'' + infoName + '\');}">' + lan.ssi.add + '</button></td></tfoot></table>', lan.ssi.search, function(){return [page, adm.saveSearch(searchName, sortName)];});	
	adm.refreshSearch(infoName);
}

adm.showSort = function(page, infoName, searchName, sortName)
{
	var sortArr = eval(infoName);
	var sortQI = eval(sortName);

	var arr = new Array();
	for(var i = 0; i < sortArr.length; i++) arr.push('<option value=' + i + '>' + sortArr[i] + '</option>');
	adm.showForm('main', '', lan.ssi.sort, '<table class="table table-borderless"><tbody id="sort.current"></tbody><tfoot class="table-active"><td></td><td><select class="form-control form-control-sm" id="sort.list">' + arr.join('') + '</select></td><td><select class="form-control form-control-sm" id="sort.order"><option value="0">' + lan.ssi.increasing + '</option><option value="1">' + lan.ssi.decreasing + '</option></select><div class="invalid-feedback" id="sort.error" style="display:block"></div></td><td align="right"><input type="hidden" id="sort" value="' + sortQI + '"/><button type="button" class="btn btn-outline-primary btn-sm" onclick="var count = adm.countElem(\'sort\'); document.getElementById(\'sort.error\').innerHTML = count < 10 ? \'\' : lan.ssi.overflow; if(count < 10){adm.addElem(\'sort\', -1, document.getElementById(\'sort.list\').selectedIndex + \'$\' + document.getElementById(\'sort.order\').selectedIndex);adm.refreshSort();}">' + lan.ssi.add + '</button></td></tfoot></table>', lan.ssi.sort, function(){return [page, adm.saveSort(searchName, sortName)];});
	adm.refreshSort();
}

adm.saveSearch = function(searchName, sortName)
{
	var searchQI = encodeURIComponent(document.getElementById("search").value);
	var sortQI = eval(sortName);
	eval(searchName + ' = encodeURIComponent(document.getElementById("search").value);');
	if(searchQI != '')
	{
		document.getElementById('search.button').classList.add('btn-outline-primary');
		document.getElementById('search.button').classList.remove('btn-outline-secondary');
	}
	else
	{
		document.getElementById('search.button').classList.remove('btn-outline-primary');
		document.getElementById('search.button').classList.add('btn-outline-secondary');
	}
	return 'searchQI=' + searchQI + '&sortQI=' + sortQI;
}

adm.saveSort = function(searchName, sortName)
{
	var searchQI = (searchName == '' ? '' : eval(searchName));
	var sortQI = document.getElementById("sort").value;
	eval(sortName + ' = document.getElementById("sort").value;');
	if(sortQI != '')
	{
		document.getElementById('sort.button').classList.add('btn-outline-primary');
		document.getElementById('sort.button').classList.remove('btn-outline-secondary');
	}
	else
	{
		document.getElementById('sort.button').classList.remove('btn-outline-primary');
		document.getElementById('sort.button').classList.add('btn-outline-secondary');
	}
	return 'searchQI=' + searchQI + '&sortQI=' + sortQI;
}

adm.getOption = function(title, info, code, err, ext = 'col')
{
	return '<div class="form-group ' + ext + '">' + (title != '' ? ('<label><b>' + title + '</b></label>') : '') + (info != '' ? ('<p class="text-secondary">' + info + '</p>') : '') + '<div class="input-group input-group-sm">' + code + '<div class="invalid-feedback">' + err + '</div></div></div>';
}

adm.getOptionEmpty = function()
{
	return '<div class="form-group col"></div>';
}

adm.datalist = function(template, list, input, max)
{
	var str = document.getElementById(input) ? document.getElementById(input).value : '';
	var tempnode = document.getElementById(template).content.cloneNode(true).children;
	if(str != '') var exp = new RegExp(str, 'i');
	var result = document.createDocumentFragment();
	var i = 0;
	while(i < tempnode.length)
	{
		if(max == 0) break;
		if(str == '' || exp.test(tempnode[i].textContent))
		{
			result.appendChild(tempnode[i]);
			max--;
			continue;
		}
		i++;
	}
	var datalist = document.getElementById(list);
	while(datalist.children.length) datalist.removeChild(datalist.firstChild);
	datalist.appendChild(result);
}

adm.getCal = function(id, name, value, min, max, ext)
{
	var dt = new Date(value * 1000);
	var dtmin = new Date(min * 1000);
	var dtmax = new Date(max * 1000);
	dt.setTime(dt.getTime() - dt.getTimezoneOffset() * 60000);
	dtmin.setTime(dtmin.getTime() - dtmin.getTimezoneOffset() * 60000);
	dtmax.setTime(dtmax.getTime() - dtmax.getTimezoneOffset() * 60000);
	return '<input type="date" class="form-control form-control-sm" id="' + id + '.date" value="' + (value >= min && value <= max ? dt.toISOString().slice(0, 10) : '') + '" min="' + dtmin.toISOString().slice(0, 10) + '" max="' + dtmax.toISOString().slice(0, 10) + '" onchange="adm.updateCal(\'' + id + '\', ' + ext.toString() + ');" autocomplete="off"/>' + (ext ? ('<input type="time" class="form-control form-control-sm" id="' + id + '.time" value="' + dt.toISOString().slice(11, 16) + '" onchange="adm.updateCal(\'' + id + '\', true);" autocomplete="off"/>') : '') + '<input type="hidden" id="' + id + '" name="' + name + '" value="' + value + '"/>';
}

adm.updateCal = function(id, ext)
{
	var dt = new Date(document.getElementById(id + '.date').value + (ext ? (' ' + document.getElementById(id + '.time').value) : ''));
	document.getElementById(id).value = Math.round(dt.getTime() / 1000);
}

adm.setCal = function(id, ext, disabled)
{
	document.getElementById(id + '.date').disabled = disabled;
	if(ext) document.getElementById(id + '.time').disabled = disabled;
}

adm.replaceInput = function(str, gpat, pat)
{
	if(pat.length == 0) return str == '' ? '' : gpat.replace('%A%', str);
	var strpart = str.split(pat[0][0]);
	var arr = new Array();
	for(var i = 0; i < strpart.length; i++) arr.push(adm.replaceInput(strpart[i], gpat, pat.slice(1)));
	return arr.join(pat[0][1]);
}

adm.checkRight = function(level, wright)
{
	var right = buf.admi.right.split(',');
	if(level >= right.length) return false;
	return (right[level] & wright) > 0;
}

adm.checkEmail = function(email, size)
{
	if(email.length > size) return false;
	for(var i = 0; i < email.length; i++)
	{
		if('0123456789abcdefghijklmnopqrstuvwxyz_-.@'.search(email.charAt(i)) < 0) return false;
	}
	if(email.search('@') < 0) return false;
	return true;
}

adm.getTimeStr = function(timeVal)
{
	var time = new Date(timeVal * 1000);
	return time.toLocaleString('default', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hour12:false});
}

adm.getUTCDateStr = function(timeVal)
{
	var time = new Date(timeVal * 1000);
	return time.toLocaleString('default', {year:'numeric', month:'2-digit', day:'2-digit', timeZone:'UTC'});
}

adm.getIPStr = function(ip)
{
	if(ip < 0) ip += 0x100000000;
	return Math.floor(ip / 16777216) + '.' + Math.floor((ip % 16777216) / 65536) + '.' + Math.floor((ip % 65536) / 256) + '.' + Math.floor(ip % 256);
}



var sesf = new Array();
var setf = new Array();
var secf = new Array();



var main = new Object();

main.result = function(result)
{
	switch(result)
	{
		case 0:
			adm.suspend();
			adm.get('main.php', 'action=redirect');
			return;
		case 1:
			document.getElementById('mainError').style.display = 'inline';
			break;
		case 2:
			document.getElementById('adminPass').setCustomValidity(lan.login.err_adminPass);
			break;
		case 3:
			main.login();
			return;
	}
}

main.login = function()
{
	adm.clear();

	adm.initialize(lan.login.title);
	
	adm.write('<div class="container-fluid main-content"><div class="d-flex justify-content-center box-normal"><form id="main" class="was-validated"><div class="form-group box-group"><label>' + lan.login.username + '</label><input type="text" class="form-control" id="adminName" name="adminName" autocomplete="off"/><div class="invalid-feedback">' + lan.login.err_adminName + '</div></div><div class="form-group"><label>' + lan.login.password + '</label><input type="password" class="form-control" id="adminPass" name="adminPass" autocomplete="off"/><div class="invalid-feedback">' + lan.login.err_adminPass + '</div></div><div class="form-group form-check"><input type="checkbox" class="form-check-input" name="saveCookie" value="30"/><label class="form-check-label">' + lan.login.save_cookie + '</label></div><button type="button" class="btn btn-primary" onclick="main.loginSubmit();">' + lan.login.submit + '</button>&nbsp;&nbsp;&nbsp;<div class="invalid-feedback" id="mainError">' + lan.login.err_ip + '</div></form></div></div>');
	
	adm.uninitialize();

	adm.infobox(lan.login.info);
}

main.loginSubmit = function()
{
	document.getElementById('mainError').style.display = 'none';
	var form = document.getElementById('main');
	var name = document.getElementById('adminName');
	var pass = document.getElementById('adminPass');
	name.setCustomValidity(name.value.length < 1 || name.value.length > 31 ? lan.login.err_adminName : '');
	pass.setCustomValidity(pass.value.length < 8 || pass.value.length > 32 ? lan.login.err_adminPass : '');
	if(form.checkValidity()) adm.post('login.php', $('form#main').serialize());
}

main.shop = function()
{
	if(buf.shop.length == 1)
	{
		adm.setShop(buf.shop[0].id);
		return;
	}
	if(buf.shop.length == 0)
	{
		main.login();
		return;
	}

	adm.initialize(lan.cshop.title);
	
	adm.write('<div class="container-fluid main-content"><div class="d-flex justify-content-center box-normal" style="height:400px">' + lan.cshop.info + '</div></div>');
	
	adm.uninitialize();

	adm.infobox([]);
}
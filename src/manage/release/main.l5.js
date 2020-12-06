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









sesf[0] = function(info, data)
{
	return data[0] + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[1] = function(info, data)
{
	return data[0] + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[2] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? data[0] : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[3] = function(info, data)
{
	return info[0](data[0]);
}
sesf[4] = function(info, data)
{
	return data[0] + ' (' + (data[1] == 0 ? lan.ssi.mod0 : lan.ssi.mod1) + ')';
}
sesf[5] = function(info, data)
{
	var dstr = '';
	if(data[1] == 0) dstr = info[0] == 3 ? lan.ssi.day0 : lan.ssi.day4;
	if(data[1] == 1) dstr = info[0] == 3 ? lan.ssi.day1 : lan.ssi.day5;
	if(data[1] == 2) dstr = info[0] == 3 ? lan.ssi.day2 : lan.ssi.day6;
	if(data[1] == 3) dstr = info[0] == 3 ? lan.ssi.day3 : lan.ssi.day7;
	return lan.ssi.day_info.replace('%A%', dstr).replace('%B%', data[0]);
}
sesf[6] = function(info, data)
{
	return data[0];
}
sesf[7] = function(info, data)
{
	return data[0];
}
sesf[8] = function(info, data)
{
	return data[0];
}

setf[0] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[1] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[2] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[3] = function(id, info)
{
	var valueArr = new Array();
	for(var i = 0; i < 4096; i++)
	{
		var res = info[0](i);
		if(res == '') continue;
		valueArr.push('<option value="' + i + '">' + res + '</option>');
	}
	return '<select class="form-control form-control-sm" id="' + id + '.i0">' + valueArr.join('') + '</select>';
}
setf[4] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><select class="form-control" id="' + id + '.i1"><option value="0">' + lan.ssi.mod0 + '</option><option value="1">' + lan.ssi.mod1 + '</option></select></div>';
}
setf[5] = function(id, info)
{
	var dstr = '';
	if(info[0] == 1) dstr = '<option value="0">' + lan.ssi.day4 + '</option><option value="2">' + lan.ssi.day6 + '</option>';
	if(info[0] == 2) dstr = '<option value="1">' + lan.ssi.day5 + '</option><option value="3">' + lan.ssi.day7 + '</option>';
	if(info[0] == 3) dstr = '<option value="0">' + lan.ssi.day0 + '</option><option value="1">' + lan.ssi.day1 + '</option><option value="2">' + lan.ssi.day2 + '</option><option value="3">' + lan.ssi.day3 + '</option>';
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.ssi.day_info, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<select class="form-control" id="' + id + '.i1">' + dstr + '</select>'], ['%B%', '<input type="input" class="form-control" style="width:50px" id="' + id + '.i0" autocomplete="off">']]) + '</div>';
}
setf[6] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}
setf[7] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}
setf[8] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}

secf[0] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 1;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue) || startValue < 1) return [1, info[0]];
	if(isNaN(endValue) || endValue < 1) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[1] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue) || startValue < 0) return [1, info[0]];
	if(isNaN(endValue) || endValue < 0) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[2] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[3] = function(id, info)
{
	return [0, document.getElementById(id + '.i0').value];
}
secf[4] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value;
	var mode = document.getElementById(id + '.i1').selectedIndex;
	if(value.length < 1 || value.length > 255) return [1, info[0]];
	return [0, sys.uEncode(value) + '$' + mode];
}
secf[5] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	var mode = document.getElementById(id + '.i1').value;
	if(isNaN(value) || value < 0 || value > 32767) return [1, info[1]];
	return [0, value + '$' + mode];
}
secf[6] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 1;
	if(isNaN(value) || value < 1) return [1, info[0]];
	return [0, value];
}
secf[7] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	if(isNaN(value) || value < 0) return [1, info[0]];
	return [0, value];
}
secf[8] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	if(isNaN(value)) return [1, info[0]];
	return [0, value];
}









sesf[9] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? lan.sys.pri.replace('%A%', data[0] / 100) : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? lan.sys.pri.replace('%A%', data[1] / 100) : '');
}

sesf[10] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? lan.sys.perc.replace('%A%', data[0] / 10) : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? lan.sys.perc.replace('%A%', data[1] / 10) : '');
}

setf[9] = function(id, info)
{
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.sys.pri + ' - ' + lan.sys.pri.replace('%A%', '%B%'), '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i0\').value = Math.round(parseFloat(this.value) * 100);" autocomplete="off"/><input type="hidden" id="' + id + '.i0"/>'], ['%B%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i1\').value = Math.round(parseFloat(this.value) * 100);" autocomplete="off"/><input type="hidden" id="' + id + '.i1"/>']]) + '</div>';
}

setf[10] = function(id, info)
{
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.sys.perc + ' - ' + lan.sys.perc.replace('%A%', '%B%'), '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i0\').value = Math.round(parseFloat(this.value) * 10);" autocomplete="off"/><input type="hidden" id="' + id + '.i0"/>'], ['%B%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i1\').value = Math.round(parseFloat(this.value) * 10);" autocomplete="off"/><input type="hidden" id="' + id + '.i1"/>']]) + '</div>';
}

secf[9] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}

secf[10] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}









var benchmark = new Object();
benchmark.sale = new Object();

var dra = new Object();

dra.save = function(draft)
{
	buf.draft = draft;
}

var prof = new Object();

prof.save = function(profile)
{
	buf.profile = profile;
}

var lvl = new Object();

lvl.save = function(level)
{
	buf.level = level;
}

var svs = new Object();

svs.save = function(service)
{
	buf.service = service;
}

var fla = new Object();

fla.save = function(flag)
{
	buf.flag = flag;
}

var coup = new Object();

coup.save = function(coupon)
{
	buf.coupon = coupon;
}









var user = new Object();

user.buffer = function(buffer, size, offset, show, records, list)
{
	user.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

user.clear = function()
{
	user.searchQI = '';
	user.sortQI = '';
}

user.searchFun = function()
{
	return [
		[0, lan.user.id, lan.user.err[0], lan.user.err[1], lan.user.err[2]],
		[4, lan.user.email, lan.user.err[3]]
	];
}

user.sortFun = function()
{
	return [lan.user.id, lan.user.email];
}

user.top = function()
{
	user.draftOption = new Array();
	for(var i = 0; i < buf.draft.length; i++)
	{
		if(buf.draft[i].type != 0) continue;
		user.draftOption.push('<option value="' + buf.draft[i].id + '">' + buf.draft[i].name + '</option>');
	}

	adm.bstate('user');

	adm.initialize(lan.user.title);

	adm.navi('<a href="javascript:adm.get(\'shopinfo.php\');">' + lan.gen.name + '</a> &gt; ' + lan.user.title, adm.getSearch('user.php', 'user.searchFun()', 'user.searchQI', 'user.sortQI') + ' ' + adm.getSort('user.php', 'user.sortFun()', 'user.searchQI', 'user.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:4%"></th><th style="width:10%">' + lan.user.id + '</th><th>' + lan.user.email + '</th></thead><tbody>');
}

user.menu = function(listID, ID, email)
{
	var arr = new Array();
	arr.push(['javascript:ord.searchQI = \'1$' + ID + '\'; ord.sortQI = \'\'; adm.post(\'order.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.user.order_tip]);
	arr.push(['javascript:tsa.searchQI = \'1$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.user.transaction_tip]);
	return arr;
}

user.elem = function(listID, ID, email)
{
	var menu = adm.getMenu(user.menu(listID, ID, email));
	adm.write('<tr>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getFrameLink('mailto:' + email, email) + '</td></tr>');
}

user.empty = function()
{
	adm.write('<tr><td colspan="4" align="center">' + lan.user.empty + '</td></tr>');
}

user.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('user.buf', 'user.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.user.info);
}



















var ord = new Object();

ord.buffer = function(buffer, size, offset, show, records, list, action)
{
	ord.buf = adm.setbuffer(buffer, size, offset, show, records, list);
	ord.action = action;
}

ord.clear = function()
{
	ord.searchQI = '';
	ord.sortQI = '';
}

ord.searchFun = function()
{
	return [
		[0, lan.ord.id, lan.ord.err[0], lan.ord.err[1], lan.ord.err[2]],
		[6, lan.ord.user, lan.ord.err[3]],
		[6, lan.ord.shop, lan.ord.err[4]],
		[6, lan.ord.target, lan.ord.err[5]]
	];	
}

ord.top = function()
{
	adm.bstate('order');

	adm.initialize(lan.ord.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.ord.title, adm.getSearch('order.php', 'ord.searchFun()', 'ord.searchQI', 'ord.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:4%"></th><th>' + lan.ord.id + '</th><th>' + lan.ord.email + '</th><th>' + lan.ord.selem + '</th><th>' + lan.ord.telem + '</th><th>' + lan.ord.insert_time + '</th><th>' + lan.ord.update_time + '</th></thead><tbody>');
}

ord.menu = function(listID, ID, userID, address, email, insertTime, updateTime, extraAddress, selement, telement)
{
	var arr = new Array();
	arr.push(['javascript:user.searchQI = \'0$' + userID + '$' + userID + '\'; user.sortQI = \'\'; adm.post(\'user.php\', \'searchQI=0$' + userID + '$' + userID + '\');', 'admin/icon00.gif', lan.ord.user_tip]);
	arr.push(['javascript:tsa.searchQI = \'7$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=7$' + ID + '\');', 'admin/icon00.gif', lan.ord.transaction_tip]);
	return arr;
}

ord.elem = function(listID, ID, userID, address, email, insertTime, updateTime, extraAddress, selement, telement)
{
	var menu = adm.getMenu(ord.menu(listID, ID, userID, address, email, insertTime, updateTime, extraAddress, selement, telement));
	adm.write('<tr>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getFrameLink('mailto:' + email, email) + (telement != 0 ? (' <span class="badge badge-secondary">' + lan.ord.open + '</span>') : '') + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + selement + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + telement + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(updateTime) + '</td></tr>' + adm.getFrame(listID, 10, '<tr>' + adm.getDetail(lan.ord.id, ID, 1) + adm.getDetail(lan.ord.selem, selement, 1) + adm.getDetail(lan.ord.telem, telement, 1) + adm.getDetail(lan.ord.insert_time, adm.getTimeStr(insertTime), 1) + '</tr><tr>' + adm.getDetail(lan.ord.email, '<a href="mailto:' + email + '">' + email + '</a>', 1) + adm.getDetail(lan.ord.user, userID, 2) + adm.getDetail(lan.ord.update_time, adm.getTimeStr(updateTime), 1) + '</tr><tr>' + adm.getDetail(lan.ord.address, address != '' ? sys.mEncode(address) : lan.gen.none, 2) + adm.getDetail(lan.ord.extra_address, extraAddress != '' ? sys.mEncode(extraAddress) : lan.gen.none, 2) + '</tr>'));
}

ord.empty = function()
{
	adm.write('<tr><td colspan="7" align="center">' + lan.ord.empty + '</td></tr>');
}

ord.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('ord.buf', 'order.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.ord.info);
}









var cata = new Object();

cata.save = function(catalog)
{
	buf.catalog = catalog;
}

cata.buffer = function(buffer, size, offset, show, records, list, coreID)
{
	cata.buf = adm.setbuffer(buffer, size, offset, show, records, list);
	cata.coreID = coreID;
}

cata.clear = function()
{
	cata.sortQI = '';
}

cata.top = function()
{
	adm.bstate('catalog-' + cata.coreID);

	adm.initialize(lan.cata.title);

	var catalogID = cata.coreID;
	var catalogStr = new Array();
	for(var i = buf.catalog.length - 1; i >= 0; i--)
	{
		if(buf.catalog[i].id != catalogID) continue;
		catalogStr.push(catalogID == cata.coreID ? (lan.cata.title + ' # ' + buf.catalog[i].name) : ('<a href="javascript:adm.get(\'catalog.php?coreID=' + catalogID + '\');">' + lan.cata.title + ' # ' + buf.catalog[i].name + '</a>'));
		catalogID = buf.catalog[i].catalog;
		if(catalogID == 0) break;
	}
	catalogStr.push(catalogStr.length == 0 ? lan.cata.title : ('<a href="javascript:adm.get(\'catalog.php\');">' + lan.cata.title + '</a>'));

	adm.navi('<a href="javascript:adm.get(\'shopinfo.php\');">' + lan.gen.name + '</a> &gt; ' + catalogStr.reverse().join(' &gt; '), '');
	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:4%"></th><th>' + lan.cata.id + '</th><th>' + lan.cata.name + '</th><th>' + lan.cata.type + '</th><th>' + lan.cata.state + '</th><th>' + lan.cata.catalog + '</th><th>' + lan.cata.article + '</th></thead><tbody>');
}

cata.menu = function(listID, ID, catalogID, showID, linkID, name, type, state, catalogs, articles)
{
	var arr = new Array();
	if(type == 0) arr.push(['javascript:adm.get(\'catalog.php?coreID=' + ID + '\', \'\');void(0);', 'admin/icon00.gif', lan.cata.edit_extra]);
	if(type == 1) arr.push(['javascript:art.searchQI = \'2$' + ID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=2$' + ID + '\');', 'admin/icon00.gif', lan.cata.art_tip]);
	return arr;
}

cata.elem = function(listID, ID, catalogID, showID, linkID, name, type, state, catalogs, articles)
{
	var menu = adm.getMenu(cata.menu(listID, ID, catalogID, showID, linkID, name, type, state, catalogs, articles));
	adm.write('<tr>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + '>' + (type == 0 ? lan.cata.type_0 : lan.cata.type_1) + '</td><td' + adm.getFrameStyle(listID) + '>' + (state == 0 ? lan.cata.state_0 : lan.cata.state_1) + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + catalogs + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + articles + '</td></tr>');
}

cata.empty = function()
{
	adm.write('<tr><td colspan="7" align="center">' + lan.cata.empty + '</td></tr>');
}

cata.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('cata.buf', 'catalog.php?coreID=' + cata.coreID);
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.cata.info);
}









var art = new Object();

art.buffer = function(buffer, size, offset, show, records, list)
{
	art.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

art.clear = function()
{
	art.searchQI = '';
	art.sortQI = '';
}

art.searchFun = function()
{
	return [
		[0, lan.art.id, lan.art.err[0], lan.art.err[1], lan.art.err[2]],
		[6, lan.art.link, lan.art.err[3]],
		[6, lan.art.catalog, lan.art.err[4]],
		[3, lan.art.show_level, art.getLevel],
		[4, lan.art.tit, lan.art.err[5]],
		[4, lan.art.subtit, lan.art.err[6]],
		[4, lan.art.name, lan.art.err[7]],
		[4, lan.art.subname, lan.art.err[8]],
		[4, lan.art.code, lan.art.err[9]],
		[3, lan.art.service, art.getService],
		[3, lan.art.state, art.getState],
		[9, lan.art.price, lan.art.err[10], lan.art.err[11], lan.art.err[12]],
		[10, lan.art.tax, lan.art.err[13], lan.art.err[14], lan.art.err[15]],
		[1, lan.art.weight, lan.art.err[16], lan.art.err[17], lan.art.err[18]],
		[1, lan.art.sold, lan.art.err[19], lan.art.err[20], lan.art.err[21]],
		[1, lan.art.pos_eval, lan.art.err[22], lan.art.err[23], lan.art.err[24]],
		[1, lan.art.neg_eval, lan.art.err[25], lan.art.err[26], lan.art.err[27]],
		[5, lan.art.insert_time, 1, lan.art.err[28]],
		[5, lan.art.update_time, 1, lan.art.err[29]]
	];
}

art.sortFun = function()
{
	return [lan.art.id, lan.art.link, lan.art.show_level, lan.art.tit, lan.art.subtit, lan.art.name, lan.art.subname, lan.art.code, lan.art.price, lan.art.tax, lan.art.weight, lan.art.sold, lan.art.insert_time, lan.art.update_time];
}

art.top = function()
{
	adm.bstate('article');

	adm.initialize(lan.art.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.art.title, adm.getSearch('article.php', 'art.searchFun()', 'art.searchQI', 'art.sortQI') + ' ' + adm.getSort('article.php', 'art.sortFun()', 'art.searchQI', 'art.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:4%"></th><th>' + lan.art.id + '</th><th>' + lan.art.tit + '</th><th>' + lan.art.name + '</th><th>' + lan.art.code + '</th><th>' + lan.art.price + '</th><th>' + lan.art.offer + '</th><th>' + lan.art.inventory + '</th><th>' + lan.art.catalog + '</th><th>' + lan.art.insert_time + '</th><th>' + lan.art.update_time + '</th></thead><tbody>');
}

art.menu = function(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description)
{
	var arr = new Array();
	arr.push(['javascript:art.searchQI = \'1$' + ID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.art.article_tip]);
	arr.push(['javascript:off.searchQI = \'1$' + ID + '\'; art.sortQI = \'\'; adm.post(\'offer.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.art.offer_tip]);
	arr.push(['javascript:tsa.searchQI = \'4$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=4$' + ID + '\');', 'admin/icon00.gif', lan.art.transaction_tip]);
	return arr;
}

art.elem = function(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory)
{
	catalogArr = new Array();
	for(var i = 0; i < buf.catalog.length; i++)
	{
		catalogArr[buf.catalog[i].layer - 1] = buf.catalog[i].name;
		if(buf.catalog[i].id == catalogID)
		{
			catalogArr = catalogArr.slice(0, buf.catalog[i].layer);
			break;
		}
	}
	if(catalogArr.length == 0) catalogArr.push(lan.gen.none);
	var serviceArr = new Array();
	for(var i = 0; i < buf.service.length; i++)
	{
		if(service & (1 << buf.service[i].index)) 
			serviceArr.push(buf.service[i].index < 8 ? lan.svs.sname[buf.service[i].index] : buf.service[i].name);
	}
	if(serviceArr.length == 0) serviceArr.push(lan.gen.none);
	
	var menu = adm.getMenu(art.menu(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory));
	adm.write('<tr>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + title + (state == 0 ? (' <span class="badge badge-secondary">' + art.getState(0) + '</span>') : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + '><code class="h6 text-secondary">' + code + '</code></td><td' + adm.getFrameStyle(listID) + ' align="right">' + (price > -2147483648 ? lan.sys.pri.replace('%A%', price / 100) : '-') + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + offer + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + inventory + '</td><td' + adm.getFrameStyle(listID) + '>' + catalogArr[catalogArr.length - 1] + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(updateTime) + '</td></tr>' + adm.getFrame(listID, 12, '<tr>' + adm.getDetail(lan.art.id_link, ID + (linkID == ID ? '' : (' / ' + linkID)), 1) + adm.getDetail(lan.art.tit, title, 1) + adm.getDetail(lan.art.name, name, 1) + 
	adm.getDetail(lan.art.code, code != '' ? ('<code class="h6 text-secondary">' + code + '</code>') : lan.gen.none, 1) + adm.getDetail(lan.art.price, price > -2147483648 ? lan.sys.pri.replace('%A%', price / 100) : '-', 1) + adm.getDetail(lan.art.sold, sold, 1) + adm.getDetail(lan.art.offer, offer, 1) + '</tr><tr>' + adm.getDetail(lan.art.state, art.getState(state), 1) + adm.getDetail(lan.art.subtit, subTitle, 1) + adm.getDetail(lan.art.subname, subName, 1) + adm.getDetail(lan.art.insert_time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.art.tax, lan.sys.perc.replace("%A%", tax / 10), 1) + adm.getDetail(lan.art.pos_eval, posEval, 1) + adm.getDetail(lan.art.inventory, inventory, 1) + '</tr><tr>' + adm.getDetail(lan.art.show_level, art.getLevel(showLevel), 1) + adm.getDetail(lan.art.catalog, catalogArr.join(' - '), 1) + adm.getDetail(lan.art.service, serviceArr.join(', '), 1) + adm.getDetail(lan.art.update_time, adm.getTimeStr(updateTime), 1) + adm.getDetail(lan.art.weight, lan.art.aweight.replace('%A%', weight), 1) + adm.getDetail(lan.art.neg_eval, negEval, 2) + '</tr>'));
}

art.empty = function()
{
	adm.write('<tr><td colspan="11" align="center">' + lan.art.empty + '</td></tr>');
}

art.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('art.buf', 'article.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.art.info);
}

art.getService = function(service)
{
	for(var i = 0; i < buf.service.length; i++)
	{
		if(service == buf.service[i].index) return buf.service[i].index < 8 ? lan.svs.sname[buf.service[i].index] : buf.service[i].name;
	}
	return '';
}

art.getLevel = function(level)
{
	if(level == 0) return lan.art.no_level;
	for(var i = 0; i < buf.level.length; i++)
	{
		if(level == buf.level[i].level) return buf.level[i].name;
	}
	return '';
}

art.getState = function(state)
{
	switch(parseInt(state))
	{
		case 0: return lan.art.state_0;
		case 1: return lan.art.state_1;
	}
	return '';
}









art.menu0 = art.menu;
art.menu = function(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory)
{
	var arr = art.menu0(listID, ID, linkID, catalogID, showLevel, title, subTitle, name, subName, code, service, price, tax, state, weight, icon, sold, posEval, negEval, insertTime, updateTime, description, offer, inventory);
	arr.push(['javascript:ivt.searchQI = \'1$' + ID + '\'; ivt.sortQI = \'\'; adm.post(\'inventory.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.art.inventory_tip]);

	return arr;
}



















var srec = new Object();

srec.buffer = function(buffer, size, offset, show, records, list)
{
	srec.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

srec.clear = function()
{
	srec.searchQI = '';
	srec.sortQI = '';
}

srec.searchFun = function()
{
	return [
		[0, lan.srec.id, lan.srec.err[0], lan.srec.err[1], lan.srec.err[2]],
		[3, lan.srec.name, srec.getName],
		[6, lan.srec.user, lan.srec.err[3]],
		[5, lan.srec.time, 1, lan.srec.err[5]]
	];
}

srec.sortFun = function()
{
	return [lan.srec.id, lan.srec.name, lan.srec.user, lan.srec.ip, lan.srec.time];
}

srec.top = function()
{
	adm.bstate('shoprecord');

	adm.initialize(lan.srec.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.srec.title, adm.getSearch('shoprecord.php', 'srec.searchFun()', 'srec.searchQI', 'srec.sortQI') + ' ' + adm.getSort('shoprecord.php', 'srec.sortFun()', 'srec.searchQI', 'srec.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th>' + lan.srec.id + '</th><th>' + lan.srec.name + '</th><th>' + lan.srec.inf + '</th><th>' + lan.srec.user + '</th><th>' + lan.srec.time + '</th><th>' + lan.srec.ip + '</th></thead><tbody>');
}

srec.elem = function(listID, ID, type, info, userID, shopID, insertIP, insertTime)
{
	var nameStr = lan.srecName[type] ? lan.srecName[type] : lan.srec.unknown;
	var infoStr = pet[type] ? pet[type](info.split('|')) : '';
	adm.write('<tr><td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + nameStr + (insertIP == 0 ? (' <span class="badge badge-secondary">' + lan.srec.background + '</span>') : '') + '</td>' + adm.getFrameInfo(listID, 45, infoStr) + '<td' + adm.getFrameStyle(listID) + '>' + (userID > 0 ? userID : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + (insertIP > 0 ? adm.getIPStr(insertIP) : '') + '</td></tr>' + adm.getFrame(listID, 6, '<tr>' + adm.getDetail(lan.srec.id, ID, 1) + adm.getDetail(lan.srec.name, nameStr, 1) + adm.getDetail(lan.srec.time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.srec.ip, insertIP > 0 ? adm.getIPStr(insertIP) : '', 1) + adm.getDetail(lan.srec.user, userID > 0 ? userID : '', 1) + '</tr><tr>' + adm.getDetail(lan.srec.inf, infoStr != '' ? infoStr : lan.gen.none, 5) + '</tr>'));
}

srec.empty = function()
{
	adm.write('<tr><td colspan="6" align="center">' + lan.srec.empty + '</td></tr>');
}

srec.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('srec.buf', 'shoprecord.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.srec.info);
}

srec.getName = function(type)
{
	return lan.srecName[type] ? lan.srecName[type] : '';
}





var pet = new Array();









var shop = new Object();

shop.buffer = function(buffer, size, offset, show, records, list)
{
	shop.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

shop.clear = function()
{
	shop.searchQI = '';
	shop.sortQI = '';
}

shop.searchFun = function()
{
	return [
		[0, lan.shop.id, lan.shop.err[0], lan.shop.err[1], lan.shop.err[2]],
		[4, lan.shop.name, lan.shop.err[3]],
		[4, lan.shop.email, lan.shop.err[4]]
	];
}

shop.sortFun = function()
{
	return [lan.shop.id, lan.shop.name, lan.shop.email];
}

shop.top = function()
{
	adm.bstate('shop');

	adm.initialize(lan.shop.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.shop.title, adm.getSearch('shop.php', 'shop.searchFun()', 'shop.searchQI', 'shop.sortQI') + ' ' + adm.getSort('shop.php', 'shop.sortFun()', 'shop.searchQI', 'shop.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:4%"></th><th style="width:10%">' + lan.shop.id + '</th><th>' + lan.shop.name + '</th><th>' + lan.shop.email + '</th></thead><tbody>');
}

shop.menu = function(listID, ID, name, email)
{
	var arr = new Array();
	arr.push(['javascript:tsa.searchQI = \'2$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=2$' + ID + '\');', 'admin/icon00.gif', lan.shop.transaction_tip]);
	arr.push(['javascript:tsa.searchQI = \'10$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=10$' + ID + '\');', 'admin/icon00.gif', lan.shop.target_tip]);
	arr.push([]);
	arr.push(['javascript:band.searchQI = \'1$' + ID + '\'; band.sortQI = \'\'; adm.post(\'band.php\', \'searchQI=1$' + ID + '\');', 'admin/icon00.gif', lan.shop.source_band_tip]);
	arr.push(['javascript:band.searchQI = \'2$' + ID + '\'; band.sortQI = \'\'; adm.post(\'band.php\', \'searchQI=2$' + ID + '\');', 'admin/icon00.gif', lan.shop.target_band_tip]);
	return arr;
}

shop.elem = function(listID, ID, name, email)
{
	var menu = adm.getMenu(shop.menu(listID, ID, name, email));	
	adm.write('<tr>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getFrameLink('mailto:' + email, email) + '</td></tr>');
}

shop.empty = function()
{
	adm.write('<tr><td colspan="3" align="center">' + lan.shop.empty + '</td></tr>');
}

shop.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('shop.buf', 'shop.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.shop.info);
}

shop.getState0 = function(state)
{
	switch(state)
	{
		case 0: return lan.shop.state_0;
		case 1: return lan.shop.state_1;
	}
	return '';
}

shop.getState1 = function(state)
{
	switch(state)
	{
		case 0: return lan.shop.state_2;
		case 1: return lan.shop.state_3;
	}
	return '';
}





pet[21] = function(info)
{
	return lan.srecInfo[21].replace('%A%', info[0]).replace('%B%', '<a href="mailto:' + info[1] + '">' + info[1] + '</a>');
}

pet[22] = function(info)
{
	var state = parseInt(info[0]);
	return lan.srecInfo[22].replace('%A%', shop.getState0((state & 1) ? 1 : 0) + ' ' + shop.getState1((state & 2) ? 1 : 0));
}

pet[31] = function(info)
{
	return lan.srecInfo[31].replace('%A%', lan.sys.pri.replace('%A%', parseInt(info[0]) / 100));
}

pet[32] = function(info)
{
	return lan.srecInfo[32].replace('%A%', info[0]);
}



















shop.writeBase = function(data)
{
	adm.write('<div class="container-fluid main-content"><div class="row"><div class="col"><table class="table"><thead class="thead-dark"><tr><th colspan="6" scope="col">' + lan.sinfo.basic_info + '</th></thead><tbody><tr><th scope="row">' + lan.shop.id + '</th><td>' + data.id + ((data.state & 1) == 0 ? (' <span class="badge badge-secondary">' + shop.getState0(0) + '</span>') : '') + ((data.state & 2) > 0 ? (' <span class="badge badge-danger">' + shop.getState1(1) + '</span>') : '') + '</td><th scope="row">' + lan.shop.register_time + '</th><td>' + adm.getTimeStr(data.registerTime) + '</td><th scope="row">' + lan.shop.sold + '</th><td>' + data.sold + '</td></tr><tr><th scope="row">' + lan.shop.name + '</th><td>' + data.name + '</td><th scope="row">' + lan.shop.update_time + '</th><td>' + adm.getTimeStr(data.updateTime) + '</td><th scope="row">' + lan.shop.pos_eval + '</th><td>' + data.posEval + '</td></tr><tr><th scope="row">' + lan.shop.email + '</th><td>' + data.email + '</td><th scope="row">' + lan.shop.access_time + '</th><td>' + (data.accessTime > 0 ? adm.getTimeStr(data.accessTime) : '') + '</td><th scope="row">' + lan.shop.neg_eval + '</th><td>' + data.negEval + '</td></tr><tr><th scope="row">' + lan.shop.state + '</th><td>' + shop.getState0((data.state & 1) > 0 ? 1 : 0) + ' ' + shop.getState1((data.state & 2) > 0 ? 1 : 0) + '</td><th scope="row">' + lan.shop.order_time + '</th><td>' + (data.orderTime > 0 ? adm.getTimeStr(data.orderTime) : '') + '</td><th scope="row"></th><td>&nbsp;</td></tr></tbody></table></div><div class="col"><table class="table"><thead class="thead-dark"><tr><th colspan="5" scope="col">' + lan.sinfo.extra_info + '</th></thead><tbody><tr><th scope="row">' + lan.shop.balance + '</th><td>' + lan.sys.pri.replace('%A%', data.balance / 100) + '</td><td rowspan="4"><div style="width:160px;height:150px;"><canvas id="chart0"></canvas></div></td></tr><tr><th scope="row">' + lan.shop.point + '</th><td>' + data.point + '</td></tr><tr><th scope="row">&nbsp;</th><td></td></tr><tr><th scope="row"></th><td>&nbsp;</td></tr></tbody></table></div></div></div>');
}

shop.writeChat = function(data)
{
	adm.write('<div class="container-fluid main-content"><div class="row"><div class="col"><table class="table"><thead class="thead-dark"><tr><th scope="col">' + lan.sinfo.sale_t + '</th></thead><tbody><tr><td><div style="height:10px"></div><div style="width:100%"><canvas id="chart3"></canvas></div></td></tr></tbody></table></div><div class="col"><table class="table"><thead class="thead-dark"><tr><th scope="col">' + lan.sinfo.sale_s + lan.sys.curr + '</th></thead><tbody><tr><td><div style="height:10px"></div><div style="width:100%"><canvas id="chart4"></canvas></div></td></tr></tbody></table></div></div></div>');
}

shop.drawBase = function(data)
{
	var resource = data.posEval + data.negEval == 0 ? 1 : (data.posEval / (data.posEval + data.negEval)).toFixed(3);
	var chart0 = new Chart('chart0',
	{
		type: 'doughnut',
		options: {legend: false, aspectRatio: 1, title: {display: true, text: lan.sinfo.resource, position: 'left'}, circumference: resource * 2 * Math.PI, tooltips: {callbacks: {label: function(tooltipItem, data) {return lan.sys.perc.replace('%A%', (resource * 100));}}}},
		data: {
			labels: [],
			datasets: [{
				backgroundColor: ['#404040'],
				data: [1],
			}]
		},
	});
}

shop.drawChat = function(data)
{
	var dt = new Date();
	dt.setTime((benchmark.time + data.timeAdj) * 1000);
	var year = dt.getUTCFullYear();
	var month = dt.getUTCMonth();
	var tArr = new Array();
	var sArr = new Array();
	var lArr = new Array();
	for(var i = 0; i < 13; i++)
	{
		tArr.push(benchmark.sale['t' + i]);
		sArr.push(benchmark.sale['s' + i] / 100);
		lArr.push(lan.sinfo.month.replace('%A%', year).replace('%B%', (month < 9 ? '0' : '') + (month + 1)));
		month--;
		if(month < 0)
		{
			year--;
			month = 11;
		}
	}

	var chart3 = new Chart('chart3',
	{
		type: 'bar',
		options: {legend: false, aspectRatio: 3.2, scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:10}}]}},
		data: {
			labels: lArr,
			datasets: [{
				backgroundColor: '#3E9651',
				data: tArr,
			}]
		},
	});

	var chart4 = new Chart('chart4',
	{
		type: 'bar',
		options: {legend: false, aspectRatio: 3.2, scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:10}}]}},
		data: {
			labels: lArr,
			datasets: [{
				backgroundColor: '#396AB1',
				data: sArr,
			}]
		},
	});
}

shop.main = function(data)
{
	adm.bstate('shopinfo');

	adm.initialize(lan.sinfo.title);
	
	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; <a href="javascript:adm.get(\'shop.php\');">' + lan.shop.title + '</a> &gt; ' + lan.sinfo.title + ' # ' + data.name, '');

	shop.writeBase(data);
	shop.writeChat(data);

	adm.uninitialize();
	
	adm.infobox([]);
	
	shop.drawBase(data);
	shop.drawChat(data);	
}









var mast = new Object();

mast.buffer = function(buffer, size, offset, show, records, list)
{
	mast.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

mast.clear = function()
{
	mast.sortQI = '';
}

mast.result = function(id, info)
{
	switch(id)
	{
		case 0:
			$('#main').modal('show');
			document.getElementById('userID').setCustomValidity(lan.mast.err[0]);
			break;
		case 1:
			adm.suspend();
			adm.pushbuffer(mast.buf, info.toString());
			adm.gopage(mast.buf, mast.buf.page - 1, 'master.php');
			break;
		case 2:
			adm.suspend();
			adm.delbuffer(mast.buf, info);
			adm.gopage(mast.buf, mast.buf.page - 1, 'master.php');
			break;
	}
}

mast.sortFun = function()
{
	return [lan.mast.id, lan.mast.insert_time];
}

mast.top = function()
{
	adm.bstate('master');

	adm.initialize(lan.mast.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; <a href="javascript:adm.get(\'shop.php\');">' + lan.shop.title + '</a> &gt; ' + lan.mast.title, adm.getSort('master.php', 'mast.sortFun()', '', 'mast.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.mast.id + '</th><th>' + lan.mast.email + '</th><th>' + lan.mast.insert_time + '</th></thead><tbody>');
}

mast.menu = function(listID, ID, userID, insertTime, email, state)
{
	var arr = new Array();
	arr.push(['javascript:user.searchQI = \'0$' + userID + '$' + userID + '\'; user.sortQI = \'\'; adm.post(\'user.php\', \'searchQI=0$' + userID + '$' + userID + '\');', 'admin/icon00.gif', lan.mast.user_tip]);
	arr.push([]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.mast.del, lan.mast.del_tip, \'master.php\', \'action=del&IDList=' + ID + '\');void(0);', 'master.l0/icon01.gif', lan.mast.del]);
	return arr;
}

mast.elem = function(listID, ID, userID, insertTime, email, state)
{
	var menu = adm.getMenu(mast.menu(listID, ID, userID, insertTime, email, state));
	adm.write('<tr' + (mast.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getFrameLink('mailto:' + email, email) + ((state & 1) == 0 ? (' <span class="badge badge-secondary">' + mast.getState0(0) + '</span>') : '') + ((state & 2) > 0 ? (' <span class="badge badge-danger">' + mast.getState1(1) + '</span>') : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>');
}

mast.empty = function()
{
	adm.write('<tr><td colspan="5" align="center">' + lan.mast.empty + '</td></tr>');
}

mast.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.mast.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.mast.del, lan.mast.del_tip, \'master.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.mast.del + '</a>', 3, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:mast.prepareAdd();void(0);">' + lan.mast.add + '</a>&nbsp;&nbsp;', 1, 'right')  + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('mast.buf', 'master.php');
	adm.write('</div>');

	adm.write('<datalist id="userList"></datalist><template id="userTemplate"></template><template id="addressTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.mast.info);

	mast.userinit = false;
}

mast.add = function()
{
	mast.handler = null;
	mast.userlist();
	adm.showForm('main', '', lan.mast.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.mast.add_user, '', '<input type="text" class="form-control" id="userID" name="userID" list="userList" placeholder="' + lan.mast.add_user_tip + '" oninput="if(mast.handler != null) clearTimeout(mast.handler); mast.handler = setTimeout(function(){adm.datalist(\'userTemplate\', \'userList\', \'userID\', 8);}, 500);" autocomplete="off"/>', lan.mast.err[0]) + '</div></form>', lan.mast.add_submit, mast.addSubmit);
}

mast.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var userID = document.getElementById('userID');
	var userIDv = parseInt(userID.value);
	userID.setCustomValidity(isNaN(userIDv) || userIDv < 1 ? lan.mast.err[0] : '');
	return form.checkValidity() ? ['master.php?action=add', $('form#mainform').serialize()] : null;
}

mast.userlist = function()
{
	if(mast.userinit) return;
	mast.userinit = true;
	var userStr = new Array();
	for(var i = buf.user.length - 1; i > 0; i--) userStr.push('<option value="' + buf.user[i][0] + '">' + buf.user[i][0] + ' # ' + buf.user[i][1] + '</option>');
	document.getElementById('userTemplate').innerHTML = userStr.join('');
	adm.datalist('userTemplate', 'userList', 'userID', 8);
}

mast.prepareAdd = function()
{
	if(buf.hasOwnProperty('user'))
	{
		adm.get('userbuffer.l0.php', 'time=' + buf.user[0], true, mast.add);
	}
	else
	{
		buf.user = new Array();
		adm.get('userbuffer.l0.php', '', true, mast.prepareAdd);
	}
}

mast.getState0 = function(state)
{
	switch(state)
	{
		case 0: return lan.mast.state_0;
		case 1: return lan.mast.state_1;
	}
	return '';
}

mast.getState1 = function(state)
{
	switch(state)
	{
		case 0: return lan.mast.state_2;
		case 1: return lan.mast.state_3;
	}
	return '';
}





pet[36] = function(info)
{
	return lan.srecInfo[36].replace('%A%', info[0]);
}

pet[37] = function(info)
{
	return lan.srecInfo[37].replace('%A%', info[0]);
}









var band = new Object();

band.buffer = function(buffer, size, offset, show, records, list)
{
	band.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

band.clear = function()
{
	band.searchQI = '';
	band.sortQI = '';
}

band.searchFun = function()
{
	return [
		[0, lan.band.id, lan.band.err[0], lan.band.err[1], lan.band.err[2]],
		[6, lan.band.source, lan.band.err[3]],
		[6, lan.band.target, lan.band.err[4]],
		[3, lan.band.state, band.getState],
		[5, lan.band.insert_time, 1, lan.band.err[5]],
		[9, lan.band.flow, lan.band.err[6], lan.band.err[7], lan.band.err[8]]
	];
}

band.sortFun = function()
{
	return [lan.band.id, lan.band.insert_time, lan.band.flow];
}

band.top = function()
{
	adm.bstate('band');

	adm.initialize(lan.band.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.band.title, adm.getSearch('band.php', 'band.searchFun()', 'band.searchQI', 'band.sortQI') + ' ' + adm.getSort('band.php', 'band.sortFun()', 'band.searchQI', 'band.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.band.id + '</th><th>' + lan.band.source + '</th><th>' + lan.band.target + '</th><th>' + lan.band.state + '</th><th>' + lan.band.insert_time + '</th><th>' + lan.band.flow + '</th></thead><tbody>');
}

band.menu = function(listID, ID, sourceID, targetID, state, insertTime, flow, sourceName, targetName)
{
	var arr = new Array();
	if(adm.cshop == targetID) arr.push(['javascript:shop.searchQI = \'0$' + sourceID + '$' + sourceID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + sourceID + '$' + sourceID + '\');', 'admin/icon00.gif', lan.band.source_tip]);
	if(adm.cshop == sourceID) arr.push(['javascript:shop.searchQI = \'0$' + targetID + '$' + targetID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + targetID + '$' + targetID + '\');', 'admin/icon00.gif', lan.band.target_tip]);
	arr.push(['javascript:tsa.searchQI = \'9$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=9$' + ID + '\');', 'admin/icon00.gif', lan.band.transaction_tip]);
	return arr;
}

band.elem = function(listID, ID, sourceID, targetID, state, insertTime, flow, sourceName, targetName)
{
	var menu = adm.getMenu(band.menu(listID, ID, sourceID, targetID, state, insertTime, flow, sourceName, targetName));
	adm.write('<tr' + (band.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + sourceName + '</td><td' + adm.getFrameStyle(listID) + '>' + targetName + '</td><td' + adm.getFrameStyle(listID) + '>' + (state == 0 ? lan.band.state_0 : lan.band.state_1) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.pri.replace('%A%', flow / 100) + '</td></tr>');
}

band.empty = function()
{
	adm.write('<tr><td colspan="8" align="center">' + lan.band.empty + '</td></tr>');
}

band.bottom = function()
{
	adm.write('</tbody></table>');
	adm.pagelist('band.buf', 'band.php');
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.band.info);
}





pet[61] = function(info)
{
	return lan.srecInfo[61].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[62] = function(info)
{
	return lan.srecInfo[62].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[63] = function(info)
{
	return lan.srecInfo[63].replace('%A%', info[0]);
}

pet[64] = function(info)
{
	return lan.srecInfo[64].replace('%A%', info[0]);
}

pet[65] = function(info)
{
	return lan.srecInfo[65].replace('%A%', info[0]);
}

pet[66] = function(info)
{
	return lan.srecInfo[66].replace('%A%', info[0]);
}









var off = new Object();

off.buffer = function(buffer, size, offset, show, records, list)
{
	off.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

off.clear = function()
{
	off.searchQI = '';
	off.sortQI = '';
}

off.result = function(id, info)
{
	switch(id)
	{
		case 0:
			$('#main').modal('show');
			document.getElementById('articleID').setCustomValidity(lan.off.err[16]);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('shopID').setCustomValidity(lan.off.err[15]);
			break;
		case 3:
			adm.alert('alert', lan.off.del, lan.off.err[23]);
			break;
		case 2:
		case 6:
			adm.suspend();
			adm.addbuffer(off.buf, info.toString());
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
		case 4:
			adm.suspend();
			adm.delbuffer(off.buf, info);
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
		case 5:
			adm.suspend();
			adm.updbuffer(off.buf, info.toString());
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
	}
}

off.searchFun = function()
{
	return [
		[0, lan.off.id, lan.off.err[0], lan.off.err[1], lan.off.err[2]],
		[6, lan.off.article, lan.off.err[3]],
		[6, lan.off.target, lan.off.err[5]],
		[3, lan.off.flag, off.getFlag],
		[9, lan.off.discount, lan.off.err[6], lan.off.err[7], lan.off.err[8]],
		[9, lan.off.price, lan.off.err[9], lan.off.err[10], lan.off.err[11]],
		[1, lan.off.inventory, lan.off.err[12], lan.off.err[13], lan.off.err[14]],
		[5, lan.off.start_time, 3, lan.off.err[15]],
		[5, lan.off.end_time, 3, lan.off.err[16]]
	];
}

off.sortFun = function()
{
	return [lan.off.id, lan.off.discount, lan.off.price, lan.off.inventory, lan.off.start_time, lan.off.end_time];
}

off.top = function()
{
	adm.bstate('offer');

	adm.initialize(lan.off.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.off.title, adm.getSearch('offer.php', 'off.searchFun()', 'off.searchQI', 'off.sortQI') + ' ' + adm.getSort('offer.php', 'off.sortFun()', 'off.searchQI', 'off.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.off.id + '</th><th>' + lan.off.tit + '</th><th>' + lan.off.name + '</th><th>' + lan.off.price + '</th><th>' + lan.off.inventory + '</th><th>' + lan.off.start_time + '</th><th>' + lan.off.end_time + '</th></thead><tbody>');
}

off.menu = function(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList)
{
	var arr = new Array();
	arr.push(['javascript:art.searchQI = \'0$' + articleID + '$' + articleID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=0$' + articleID + '$' + articleID + '\');', 'admin/icon00.gif', lan.off.article_tip]);
	if(targetID != shopID) arr.push(['javascript:shop.searchQI = \'0$' + targetID + '$' + targetID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + targetID + '$' + targetID + '\');', 'admin/icon00.gif', lan.off.target_tip]);
	if(targetID != shopID) arr.push(['javascript:band.searchQI = \'1$' + shopID + '|2$' + targetID + '\'; band.sortQI = \'\'; adm.post(\'band.php\', \'searchQI=1$' + shopID + '|2$' + targetID + '\');', 'admin/icon00.gif', lan.off.band_tip]);
	arr.push(['javascript:tsa.searchQI = \'3$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=3$' + ID + '\');', 'admin/icon00.gif', lan.off.transaction_tip]);
	arr.push([]);
	arr.push(['javascript:adm.get(\'offer.php\', \'action=copy&offerID=' + ID + '\');void(0);', 'offer.l0/icon03.gif', lan.off.copy]);
	arr.push(['javascript:off.edit(' + listID + ', ' + ID + ', ' + flag + ', ' + discount + ', ' + price + ', ' + inventory + ', ' + startTime + ', ' + endTime + ', ' + targetID + ', document.getElementById(\'bandList.' + listID + '\').value, ' + shopID + ', document.getElementById(\'shopName.' + listID + '\').value);void(0);', 'offer.l0/icon02.gif', lan.off.edit]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.off.del, lan.off.del_tip, \'offer.php\', \'action=del&IDList=' + ID + '\');void(0);', 'offer.l0/icon01.gif', lan.off.del]);
	return arr;
}

off.elem = function(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList)
{
	var flagArr = new Array();
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag & (1 << buf.flag[i].index)) 
			flagArr.push(buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name);
	}
	if(flagArr.length == 0) flagArr.push(lan.gen.none);
	var shopName = '';
	var targetName = '';
	for(var i = 0; i < buf.shop.length; i++)
	{
		if(buf.shop[i].id == adm.cshop)
		{
			shopName = targetName = buf.shop[i].name;
			break;
		}
	}
	var bands = bandList != '' ? bandList.split('|') : new Array();
	for(var i = 0; i < bands.length; i++)
	{
		var bandInfo = bands[i].split('$');
		if(targetID == parseInt(bandInfo[0]))
		{
			targetName = bandInfo[1];
			break;
		}
	}
	var currTime = Math.round(+ new Date() / 1000);
	var state = startTime < currTime && (endTime == 0 || endTime > currTime) ? 1 : 0;
	var menu = adm.getMenu(off.menu(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList));
	adm.write('<tr' + (off.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '<input type="hidden" id="bandList.' + listID + '" value="' + bandList + '"><input type="hidden" id="shopName.' + listID + '" value="' + shopName + '"></td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + title + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.pri.replace('%A%', (price - discount) / 100) + (discount != 0 ? ('&nbsp;<s>' + lan.sys.pri.replace('%A%', price / 100) + '</s>') : '') + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + inventory + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(startTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(endTime) + '</td></tr>' + adm.getFrame(listID, 9, '<tr>' + adm.getDetail(lan.off.tit, title, 1) + adm.getDetail(lan.off.name, name, 1) + adm.getDetail(lan.off.id, ID, 1) + adm.getDetail(lan.off.flag, flagArr.join(', '), 1) + adm.getDetail(lan.off.target, targetName, 1) + adm.getDetail(lan.off.start_time, adm.getTimeStr(startTime), 1) + '</tr><tr>' + adm.getDetail(lan.off.subtit, subTitle, 1) + adm.getDetail(lan.off.subname, subName, 2) + adm.getDetail(lan.off.price, lan.sys.pri.replace('%A%', (price - discount) / 100) + (discount != 0 ? ('&nbsp;<s>' + lan.sys.pri.replace('%A%', price / 100) + '</s>') : ''), 1) + adm.getDetail(lan.off.inventory, inventory, 1) + adm.getDetail(lan.off.end_time, adm.getTimeStr(endTime), 1) + '</tr>'));
}

off.empty = function()
{
	adm.write('<tr><td colspan="9" align="center">' + lan.off.empty + '</td></tr>');
}

off.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.off.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.off.del, lan.off.del_tip, \'offer.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.off.del + '</a> ', 7, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:off.prepareAdd2();void(0);">' + lan.off.add + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('off.buf', 'offer.php');
	adm.write('</div>');

	adm.write('<datalist id="articleList"></datalist><template id="articleTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.off.info);

	off.articleinit = false;
}

off.add = function()
{
	off.ahandler = null;
	off.articlelist();
	adm.showForm('main', '', lan.off.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.off.add_article, '', '<input type="text" class="form-control" id="articleID" name="articleID" list="articleList" placeholder="' + lan.off.add_article_tip + '" oninput="if(off.ahandler != null) clearTimeout(off.ahandler); off.ahandler = setTimeout(function(){adm.datalist(\'articleTemplate\', \'articleList\', \'articleID\', 8);}, 500);" value="' + adm.findSearch(1, 0, off.searchQI) + '" autocomplete="off"/>', lan.off.err[18]) + '</div></form>', lan.off.add_submit, off.addSubmit);
}

off.articlelist = function()
{
	if(off.articleinit) return;
	off.articleinit = true;
	var articleStr = new Array();
	for(var i = buf.art.length - 1; i > 0; i--) articleStr.push('<option value="' + buf.art[i][0] + '">' + buf.art[i][0] + ' # ' + buf.art[i][1] + (buf.art[i][2] != '' ? (' / ' + buf.art[i][2]) : '') + (buf.art[i][3] != '' ? (' / ' + buf.art[i][3]) : '') + '</option>');
	document.getElementById('articleTemplate').innerHTML = articleStr.join('');
	adm.datalist('articleTemplate', 'articleList', 'articleID', 8);
}

off.prepareAdd2 = function()
{
	if(buf.hasOwnProperty('art'))
	{
		adm.get('articlebuffer.l0.php', 'time=' + buf.art[0], true, off.add);
	}
	else
	{
		buf.art = new Array();
		adm.get('articlebuffer.l0.php', '', true, off.prepareAdd2);
	}
}

off.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var articleID = document.getElementById('articleID');
	var articleIDv = parseInt(articleID.value);
	articleID.setCustomValidity(isNaN(articleIDv) || articleIDv < 1 ? lan.off.err[18] : '');
	return form.checkValidity() ? ['offer.php?action=add', $('form#mainform').serialize()] : null;
}

off.edit = function(listID, ID, flag, discount, price, inventory, startTime, endTime, targetID, bandList, shopID, shopName)
{
	var flagArr = new Array();
	for(var i = 0; i < buf.flag.length; i++) flagArr.push('<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="flag_' + i + '" onchange="off.updateFlag(' + buf.flag[i].index + ', this.checked);"' + ((flag & (1 << buf.flag[i].index)) > 0 ? ' checked' : '') + (buf.flag[i].index < 8 ? ' disabled' : '') + '><label class="form-check-label" for="flag_' + i + '">' + (buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name) + '</label>&nbsp;&nbsp;&nbsp;&nbsp;</div>');
	if(flagArr.length == 0) flagArr.push(lan.gen.none);
	var bandArr = new Array();
	var bands = bandList != '' ? bandList.split('|') : new Array();
	for(var i = 0; i < bands.length; i++)
	{
		var bandInfo = bands[i].split('$');
		bandArr.push('<option value="' + bandInfo[0] + '"' + (targetID == parseInt(bandInfo[0]) ? ' selected' : '') + '>' + bandInfo[1] + '</option>');
	}
	var dt = new Date();
	var currTime = Math.floor(dt.getTime() / 1000);
	var str = new Array();
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_0, lan.off.edit_info_0, adm.replaceInput(lan.sys.pri, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" id="priceShow" onchange="document.getElementById(\'price\').value = Math.round(parseFloat(this.value) * 100);" value="' + (price / 100) + '" autocomplete="off"/><input type="hidden" id="price" name="price" value="' + price + '"/>']]), lan.off.err[19]) + adm.getOption(lan.off.edit_title_1, lan.off.edit_title_1, adm.replaceInput(lan.sys.pri, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" id="discountShow" onchange="document.getElementById(\'discount\').value = Math.round(parseFloat(this.value) * 100);" value="' + (discount / 100) + '" autocomplete="off"/><input type="hidden" id="discount" name="discount" value="' + discount + '"/>']]), lan.off.err[20]) + adm.getOption(lan.off.edit_title_2, '', '<input type="hidden" id="flag" name="flag" value="' + flag + '">' + flagArr.join(''), '') + '</div>');
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_3, '', '<input type="text" class="form-control" id="inventory" name="inventory" value="' + inventory + '" autocomplete="off"/>', lan.off.err[21]) + adm.getOption(lan.off.edit_title_4, '', adm.getCal('startTime', 'startTime', startTime, 0, currTime + 315360000, true) + '<div class="invalid-feedback" id="time.error" style="display:block"></div>', '') + adm.getOption(lan.off.edit_title_5, '', adm.getCal('endTime', 'endTime', endTime, 0, currTime + 315360000, true), '') + '</div>');
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_6, lan.off.edit_info_6, '<select name="targetID" class="form-control"><option value="' + shopID + '">' + shopName + '</option>' + bandArr.join('') + '</select>', '') + adm.getOptionEmpty() + adm.getOptionEmpty() + '</div>');
	adm.showForm('main', 'modal-xl', lan.off.edit, '<form id="mainform" class="was-validated">' + str.join('') + '<input type="hidden" name="ID" value="' + ID + '"/></form>', lan.off.edit_submit, off.editSubmit);
}
off.updateFlag = function(index, checked)
{
	var flag = document.getElementById('flag').value;
	flag = checked ? (flag | (1 << index)) : (flag & ~ (1 << index));
	document.getElementById('flag').value = flag;
}

off.editSubmit = function()
{
	var form = document.getElementById('mainform');
	var price = document.getElementById('price');
	var priceShow = document.getElementById('priceShow');
	var discount = document.getElementById('discount');
	var discountShow = document.getElementById('discountShow');
	var inventory = document.getElementById('inventory');
	var startTime = document.getElementById('startTime');
	var endTime = document.getElementById('endTime');
	var pricev = parseInt(price.value);
	var discountv = parseInt(discount.value);
	var inventoryv = parseInt(inventory.value);
	var startTimev = parseInt(startTime.value);
	var endTimev = parseInt(endTime.value);
	var timeFlag = isNaN(startTimev) || isNaN(endTimev) || startTimev < 0 || startTimev > endTimev;
	priceShow.setCustomValidity(isNaN(pricev) || pricev < -2147483647 || pricev > 2147483647 ? lan.off.err[19] : '');
	discountShow.setCustomValidity(isNaN(discountv) || discountv < -2147483647 || discountv > 2147483647 || Math.abs(pricev - discountv) > 2147483647 ? lan.off.err[20] : '');
	inventory.setCustomValidity(isNaN(inventoryv) || inventoryv < 0 || inventoryv > 2147483647 ? lan.off.err[21] : '');
	document.getElementById('time.error').innerHTML = timeFlag ? lan.off.err[22] : '';
	return form.checkValidity() && !timeFlag ? ['offer.php?action=edit', $('form#mainform').serialize()] : null;
}

off.getFlag = function(flag)
{
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag == buf.flag[i].index) return buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name;
	}
	return '';
}





pet[41] = function(info)
{
	return lan.srecInfo[41].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[42] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[42].replace('%A%', arr.join(', '));
}

pet[43] = function(info)
{
	return lan.srecInfo[43].replace('%A%', info[0]).replace('%B%', lan.sys.pri.replace('%A%', parseInt(info[1]) / 100)).replace('%C%', lan.sys.pri.replace('%A%', parseInt(info[2]) / 100)).replace('%D%', info[3]).replace('%E%', info[4]);
}

pet[44] = function(info)
{
	return lan.srecInfo[44].replace('%A%', info[0]).replace('%B%', info[1]);
}









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









tsa.result0 = tsa.result;
tsa.result = function(id, info)
{
	switch(id)
	{
		case 20:
			tsa.result0(19, info);
			break;
		default:
			tsa.result0(id, info);
			break;
	}
}

tsa.menu0 = tsa.menu;
tsa.menu = function(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName)
{
	var arr = tsa.menu0(listID, ID, serviceID, orderID, invoiceID, title, subTitle, name, subName, price, tax, num, userID, shopID, offerID, articleID, couponID, codeID, service, flag, offerPrice, discount, minPrice, maxPrice, insertTime, targetID, shipmentID, shopName, targetName);
	
	var i = 2;
	while(arr[i].length > 0) i++;
	arr.splice(i, 0, ['javascript:ivt.searchQI = \'1$' + articleID + '|2$' + targetID + '\'; ivt.sortQI = \'\'; adm.post(\'inventory.php\', \'searchQI=1$' + articleID + '|2$' + targetID + '\');', 'admin/icon00.gif', lan.tsa.inventory_tip]);
	
	return arr;
}









var sup = new Object();

sup.buffer = function(buffer, size, offset, show, records, list)
{
	sup.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

sup.clear = function()
{
	sup.searchQI = '';
	sup.sortQI = '';
}

sup.result = function(id, info)
{
	switch(id)
	{
		case 0:
			$('#main').modal('show');
			document.getElementById('userID').setCustomValidity(lan.sup.err[7]);
			break;
		case 1:
		case 4:
			$('#main').modal('show');
			document.getElementById('shopID').setCustomValidity(lan.sup.err[8]);
			break;
		case 2:
			adm.suspend();
			adm.addbuffer(sup.buf, info.toString());
			adm.gopage(sup.buf, sup.buf.page - 1, 'support.php');
			break;
		case 3:
		case 5:
			adm.suspend();
			adm.delbuffer(sup.buf, info.toString());
			adm.gopage(sup.buf, sup.buf.page - 1, 'support.php');
			break;
		case 6:
			adm.suspend();
			adm.updbuffer(sup.buf, info.toString());
			adm.gopage(sup.buf, sup.buf.page - 1, 'support.php');
			break;
	}
}

sup.searchFun = function()
{
	return [
		[0, lan.sup.id, lan.sup.err[0], lan.sup.err[1], lan.sup.err[2]],
		[6, lan.sup.user, lan.sup.err[3]],
		[3, lan.sup.type, sup.getType],
		[3, lan.sup.state, sup.getState],
		[5, lan.sup.insert_time, 1, lan.sup.err[5]],
		[5, lan.sup.update_time, 1, lan.sup.err[6]]
	];
}

sup.sortFun = function()
{
	return [lan.sup.id, lan.sup.state, lan.sup.insert_time, lan.sup.update_time];
}

sup.top = function()
{
	adm.bstate('support');

	adm.initialize(lan.sup.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.sup.title, adm.getSearch('support.php', 'sup.searchFun()', 'sup.searchQI', 'sup.sortQI') + ' ' + adm.getSort('support.php', 'sup.sortFun()', 'sup.searchQI', 'sup.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.sup.id + '</th><th>' + lan.sup.type + '</th><th>' + lan.sup.state + '</th><th>' + lan.sup.starter + '</th><th>' + lan.sup.insert_time + '</th><th>' + lan.sup.update_time + '</th></thead><tbody>');
}

sup.menu = function(listID, ID, userID, shopID, state, insertTime, updateTime, email)
{
	var arr = new Array();
	if(userID > 0) arr.push(['javascript:user.searchQI = \'0$' + userID + '$' + userID + '\'; user.sortQI = \'\'; adm.post(\'user.php\', \'searchQI=0$' + userID + '$' + userID + '\');', 'admin/icon00.gif', lan.sup.user_tip]);
	if(shopID > 0) arr.push(['javascript:shop.searchQI = \'0$' + shopID + '$' + shopID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + shopID + '$' + shopID + '\');', 'admin/icon00.gif', userID == 0 ? lan.sup.shop_tip : lan.sup.shopc_tip]);
	arr.push([]);
	arr.push(['javascript:msg.clear();adm.get(\'message.php\', \'coreID=' + ID + '\');void(0);', 'support.l0/icon05.gif', lan.sup.edit_message]);
	arr.push([]);
	if(userID > 0 && state > 0) arr.push(['javascript:sup.prepareRelay(' + ID + ', ' + shopID + ');void(0);', 'support.l0/icon02.gif', lan.sup.relay]);
	if(state > 0) arr.push(['javascript:adm.confirm(\'confirm\', lan.sup.close, lan.sup.close_tip, \'support.php\', \'action=close&ID=' + ID + '\');void(0);', 'support.l0/icon03.gif', lan.sup.close]);
	return arr;
}

sup.elem = function(listID, ID, userID, shopID, state, insertTime, updateTime, email)
{
	var menu = adm.getMenu(sup.menu(listID, ID, userID, shopID, state, insertTime, updateTime, email));
	adm.write('<tr' + (sup.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + (userID > 0 ? lan.sup.type_0 : lan.sup.type_1) + '</td><td' + adm.getFrameStyle(listID) + '>' + (state > 0 ? ('<b>' + lan.sup.state_1 + '</b>') : lan.sup.state_0) + '</td><td' + adm.getFrameStyle(listID) + '>' + (userID > 0 ? adm.getFrameLink('mailto:' + email, email) : '') + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(updateTime) + '</td></tr>' + adm.getFrame(listID, 9, '<tr>' + adm.getDetail(lan.sup.id, ID, 1) + adm.getDetail(lan.sup.type, userID > 0 ? lan.sup.type_0 : lan.sup.type_1, 1) + adm.getDetail(lan.sup.state, state > 0 ? ('<b>' + lan.sup.state_1 + '</b>') : lan.sup.state_0, 1) + adm.getDetail(lan.sup.starter, userID > 0 ? email : '', 1) + adm.getDetail(lan.sup.insert_time, adm.getTimeStr(insertTime), 1) + adm.getDetail(lan.sup.update_time, adm.getTimeStr(updateTime), 1) + '</tr>'));
}

sup.empty = function()
{
	adm.write('<tr><td colspan="8" align="center">' + lan.sup.empty + '</td></tr>');
}

sup.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('', 6, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:sup.prepareAdd1();void(0);">' + lan.sup.addu + '</a> <a class="btn btn-outline-dark btn-sm" href="javascript:adm.get(\'support.php?action=add\');void(0);">' + lan.sup.adds + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('sup.buf', 'support.php');
	adm.write('</div>');

	adm.write('<datalist id="userList"></datalist><template id="userTemplate"></template><datalist id="shopList"></datalist><template id="shopTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.sup.info);

	sup.userinit = false;
	sup.shopinit = false;
}

sup.add = function(type)
{
	if(type == 0) sup.uhandler = null;
	if(type == 0) sup.userlist();
	adm.showForm('main', '', type == 0 ? lan.sup.addu : lan.sup.adds, '<form id="mainform" class="was-validated">' + (type == 0 ? ('<div class="form-row">' + adm.getOption(lan.sup.add_user, '', '<input type="text" class="form-control" id="userID" name="userID" list="userList" placeholder="' + lan.sup.add_user_tip + '" oninput="if(sup.uhandler != null) clearTimeout(sup.uhandler); sup.uhandler = setTimeout(function(){adm.datalist(\'userTemplate\', \'userList\', \'userID\', 8);}, 500);" value="' + adm.findSearch(1, 0, sup.searchQI) + '" autocomplete="off"/>', lan.sup.err[7]) + '</div>') : '') + '</form>', lan.sup.add_submit, sup.addSubmit.bind(null, type));
}

sup.userlist = function()
{
	if(sup.userinit) return;
	sup.userinit = true;
	var userStr = new Array();
	for(var i = buf.user.length - 1; i > 0; i--) userStr.push('<option value="' + buf.user[i][0] + '">' + buf.user[i][0] + ' # ' + buf.user[i][1] + '</option>');
	document.getElementById('userTemplate').innerHTML = userStr.join('');
	adm.datalist('userTemplate', 'userList', 'userID', 8);
}

sup.shoplist = function()
{
	if(sup.shopinit) return;
	sup.shopinit = true;
	var shopStr = new Array();
	for(var i = buf.shop.length - 1; i > 0; i--) shopStr.push('<option value="' + buf.shop[i][0] + '">' + buf.shop[i][0] + ' # ' + buf.shop[i][1] + ' # ' + buf.shop[i][2] + '</option>');
	document.getElementById('shopTemplate').innerHTML = shopStr.join('');
	adm.datalist('shopTemplate', 'shopList', 'shopID', 8);
}

sup.prepareAdd1 = function()
{
	if(buf.hasOwnProperty('user'))
	{
		adm.get('userbuffer.l0.php', 'time=' + buf.user[0], true, sup.add.bind(null, 0));
	}
	else
	{
		buf.user = new Array();
		adm.get('userbuffer.l0.php', '', true, sup.prepareAdd1);
	}
}

sup.addSubmit = function(type)
{
	var form = document.getElementById('mainform');
	var userID = document.getElementById('userID');
	if(type == 0) var userIDv = parseInt(userID.value);
	if(type == 0) userID.setCustomValidity(isNaN(userIDv) || userIDv < 1 ? lan.sup.err[7] : '');
	return form.checkValidity() ? ['support.php?action=add', $('form#mainform').serialize()] : null;
}

sup.relay = function(ID, shopID)
{
	sup.shandler = null;
	sup.shoplist();
	adm.showForm('main', '', lan.sup.relay, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.sup.relay_shop, '', '<input type="text" class="form-control" id="shopID" name="shopID" list="shopList" placeholder="' + lan.sup.relay_shop_tip + '" oninput="if(sup.shandler != null) clearTimeout(sup.shandler); sup.shandler = setTimeout(function(){adm.datalist(\'shopTemplate\', \'shopList\', \'shopID\', 8);}, 500);" value="" autocomplete="off"' + (shopID == 0 ? ' disabled' : '') + '/>', lan.sup.err[8]) + '</div><div class="form-row">' + adm.getOption('', '', '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="noShop" onchange="document.getElementById(\'shopID\').value = \'\';document.getElementById(\'shopID\').disabled = this.checked;"' + (shopID == 0 ? ' checked' : '') + '><label class="form-check-label" for="noShop">' + lan.sup.relay_no_shop + '</label></div>', '') + '</div><input type="hidden" name="ID" value="' + ID + '"/><input type="hidden" id="oshopID" value="' + shopID + '"/></form>', lan.sup.relay_submit, sup.relaySubmit);
}

sup.prepareRelay = function(ID, shopID)
{
	if(buf.hasOwnProperty('shop'))
	{
		adm.get('shopbuffer.l0.php', 'time=' + buf.shop[0], true, sup.relay.bind(null, ID, shopID));
	}
	else
	{
		buf.shop = new Array();
		adm.get('shopbuffer.l0.php', '', true, sup.prepareRelay.bind(null, ID, shopID));
	}
}

sup.relaySubmit = function()
{
	var form = document.getElementById('mainform');
	var shopID = document.getElementById('shopID');
	var oshopID = document.getElementById('oshopID');
	var noShop = document.getElementById('noShop');
	var shopIDv = parseInt(shopID.value);
	var oshopIDv = parseInt(oshopID.value);
	shopID.setCustomValidity(isNaN(shopIDv) || shopIDv < 1 || shopIDv == oshopIDv ? lan.sup.err[8] : '');
	if(noShop.checked && oshopIDv > 0) shopID.setCustomValidity('');
	return form.checkValidity() ? ['support.php?action=relay', $('form#mainform').serialize()] : null;
}

sup.getType = function(type)
{
	switch(type)
	{
		case 0: return lan.sup.type_0;
		case 1: return lan.sup.type_1;
	}
	return '';
}

sup.getState = function(state)
{
	switch(state)
	{
		case 0: return lan.sup.state_0;
		case 1: return lan.sup.state_1;
	}
	return '';
}





pet[96] = function(info)
{
	return lan.srecInfo[96].replace('%A%', info[0]).replace('%B%', parseInt(info[1]) == 0 ? lan.gen.none : info[1]);
}

pet[97] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[97].replace('%A%', arr.join(', '));
}

pet[98] = function(info)
{
	return lan.srecInfo[98].replace('%A%', info[0]).replace('%B%', parseInt(info[1]) == 0 ? lan.gen.none : info[1]);
}

pet[99] = function(info)
{
	return lan.srecInfo[99].replace('%A%', info[0]);
}









var msg = new Object();

msg.buffer = function(buffer, size, offset, show, records, list, coreID)
{
	msg.buf = adm.setbuffer(buffer, size, offset, show, records, list);
	msg.coreID = coreID;
}

msg.clear = function()
{
}

msg.result = function(id, info)
{
	switch(id)
	{
		case 0:
			adm.suspend();
			adm.addbuffer(msg.buf, info.toString());
			adm.gopage(msg.buf, msg.buf.page - 1, 'message.php?coreID=' + msg.coreID);
			break;
		case 1:
			adm.suspend();
			adm.delbuffer(msg.buf, info);
			adm.gopage(msg.buf, msg.buf.page - 1, 'message.php?coreID=' + msg.coreID);
			break;
	}
}

msg.top = function()
{
	adm.bstate('message-' + msg.coreID);

	adm.initialize(lan.msg.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; <a href="javascript:adm.get(\'support.php\');">' + lan.sup.title + '</a> &gt; ' + lan.msg.title + ' # ' + msg.coreID, adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.msg.id + '</th><th>' + lan.msg.name + '</th><th>' + lan.msg.message + '</th><th>' + lan.msg.insert_time + '</th></thead><tbody>');
}

msg.menu = function(listID, ID, message, userID, shopID, insertTime, email, name)
{
	var arr = new Array();
	if(userID > 0) arr.push(['javascript:user.searchQI = \'0$' + userID + '$' + userID + '\'; user.sortQI = \'\'; adm.post(\'user.php\', \'searchQI=0$' + userID + '$' + userID + '\');', 'admin/icon00.gif', lan.msg.user_tip]);
	if(shopID > 0) arr.push(['javascript:shop.searchQI = \'0$' + shopID + '$' + shopID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + shopID + '$' + shopID + '\');', 'admin/icon00.gif', lan.msg.shop_tip]);
	return arr;
}

msg.elem = function(listID, ID, message, userID, shopID, insertTime, email, name)
{
	var nameStr = lan.msg.background;
	if(shopID > 0) nameStr = name;
	if(userID > 0) nameStr = email;
	var menu = adm.getMenu(msg.menu(listID, ID, message, userID, shopID, insertTime, email, name));
	adm.write('<tr' + (msg.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + nameStr + '</td>' + adm.getFrameInfo(listID, 60, sys.lEncode(message)) + '<td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td></tr>' + adm.getFrame(listID, 6, '<tr>' + adm.getDetail(lan.msg.id, ID, 1) + adm.getDetail(lan.msg.name, nameStr, 1) + adm.getDetail(lan.msg.insert_time, adm.getTimeStr(insertTime), 1) + '</tr><tr>' + adm.getDetail(lan.msg.message, sys.mEncode(message), 3) + '</tr>'));
}

msg.empty = function()
{
	adm.write('<tr><td colspan="6" align="center">' + lan.msg.empty + '</td></tr>');
}

msg.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('', 4, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:msg.add();void(0);">' + lan.msg.add + '</a>&nbsp;&nbsp;', 1, 'right')  + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('msg.buf', 'message.php?coreID=' + msg.coreID);
	adm.write('</div>');

	adm.uninitialize();

	adm.infobox(lan.msg.info);
}

msg.add = function()
{
	adm.showForm('main', 'modal-xl', lan.msg.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.msg.add_message, '', '<textarea class="form-control" id="message" name="message" rows="5"></textarea>', lan.msg.err[0]) + '</div></form>', lan.msg.add_submit, msg.addSubmit);
}

msg.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var message = document.getElementById('message');
	var messagev = sys.uEncode(message.value);
	message.setCustomValidity(messagev.length < 1 || messagev.length > 4095 ? lan.msg.err[0] : '');
	return form.checkValidity() ? ['message.php?action=add&coreID=' + msg.coreID, $('form#mainform').serialize()] : null;
}









var ivt = new Object();

ivt.buffer = function(buffer, size, offset, show, records, list)
{
	ivt.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

ivt.clear = function()
{
	ivt.searchQI = '';
	ivt.sortQI = '';
}

ivt.result = function(id, info)
{
	switch(id)
	{	
		case 0:
			$('#main').modal('show');
			document.getElementById('articleID').setCustomValidity(lan.ivt.err[16]);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('shopID').setCustomValidity(lan.ivt.err[15]);
			break;
		case 2:
			adm.alert('alert', lan.ivt.add, lan.ivt.err[18]);
			break;
		case 3:
			adm.suspend();
			adm.addbuffer(ivt.buf, info.toString());
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
		case 4:
			adm.suspend();
			adm.delbuffer(ivt.buf, info);
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
		case 5:
			adm.suspend();
			adm.updbuffer(ivt.buf, info.toString());
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
	}
}

ivt.searchFun = function()
{
	return [
		[0, lan.ivt.id, lan.ivt.err[0], lan.ivt.err[1], lan.ivt.err[2]],
		[6, lan.ivt.article, lan.ivt.err[3]],
		[2, lan.ivt.num, lan.ivt.err[5], lan.ivt.err[6], lan.ivt.err[7]],
		[5, lan.ivt.insert_time, 1, lan.ivt.err[8]],
		[5, lan.ivt.update_time, 1, lan.ivt.err[9]],
		[4, lan.ivt.tit, lan.ivt.err[10]],
		[4, lan.ivt.subtit, lan.ivt.err[11]],
		[4, lan.ivt.name, lan.ivt.err[12]],
		[4, lan.ivt.subname, lan.ivt.err[13]],
		[4, lan.ivt.code, lan.ivt.err[14]]
	];
}

ivt.sortFun = function()
{
	return [lan.ivt.id, lan.ivt.num, lan.ivt.insert_time, lan.ivt.update_time, lan.ivt.tit, lan.ivt.subtit, lan.ivt.name, lan.ivt.subname, lan.ivt.code];
}

ivt.top = function()
{
	adm.bstate('inventory');

	adm.initialize(lan.ivt.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.ivt.title, adm.getSearch('inventory.php', 'ivt.searchFun()', 'ivt.searchQI', 'ivt.sortQI') + ' ' + adm.getSort('inventory.php', 'ivt.sortFun()', 'ivt.searchQI', 'ivt.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.ivt.id + '</th><th>' + lan.ivt.tit + '</th><th>' + lan.ivt.name + '</th><th>' + lan.ivt.num + '</th><th>' + lan.ivt.insert_time + '</th><th>' + lan.ivt.update_time + '</th></thead><tbody>');
}

ivt.menu = function(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code)
{
	var arr = new Array();
	arr.push(['javascript:art.searchQI = \'0$' + articleID + '$' + articleID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=0$' + articleID + '$' + articleID + '\');', 'admin/icon00.gif', lan.ivt.article_tip]);
	arr.push(['javascript:off.searchQI = \'1$' + articleID + '|3$' + shopID + '\'; off.sortQI = \'\'; adm.post(\'offer.php\', \'searchQI=1$' + articleID + '|3$' + shopID + '\');', 'admin/icon00.gif', lan.ivt.offer_tip]);
	arr.push(['javascript:tsa.searchQI = \'4$' + articleID + '|10$' + shopID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=4$' + articleID + '|10$' + shopID + '\');', 'admin/icon00.gif', lan.ivt.transaction_tip]);
	arr.push([]);
	arr.push(['javascript:ivt.edit(' + listID + ', ' + ID + ');void(0);', 'inventory.l0/icon02.gif', lan.ivt.edit]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.ivt.del, lan.ivt.del_tip, \'inventory.php\', \'action=del&IDList=' + ID + '\');void(0);', 'inventory.l0/icon01.gif', lan.ivt.del]);
	return arr;
}

ivt.elem = function(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code)
{
	var menu = adm.getMenu(ivt.menu(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code));
	adm.write('<tr' + (ivt.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + title + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + num + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(updateTime) + '</td></tr>' + adm.getFrame(listID, 8, '<tr>' + adm.getDetail(lan.ivt.id, ID, 1) + adm.getDetail(lan.ivt.tit, title, 1) + adm.getDetail(lan.ivt.name, name, 1) + adm.getDetail(lan.ivt.code, code, 1) + adm.getDetail(lan.ivt.insert_time, adm.getTimeStr(insertTime), 1) + '</tr>'));
}

ivt.empty = function()
{
	adm.write('<tr><td colspan="8" align="center">' + lan.ivt.empty + '</td></tr>');
}

ivt.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.ivt.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.ivt.del, lan.ivt.del_tip, \'inventory.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.ivt.del + '</a>', 6, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:ivt.prepareAdd2();void(0);">' + lan.ivt.add + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('ivt.buf', 'inventory.php');
	adm.write('</div>');

	adm.write('<datalist id="articleList"></datalist><template id="articleTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.ivt.info);

	ivt.artinit = false;
}

ivt.add = function()
{
	ivt.ahandler = null;
	ivt.articlelist();
	adm.showForm('main', '', lan.ivt.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ivt.add_article, '', '<input type="text" class="form-control" id="articleID" name="articleID" list="articleList" placeholder="' + lan.ivt.add_article_tip + '" oninput="if(ivt.ahandler != null) clearTimeout(ivt.ahandler); ivt.ahandler = setTimeout(function(){adm.datalist(\'articleTemplate\', \'articleList\', \'articleID\', 8);}, 500);" value="' + adm.findSearch(1, 0, ivt.searchQI) + '" autocomplete="off"/>', lan.ivt.err[16]) + '</div></form>', lan.ivt.add_submit, ivt.addSubmit);
}

ivt.articlelist = function()
{
	if(ivt.artinit) return;
	ivt.artinit = true;
	var articleStr = new Array();
	for(var i = buf.art.length - 1; i > 0; i--) articleStr.push('<option value="' + buf.art[i][0] + '">' + buf.art[i][0] + ' # ' + buf.art[i][1] + (buf.art[i][2] != '' ? (' / ' + buf.art[i][2]) : '') + (buf.art[i][3] != '' ? (' / ' + buf.art[i][3]) : '') + '</option>');
	document.getElementById('articleTemplate').innerHTML = articleStr.join('');
	adm.datalist('articleTemplate', 'articleList', 'articleID', 8);
}

ivt.prepareAdd2 = function()
{
	if(buf.hasOwnProperty('art'))
	{
		adm.get('articlebuffer.l0.php', 'time=' + buf.art[0], true, ivt.add);
	}
	else
	{
		buf.art = new Array();
		adm.get('articlebuffer.l0.php', '', true, ivt.prepareAdd2);
	}
}

ivt.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var shopID = document.getElementById('shopID');
	var articleID = document.getElementById('articleID');
	var shopIDv = parseInt(shopID.value);
	var articleIDv = parseInt(articleID.value);
	shopID.setCustomValidity(isNaN(shopIDv) || shopIDv < 1 ? lan.ivt.err[15] : '');
	articleID.setCustomValidity(isNaN(articleIDv) || articleIDv < 1 ? lan.ivt.err[16] : '');
	return form.checkValidity() ? ['inventory.php?action=add', $('form#mainform').serialize()] : null;
}

ivt.edit = function(listID, ID)
{
	adm.showForm('main', '', lan.ivt.edit, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ivt.edit_num, '', '<input type="text" class="form-control" id="num" name="num" value="0" autocomplete="off"/>', lan.ivt.err[17]) + '</div><input type="hidden" name="ID" value="' + ID + '"/></form>', lan.ivt.edit_submit, ivt.editSubmit);
}

ivt.editSubmit = function()
{
	var form = document.getElementById('mainform');
	var num = document.getElementById('num');
	var numv = parseInt(num.value);
	num.setCustomValidity(isNaN(numv) || Math.abs(numv) > 2147483647 ? lan.ivt.err[17] : '');
	return form.checkValidity() ? ['inventory.php?action=edit', $('form#mainform').serialize()] : null;
}





pet[51] = function(info)
{
	return lan.srecInfo[51].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[52] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[52].replace('%A%', arr.join(', '));
}

pet[53] = function(info)
{
	return lan.srecInfo[53].replace('%A%', info[0]).replace('%B%', (info[1] > 0 ? '+' : '') + info[1]);
}
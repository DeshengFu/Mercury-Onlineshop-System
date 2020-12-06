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
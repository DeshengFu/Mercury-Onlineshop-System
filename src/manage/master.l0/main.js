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
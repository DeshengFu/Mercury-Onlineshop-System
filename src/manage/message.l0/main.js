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
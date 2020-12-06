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
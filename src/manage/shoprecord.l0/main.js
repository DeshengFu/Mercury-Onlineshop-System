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
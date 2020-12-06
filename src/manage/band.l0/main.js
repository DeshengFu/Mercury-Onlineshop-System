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
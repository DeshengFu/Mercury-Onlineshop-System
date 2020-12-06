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
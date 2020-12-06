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
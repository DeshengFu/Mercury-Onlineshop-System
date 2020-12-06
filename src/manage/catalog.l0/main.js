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
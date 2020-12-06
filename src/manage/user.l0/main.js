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
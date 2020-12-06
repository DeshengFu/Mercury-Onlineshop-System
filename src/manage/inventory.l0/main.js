var ivt = new Object();

ivt.buffer = function(buffer, size, offset, show, records, list)
{
	ivt.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

ivt.clear = function()
{
	ivt.searchQI = '';
	ivt.sortQI = '';
}

ivt.result = function(id, info)
{
	switch(id)
	{	
		case 0:
			$('#main').modal('show');
			document.getElementById('articleID').setCustomValidity(lan.ivt.err[16]);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('shopID').setCustomValidity(lan.ivt.err[15]);
			break;
		case 2:
			adm.alert('alert', lan.ivt.add, lan.ivt.err[18]);
			break;
		case 3:
			adm.suspend();
			adm.addbuffer(ivt.buf, info.toString());
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
		case 4:
			adm.suspend();
			adm.delbuffer(ivt.buf, info);
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
		case 5:
			adm.suspend();
			adm.updbuffer(ivt.buf, info.toString());
			adm.gopage(ivt.buf, ivt.buf.page - 1, 'inventory.php');
			break;
	}
}

ivt.searchFun = function()
{
	return [
		[0, lan.ivt.id, lan.ivt.err[0], lan.ivt.err[1], lan.ivt.err[2]],
		[6, lan.ivt.article, lan.ivt.err[3]],
		[2, lan.ivt.num, lan.ivt.err[5], lan.ivt.err[6], lan.ivt.err[7]],
		[5, lan.ivt.insert_time, 1, lan.ivt.err[8]],
		[5, lan.ivt.update_time, 1, lan.ivt.err[9]],
		[4, lan.ivt.tit, lan.ivt.err[10]],
		[4, lan.ivt.subtit, lan.ivt.err[11]],
		[4, lan.ivt.name, lan.ivt.err[12]],
		[4, lan.ivt.subname, lan.ivt.err[13]],
		[4, lan.ivt.code, lan.ivt.err[14]]
	];
}

ivt.sortFun = function()
{
	return [lan.ivt.id, lan.ivt.num, lan.ivt.insert_time, lan.ivt.update_time, lan.ivt.tit, lan.ivt.subtit, lan.ivt.name, lan.ivt.subname, lan.ivt.code];
}

ivt.top = function()
{
	adm.bstate('inventory');

	adm.initialize(lan.ivt.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.ivt.title, adm.getSearch('inventory.php', 'ivt.searchFun()', 'ivt.searchQI', 'ivt.sortQI') + ' ' + adm.getSort('inventory.php', 'ivt.sortFun()', 'ivt.searchQI', 'ivt.sortQI'));

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.ivt.id + '</th><th>' + lan.ivt.tit + '</th><th>' + lan.ivt.name + '</th><th>' + lan.ivt.num + '</th><th>' + lan.ivt.insert_time + '</th><th>' + lan.ivt.update_time + '</th></thead><tbody>');
}

ivt.menu = function(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code)
{
	var arr = new Array();
	arr.push(['javascript:art.searchQI = \'0$' + articleID + '$' + articleID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=0$' + articleID + '$' + articleID + '\');', 'admin/icon00.gif', lan.ivt.article_tip]);
	arr.push(['javascript:off.searchQI = \'1$' + articleID + '|3$' + shopID + '\'; off.sortQI = \'\'; adm.post(\'offer.php\', \'searchQI=1$' + articleID + '|3$' + shopID + '\');', 'admin/icon00.gif', lan.ivt.offer_tip]);
	arr.push(['javascript:tsa.searchQI = \'4$' + articleID + '|10$' + shopID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=4$' + articleID + '|10$' + shopID + '\');', 'admin/icon00.gif', lan.ivt.transaction_tip]);
	arr.push([]);
	arr.push(['javascript:ivt.edit(' + listID + ', ' + ID + ');void(0);', 'inventory.l0/icon02.gif', lan.ivt.edit]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.ivt.del, lan.ivt.del_tip, \'inventory.php\', \'action=del&IDList=' + ID + '\');void(0);', 'inventory.l0/icon01.gif', lan.ivt.del]);
	return arr;
}

ivt.elem = function(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code)
{
	var menu = adm.getMenu(ivt.menu(listID, ID, articleID, shopID, num, insertTime, updateTime, title, subTitle, name, subName, code));
	adm.write('<tr' + (ivt.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '</td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + title + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + num + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(insertTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(updateTime) + '</td></tr>' + adm.getFrame(listID, 8, '<tr>' + adm.getDetail(lan.ivt.id, ID, 1) + adm.getDetail(lan.ivt.tit, title, 1) + adm.getDetail(lan.ivt.name, name, 1) + adm.getDetail(lan.ivt.code, code, 1) + adm.getDetail(lan.ivt.insert_time, adm.getTimeStr(insertTime), 1) + '</tr>'));
}

ivt.empty = function()
{
	adm.write('<tr><td colspan="8" align="center">' + lan.ivt.empty + '</td></tr>');
}

ivt.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.ivt.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.ivt.del, lan.ivt.del_tip, \'inventory.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.ivt.del + '</a>', 6, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:ivt.prepareAdd2();void(0);">' + lan.ivt.add + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('ivt.buf', 'inventory.php');
	adm.write('</div>');

	adm.write('<datalist id="articleList"></datalist><template id="articleTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.ivt.info);

	ivt.artinit = false;
}

ivt.add = function()
{
	ivt.ahandler = null;
	ivt.articlelist();
	adm.showForm('main', '', lan.ivt.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ivt.add_article, '', '<input type="text" class="form-control" id="articleID" name="articleID" list="articleList" placeholder="' + lan.ivt.add_article_tip + '" oninput="if(ivt.ahandler != null) clearTimeout(ivt.ahandler); ivt.ahandler = setTimeout(function(){adm.datalist(\'articleTemplate\', \'articleList\', \'articleID\', 8);}, 500);" value="' + adm.findSearch(1, 0, ivt.searchQI) + '" autocomplete="off"/>', lan.ivt.err[16]) + '</div></form>', lan.ivt.add_submit, ivt.addSubmit);
}

ivt.articlelist = function()
{
	if(ivt.artinit) return;
	ivt.artinit = true;
	var articleStr = new Array();
	for(var i = buf.art.length - 1; i > 0; i--) articleStr.push('<option value="' + buf.art[i][0] + '">' + buf.art[i][0] + ' # ' + buf.art[i][1] + (buf.art[i][2] != '' ? (' / ' + buf.art[i][2]) : '') + (buf.art[i][3] != '' ? (' / ' + buf.art[i][3]) : '') + '</option>');
	document.getElementById('articleTemplate').innerHTML = articleStr.join('');
	adm.datalist('articleTemplate', 'articleList', 'articleID', 8);
}

ivt.prepareAdd2 = function()
{
	if(buf.hasOwnProperty('art'))
	{
		adm.get('articlebuffer.l0.php', 'time=' + buf.art[0], true, ivt.add);
	}
	else
	{
		buf.art = new Array();
		adm.get('articlebuffer.l0.php', '', true, ivt.prepareAdd2);
	}
}

ivt.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var shopID = document.getElementById('shopID');
	var articleID = document.getElementById('articleID');
	var shopIDv = parseInt(shopID.value);
	var articleIDv = parseInt(articleID.value);
	shopID.setCustomValidity(isNaN(shopIDv) || shopIDv < 1 ? lan.ivt.err[15] : '');
	articleID.setCustomValidity(isNaN(articleIDv) || articleIDv < 1 ? lan.ivt.err[16] : '');
	return form.checkValidity() ? ['inventory.php?action=add', $('form#mainform').serialize()] : null;
}

ivt.edit = function(listID, ID)
{
	adm.showForm('main', '', lan.ivt.edit, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.ivt.edit_num, '', '<input type="text" class="form-control" id="num" name="num" value="0" autocomplete="off"/>', lan.ivt.err[17]) + '</div><input type="hidden" name="ID" value="' + ID + '"/></form>', lan.ivt.edit_submit, ivt.editSubmit);
}

ivt.editSubmit = function()
{
	var form = document.getElementById('mainform');
	var num = document.getElementById('num');
	var numv = parseInt(num.value);
	num.setCustomValidity(isNaN(numv) || Math.abs(numv) > 2147483647 ? lan.ivt.err[17] : '');
	return form.checkValidity() ? ['inventory.php?action=edit', $('form#mainform').serialize()] : null;
}





pet[51] = function(info)
{
	return lan.srecInfo[51].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[52] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[52].replace('%A%', arr.join(', '));
}

pet[53] = function(info)
{
	return lan.srecInfo[53].replace('%A%', info[0]).replace('%B%', (info[1] > 0 ? '+' : '') + info[1]);
}
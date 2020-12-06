var off = new Object();

off.buffer = function(buffer, size, offset, show, records, list)
{
	off.buf = adm.setbuffer(buffer, size, offset, show, records, list);
}

off.clear = function()
{
	off.searchQI = '';
	off.sortQI = '';
}

off.result = function(id, info)
{
	switch(id)
	{
		case 0:
			$('#main').modal('show');
			document.getElementById('articleID').setCustomValidity(lan.off.err[16]);
			break;
		case 1:
			$('#main').modal('show');
			document.getElementById('shopID').setCustomValidity(lan.off.err[15]);
			break;
		case 3:
			adm.alert('alert', lan.off.del, lan.off.err[23]);
			break;
		case 2:
		case 6:
			adm.suspend();
			adm.addbuffer(off.buf, info.toString());
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
		case 4:
			adm.suspend();
			adm.delbuffer(off.buf, info);
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
		case 5:
			adm.suspend();
			adm.updbuffer(off.buf, info.toString());
			adm.gopage(off.buf, off.buf.page - 1, 'offer.php');
			break;
	}
}

off.searchFun = function()
{
	return [
		[0, lan.off.id, lan.off.err[0], lan.off.err[1], lan.off.err[2]],
		[6, lan.off.article, lan.off.err[3]],
		[6, lan.off.target, lan.off.err[5]],
		[3, lan.off.flag, off.getFlag],
		[9, lan.off.discount, lan.off.err[6], lan.off.err[7], lan.off.err[8]],
		[9, lan.off.price, lan.off.err[9], lan.off.err[10], lan.off.err[11]],
		[1, lan.off.inventory, lan.off.err[12], lan.off.err[13], lan.off.err[14]],
		[5, lan.off.start_time, 3, lan.off.err[15]],
		[5, lan.off.end_time, 3, lan.off.err[16]]
	];
}

off.sortFun = function()
{
	return [lan.off.id, lan.off.discount, lan.off.price, lan.off.inventory, lan.off.start_time, lan.off.end_time];
}

off.top = function()
{
	adm.bstate('offer');

	adm.initialize(lan.off.title);

	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; ' + lan.off.title, adm.getSearch('offer.php', 'off.searchFun()', 'off.searchQI', 'off.sortQI') + ' ' + adm.getSort('offer.php', 'off.sortFun()', 'off.searchQI', 'off.sortQI') + ' ' + adm.getFrameControl());

	adm.write('<div class="container-fluid main-content"><table class="table"><thead class="thead-dark"><th style="width:1%"></th><th style="width:4%"></th><th>' + lan.off.id + '</th><th>' + lan.off.tit + '</th><th>' + lan.off.name + '</th><th>' + lan.off.price + '</th><th>' + lan.off.inventory + '</th><th>' + lan.off.start_time + '</th><th>' + lan.off.end_time + '</th></thead><tbody>');
}

off.menu = function(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList)
{
	var arr = new Array();
	arr.push(['javascript:art.searchQI = \'0$' + articleID + '$' + articleID + '\'; art.sortQI = \'\'; adm.post(\'article.php\', \'searchQI=0$' + articleID + '$' + articleID + '\');', 'admin/icon00.gif', lan.off.article_tip]);
	if(targetID != shopID) arr.push(['javascript:shop.searchQI = \'0$' + targetID + '$' + targetID + '\'; shop.sortQI = \'\'; adm.post(\'shop.php\', \'searchQI=0$' + targetID + '$' + targetID + '\');', 'admin/icon00.gif', lan.off.target_tip]);
	if(targetID != shopID) arr.push(['javascript:band.searchQI = \'1$' + shopID + '|2$' + targetID + '\'; band.sortQI = \'\'; adm.post(\'band.php\', \'searchQI=1$' + shopID + '|2$' + targetID + '\');', 'admin/icon00.gif', lan.off.band_tip]);
	arr.push(['javascript:tsa.searchQI = \'3$' + ID + '\'; tsa.sortQI = \'\'; adm.post(\'transaction.php\', \'searchQI=3$' + ID + '\');', 'admin/icon00.gif', lan.off.transaction_tip]);
	arr.push([]);
	arr.push(['javascript:adm.get(\'offer.php\', \'action=copy&offerID=' + ID + '\');void(0);', 'offer.l0/icon03.gif', lan.off.copy]);
	arr.push(['javascript:off.edit(' + listID + ', ' + ID + ', ' + flag + ', ' + discount + ', ' + price + ', ' + inventory + ', ' + startTime + ', ' + endTime + ', ' + targetID + ', document.getElementById(\'bandList.' + listID + '\').value, ' + shopID + ', document.getElementById(\'shopName.' + listID + '\').value);void(0);', 'offer.l0/icon02.gif', lan.off.edit]);
	arr.push(['javascript:adm.confirm(\'confirm\', lan.off.del, lan.off.del_tip, \'offer.php\', \'action=del&IDList=' + ID + '\');void(0);', 'offer.l0/icon01.gif', lan.off.del]);
	return arr;
}

off.elem = function(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList)
{
	var flagArr = new Array();
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag & (1 << buf.flag[i].index)) 
			flagArr.push(buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name);
	}
	if(flagArr.length == 0) flagArr.push(lan.gen.none);
	var shopName = '';
	var targetName = '';
	for(var i = 0; i < buf.shop.length; i++)
	{
		if(buf.shop[i].id == adm.cshop)
		{
			shopName = targetName = buf.shop[i].name;
			break;
		}
	}
	var bands = bandList != '' ? bandList.split('|') : new Array();
	for(var i = 0; i < bands.length; i++)
	{
		var bandInfo = bands[i].split('$');
		if(targetID == parseInt(bandInfo[0]))
		{
			targetName = bandInfo[1];
			break;
		}
	}
	var currTime = Math.round(+ new Date() / 1000);
	var state = startTime < currTime && (endTime == 0 || endTime > currTime) ? 1 : 0;
	var menu = adm.getMenu(off.menu(listID, ID, articleID, shopID, flag, discount, price, inventory, startTime, endTime, targetID, title, subTitle, name, subName, bandList));
	adm.write('<tr' + (off.buf.eids.indexOf(ID.toString()) >= 0 ? ' class="table-primary"' : '') + '><td>' + adm.getElem('main', listID, ID) + '<input type="hidden" id="bandList.' + listID + '" value="' + bandList + '"><input type="hidden" id="shopName.' + listID + '" value="' + shopName + '"></td>' + adm.getFrameOperation(menu) + '<td' + adm.getFrameStyle(listID) + '>' + ID + '</td><td' + adm.getFrameStyle(listID) + '>' + title + '</td><td' + adm.getFrameStyle(listID) + '>' + name + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + lan.sys.pri.replace('%A%', (price - discount) / 100) + (discount != 0 ? ('&nbsp;<s>' + lan.sys.pri.replace('%A%', price / 100) + '</s>') : '') + '</td><td' + adm.getFrameStyle(listID) + ' align="right">' + inventory + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(startTime) + '</td><td' + adm.getFrameStyle(listID) + '>' + adm.getTimeStr(endTime) + '</td></tr>' + adm.getFrame(listID, 9, '<tr>' + adm.getDetail(lan.off.tit, title, 1) + adm.getDetail(lan.off.name, name, 1) + adm.getDetail(lan.off.id, ID, 1) + adm.getDetail(lan.off.flag, flagArr.join(', '), 1) + adm.getDetail(lan.off.target, targetName, 1) + adm.getDetail(lan.off.start_time, adm.getTimeStr(startTime), 1) + '</tr><tr>' + adm.getDetail(lan.off.subtit, subTitle, 1) + adm.getDetail(lan.off.subname, subName, 2) + adm.getDetail(lan.off.price, lan.sys.pri.replace('%A%', (price - discount) / 100) + (discount != 0 ? ('&nbsp;<s>' + lan.sys.pri.replace('%A%', price / 100) + '</s>') : ''), 1) + adm.getDetail(lan.off.inventory, inventory, 1) + adm.getDetail(lan.off.end_time, adm.getTimeStr(endTime), 1) + '</tr>'));
}

off.empty = function()
{
	adm.write('<tr><td colspan="9" align="center">' + lan.off.empty + '</td></tr>');
}

off.bottom = function()
{
	adm.write('<tr class="table-warning"><td>' + adm.getCheckAll('main') + '</td>' + adm.getFrameBar('<a class="btn btn-outline-secondary btn-sm" href="javascript:if(adm.getAll(\'main\', \'\') == \'\') adm.alert(\'alert\', lan.off.del, lan.gen.err_empty); else adm.confirm(\'confirm\', lan.off.del, lan.off.del_tip, \'offer.php\', \'action=del&IDList=\' + adm.getAll(\'main\', \',\'));">' + lan.off.del + '</a> ', 7, '') + adm.getFrameBar('<a class="btn btn-outline-dark btn-sm" href="javascript:off.prepareAdd2();void(0);">' + lan.off.add + '</a>&nbsp;&nbsp;', 1, 'right') + '</tr>');
	adm.write('</tbody></table>');
	adm.pagelist('off.buf', 'offer.php');
	adm.write('</div>');

	adm.write('<datalist id="articleList"></datalist><template id="articleTemplate"></template>');

	adm.uninitialize();

	adm.infobox(lan.off.info);

	off.articleinit = false;
}

off.add = function()
{
	off.ahandler = null;
	off.articlelist();
	adm.showForm('main', '', lan.off.add, '<form id="mainform" class="was-validated"><div class="form-row">' + adm.getOption(lan.off.add_article, '', '<input type="text" class="form-control" id="articleID" name="articleID" list="articleList" placeholder="' + lan.off.add_article_tip + '" oninput="if(off.ahandler != null) clearTimeout(off.ahandler); off.ahandler = setTimeout(function(){adm.datalist(\'articleTemplate\', \'articleList\', \'articleID\', 8);}, 500);" value="' + adm.findSearch(1, 0, off.searchQI) + '" autocomplete="off"/>', lan.off.err[18]) + '</div></form>', lan.off.add_submit, off.addSubmit);
}

off.articlelist = function()
{
	if(off.articleinit) return;
	off.articleinit = true;
	var articleStr = new Array();
	for(var i = buf.art.length - 1; i > 0; i--) articleStr.push('<option value="' + buf.art[i][0] + '">' + buf.art[i][0] + ' # ' + buf.art[i][1] + (buf.art[i][2] != '' ? (' / ' + buf.art[i][2]) : '') + (buf.art[i][3] != '' ? (' / ' + buf.art[i][3]) : '') + '</option>');
	document.getElementById('articleTemplate').innerHTML = articleStr.join('');
	adm.datalist('articleTemplate', 'articleList', 'articleID', 8);
}

off.prepareAdd2 = function()
{
	if(buf.hasOwnProperty('art'))
	{
		adm.get('articlebuffer.l0.php', 'time=' + buf.art[0], true, off.add);
	}
	else
	{
		buf.art = new Array();
		adm.get('articlebuffer.l0.php', '', true, off.prepareAdd2);
	}
}

off.addSubmit = function()
{
	var form = document.getElementById('mainform');
	var articleID = document.getElementById('articleID');
	var articleIDv = parseInt(articleID.value);
	articleID.setCustomValidity(isNaN(articleIDv) || articleIDv < 1 ? lan.off.err[18] : '');
	return form.checkValidity() ? ['offer.php?action=add', $('form#mainform').serialize()] : null;
}

off.edit = function(listID, ID, flag, discount, price, inventory, startTime, endTime, targetID, bandList, shopID, shopName)
{
	var flagArr = new Array();
	for(var i = 0; i < buf.flag.length; i++) flagArr.push('<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="flag_' + i + '" onchange="off.updateFlag(' + buf.flag[i].index + ', this.checked);"' + ((flag & (1 << buf.flag[i].index)) > 0 ? ' checked' : '') + (buf.flag[i].index < 8 ? ' disabled' : '') + '><label class="form-check-label" for="flag_' + i + '">' + (buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name) + '</label>&nbsp;&nbsp;&nbsp;&nbsp;</div>');
	if(flagArr.length == 0) flagArr.push(lan.gen.none);
	var bandArr = new Array();
	var bands = bandList != '' ? bandList.split('|') : new Array();
	for(var i = 0; i < bands.length; i++)
	{
		var bandInfo = bands[i].split('$');
		bandArr.push('<option value="' + bandInfo[0] + '"' + (targetID == parseInt(bandInfo[0]) ? ' selected' : '') + '>' + bandInfo[1] + '</option>');
	}
	var dt = new Date();
	var currTime = Math.floor(dt.getTime() / 1000);
	var str = new Array();
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_0, lan.off.edit_info_0, adm.replaceInput(lan.sys.pri, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" id="priceShow" onchange="document.getElementById(\'price\').value = Math.round(parseFloat(this.value) * 100);" value="' + (price / 100) + '" autocomplete="off"/><input type="hidden" id="price" name="price" value="' + price + '"/>']]), lan.off.err[19]) + adm.getOption(lan.off.edit_title_1, lan.off.edit_title_1, adm.replaceInput(lan.sys.pri, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" id="discountShow" onchange="document.getElementById(\'discount\').value = Math.round(parseFloat(this.value) * 100);" value="' + (discount / 100) + '" autocomplete="off"/><input type="hidden" id="discount" name="discount" value="' + discount + '"/>']]), lan.off.err[20]) + adm.getOption(lan.off.edit_title_2, '', '<input type="hidden" id="flag" name="flag" value="' + flag + '">' + flagArr.join(''), '') + '</div>');
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_3, '', '<input type="text" class="form-control" id="inventory" name="inventory" value="' + inventory + '" autocomplete="off"/>', lan.off.err[21]) + adm.getOption(lan.off.edit_title_4, '', adm.getCal('startTime', 'startTime', startTime, 0, currTime + 315360000, true) + '<div class="invalid-feedback" id="time.error" style="display:block"></div>', '') + adm.getOption(lan.off.edit_title_5, '', adm.getCal('endTime', 'endTime', endTime, 0, currTime + 315360000, true), '') + '</div>');
	str.push('<div class="form-row">' + adm.getOption(lan.off.edit_title_6, lan.off.edit_info_6, '<select name="targetID" class="form-control"><option value="' + shopID + '">' + shopName + '</option>' + bandArr.join('') + '</select>', '') + adm.getOptionEmpty() + adm.getOptionEmpty() + '</div>');
	adm.showForm('main', 'modal-xl', lan.off.edit, '<form id="mainform" class="was-validated">' + str.join('') + '<input type="hidden" name="ID" value="' + ID + '"/></form>', lan.off.edit_submit, off.editSubmit);
}
off.updateFlag = function(index, checked)
{
	var flag = document.getElementById('flag').value;
	flag = checked ? (flag | (1 << index)) : (flag & ~ (1 << index));
	document.getElementById('flag').value = flag;
}

off.editSubmit = function()
{
	var form = document.getElementById('mainform');
	var price = document.getElementById('price');
	var priceShow = document.getElementById('priceShow');
	var discount = document.getElementById('discount');
	var discountShow = document.getElementById('discountShow');
	var inventory = document.getElementById('inventory');
	var startTime = document.getElementById('startTime');
	var endTime = document.getElementById('endTime');
	var pricev = parseInt(price.value);
	var discountv = parseInt(discount.value);
	var inventoryv = parseInt(inventory.value);
	var startTimev = parseInt(startTime.value);
	var endTimev = parseInt(endTime.value);
	var timeFlag = isNaN(startTimev) || isNaN(endTimev) || startTimev < 0 || startTimev > endTimev;
	priceShow.setCustomValidity(isNaN(pricev) || pricev < -2147483647 || pricev > 2147483647 ? lan.off.err[19] : '');
	discountShow.setCustomValidity(isNaN(discountv) || discountv < -2147483647 || discountv > 2147483647 || Math.abs(pricev - discountv) > 2147483647 ? lan.off.err[20] : '');
	inventory.setCustomValidity(isNaN(inventoryv) || inventoryv < 0 || inventoryv > 2147483647 ? lan.off.err[21] : '');
	document.getElementById('time.error').innerHTML = timeFlag ? lan.off.err[22] : '';
	return form.checkValidity() && !timeFlag ? ['offer.php?action=edit', $('form#mainform').serialize()] : null;
}

off.getFlag = function(flag)
{
	for(var i = 0; i < buf.flag.length; i++)
	{
		if(flag == buf.flag[i].index) return buf.flag[i].index < 8 ? lan.fla.sname[buf.flag[i].index] : buf.flag[i].name;
	}
	return '';
}





pet[41] = function(info)
{
	return lan.srecInfo[41].replace('%A%', info[0]).replace('%B%', info[1]);
}

pet[42] = function(info)
{
	var tmp = info[0].split(',');
	var arr = new Array();
	for(var i = 0; i < tmp.length; i++) arr[arr.length] = tmp[i];
	return lan.srecInfo[42].replace('%A%', arr.join(', '));
}

pet[43] = function(info)
{
	return lan.srecInfo[43].replace('%A%', info[0]).replace('%B%', lan.sys.pri.replace('%A%', parseInt(info[1]) / 100)).replace('%C%', lan.sys.pri.replace('%A%', parseInt(info[2]) / 100)).replace('%D%', info[3]).replace('%E%', info[4]);
}

pet[44] = function(info)
{
	return lan.srecInfo[44].replace('%A%', info[0]).replace('%B%', info[1]);
}
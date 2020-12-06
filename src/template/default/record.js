var rec = new Object();

pi.uarea = true;

rec.result = function(id, info)
{
	switch(id)
	{
		case 0:
			pi.alert('alert', lan.rec.title, lan.gen.login_err);
			break;
	}
}

rec.initialize = function()
{
	pi.initialize(lan.rec.title);

	pi.drawTop();

	pi.drawBar(lan.user.title + '$user.html|' + lan.rec.title + '$javascript:;', '');

	pi.drawFrame();
	
	pi.drawBottom();

	pi.uninitialize();

	pi.get('record.inf.php', 'page=1');
}

rec.drawTop = function()
{
	pi.finitialize();

	pi.write('<h5>' + lan.rec.title + '</h5><br>');

	pi.write('<table class="table"><thead><th width="20%">' + lan.rec.name + '</th><th width="50%">' + lan.rec.inf + '</th><th width="15%">' + lan.rec.time + '</th><th width="15%">' + lan.rec.ip + '</th></thead><tbody>');
}

rec.drawBottom = function()
{
	pi.write('</tbody></table><br>');
	pi.pagelist(rec.page, rec.record, rec.count, 'record.inf.php');
	pi.write('<br><ol style="margin-left:-20px">');
	for(var i = 0; i < lan.rec.info.length; i++) pi.write('<li>' + lan.rec.info[i] + '</li>');
	pi.write('</ol>');

	pi.funinitialize();
}

rec.drawElem = function(listId, id, type, info, insertIp, insertTime)
{
	var nameStr = lan.recName[type] ? lan.recName[type] : lan.rec.unknown;
	var infoStr = put[type] ? put[type](info) : '';

	pi.write('<tr><td>' + nameStr + (insertIp == 0 ? (' <span class="badge badge-secondary">' + lan.rec.background + '</span>') : '') + '</td><td>' + infoStr + '</td><td>' + pi.getTimeStr(insertTime) + '</td><td>' + (insertIp > 0 ? pi.getIPStr(insertIp) : '') + '</td></tr>');
}

rec.drawEmpty = function()
{
	pi.write('<tr><td colspan="4" align="center">' + lan.rec.empty + '</td></tr>');
}
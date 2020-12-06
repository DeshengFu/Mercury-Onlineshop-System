var pg = new Object();

pg.drawTop = function()
{
	var ignoreBar = pg.name.substr(0, 1) == '%';
	if(ignoreBar) pg.name = pg.name.substr(1);

	pi.initialize(pg.name);

	pi.drawTop();
	
	if(ignoreBar) return;

	var str = '';
	var extensions = tmpl.barExt.split(';');
	for(var i = 0; i < extensions.length; i++)
	{
		var extensionInfo = extensions[i].split('|');
		if(extensionInfo[0] == pg.index)
		{
			extensionInfo[0] = '';
			str = extensionInfo.join('|');
			break;
		}
	}
	pi.drawBar((str != '' ? (str.substr(1) + '|') : '') + pg.name + '$javascript:;', '');
}

pg.drawBottom = function()
{
	pi.drawBottom();

	pi.uninitialize();
}

pg.drawPage = function(id, title, content)
{
	if(title.substr(0, 1) == '$') return;
	if(title.substr(0, 1) == '-') return;
	if(title.substr(0, 1) == '+') title = title.substr(1);
	
	var drawMargin = title.substr(0, 1) != '%';
	if(!drawMargin) title = title.substr(1);

	var specialBorder = title.substr(0, 1) == '~';
	if(specialBorder) title = title.substr(1);

	var bpoint = 0;
	while(true)
	{
		var startPoint = content.indexOf('|', bpoint);
		var endPoint = content.indexOf('|', startPoint + 1);
		if(startPoint < 0) break;
		if(endPoint < 0)
		{
			content = content.substr(0, startPoint);
			break;
		}
		var point = content.indexOf('=', startPoint + 1);
		if(point < 0 || point > endPoint)
		{
			var name = content.substr(startPoint + 1, endPoint - startPoint - 1);
			var para = '';
		}
		else
		{
			var name = content.substr(startPoint + 1, point - startPoint - 1);
			var para = content.substr(point + 1, endPoint - point - 1);
		}

		var str = '';
		if(name == 'PTIT' && document.getElementById('pg.tit_' + para))
		{
			str = document.getElementById('pg.tit_' + para).innerHTML;
			if(str.substr(0, 1) == '$') str = str.substr(1);
			if(str.substr(0, 1) == '+' || str.substr(0, 1) == '-') str = str.substr(1);
			if(str.substr(0, 1) == '%') str = str.substr(1);
			if(str.substr(0, 1) == '~') str = str.substr(1);
		}
		else if(name == 'PCON' && document.getElementById('pg.con_' + para))
		{
			str = document.getElementById('pg.con_' + para).innerHTML;
		}
		content = content.substr(0, startPoint) + str + content.substr(endPoint + 1);
		bpoint = startPoint + str.length;
	}

	pi.write('<div style="background:url(' + tmpl.path + '/' + (specialBorder ? 'midlow' : 'middle') + '.gif) repeat-y center,#FFFFFF;">');
	pi.write('<div class="container-fluid ' + (drawMargin ? 'p-4 ' : 'p-0 ') + 'main-width" valign="top">' + (title != '' ? ('<h5>' + title + '</h5><br>') : '') + '<div>' + content + '</div></div>');
	pi.write('</div>');
}
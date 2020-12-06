var loader = new Object();

loader.script = ['admin/jquery.min.js', 'admin/popper.min.js', 'admin/bootstrap.min.js', 'admin/chart.min.js', 'admin/system.js'];
loader.css = ['admin/bootstrap.css', 'admin/chart.min.css'];
loader.state = 0;
loader.version = '';

loader.load = function(language, flevel, list, version)
{
	loader.version = version;

	loader.script.push('admin/main.js');
	loader.script.push('admin/lan.' + language + '.js');
	loader.script.push('admin/main.l0.js');
	loader.script.push('admin/lan.l0.' + language + '.js');
	loader.script.push('admin/main.l1.js');
	loader.script.push('admin/lan.l1.' + language + '.js');
	for(var i = 0; i < flevel; i++) loader.script.push('admin/level.l' + i + '.' + language + '.js');

	var feature = list.split(',');
	for(var i = 0; i < feature.length; i++)
	{
		loader.script.push(feature[i] + '/main.js');
		loader.script.push(feature[i] + '/lan.' + language + '.js');
	}

	loader.css.push('admin/css.' + language + '.css');

	loader.next();
}

loader.loadx = function(language, level, version)
{
	loader.version = version;

	loader.script.push('release/main.l' + (level - 1) + '.js');
	loader.script.push('release/lan.l' + (level - 1) + '.' + language + '.js');

	loader.css.push('admin/css.' + language + '.css');

	loader.next();
}

loader.next = function()
{
	var value = Math.floor(loader.state * 100 / (loader.script.length + loader.css.length));
	document.body.style.backgroundColor = '#404040';
	document.body.innerHTML = '<br><br><br><div id="loader.div" style="text-align:center;color:#FFFFFF;"><font style="font-size:25px;font-family:\'Arial\';">' + value + '</font> <font style="size:16px;">%</font></div>';
	document.title = value + ' %';
	
	if(loader.state >= loader.script.length + loader.css.length)
	{
		adm.frame();
		return;
	}

	if(loader.state < loader.script.length)
	{
		var script = document.createElement('script');
		script.onload = function(){loader.state++; loader.next();};
		script.src = loader.script[loader.state] + '?' + loader.version;
		document.head.appendChild(script);
	}
	else
	{
		var link = document.createElement('link');
		link.onload = function(){loader.state++; loader.next();};
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = loader.css[loader.state - loader.script.length] + '?' + loader.version;
		document.head.appendChild(link);
	}
}
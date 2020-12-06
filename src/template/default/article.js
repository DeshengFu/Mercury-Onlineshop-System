var art = new Object();

art.initialize = function(id)
{
	pi.initialize(null);

	pi.drawTop();

	pi.drawBar('', '');

	pi.write('<div style="background:url(' + tmpl.path + '/middle.gif) repeat-y center,#FFFFFF;">');

	pi.write('<div class="container-fluid p-4 main-width d-flex justify-content-between" valign="top"><div class="align-self-end" id="arts.title"></div><div class="align-self-end" id="arts.info"></div></div>');

	pi.write('<div class="container-fluid p-4 main-width" style="min-height:500px">');
	

	title = ''; bestPrice = 0; sold = 0; posEval = 0; negEval = 0; orFlag = 0;markArr = new Array();
	pi.write('<table border="0" cellpadding="0" width="100%">');

	pi.write('<tr><td width="400" valign="top" align="center" style="padding:10">');
	pi.write('<div>');
	if(false)//sa.imageList != '')
	{
		var imageArr = sa.imageList.split('|');
		var imageStr = new Array();
		for(var i = 0; i < imageArr.length; i++)
		{
			var imageInfo = imageArr[i].split('$');
			imageStr[imageStr.length] = imageInfo[1] + '$javascript:sa.showImage(' + i + ');';
		}		
		pi.write(inf.bGetBar(0, imageStr.join('|'), 400, 300, 'position:absolute;z-index:10;bottom:20;right:20', 1, 1, 50));
		sys.sAdd(sa.rollBar, 300, -1);
	}
	else
	{
		pi.write('<img title="' + title + '" src="' + tmpl.path + '/np.jpg" width="400" height="300">');
	}
	pi.write('</div></td><td width="780" valign="top" align="center">');
	//pi.write('<div id="iobox">' + sa.getOfferBox(-1, 15) + '</div>');
	pi.write('<br></td></tr>');

	pi.write('</table>');



	pi.write('</div>');
	pi.write('</div>');






	pi.drawFrame();

	pi.drawBottom();

	pi.uninitialize();

	var mid = parseInt(window.location.search);
	var isOK = false;
	for(var i = 0; i < art.article.length; i++)
	{
		if(art.article[i][0] == mid)
		{
			isOK = true;
			break;
		}
	}
	pi.get('ainfo' + (isOK ? mid : id) + '.html');
}

art.main = function(id, service, price, tax, weight, sold, posEval, negEval, catalogList, serviceList, flagList)
{
	var i = 0;
	while(i < art.article.length && art.article[i][0] != id) i++;
	var title = art.article[i][1];
	var subTitle = art.article[i][2];
	var name = art.article[i][3];
	var subName = art.article[i][4];
	var code = art.article[i][5];
	var icon = art.article[i][6];

	var catalogs = catalogList.split('|');
	var catalogArr = new Array();
	for(var i = 0; i < catalogs.length; i++)
	{
		catalogInfo = catalogs[i].split('$');
		catalogArr.push(catalogInfo[1] + '$catalog' + catalogInfo[0] + '.html');
	}
	document.title = title + (title == '' ? '' : ' - ') + srv.siteName;
	pi.updateBar(lan.cata.name + '$catalog.html|' + catalogArr.join('|') + '|' + title + '$javascript:;');

	document.getElementById('arts.title').innerHTML = '<h5>' + title + '</h5>' + name;
	document.getElementById('arts.info').innerHTML = lan.art.artinfo.replace('%A%', sold).replace('%B%', posEval + negEval > 0 ? Math.round(posEval / (posEval + negEval) * 100) : '-').replace('%C%', posEval + negEval);

	pi.finitialize();
}

art.close = function()
{
	pi.funinitialize();
}

art.drawItem = function(id, name, description)
{
	pi.write('<div class="container-fluid px-0 py-4 main-width" valign="top">' + (name != '' ? ('<h5>' + name + '</h5><br>') : '') + '<div>' + description + '</div></div>');
}

art.drawPage = function(id, title, content)
{
	pi.write('<div class="container-fluid px-0 py-4 main-width" valign="top">' + (title != '' ? ('<h5>' + title + '</h5><br>') : '') + '<div>' + content + '</div></div>');
}

/*
sa.showImage = function(index)
{
	var imageArr = sa.imageList.split('|');
	var imageInfo = imageArr[index].split('$');
	
	var arr = new Array();
	arr[arr.length] = '<table border="0" width="98%"><tr><td class="ptitle" id="imgTitle">' + imageInfo[2] + '</td></tr><tr><td height="30"></td></tr>';
	arr[arr.length] = '<tr><td><div><img src="' + imageInfo[1] + '" width="800" height="600" id="imgImage"></div></td><td valign="top"><div style="background:#F0F0F0;width:300;height:600;overflow-y:auto"><table border="0">';
	for(var i = 0; i < imageArr.length; i++)
	{
		var imageInfo = imageArr[i].split('$');
		arr[arr.length] = (i % 2 == 0 ? '<tr>' : '') + '<td style="border:2px solid #F0F0F0"><img src="' + imageInfo[1] + '" width="120" height="80" style="border:6px solid #FFFFFF;cursor:pointer" onclick="document.getElementById(\'imgTitle\').innerHTML = \'' + imageInfo[2] + '\'; document.getElementById(\'imgImage\').src = \'' + imageInfo[1] + '\';"></td>' + (i % 2 == 1 ? '</tr>' : '');
	}
	arr[arr.length] = '</table></div></td></tr>';
	arr[arr.length] = '<tr><td height="30"></td></tr><tr><td align="right" colspan="2"><a href="javascript:;" onclick="pi.hidePopup();">关闭预览</a></td></tr><tr><td height="10"></td></tr>';
	arr[arr.length] = '</table>';

	pi.showPopup(arr.join(''));
}
*/
var sys = new Object();



sys.bInitialize = function()
{
	sys.bc = new Array();
}

sys.bWrite = function(str)
{
	sys.bc.push(str);
}

sys.bFlush = function()
{
	document.write(sys.bc.join(''));
}

sys.bReturn = function()
{
	return sys.bc.join('');
}

sys.rGet = function(url, data = '', before = null, after = null)
{
	$.get(url, data).done(function(script){sys.rDone(script, before, after);}).fail(function(){sys.rDone('', before, after);});
}

sys.rPost = function(url, data = '', before = null, after = null)
{
	$.post(url, data).done(function(script){sys.rDone(script, before, after);}).fail(function(){sys.rDone('', before, after);});
}

sys.rFile = function(url, data, before = null, after = null)
{
	$.post({url:url, data:data, cache:false, contentType:false, processData:false}).done(function(script){sys.rDone(script, before, after);}).fail(function(){sys.rDone('', before, after);});
}

sys.rDone = function(script, before, after)
{
	if(before != null) before();
	if(script != '') eval(script);
	if(after != null) after();
}



sys.mEncode = function(str)
{
	str = str.replace(/\n/g, '<br/>');
	return str.replace(/  /g, ' &nbsp;');
}



sys.lEncode = function(str)
{
	str = str.replace(/\n/g, ' &nbsp;&nbsp;&nbsp;');
	return str.replace(/  /g, ' &nbsp;');
}



sys.uEncode = function(str)
{
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/[\u0009]/g, '');
	str = str.replace(/[\u000D]/g, '');
	str = str.replace(/\"/g, '&quot;');
	str = str.replace(/\'/g, '&#39;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/\$/g, '&#36;');
	str = str.replace(/\|/g, '&#124;');
	return str.replace(/\//g, '&#47;');
}



sys.cGetCookie = function(name)
{
	var cookies = document.cookie.split('; ');
	for(var i = 0; i < cookies.length; i++)
	{
		var ePosition = cookies[i].indexOf('=');
		var cookieName = cookies[i].substr(0, ePosition);
		if(cookieName == name) return decodeURIComponent(cookies[i].substr(ePosition + 1));
	}
	return '';
}

sys.cSetCookie = function(name, cookie, path, saveLen)
{
	var pathStr = '';
	var saveLenStr = '';
	if(path != '') pathStr = ' path=' + path + ';';
	if(saveLen != 0)
	{
		var saveDate = new Date();
		saveDate.setDate(saveDate.getDate() + saveLen);
		saveLenStr = ' expires=' + saveDate.toGMTString() + ';';
	}
	document.cookie = (name + '=' + encodeURIComponent(cookie) + ';' + pathStr + saveLenStr);
}

sys.cGetRecord = function(cookie, name)
{
	var records = cookie.split('&');
	for(var i = 0; i < records.length; i++)
	{
		var ePosition = records[i].indexOf('=');
		var recordName = records[i].substr(0, ePosition);
		var recordInfo = decodeURIComponent(records[i].substr(ePosition + 1));
		if(recordName == name) return recordInfo;
	}
	return '';
}

sys.cSetRecord = function(cookie, name, value)
{
	var recordArr = new Array();
	recordArr[0] = name + '=' + encodeURIComponent(value);
	if(cookie == '') return recordArr[0];
	var records = cookie.split('&');
	for(var i = 0; i < records.length; i++)
	{
		var ePosition = records[i].indexOf('=');
		var recordName = records[i].substr(0, ePosition);
		if(recordName != name) recordArr[recordArr.length] = records[i];
	}
	return recordArr.join('&');
}
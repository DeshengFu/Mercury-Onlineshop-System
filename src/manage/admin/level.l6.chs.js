adm.aEncode = function(str)
{
	var part = str.split('\n');
	var result = new Array();
	for(var i = 0; i < part.length; i++)
	{
		part[i] = part[i].replace(/  /g, ' ').trim();
		if(part[i] != '') result.push(part[i]);
	}
	result[0] = '<b>' + result[0] + '</b>';
	return result.join('\n');
}





lan.menuList[6] = lan.menuList[5].slice();

lan.menuList[6].splice(16, 0, ["物流信息",		"tracking.l0/icon02.gif",		"tracking.php",			"trac.clear();"]);
var inf = new Object();



inf.bInitialize = function()
{
	sys.bInitialize();
}

inf.bUninitialize = function()
{
	document.getElementById('spi.body').innerHTML = sys.bReturn();
}

inf.bReturn = function()
{
	return sys.bReturn();
}



inf.dMobile = function()
{
	return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4));
}



inf.uGet = function()
{
	var cuser = new Object();

	var cookie = sys.cGetCookie('user');
	if(cookie != '')
	{
		cuser.id = parseInt(sys.cGetRecord(cookie, 'userID'));
		cuser.email = sys.cGetRecord(cookie, 'userEmail');
		if(isNaN(cuser.id)) cuser.id = 0;
	}
	else
	{
		 cuser.id = 0;
		 cuser.email = '';
	}
	return cuser;
}



inf.aEncode = function(str)
{
	var part = str.split('\n');
	var result = new Array();
	for(var i = 0; i < part.length; i++)
	{
		part[i] = part[i].replace(/  /g, ' ').trim();
		if(part[i] != '') result.push(part[i]);
	}
	if(result.length == 0) return '';
	result[0] = '<b>' + result[0] + '</b>';
	return result.join('\n');
}



inf.pg = new Object();

inf.pg.getIndex = function()
{
	return document.getElementById('pg.index').innerHTML;
}

inf.pg.getName = function()
{
	return document.getElementById('pg.name').innerHTML;
}

inf.pg.getTitle = function(i)
{
	return document.getElementById('pg.tit_' + i).innerHTML;
}

inf.pg.getContent = function(i)
{
	return document.getElementById('pg.con_' + i).innerHTML;
}



inf.art = new Object();

inf.art.initialize = function(id)
{
	art.article = new Array();
	var i = 0;
	while(document.getElementById('art.id_' + i))
	{
		art.article.push([inf.art.getId(i), inf.art.getTitle(i), inf.art.getSubTitle(i), inf.art.getName(i), inf.art.getSubName(i), inf.art.getCode(i), inf.art.getIcon(i)]);
		i++;
	}

	art.image = new Array();
	var i = 0;
	while(document.getElementById('art.iid_' + i))
	{
		art.image.push([inf.art.getImageId(i), inf.art.getImageArt(i), inf.art.getImageName(i), inf.art.getImageFile(i)]);
		i++;
	}

	art.initialize(id);	
}

inf.art.getId = function(i)
{
	return parseInt(document.getElementById('art.id_' + i).innerHTML);
}

inf.art.getTitle = function(i)
{
	return document.getElementById('art.tit_' + i).innerHTML;
}

inf.art.getSubTitle = function(i)
{
	return document.getElementById('art.subtit_' + i).innerHTML;
}

inf.art.getName = function(i)
{
	return document.getElementById('art.name_' + i).innerHTML;
}

inf.art.getSubName = function(i)
{
	return document.getElementById('art.subname_' + i).innerHTML;
}

inf.art.getCode = function(i)
{
	return document.getElementById('art.code_' + i).innerHTML;
}

inf.art.getIcon = function(i)
{
	return document.getElementById('art.icon_' + i) ? document.getElementById('art.icon_' + i).src : '';
}

inf.art.getImageId = function(i)
{
	return parseInt(document.getElementById('art.iid_' + i).innerHTML);
}

inf.art.getImageArt = function(i)
{
	return parseInt(document.getElementById('art.iarticle_' + i).innerHTML);
}

inf.art.getImageName = function(i)
{
	return document.getElementById('art.iname_' + i).innerHTML;
}

inf.art.getImageFile = function(i)
{
	return document.getElementById('art.ifile_' + i).src;
}
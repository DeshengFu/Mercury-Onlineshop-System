sesf[0] = function(info, data)
{
	return data[0] + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[1] = function(info, data)
{
	return data[0] + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[2] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? data[0] : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? data[1] : '');
}
sesf[3] = function(info, data)
{
	return info[0](data[0]);
}
sesf[4] = function(info, data)
{
	return data[0] + ' (' + (data[1] == 0 ? lan.ssi.mod0 : lan.ssi.mod1) + ')';
}
sesf[5] = function(info, data)
{
	var dstr = '';
	if(data[1] == 0) dstr = info[0] == 3 ? lan.ssi.day0 : lan.ssi.day4;
	if(data[1] == 1) dstr = info[0] == 3 ? lan.ssi.day1 : lan.ssi.day5;
	if(data[1] == 2) dstr = info[0] == 3 ? lan.ssi.day2 : lan.ssi.day6;
	if(data[1] == 3) dstr = info[0] == 3 ? lan.ssi.day3 : lan.ssi.day7;
	return lan.ssi.day_info.replace('%A%', dstr).replace('%B%', data[0]);
}
sesf[6] = function(info, data)
{
	return data[0];
}
sesf[7] = function(info, data)
{
	return data[0];
}
sesf[8] = function(info, data)
{
	return data[0];
}

setf[0] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[1] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[2] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><div class="input-group-prepend"><span class="input-group-text"> - </span></div><input type="input" class="form-control" style="width:80px" id="' + id + '.i1" autocomplete="off"></div>';
}
setf[3] = function(id, info)
{
	var valueArr = new Array();
	for(var i = 0; i < 4096; i++)
	{
		var res = info[0](i);
		if(res == '') continue;
		valueArr.push('<option value="' + i + '">' + res + '</option>');
	}
	return '<select class="form-control form-control-sm" id="' + id + '.i0">' + valueArr.join('') + '</select>';
}
setf[4] = function(id, info)
{
	return '<div class="input-group input-group-sm"><input type="input" class="form-control" style="width:80px" id="' + id + '.i0" autocomplete="off"><select class="form-control" id="' + id + '.i1"><option value="0">' + lan.ssi.mod0 + '</option><option value="1">' + lan.ssi.mod1 + '</option></select></div>';
}
setf[5] = function(id, info)
{
	var dstr = '';
	if(info[0] == 1) dstr = '<option value="0">' + lan.ssi.day4 + '</option><option value="2">' + lan.ssi.day6 + '</option>';
	if(info[0] == 2) dstr = '<option value="1">' + lan.ssi.day5 + '</option><option value="3">' + lan.ssi.day7 + '</option>';
	if(info[0] == 3) dstr = '<option value="0">' + lan.ssi.day0 + '</option><option value="1">' + lan.ssi.day1 + '</option><option value="2">' + lan.ssi.day2 + '</option><option value="3">' + lan.ssi.day3 + '</option>';
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.ssi.day_info, '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<select class="form-control" id="' + id + '.i1">' + dstr + '</select>'], ['%B%', '<input type="input" class="form-control" style="width:50px" id="' + id + '.i0" autocomplete="off">']]) + '</div>';
}
setf[6] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}
setf[7] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}
setf[8] = function(id, info)
{
	return '<input type="input" class="form-control form-control-sm" style="width:80px" id="' + id + '.i0" autocomplete="off">';
}

secf[0] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 1;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue) || startValue < 1) return [1, info[0]];
	if(isNaN(endValue) || endValue < 1) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[1] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue) || startValue < 0) return [1, info[0]];
	if(isNaN(endValue) || endValue < 0) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[2] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
secf[3] = function(id, info)
{
	return [0, document.getElementById(id + '.i0').value];
}
secf[4] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value;
	var mode = document.getElementById(id + '.i1').selectedIndex;
	if(value.length < 1 || value.length > 255) return [1, info[0]];
	return [0, sys.uEncode(value) + '$' + mode];
}
secf[5] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	var mode = document.getElementById(id + '.i1').value;
	if(isNaN(value) || value < 0 || value > 32767) return [1, info[1]];
	return [0, value + '$' + mode];
}
secf[6] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 1;
	if(isNaN(value) || value < 1) return [1, info[0]];
	return [0, value];
}
secf[7] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	if(isNaN(value) || value < 0) return [1, info[0]];
	return [0, value];
}
secf[8] = function(id, info)
{
	var value = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : 0;
	if(isNaN(value)) return [1, info[0]];
	return [0, value];
}
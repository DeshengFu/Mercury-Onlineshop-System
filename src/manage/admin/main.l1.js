sesf[9] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? lan.sys.pri.replace('%A%', data[0] / 100) : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? lan.sys.pri.replace('%A%', data[1] / 100) : '');
}

sesf[10] = function(info, data)
{
	return (data[0] > -Number.MAX_SAFE_INTEGER ? lan.sys.perc.replace('%A%', data[0] / 10) : '') + ' - ' + (data[1] < Number.MAX_SAFE_INTEGER ? lan.sys.perc.replace('%A%', data[1] / 10) : '');
}

setf[9] = function(id, info)
{
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.sys.pri + ' - ' + lan.sys.pri.replace('%A%', '%B%'), '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i0\').value = Math.round(parseFloat(this.value) * 100);" autocomplete="off"/><input type="hidden" id="' + id + '.i0"/>'], ['%B%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i1\').value = Math.round(parseFloat(this.value) * 100);" autocomplete="off"/><input type="hidden" id="' + id + '.i1"/>']]) + '</div>';
}

setf[10] = function(id, info)
{
	return '<div class="input-group input-group-sm">' + adm.replaceInput(lan.sys.perc + ' - ' + lan.sys.perc.replace('%A%', '%B%'), '<div class="input-group-prepend"><span class="input-group-text">%A%</span></div>', [['%A%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i0\').value = Math.round(parseFloat(this.value) * 10);" autocomplete="off"/><input type="hidden" id="' + id + '.i0"/>'], ['%B%', '<input type="text" class="form-control" onchange="document.getElementById(\'' + id + '.i1\').value = Math.round(parseFloat(this.value) * 10);" autocomplete="off"/><input type="hidden" id="' + id + '.i1"/>']]) + '</div>';
}

secf[9] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}

secf[10] = function(id, info)
{
	var startValue = document.getElementById(id + '.i0').value != '' ? parseInt(document.getElementById(id + '.i0').value) : -Number.MAX_SAFE_INTEGER;
	var endValue = document.getElementById(id + '.i1').value != '' ? parseInt(document.getElementById(id + '.i1').value) : Number.MAX_SAFE_INTEGER;
	if(isNaN(startValue)) return [1, info[0]];
	if(isNaN(endValue)) return [1, info[1]];
	if(startValue > endValue) return [1, info[2]];
	return [0, startValue + '$' + endValue];
}
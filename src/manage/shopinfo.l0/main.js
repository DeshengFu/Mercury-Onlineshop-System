shop.writeBase = function(data)
{
	adm.write('<div class="container-fluid main-content"><div class="row"><div class="col"><table class="table"><thead class="thead-dark"><tr><th colspan="6" scope="col">' + lan.sinfo.basic_info + '</th></thead><tbody><tr><th scope="row">' + lan.shop.id + '</th><td>' + data.id + ((data.state & 1) == 0 ? (' <span class="badge badge-secondary">' + shop.getState0(0) + '</span>') : '') + ((data.state & 2) > 0 ? (' <span class="badge badge-danger">' + shop.getState1(1) + '</span>') : '') + '</td><th scope="row">' + lan.shop.register_time + '</th><td>' + adm.getTimeStr(data.registerTime) + '</td><th scope="row">' + lan.shop.sold + '</th><td>' + data.sold + '</td></tr><tr><th scope="row">' + lan.shop.name + '</th><td>' + data.name + '</td><th scope="row">' + lan.shop.update_time + '</th><td>' + adm.getTimeStr(data.updateTime) + '</td><th scope="row">' + lan.shop.pos_eval + '</th><td>' + data.posEval + '</td></tr><tr><th scope="row">' + lan.shop.email + '</th><td>' + data.email + '</td><th scope="row">' + lan.shop.access_time + '</th><td>' + (data.accessTime > 0 ? adm.getTimeStr(data.accessTime) : '') + '</td><th scope="row">' + lan.shop.neg_eval + '</th><td>' + data.negEval + '</td></tr><tr><th scope="row">' + lan.shop.state + '</th><td>' + shop.getState0((data.state & 1) > 0 ? 1 : 0) + ' ' + shop.getState1((data.state & 2) > 0 ? 1 : 0) + '</td><th scope="row">' + lan.shop.order_time + '</th><td>' + (data.orderTime > 0 ? adm.getTimeStr(data.orderTime) : '') + '</td><th scope="row"></th><td>&nbsp;</td></tr></tbody></table></div><div class="col"><table class="table"><thead class="thead-dark"><tr><th colspan="5" scope="col">' + lan.sinfo.extra_info + '</th></thead><tbody><tr><th scope="row">' + lan.shop.balance + '</th><td>' + lan.sys.pri.replace('%A%', data.balance / 100) + '</td><td rowspan="4"><div style="width:160px;height:150px;"><canvas id="chart0"></canvas></div></td></tr><tr><th scope="row">' + lan.shop.point + '</th><td>' + data.point + '</td></tr><tr><th scope="row">&nbsp;</th><td></td></tr><tr><th scope="row"></th><td>&nbsp;</td></tr></tbody></table></div></div></div>');
}

shop.writeChat = function(data)
{
	adm.write('<div class="container-fluid main-content"><div class="row"><div class="col"><table class="table"><thead class="thead-dark"><tr><th scope="col">' + lan.sinfo.sale_t + '</th></thead><tbody><tr><td><div style="height:10px"></div><div style="width:100%"><canvas id="chart3"></canvas></div></td></tr></tbody></table></div><div class="col"><table class="table"><thead class="thead-dark"><tr><th scope="col">' + lan.sinfo.sale_s + lan.sys.curr + '</th></thead><tbody><tr><td><div style="height:10px"></div><div style="width:100%"><canvas id="chart4"></canvas></div></td></tr></tbody></table></div></div></div>');
}

shop.drawBase = function(data)
{
	var resource = data.posEval + data.negEval == 0 ? 1 : (data.posEval / (data.posEval + data.negEval)).toFixed(3);
	var chart0 = new Chart('chart0',
	{
		type: 'doughnut',
		options: {legend: false, aspectRatio: 1, title: {display: true, text: lan.sinfo.resource, position: 'left'}, circumference: resource * 2 * Math.PI, tooltips: {callbacks: {label: function(tooltipItem, data) {return lan.sys.perc.replace('%A%', (resource * 100));}}}},
		data: {
			labels: [],
			datasets: [{
				backgroundColor: ['#404040'],
				data: [1],
			}]
		},
	});
}

shop.drawChat = function(data)
{
	var dt = new Date();
	dt.setTime((benchmark.time + data.timeAdj) * 1000);
	var year = dt.getUTCFullYear();
	var month = dt.getUTCMonth();
	var tArr = new Array();
	var sArr = new Array();
	var lArr = new Array();
	for(var i = 0; i < 13; i++)
	{
		tArr.push(benchmark.sale['t' + i]);
		sArr.push(benchmark.sale['s' + i] / 100);
		lArr.push(lan.sinfo.month.replace('%A%', year).replace('%B%', (month < 9 ? '0' : '') + (month + 1)));
		month--;
		if(month < 0)
		{
			year--;
			month = 11;
		}
	}

	var chart3 = new Chart('chart3',
	{
		type: 'bar',
		options: {legend: false, aspectRatio: 3.2, scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:10}}]}},
		data: {
			labels: lArr,
			datasets: [{
				backgroundColor: '#3E9651',
				data: tArr,
			}]
		},
	});

	var chart4 = new Chart('chart4',
	{
		type: 'bar',
		options: {legend: false, aspectRatio: 3.2, scales:{yAxes:[{ticks:{suggestedMin:0,suggestedMax:10}}]}},
		data: {
			labels: lArr,
			datasets: [{
				backgroundColor: '#396AB1',
				data: sArr,
			}]
		},
	});
}

shop.main = function(data)
{
	adm.bstate('shopinfo');

	adm.initialize(lan.sinfo.title);
	
	adm.navi('<a href="javascript:adm.get(\'information.php\');">' + lan.gen.name + '</a> &gt; <a href="javascript:adm.get(\'shop.php\');">' + lan.shop.title + '</a> &gt; ' + lan.sinfo.title + ' # ' + data.name, '');

	shop.writeBase(data);
	shop.writeChat(data);

	adm.uninitialize();
	
	adm.infobox([]);
	
	shop.drawBase(data);
	shop.drawChat(data);	
}
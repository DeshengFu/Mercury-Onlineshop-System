var lan = new Object();

lan.id = "chs";
lan.name = "简体中文";





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.sys = new Object();

lan.sys.title = "Mercury 商铺管理版面";
lan.sys.copyright = "Copyright 2014-2020&nbsp;Riwy International Limited (Hong Kong). All rights reserved.";
lan.sys.systembar = "Execution: %A%ms, Queries: %B%.";

////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.gen = new Object();

lan.gen.name = "商铺首页";
lan.gen.refresh = "快速刷新";
lan.gen.window = "打开新窗口";
lan.gen.process = "选择商铺";
lan.gen.history = "操作日志";	
lan.gen.logout = "注销离开";
lan.gen.page_go = "跳转";
lan.gen.page_info = "总共%B%页，%A%条项目";
lan.gen.frame_show = "展开全部";
lan.gen.frame_hide = "收起全部";
lan.gen.none = "无";
lan.gen.operation = "操作";
lan.gen.close = "关闭";
lan.gen.cancel = "取消";
lan.gen.submit = "确认";
lan.gen.err_empty = "您没有选择任何项目，请修正错误后再试。";
lan.gen.yes = "是";
lan.gen.no = "否";

////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.feature = new Array();
lan.menuList = new Array();
lan.rightInfo = new Array();

////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.login = new Object();

lan.login.title = "登录管理后台";
lan.login.username = "管理帐户名";
lan.login.password = "帐户密码";
lan.login.save_cookie = "自动登录";
lan.login.submit = "登录";
lan.login.err_adminName = "您没有填写管理帐户名！";
lan.login.err_adminPass = "您没有填写管理账户密码或者密码错误！";
lan.login.err_ip = "来自当前IP地址的错误过多，请稍后再试！";

lan.login.info = new Array();
lan.login.info[0] = "在登录之前请确保您浏览器的Cookie功能已经被打开！";
lan.login.info[1] = "请不要在公共电脑或者不安全的网络环境中使用管理后台！";
lan.login.info[2] = "我们强烈建议您使用 Firefox 或者 Chrome 访问管理后台！";
lan.login.info[3] = "我们强烈建议您在1920x1080或者更高屏幕分辨率下访问管理后台！";
lan.login.info[4] = "系统会在浏览器中缓存部分内容以保证网站正常运行，其中可能包含用户资料等敏感信息。请确认您的电脑所在位置符合相关规定，并在移动电脑前删除浏览器缓存！";

////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.cshop = new Object();

lan.cshop.title = "选择商铺";
lan.cshop.info = "您当前为多个商户的管理员。请通过右上角的菜单选择您需要管理的商铺。";

////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////

lan.ssi = new Object();

lan.ssi.search = "查找";
lan.ssi.defsearch = "显示所有内容";
lan.ssi.mod0 = "完整匹配";
lan.ssi.mod1 = "模糊匹配";
lan.ssi.day0 = "早于过去";
lan.ssi.day1 = "早于将来";
lan.ssi.day2 = "晚于过去";
lan.ssi.day3 = "晚于将来";
lan.ssi.day4 = '早于';
lan.ssi.day5 = '最近';
lan.ssi.day6 = '最近';
lan.ssi.day7 = '晚于';
lan.ssi.day_info = "%A%%B%天";

lan.ssi.sort = "排序";
lan.ssi.increasing = "递增";
lan.ssi.decreasing = "递减";
lan.ssi.defsort = "默认排序";

lan.ssi.overflow = "系统无法再添加更多条件！";

lan.ssi.add = "添加";
lan.ssi.del = "删除";

////////////////////////////////////////////////////////////////////////////////////////////////////



















lan.sys.perc = "%A% %";
lan.sys.curr = "(&euro;)";
lan.sys.pri = "%A% &euro;";

















































lan.menuList[4] = new Array();

lan.menuList[4][0] =	["商铺 · 管理",		""];
lan.menuList[4][1] =	["商铺首页",		"shop.l0/icon05.gif",			"shopinfo.php",			""];
lan.menuList[4][2] =	["商铺操作记录",	"shoprecord.l0/icon02.gif",		"shoprecord.php",		"srec.clear();"];
lan.menuList[4][3] =	["仓储委托",		"band.l0/icon03.gif",			"band.php",				"band.clear();"];
lan.menuList[4][4] =	["商铺管理员",		"-master.l0/icon02.gif",		"master.php",			"mast.clear();"];

lan.menuList[4][5] =	["信息 · 查找",		""];
lan.menuList[4][6] =	["用户查找",		"user.l0/icon07.gif",			"user.php",				"user.clear();"];
lan.menuList[4][7] =	["商铺查找",		"shop.l0/icon05.gif",			"shop.php",				"shop.clear();"];
lan.menuList[4][8] =	["商品分类",		"-catalog.l0/icon07.gif",		"catalog.php",			"cata.clear();"];
lan.menuList[4][9] =	["商品查找",		"article.l0/icon05.gif",		"article.php",			"art.clear();"];
lan.menuList[4][10] =	["最近订单",		"-order.l0/icon08.gif",			"order.php",			"ord.clear();"];

lan.menuList[4][11] =	["供货 · 交易",		""];
lan.menuList[4][12] =	["工单管理",		"support.l0/icon04.gif",		"support.php",			"sup.clear();"];
lan.menuList[4][13] =	["供货管理",		"-offer.l0/icon04.gif",			"offer.php",			"off.clear();"];
lan.menuList[4][14] =	["交易管理",		"-transaction.l0/icon03.gif",	"transaction.php",		"tsa.clear();"];
lan.menuList[4][15] =	["发货单管理",		"shipment.l0/icon04.gif",		"shipment.php",			"ship.clear();"];










lan.menuList[5] = lan.menuList[4].slice();

lan.menuList[5][16] =	["仓储管理",		"inventory.l0/icon03.gif",			"inventory.php",	"ivt.clear();"];









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










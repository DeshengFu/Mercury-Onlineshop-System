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



















lan.svs = new Object();

lan.svs.sname = new Array();
lan.svs.sname[1] = "全部商品";

lan.fla = new Object();

lan.fla.sname = new Array();
lan.fla.sname[1] = "全部供货";









lan.user = new Object();

lan.user.title = "用户查找";
lan.user.id = "用户编号";
lan.user.email = "注册邮箱";
lan.user.state = "用户状态";
lan.user.state0 = "验证状态";
lan.user.state1 = "锁定状态";
lan.user.balance = "账户余额";
lan.user.point = "用户积分";
lan.user.resource = "可分配资源";
lan.user.register_time = "注册时间";
lan.user.update_time = "最后更新时间";
lan.user.access_time = "最近访问时间";
lan.user.order_time = "最近订单时间";
lan.user.remark = "用户备注";
lan.user.empty = "没有符合条件的用户。";
lan.user.add = "添加用户";
lan.user.del = "删除用户";
lan.user.del_tip = "删除用户的操作无法被恢复，您确定要继续吗？";
lan.user.edit = "编辑用户";
lan.user.xedit = "调整财务信息";
lan.user.edit_address = "地址管理";
lan.user.chgpass = "修改用户密码";
lan.user.show = "查看详细信息";
lan.user.charge = "使用礼券";
lan.user.send = "发送邮件";
lan.user.exp = "导出所有查找结果";
lan.user.record_tip = "查看用户下的所有记录";
lan.user.order_tip = "查看用户下的所有订单";
lan.user.transaction_tip = "查看用户下的所有交易";

lan.user.info = new Array();
lan.user.info[0] = "如果您使用模糊匹配模式查找字符串，您应当遵循MySQL字符串比较语法输入要查找的内容，更多细节请参考相关文档。请注意系统通常使用专门格式保存特殊字符，匹配特殊字符可能无法找到对应的记录。";
lan.user.info[1] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.user.err = new Array();
lan.user.err[0] = "您填写的起始用户编号无效！";
lan.user.err[1] = "您填写的截止用户编号无效！";
lan.user.err[2] = "您填写的用户编号范围无效！";
lan.user.err[3] = "您填写的注册邮箱无效！";



















lan.ord = new Object();

lan.ord.title = "最近订单";
lan.ord.id = "订单编号";
lan.ord.user = "用户编号";
lan.ord.elem = "项目总数";
lan.ord.open_elem = "待处理项目";
lan.ord.open_sum = "待支付金额";
lan.ord.sum = "总金额";
lan.ord.open_sum = "待支付金额";
lan.ord.insert_time = "提交时间";
lan.ord.update_time = "更新时间";
lan.ord.insert_ip = "提交地址";
lan.ord.address = "客户地址";
lan.ord.email = "联系邮箱";
lan.ord.remark = "订单备注";
lan.ord.extra_address = "附加地址";
lan.ord.empty = "没有符合条件的订单。";
lan.ord.pay_balance = "使用余额支付";
lan.ord.pay_ticket = "使用购物卡支付";
lan.ord.add = "添加订单";
lan.ord.del = "删除订单";
lan.ord.del_tip = "删除订单的操作无法被恢复，您确定要继续吗？";
lan.ord.edit = "编辑订单";
lan.ord.copy = "复制订单";
lan.ord.edit_element = "管理项目";
lan.ord.email_title = "点击给该邮箱发送邮件";
lan.ord.invoice_tip = "查看订单下的所有账单";
lan.ord.payment_tip = "查看订单下的所有款项";
lan.ord.user_tip = "查看所属用户";
lan.ord.print = "下载订单信息";
lan.ord.send = "发送订单确认";
lan.ord.show = "显示特征码";
lan.ord.open = "待处理";
lan.ord.shop = "供货商铺";
lan.ord.target = "仓储商铺";
lan.ord.selem = "供货数量";
lan.ord.telem = "待发货数量";
lan.ord.transaction_tip = "查看订单下的所有交易";
lan.ord.subscription_tip = "查看订单下的所有订阅";

lan.ord.info = new Array();
lan.ord.info[0] = "该功能仅能显示大约90天以内的订单。如果想查阅详细的历史记录请使用交易管理功能。";
lan.ord.info[1] = "本页面内的所有时间信息均为当前客户端时间。";
lan.ord.info[2] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.ord.err = new Array();
lan.ord.err[0] = "您填写的起始订单编号无效！";
lan.ord.err[1] = "您填写的截止订单编号无效！";
lan.ord.err[2] = "您填写的订单编号范围无效！";
lan.ord.err[3] = "您填写的用户编号无效！";
lan.ord.err[4] = "您填写的供货商铺编号无效！";
lan.ord.err[5] = "您填写的仓储商铺编号无效！";









lan.cata = new Object();

lan.cata.title = "商品分类查找";
lan.cata.id = "分类编号";
lan.cata.name = "分类名称";
lan.cata.type = "分类类型";
lan.cata.state = "显示模式";
lan.cata.insert_time = "添加时间";
lan.cata.update_time = "最后编辑时间";
lan.cata.catalog = "子分类数量";
lan.cata.article = "商品数量";
lan.cata.remark = "分类备注";
lan.cata.moveup = "上移分类";
lan.cata.movedown = "下移分类";
lan.cata.move = "移动分类";
lan.cata.add = "添加分类";
lan.cata.del = "删除分类";
lan.cata.del_tip = "删除分类的操作无法被恢复，您确定要继续吗？";
lan.cata.empty = "还没有建立任何分类。";
lan.cata.no = "无所属分类";
lan.cata.edit = "编辑分类";
lan.cata.edit_extra = "查看子分类";
lan.cata.copy = "复制分类";
lan.cata.art_tip = "查看分类下的所有商品";

lan.cata.type_0 = "基本分类";
lan.cata.type_1 = "普通分类";
lan.cata.state_0 = "隐藏";
lan.cata.state_1 = "显示";

lan.cata.info = new Array();
lan.cata.info[0] = "商品分类共分为基本分类和普通分类两种。基本分类用于包含子分类，普通分类用于包含商品。";
lan.cata.info[1] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";









lan.art = new Object();

lan.art.title = "商品查找";
lan.art.id = "商品编号";
lan.art.link = "所属商品编号";
lan.art.id_link = "商品编号 / 所属商品编号";
lan.art.tit = "中文标题";
lan.art.subtit = "拼音标题";
lan.art.name = "中文附加信息";
lan.art.subname = "拼音附加信息";
lan.art.code = "商品编码";
lan.art.catalog = "所属分类";
lan.art.show_level = "显示级别";
lan.art.weight = "邮递记重";
lan.art.insert_time = "添加时间";
lan.art.update_time = "最后编辑时间";
lan.art.service = "服务范围";
lan.art.price = "商品价格";
lan.art.tax = "商品税率";
lan.art.state = "显示模式";
lan.art.sold = "售出总数";
lan.art.pos_eval = "好评数";
lan.art.neg_eval = "差评数";
lan.art.remark = "商品备注";
lan.art.empty = "没有符合条件的商品。";
lan.art.add = "添加商品";
lan.art.del = "删除商品";
lan.art.del_tip = "删除商品的操作无法被恢复，您确定要继续吗？";
lan.art.move = "移动商品";
lan.art.edit = "编辑商品";
lan.art.copy = "复制为独立商品";
lan.art.icopy = "复制为所属商品";
lan.art.image = "图片管理";
lan.art.item = "描述管理";
lan.art.clink = "调整所属关系";
lan.art.article_tip = "查看所属商品";
lan.art.aweight = "%A% 克";
lan.art.offer = "供货总数";
lan.art.inventory = "供货件数";
lan.art.offer_tip = "查看商品下的所有供货";
lan.art.transaction_tip = "查看商品下的所有交易";

lan.art.no_level = "未指定";
lan.art.state_0 = "已隐藏";
lan.art.state_1 = "正常";

lan.art.info = new Array();
lan.art.info[0] = "如果您使用模糊匹配模式查找字符串，您应当遵循MySQL字符串比较语法输入要查找的内容，更多细节请参考相关文档。请注意系统通常使用专门格式保存特殊字符，匹配特殊字符可能无法找到对应的记录。";
lan.art.info[1] = "本页面内的所有时间信息均为当前客户端时间。";
lan.art.info[2] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.art.err = new Array();
lan.art.err[0] = "您填写的起始商品编号无效！";
lan.art.err[1] = "您填写的截止商品编号无效！";
lan.art.err[2] = "您填写的商品编号范围无效！";
lan.art.err[3] = "您填写的所属商品编号无效！";
lan.art.err[4] = "您填写的分类编号无效！";
lan.art.err[5] = "您填写的商品中文标题无效！";
lan.art.err[6] = "您填写的商品拼音标题无效！";
lan.art.err[7] = "您填写的商品中文附加信息无效！";
lan.art.err[8] = "您填写的商品拼音附加信息无效！";
lan.art.err[9] = "您填写的商品编码无效！";
lan.art.err[10] = "您填写的起始商品价格无效！";
lan.art.err[11] = "您填写的截止商品价格无效！";
lan.art.err[12] = "您填写的商品价格范围无效！";
lan.art.err[13] = "您填写的起始商品税率无效！";
lan.art.err[14] = "您填写的截止商品税率无效！";
lan.art.err[15] = "您填写的商品税率范围无效！";
lan.art.err[16] = "您填写的起始邮递记重无效！";
lan.art.err[17] = "您填写的截止邮递记重无效！";
lan.art.err[18] = "您填写的邮递记重范围无效！";
lan.art.err[19] = "您填写的起始成交数量无效！";
lan.art.err[20] = "您填写的截止成交数量无效！";
lan.art.err[21] = "您填写的成交数量范围无效！";
lan.art.err[22] = "您填写的起始好评数无效！";
lan.art.err[23] = "您填写的截止好评数无效！";
lan.art.err[24] = "您填写的好评数范围无效！";
lan.art.err[25] = "您填写的起始差评数无效！";
lan.art.err[26] = "您填写的截止差评数无效！";
lan.art.err[27] = "您填写的差评数范围无效！";
lan.art.err[28] = "您填写的添加时间无效！";
lan.art.err[29] = "您填写的最后编辑时间无效！";









lan.art.inventory_tip = "查看商品下的所有库存";



















lan.srec = new Object();

lan.srec.title = "商铺操作记录";
lan.srec.id = "记录编号";
lan.srec.name = "事件名称";
lan.srec.inf = "事件内容";
lan.srec.user = "用户编号";
lan.srec.shop = "商铺编号";
lan.srec.time = "操作时间";
lan.srec.ip = "操作地址";
lan.srec.unknown = "未知事件";

lan.srec.del = "删除记录";
lan.srec.del_tip = "删除记录的操作无法被恢复，您确定要继续吗？";
lan.srec.clr = "清空记录";
lan.srec.clr_tip = "清空记录的操作无法被恢复，您确定要继续吗？";
lan.srec.exp = "导出所有查找结果";
lan.srec.empty = "没有符合条件的记录。";
lan.srec.background = "后台操作";

lan.srec.info = new Array();
lan.srec.info[0] = "本页面内的所有时间信息均为当前客户端时间。";
lan.srec.info[1] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.srec.err = new Array();
lan.srec.err[0] = "您填写的起始记录编号无效！";
lan.srec.err[1] = "您填写的截止记录编号无效！";
lan.srec.err[2] = "您填写的记录编号范围无效！";
lan.srec.err[3] = "您填写的用户编号无效！";
lan.srec.err[4] = "您填写的商铺编号无效！";
lan.srec.err[5] = "您填写的操作时间无效！";





lan.srecName = new Array();
lan.srecInfo = new Array();









lan.shop = new Object();

lan.shop.title = "商铺查找";
lan.shop.id = "商铺编号";
lan.shop.name = "商铺名称";
lan.shop.email = "注册邮箱";
lan.shop.state = "商铺状态";
lan.shop.state0 = "验证状态";
lan.shop.state1 = "锁定状态";
lan.shop.sold = "成交量";
lan.shop.pos_eval = "好评";
lan.shop.neg_eval = "差评";
lan.shop.register_time = "注册时间";
lan.shop.update_time = "最后更新时间";
lan.shop.access_time = "最近访问时间";
lan.shop.order_time = "最近订单时间";
lan.shop.balance = "账户余额";
lan.shop.point = "商铺积分";
lan.shop.resource = "可分配资源";
lan.shop.offer = "供货总数";
lan.shop.inventory = "供货件数";
lan.shop.remark = "商铺备注";
lan.shop.empty = "没有符合条件的商铺。";
lan.shop.add = "注册商铺";
lan.shop.del = "删除商铺";
lan.shop.del_tip = "删除商铺的操作无法被恢复，您确定要继续吗？";
lan.shop.edit = "编辑商铺";
lan.shop.xedit = "调整财务信息";
lan.shop.edit_picture = "图片管理";
lan.shop.edit_master = "商铺管理员";
lan.shop.show = "查看详细信息";
lan.shop.send = "发送邮件";
lan.shop.exp = "导出所有查找结果";
lan.shop.record_tip = "查看商铺下的所有记录";
lan.shop.offer_tip = "查看商铺下的所有供货";
lan.shop.transaction_tip = "查看商铺下的所有交易";
lan.shop.target_tip = "查看商铺下的委托交易";
lan.shop.source_band_tip = "查看商铺发起的所有委托";
lan.shop.target_band_tip = "查看商铺接受的所有委托";

lan.shop.state_0 = "未验证";
lan.shop.state_1 = "已验证";
lan.shop.state_2 = "未锁定";
lan.shop.state_3 = "已锁定";

lan.shop.info = new Array();
lan.shop.info[0] = "如果您使用模糊匹配模式查找字符串，您应当遵循MySQL字符串比较语法输入要查找的内容，更多细节请参考相关文档。请注意系统通常使用专门格式保存特殊字符，匹配特殊字符可能无法找到对应的记录。";
lan.shop.info[1] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.shop.err = new Array();
lan.shop.err[0] = "您填写的起始商铺编号无效！";
lan.shop.err[1] = "您填写的截止商铺编号无效！";
lan.shop.err[2] = "您填写的商铺编号范围无效！";
lan.shop.err[3] = "您填写的商铺名称无效！";
lan.shop.err[4] = "您填写的注册邮箱无效！";





lan.srecName[21] = "修改基本信息";		lan.srecInfo[21] = "<b>注册名称</b>: %A%, <b>注册邮箱</b>: %B%.";
lan.srecName[22] = "修改商铺状态";		lan.srecInfo[22] = "<b>商铺状态</b>: %A%.";

lan.srecName[31] = "调整账户余额";		lan.srecInfo[31] = "<b>账户余额</b>: %A%.";
lan.srecName[32] = "调整账户积分";		lan.srecInfo[32] = "<b>账户积分</b>: %A%.";



















lan.sinfo = new Object();

lan.sinfo.title = "商铺首页";
lan.sinfo.basic_info = "基本信息";
lan.sinfo.extra_info = "扩展信息";
lan.sinfo.remark = "商铺备注";
lan.sinfo.resource = "商铺评价";
lan.sinfo.sale_t = "销售总计";
lan.sinfo.sale_s = "金额总计";
lan.sinfo.sale_w = "年度销售总计";
lan.sinfo.sale_v = "年度金额总计";
lan.sinfo.catalog0 = "销售分布";
lan.sinfo.catalog1 = "销售分布（全局）";
lan.sinfo.catalogi = "%A%: %B% %";
lan.sinfo.month = "%A%-%B%";









lan.mast = new Object();

lan.mast.title = "商铺管理员";
lan.mast.id = "信息编号";
lan.mast.user = "用户编号";
lan.mast.email = "注册邮箱";
lan.mast.state = "用户状态";
lan.mast.insert_time = "添加时间";
lan.mast.user_tip = "查看该用户";
lan.mast.add = "添加管理员";
lan.mast.del = "删除管理员";
lan.mast.del_tip = "删除管理员的操作无法被恢复，您确定要继续吗？";
lan.mast.empty = "还没有添加任何管理员。";

lan.mast.state_0 = "未验证";
lan.mast.state_1 = "已验证";
lan.mast.state_2 = "未锁定";
lan.mast.state_3 = "已锁定";

lan.mast.add_user = "用户编号";
lan.mast.add_user_tip = "用户编号支持联想输入，您可以输入注册邮箱中的关键字搜寻用户。";
lan.mast.add_submit = "添加";

lan.mast.info = new Array();
lan.mast.info[0] = "请注意用户如果未激活或者被锁定，则其管理员权限自动被暂停。当用户激活且被取消锁定后，权限自动回复。";
lan.mast.info[1] = "本页面内的所有时间信息均为当前客户端时间。";
lan.mast.info[2] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.mast.err = new Array();
lan.mast.err[0] = "您没有填写用户编号或者编号无效！";





lan.srecName[36] = "添加管理员";		lan.srecInfo[36] = "<b>用户编号</b>: %A%.";
lan.srecName[37] = "删除管理员";		lan.srecInfo[37] = "<b>用户编号</b>: %A%.";









lan.band = new Object();

lan.band.title = "仓储委托";
lan.band.id = "委托编号";
lan.band.source = "发起商铺";
lan.band.target = "受托商铺";
lan.band.state = "委托状态";
lan.band.insert_time = "添加时间";
lan.band.flow = "流水金额";
lan.band.add = "添加委托";
lan.band.del = "删除委托";
lan.band.cstate0 = "禁止委托";
lan.band.cstate1 = "激活委托";
lan.band.del_tip = "删除委托的操作无法被恢复，您确定要继续吗？";
lan.band.empty = "还没有添加任何委托。";
lan.band.source_tip = "查看发起商铺";
lan.band.target_tip = "查看受托商铺";
lan.band.transaction_tip = "查看委托下的所有交易";

lan.band.state_0 = "未激活";
lan.band.state_1 = "已激活";

lan.band.add_name = "委托名称";
lan.band.add_source = "发起商铺";
lan.band.add_target = "受托商铺";
lan.band.add_shop_tip = "商铺编号支持联想输入，您可以输入商铺名称或者注册邮箱中的关键字搜寻商铺编号。";
lan.band.add_submit = "添加";
lan.band.edit_name = "委托名称";
lan.band.edit_state = "委托状态";
lan.band.edit_submit = "提交";

lan.band.info = new Array();
lan.band.info[0] = "新添加的委托未被激活。您必须等待受托商铺手动激活委托。";
lan.band.info[1] = "本页面内的所有时间信息均为当前客户端时间。";
lan.band.info[2] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.band.err = new Array();
lan.band.err[0] = "您填写的起始委托编号无效！";
lan.band.err[1] = "您填写的截止委托编号无效！";
lan.band.err[2] = "您填写的委托编号范围无效！";
lan.band.err[3] = "您填写的发起商铺无效！";
lan.band.err[4] = "您填写的受托商铺无效！";
lan.band.err[5] = "您填写的添加时间无效！";
lan.band.err[6] = "您填写的起始流水金额无效！";
lan.band.err[7] = "您填写的截止流水金额无效！";
lan.band.err[8] = "您填写的流水金额范围无效！";
lan.band.err[9] = "您没有填写发起商铺编号或者编号无效！";
lan.band.err[10] = "您没有填写受托商铺编号或者编号无效！";
lan.band.err[11] = "系统中已存在连接同样发起商铺与受托商铺的标识！";






lan.srecName[61] = "发起委托";				lan.srecInfo[61] = "<b>委托编号</b>: %A%, <b>受托商铺编号</b>: %B%.";
lan.srecName[62] = "收到委托";				lan.srecInfo[62] = "<b>委托编号</b>: %A%, <b>发起商铺编号</b>: %B%.";
lan.srecName[63] = "删除发起的委托";		lan.srecInfo[63] = "<b>委托编号</b>: %A%.";
lan.srecName[64] = "删除收到的委托";		lan.srecInfo[64] = "<b>委托编号</b>: %A%.";
lan.srecName[65] = "修改发起委托的状态";	lan.srecInfo[65] = "<b>委托编号</b>: %A%.";
lan.srecName[66] = "修改收到委托的状态";	lan.srecInfo[66] = "<b>委托编号</b>: %A%.";









lan.off = new Object();

lan.off.title = "供货管理";
lan.off.id = "供货编号"; 
lan.off.tit = "商品中文标题";
lan.off.subtit = "商品拼音标题";
lan.off.name = "中文附加信息";
lan.off.subname = "拼音附加信息";
lan.off.article = "商品编号";
lan.off.shop = "供货商铺";
lan.off.flag = "供货标识";
lan.off.discount = "价格折扣";
lan.off.price = "供货价格";
lan.off.inventory = "库存数量";
lan.off.start_time = "起始供货时间";
lan.off.end_time = "截止供货时间";
lan.off.target = "仓储商铺";
lan.off.empty = "没有符合条件的供货。";
lan.off.add = "添加供货";
lan.off.del = "删除供货";
lan.off.del_tip = "删除供货的操作无法被恢复，您确定要继续吗？";
lan.off.edit = "编辑供货";
lan.off.copy = "复制供货";
lan.off.article_tip = "查看所属商品";
lan.off.shop_tip = "查看所属商铺";
lan.off.target_tip = "查看仓储商铺";
lan.off.band_tip = "查看仓储委托";
lan.off.transaction_tip = "查看供货下的所有交易";
lan.off.subscription_tip = "查看供货下的所有订阅";

lan.off.add_shop = "商铺编号";
lan.off.add_article = "商品编号";
lan.off.add_shop_tip = "商铺编号支持联想输入，您可以输入商铺名称或者注册邮箱中的关键字搜寻商铺编号。";
lan.off.add_article_tip = "商品编号支持联想输入，您可以输入商品标题、附加信息或者编码中的关键字搜寻商品编号。";
lan.off.add_submit = "添加";
lan.off.edit_submit = "提交";

lan.off.info = new Array();
lan.off.info[0] = "所有供货价格均为税前价格。";
lan.off.info[1] = "所有供货仅在供货时间范围内可以被交易。";
lan.off.info[2] = "新添加的供货价格与库存数量均为0。请注意在修改库存数量时同时指定正确价格。";
lan.off.info[3] = "本页面内的所有时间信息均为当前客户端时间。";
lan.off.info[4] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.off.edit_title_0 = "供货价格";
lan.off.edit_info_0 = "该选项指定供货价格。请注意该价格为税前价格。";
lan.off.edit_title_1 = "价格折扣";
lan.off.edit_info_1 = "该选项指定价格折扣。请注意该价格为税前折扣。最终税前价格为供货价格减去价格折扣。";
lan.off.edit_title_2 = "标识类型";
lan.off.edit_title_3 = "库存数量";
lan.off.edit_title_4 = "起始供货时间";
lan.off.edit_title_5 = "截止供货时间";
lan.off.edit_title_6 = "仓储商铺";
lan.off.edit_info_6 = "该选项指定仓储商铺。仓储商铺负责执行交易并提供账单。您必须在指定仓储商铺前建立仓储委托。";

lan.off.err = new Array();
lan.off.err[0] = "您填写的起始供货编号无效！";
lan.off.err[1] = "您填写的截止供货编号无效！";
lan.off.err[2] = "您填写的供货编号范围无效！";
lan.off.err[3] = "您填写的商品编号无效！";
lan.off.err[4] = "您填写的商铺编号无效！";
lan.off.err[5] = "您填写的仓储商铺编号无效！";
lan.off.err[6] = "您填写的起始价格折扣无效！";
lan.off.err[7] = "您填写的截止价格折扣无效！";
lan.off.err[8] = "您填写的价格折扣范围无效！";
lan.off.err[9] = "您填写的起始供货价格无效！";
lan.off.err[10] = "您填写的截止供货价格无效！";
lan.off.err[11] = "您填写的供货价格范围无效！";
lan.off.err[12] = "您填写的起始库存数量无效！";
lan.off.err[13] = "您填写的截止库存数量无效！";
lan.off.err[14] = "您填写的库存数量范围无效！";
lan.off.err[15] = "您填写的起始供货时间无效！";
lan.off.err[16] = "您填写的截止供货时间无效！";
lan.off.err[17] = "您没有填写商铺编号或者编号无效！";
lan.off.err[18] = "您没有填写商品编号或者编号无效！";
lan.off.err[19] = "您填写的供货价格无效！";
lan.off.err[20] = "您填写的价格折扣无效！";
lan.off.err[21] = "您填写的库存数量无效！";
lan.off.err[22] = "您填写的供货时间无效！";
lan.off.err[23] = "您无法删除仍被订阅的供货！";





lan.srecName[41] = "添加供货";			lan.srecInfo[41] = "<b>供货编号</b>: %A%, <b>商品编号</b>: %B%.";
lan.srecName[42] = "删除供货";			lan.srecInfo[42] = "<b>供货编号</b>: %A%.";
lan.srecName[43] = "编辑供货";			lan.srecInfo[43] = "<b>供货编号</b>: %A%, <b>供货价格</b>: %C%, <b>价格折扣</b>: %B%, <b>库存数量</b>: %D%, <b>受托商铺编号</b>: %E%.";
lan.srecName[44] = "复制供货";			lan.srecInfo[44] = "<b>源供货编号</b>: %A%, <b>目标供货编号</b>: %B%.";









lan.ship = new Object();

lan.ship.title = "发货单管理";
lan.ship.id = "发货单编号";
lan.ship.order = "订单编号";
lan.ship.invoice = "账单编号";
lan.ship.shop = "发货商铺";
lan.ship.num = "项目总数";
lan.ship.sum = "账单金额";
lan.ship.insert_time = "发货时间";
lan.ship.address = "客户地址";
lan.ship.extra_address = "附加地址";
lan.ship.print = "下载发货单";
lan.ship.send = "发送发货单";
lan.ship.show = "显示特征码";
lan.ship.exp = "导出所有查找结果";
lan.ship.order_tip = "查看所属订单";
lan.ship.invoice_tip = "查看所属帐单";
lan.ship.shop_tip = "查看所属商铺";
lan.ship.transaction_tip = "查看发货单下的所有交易";
lan.ship.empty = "没有符合条件的发货单。";

lan.ship.print_profile = "范本名称";
lan.ship.print_submit = "下载";
lan.ship.send_profile = "范本名称";
lan.ship.send_draft = "草稿名称";
lan.ship.send_submit = "发送";

lan.ship.info = new Array();
lan.ship.info[0] = "发货单的金额无法被更改。如果需要添加新发货单，请使用交易管理功能。";
lan.ship.info[1] = "您可以批量导出记录。每条记录的格式为：\"<i>发货单编号</i> <i>订单编号</i> <i>账单编号</i> <i>项目总数</i> <i>商品金额</i> '<i>客户地址</i>' '<i>附加地址</i>' <i>发货时间</i>\"。其中商品金额单位为0.01 " + lan.sys.curr + "，发货时间为UNIX时间戳。";
lan.ship.info[2] = "本页面内的所有时间信息均为当前客户端时间。";
lan.ship.info[3] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.ship.err = new Array();
lan.ship.err[0] = "您填写的起始发货单编号无效！";
lan.ship.err[1] = "您填写的截止发货单编号无效！";
lan.ship.err[2] = "您填写的发货单编号范围无效！";
lan.ship.err[3] = "您填写的订单编号无效！";
lan.ship.err[4] = "您填写的帐单编号无效！";
lan.ship.err[5] = "您填写的商铺编号无效！";
lan.ship.err[6] = "您填写的起始项目总数无效！";
lan.ship.err[7] = "您填写的截止项目总数无效！";
lan.ship.err[8] = "您填写的项目总数范围无效！";
lan.ship.err[9] = "您填写的起始发货单金额无效！";
lan.ship.err[10] = "您填写的截止发货单金额无效！";
lan.ship.err[11] = "您填写的发货单金额范围无效！";
lan.ship.err[12] = "您填写的发货时间无效！";









lan.tsa = new Object();

lan.tsa.title = "交易管理";
lan.tsa.id = "交易编号";
lan.tsa.service_id = "服务编号";
lan.tsa.tit = "中文标题";
lan.tsa.subtit = "拼音标题";
lan.tsa.name = "中文附加信息";
lan.tsa.subname = "拼音附加信息";
lan.tsa.price = "税前单价";
lan.tsa.tax = "税率";
lan.tsa.num = "件数";
lan.tsa.sum = "总价";
lan.tsa.insert_time = "交易时间";
lan.tsa.user = "用户编号";
lan.tsa.offer = "供货编号";
lan.tsa.order = "订单编号";
lan.tsa.invoice = "账单编号";
lan.tsa.shipment = "发货单编号";
lan.tsa.shop = "供货商铺";
lan.tsa.article = "商品编号";
lan.tsa.coupon = "折扣编号";
lan.tsa.code = "编码编号";
lan.tsa.target = "仓储商铺";
lan.tsa.offer_price = "供货价格";
lan.tsa.service = "商品服务";
lan.tsa.flag = "供货标识";
lan.tsa.empty = "没有符合条件的交易信息。";
lan.tsa.addo = "添加商品交易";
lan.tsa.addc = "添加折扣交易";
lan.tsa.add = "添加自定义交易";
lan.tsa.delo = "退回货物";
lan.tsa.delc = "删除折扣交易";
lan.tsa.del = "删除自定义交易";
lan.tsa.edit = "编辑自定义交易";
lan.tsa.cinv = "生成账单";
lan.tsa.cship = "生成发货单";
lan.tsa.del_tip = "删除交易的操作无法被恢复，您确定要继续吗？";
lan.tsa.cinv_tip = "生成账单的操作无法被恢复，您确定要继续吗？";
lan.tsa.order_tip = "查看所属订单";
lan.tsa.invoice_tip = "查看所属账单";
lan.tsa.shipment_tip = "查看所属发货单";
lan.tsa.user_tip = "查看所属用户";
lan.tsa.shop_tip = "查看所属商铺";
lan.tsa.target_tip = "查看仓储商铺";
lan.tsa.band_tip = "查看仓储委托";
lan.tsa.article_tip = "查看所属商品";
lan.tsa.offer_tip = "查看所属供货";
lan.tsa.code_tip = "查看所属编码";
lan.tsa.total = "本页总计";
lan.tsa.no_invoice = "未生成账单";

lan.tsa.add_order = "订单编号";
lan.tsa.add_offer = "供货编号";
lan.tsa.add_num = "商品件数";
lan.tsa.add_code = "折扣编码";
lan.tsa.add_title = "交易中文标题";
lan.tsa.add_submit = "添加";
lan.tsa.edit_submit = "提交";
lan.tsa.del_num = "商品件数";
lan.tsa.del_submit = "删除";

lan.tsa.info = new Array();
lan.tsa.info[0] = "如果您使用模糊匹配模式查找字符串，您应当遵循MySQL字符串比较语法输入要查找的内容，更多细节请参考相关文档。请注意系统通常使用专门格式保存特殊字符，匹配特殊字符可能无法找到对应的记录。";
lan.tsa.info[1] = "请注意一个订单下的交易数量存在上线，如果您您无法在同一个订单下建立更多的交易，请联系客服人员。";
lan.tsa.info[2] = "供货只有在有效时间内可以被交易，但退货不受有效时间影响。";
lan.tsa.info[3] = "退货商品不包含商品服务与供货标识信息。您无法通过此种方法查找退货商品。";
lan.tsa.info[4] = "一个订单获得的总折扣会被合理地分配到每件商品的价格中。";
lan.tsa.info[5] = "本页面内的所有时间信息均为当前客户端时间。";
lan.tsa.info[6] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.tsa.err = new Array();
lan.tsa.err[0] = "您填写的起始交易编号无效！";
lan.tsa.err[1] = "您填写的截止交易编号无效！";
lan.tsa.err[2] = "您填写的交易编号范围无效！";
lan.tsa.err[3] = "您填写的用户编号无效！";
lan.tsa.err[4] = "您填写的商铺编号无效！";
lan.tsa.err[5] = "您填写的供货编号无效！";
lan.tsa.err[6] = "您填写的商品编号无效！";
lan.tsa.err[7] = "您填写的折扣编号无效！";
lan.tsa.err[8] = "您填写的编码编号无效！";
lan.tsa.err[9] = "您填写的订单编号无效！";
lan.tsa.err[10] = "您填写的账单编号无效！";
lan.tsa.err[11] = "您填写的发货单编号无效！";
lan.tsa.err[12] = "您填写的商铺编号无效！";
lan.tsa.err[13] = "您填写的服务编号无效！";
lan.tsa.err[14] = "您填写的商品中文标题无效！";
lan.tsa.err[15] = "您填写的商品拼音标题无效！";
lan.tsa.err[16] = "您填写的商品中文附加信息无效！";
lan.tsa.err[17] = "您填写的商品拼音附加信息无效！";
lan.tsa.err[18] = "您填写的起始单价无效！";
lan.tsa.err[19] = "您填写的截止单价无效！";
lan.tsa.err[20] = "您填写的单价范围无效！";
lan.tsa.err[21] = "您填写的起始税率无效！";
lan.tsa.err[22] = "您填写的截止税率无效！";
lan.tsa.err[23] = "您填写的税率范围无效！";
lan.tsa.err[24] = "您填写的起始件数无效！";
lan.tsa.err[25] = "您填写的截止件数无效！";
lan.tsa.err[26] = "您填写的件数范围无效！";
lan.tsa.err[27] = "您填写的交易时间无效！";
lan.tsa.err[28] = "该商品已经完成退货！";
lan.tsa.err[29] = "您没有填写订单编号或者编号无效！";
lan.tsa.err[30] = "您没有填写供货编号或者编号无效！";
lan.tsa.err[31] = "您没有填写商品件数或者件数无效！";
lan.tsa.err[32] = "您没有填写折扣序列号或者序列号无效！";
lan.tsa.err[33] = "您没有填写商品件数或者件数无效！";
lan.tsa.err[34] = "您没有填写交易中文标题或者标题过长！";
lan.tsa.err[35] = "您填写的交易拼音标题过长！";
lan.tsa.err[36] = "您填写的交易中文附加信息过长！";
lan.tsa.err[37] = "您填写的交易拼音附加信息过长！";
lan.tsa.err[38] = "您填写的交易服务编号过长！";
lan.tsa.err[39] = "您填写的交易单价无效！";
lan.tsa.err[40] = "您填写的交易税率无效！";
lan.tsa.err[41] = "您填写的交易件数无效！";
lan.tsa.err[42] = "您无法为属于多个订单的交易生成账单！";
lan.tsa.err[43] = "您无法为属于多个账单或仓储商铺的交易生成发货单！";

lan.srecName[46] = "商品交易";			lan.srecInfo[46] = "<b>交易编号</b>: %A%, <b>供货编号</b>: %B%, <b>订单编号</b>: %C%, <b>商品件数</b>: %D%.";
lan.srecName[47] = "生成发货单";		lan.srecInfo[47] = "<b>发货单编号</b>: %A%, <b>订单编号</b>: %B%, <b>账单编号</b>: %C%, <b>交易编号</b>: %D%.";









lan.tsa.inventory_tip = "查看交易对应的库存";









lan.sup = new Object();

lan.sup.title = "工单管理";
lan.sup.id = "工单编号";
lan.sup.type = "工单类型";
lan.sup.user = "发起用户";
lan.sup.starter = "发起用户/商铺";
lan.sup.shop = "当前商铺";
lan.sup.shop_search = "发起商铺 / 当前商铺";
lan.sup.state = "当前状态";
lan.sup.insert_time = "发起时间";
lan.sup.update_time = "最后更新时间";
lan.sup.empty = "没有符合条件的工单。";
lan.sup.addu = "添加用户工单";
lan.sup.adds = "添加商铺工单";
lan.sup.edit_message = "查看工单";
lan.sup.relay = "移交工单";
lan.sup.close = "关闭工单";
lan.sup.close_tip = "关闭工单的操作无法被恢复，您确定要继续吗？";
lan.sup.del = "删除工单";
lan.sup.del_tip = "删除工单的操作无法被恢复，您确定要继续吗？";
lan.sup.background = "管理后台";
lan.sup.user_tip = "查看发起用户";
lan.sup.shop_tip = "查看发起商铺";
lan.sup.shopc_tip = "查看当前商铺";

lan.sup.type_0 = "用户工单";
lan.sup.type_1 = "商铺工单";
lan.sup.state_0 = "已关闭";
lan.sup.state_1 = "待处理";

lan.sup.add_user = "发起用户编号";
lan.sup.add_shop = "发起商铺编号";
lan.sup.add_shop_curr = "当前商铺编号";
lan.sup.add_user_tip = "用户编号支持联想输入，您可以输入注册邮箱中的关键字搜寻用户。";
lan.sup.add_shop_tip = "商铺编号支持联想输入，您可以输入商铺名称或者注册邮箱中的关键字搜寻商铺编号。";
lan.sup.add_no_shop = "管理后台";
lan.sup.add_submit = "添加";
lan.sup.relay_shop = "商铺编号";
lan.sup.relay_shop_tip = "商铺编号支持联想输入，您可以输入商铺名称或者注册邮箱中的关键字搜寻商铺编号。";
lan.sup.relay_no_shop = "管理后台";
lan.sup.relay_submit = "移交";

lan.sup.info = new Array();
lan.sup.info[0] = "新添加的工单没有内容。您必须通过查看工单功能为工单添加内容。";
lan.sup.info[1] = "工单包括用户工单和商铺工单两种。用户工单可以在商铺以及管理后台间传递。商铺工单必须在管理后台处理。";
lan.sup.info[2] = "本页面内的所有时间信息均为当前客户端时间。";
lan.sup.info[3] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.sup.err = new Array();
lan.sup.err[0] = "您填写的起始工单编号无效！";
lan.sup.err[1] = "您填写的截止工单编号无效！";
lan.sup.err[2] = "您填写的工单编号范围无效！";
lan.sup.err[3] = "您填写的用户编号无效！";
lan.sup.err[4] = "您填写的商铺编号无效！";
lan.sup.err[5] = "您填写的发起时间无效！";
lan.sup.err[6] = "您填写的最后更新时间无效！";
lan.sup.err[7] = "您填写的用户编号无效！";
lan.sup.err[8] = "您填写的商铺编号无效！";

lan.srecName[96] = "添加工单";			lan.srecInfo[96] = "<b>工单编号</b>: %A%, <b>用户编号</b>: %B%.";
lan.srecName[97] = "删除工单";			lan.srecInfo[97] = "<b>工单编号</b>: %A%.";
lan.srecName[98] = "移交工单";			lan.srecInfo[98] = "<b>工单编号</b>: %A%, <b>商铺编号</b>: %B%.";
lan.srecName[99] = "关闭工单";			lan.srecInfo[99] = "<b>工单编号</b>: %A%.";









lan.msg = new Object();

lan.msg.title = "查看工单";
lan.msg.id = "消息编号";
lan.msg.name = "发送人";
lan.msg.message = "消息内容";
lan.msg.insert_time = "发送时间";
lan.msg.empty = "没有任何消息。";
lan.msg.add = "添加消息";
lan.msg.del = "删除消息";
lan.msg.del_tip = "删除消息的操作无法被恢复，您确定要继续吗？";
lan.msg.background = "后台管理账户";
lan.msg.user_tip = "查看用户";
lan.msg.shop_tip = "查看商铺";

lan.msg.add_message = "消息内容";
lan.msg.add_submit = "添加";

lan.msg.info = new Array();
lan.msg.info[0] = "本页面内的所有时间信息均为当前客户端时间。";
lan.msg.info[1] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.msg.err = new Array();
lan.msg.err[0] = "您没有填写消息内容或者消息内容过长！";









lan.ivt = new Object();

lan.ivt.title = "仓储管理";
lan.ivt.id = "记录编号";
lan.ivt.tit = "中文标题";
lan.ivt.subtit = "拼音标题";
lan.ivt.name = "中文附加信息";
lan.ivt.subname = "拼音附加信息";
lan.ivt.num = "件数";
lan.ivt.code = "商品编码";
lan.ivt.insert_time = "添加时间";
lan.ivt.update_time = "最后编辑时间";
lan.ivt.shop = "仓储商铺";
lan.ivt.article = "商品编号";
lan.ivt.empty = "没有符合条件的仓储记录。";
lan.ivt.add = "添加记录";
lan.ivt.del = "删除记录";
lan.ivt.edit = "调整库存";
lan.ivt.del_tip = "删除仓储记录的操作无法被恢复，您确定要继续吗？";
lan.ivt.shop_tip = "查看所属商铺";
lan.ivt.article_tip = "查看所属商品";
lan.ivt.offer_tip = "查看所有相关供货";
lan.ivt.transaction_tip = "查看所有相关交易";

lan.ivt.add_shop = "商铺编号";
lan.ivt.add_article = "商品编号";
lan.ivt.add_shop_tip = "商铺编号支持联想输入，您可以输入商铺名称或者注册邮箱中的关键字搜寻商铺编号。";
lan.ivt.add_article_tip = "商品编号支持联想输入，您可以输入商品标题、附加信息或者编码中的关键字搜寻商品编号。";
lan.ivt.edit_num = "商品件数";
lan.ivt.add_submit = "添加";
lan.ivt.edit_submit = "提交";

lan.ivt.info = new Array();
lan.ivt.info[0] = "如果您使用模糊匹配模式查找字符串，您应当遵循MySQL字符串比较语法输入要查找的内容，更多细节请参考相关文档。请注意系统通常使用专门格式保存特殊字符，匹配特殊字符可能无法找到对应的记录。";
lan.ivt.info[1] = "调整库存时，调整值可以为正（增加）或者为负（减少）。";
lan.ivt.info[2] = "您可以批量导出记录。每条记录的格式为：\"<i>记录编号</i> <i>订单编号</i> <i>商铺编号</i> <i>项目总数</i> <i>添加时间</i> <i>最后更新时间</i>\"。其中添加时间和最后更新时间均为UNIX时间戳。";
lan.ivt.info[3] = "本页面内的所有时间信息均为当前客户端时间。";
lan.ivt.info[4] = "此页面采用了多层缓存技术，如果您希望确保获取最新数据请使用浏览器的刷新功能刷新此页面。";

lan.ivt.err = new Array();
lan.ivt.err[0] = "您填写的起始记录编号无效！";
lan.ivt.err[1] = "您填写的截止记录编号无效！";
lan.ivt.err[2] = "您填写的记录编号范围无效！";
lan.ivt.err[3] = "您填写的商品编号无效！";
lan.ivt.err[4] = "您填写的商铺编号无效！";
lan.ivt.err[5] = "您填写的起始件数无效！";
lan.ivt.err[6] = "您填写的截止件数无效！";
lan.ivt.err[7] = "您填写的件数范围无效！";
lan.ivt.err[8] = "您填写的添加时间无效！";
lan.ivt.err[9] = "您填写的最后编辑时间无效！";
lan.ivt.err[10] = "您填写的商品中文标题无效！";
lan.ivt.err[11] = "您填写的商品拼音标题无效！";
lan.ivt.err[12] = "您填写的商品中文附加信息无效！";
lan.ivt.err[13] = "您填写的商品拼音附加信息无效！";
lan.ivt.err[14] = "您填写的商品编码无效！";
lan.ivt.err[15] = "您没有填写商铺编号或者编号无效！";
lan.ivt.err[16] = "您没有填写商品编号或者编号无效！";
lan.ivt.err[17] = "您填写的商品件数无效！";
lan.ivt.err[18] = "已经存在商家关于该商品的仓储记录！";





lan.srecName[51] = "添加库存";			lan.srecInfo[51] = "<b>库存编号</b>: %A%, <b>商品编号</b>: %B%.";
lan.srecName[52] = "删除库存";			lan.srecInfo[52] = "<b>库存编号</b>: %A%.";
lan.srecName[53] = "调整库存";			lan.srecInfo[53] = "<b>库存编号</b>: %A%, <b>库存变化</b>: %B%.";
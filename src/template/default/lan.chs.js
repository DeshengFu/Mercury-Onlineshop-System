var lan = new Object();

lan.id = 'chs';
lan.name = '简体中文';



lan.sys = new Object();

lan.sys.perc = '%A% %';
lan.sys.curr = '(&euro;)';
lan.sys.pri = '%A% &euro;';
lan.sys.utcdate = '%A%-%B%-%C%';
lan.sys.time = '%A%-%B%-%C% %D%:%E%';



lan.gen = new Object();

lan.gen.operation = '操作';
lan.gen.cancel = '取消';
lan.gen.submit = '确认';
lan.gen.close = '关闭';
lan.gen.page_go = '跳转';
lan.gen.page_info = '总共%B%页，%A%条项目';
lan.gen.login_err = '您没有登录或者您的登录已经过期！';



lan.recName = new Array();
lan.recInfo = new Array();

lan.recName[6] = '用户注册';
lan.recName[7] = '用户登录';
lan.recName[8] = '用户注销';
lan.recName[9] = '发送密码重置邮件';
lan.recName[10] = '发送用户验证邮件';
lan.recName[11] = '激活用户';
lan.recName[12] = '重置用户密码';

lan.recName[21] = '修改基本信息';		lan.recInfo[21] = '<b>注册邮箱</b>: %A%.';
lan.recName[22] = '修改用户状态';		lan.recInfo[22] = '<b>用户状态</b>: %A%.';
lan.recName[23] = '修改用户密码';
lan.recName[24] = "修改个人信息";

lan.recName[26] = "添加地址";			lan.recInfo[26] = "<b>地址编号</b>: %A%.";
lan.recName[27] = "删除地址";			lan.recInfo[27] = "<b>地址编号</b>: %A%.";
lan.recName[28] = "编辑地址";			lan.recInfo[28] = "<b>地址编号</b>: %A%.";

lan.recName[31] = '调整账户余额';		lan.recInfo[31] = '<b>账户余额</b>: %A%.';
lan.recName[32] = '调整账户积分';		lan.recInfo[32] = '<b>用户积分</b>: %A%.';
lan.recName[33] = '礼券充值';			lan.recInfo[33] = '<b>礼券编号</b>: %A%, <b>礼券价值</b>: %B%.';

lan.recName[36] = "添加管理员";			lan.recInfo[36] = "<b>商铺编号</b>: %A%.";
lan.recName[37] = "删除管理员";			lan.recInfo[37] = "<b>商铺编号</b>: %A%.";



lan.utypeName = new Array();

lan.utypeName[0] = "网站注册";
lan.utypeName[1] = "网站注册";

lan.utypeName[11] = "Google";



lan.parseStr = function(str)
{
	var arr = new Array();
	var start = 0;
	var i = 0;
	while(i < str.length)
	{
		var c = str.charCodeAt(i);
		if(c < 255)
		{
			i++;
			continue;
		}
		if(i > start) arr.push(str.substring(start, i));
		var cs = c.toString(16);
		if(cs.length < 4) cs = '0000'.substring(cs.length) + cs;
		arr.push(cs);
		i++;
		start = i;
	}
	if(i > start) arr.push(str.substring(start, i));
	return arr.join(' ');
}



lan.li = new Object();

lan.li.stitle = '登录';
lan.li.title = '用户登录';
lan.li.submit = '登录';

lan.li.email = '电子邮箱';
lan.li.password = '登录密码';
lan.li.save_cookie = '保存密码';

lan.li.register = '新用户注册';
lan.li.reset_pass = '重置密码';

lan.li.tip = '请填写您的信息以完成登录。如果您通过第三方服务在网站注册，请选择相应的登录服务。';
lan.li.succ = '登陆成功。欢迎您的光临！';

lan.li.err = new Array();
lan.li.err[0] = '您没有填写电子邮箱地址或者地址无效！';
lan.li.err[1] = '您没有填写登录密码或者密码错误！';
lan.li.err[2] = '来自当前IP地址/针对当前用户的错误过多，请稍后再试！';



lan.lo = new Object();

lan.lo.stitle = '注销';
lan.lo.title = '用户注销';

lan.lo.succ = '注销成功。期待下次与您再会！';



lan.reg = new Object();

lan.reg.stitle = '注册';
lan.reg.title = '用户注册';
lan.reg.submit = '注册';

lan.reg.email = '电子邮箱';
lan.reg.password = '登录密码';
lan.reg.passwordc = '确认密码';

lan.reg.tip = '请填写您的信息以完成注册。您也可以通过第三方服务快速在网站注册。';

lan.reg.err = new Array();
lan.reg.err[0] = '您没有填写电子邮箱地址，地址无效或者已经被注册！';
lan.reg.err[1] = '您没有填写登录密码或者密码无效（系统规定密码长度为8-32位）！';
lan.reg.err[2] = '您两次填写的登录密码不一致！';
lan.reg.err[3] = '你还没有阅读并接受协议内容！';
lan.reg.err[4] = '来自当前IP地址的注册请求过多，请稍后再试！';



lan.ra = new Object();

lan.ra.stitle = '重发验证邮件';
lan.ra.title = '重发验证邮件';

lan.ra.err = new Array();
lan.ra.err[0] = '来自当前IP地址/针对当前用户的请求过多，请稍后再试！';



lan.rp = new Object();

lan.rp.stitle = '重置密码';
lan.rp.title = '重置密码';
lan.rp.submit = '重置';

lan.rp.email = '电子邮箱';
lan.rp.password = '新登录密码';
lan.rp.passwordc = '确认新密码';

lan.rp.tip = '请填写您的注册邮箱以及新密码。如果您通过第三方服务在网站注册，请联系相应的服务商重置密码。';
lan.rp.succ = '重置密码成功。请检查您的邮箱并按照我们给您发送的提示激活您的新密码！';

lan.rp.err = new Array();
lan.rp.err[0] = '您没有填写电子邮箱地址或者地址无效！';
lan.rp.err[1] = '您没有填写登录密码或者密码无效（系统规定密码长度为8-32位）！';
lan.rp.err[2] = '您两次填写的登录密码不一致！';
lan.rp.err[3] = '来自当前IP地址/针对当前用户的请求过多，请稍后再试！';



lan.act = new Object();

lan.act.stitle_0 = '激活用户';
lan.act.stitle_1 = '激活新密码';
lan.act.title_0 = '激活用户';
lan.act.title_1 = '激活新密码';
lan.act.submit = '激活';

lan.act.code = '激活码';

lan.act.tip_0 = '请检查您的邮箱并按照我们给您发送的提示激活您的账户。';
lan.act.tip_1 = '请检查您的邮箱并按照我们给您发送的提示激活新登陆密码。';
lan.act.succ_0 = '激活用户成功！';
lan.act.succ_1 = '激活新登陆密码成功！';

lan.act.err = new Array();
lan.act.err[0] = '激活码无效或者已经过期！';



lan.user = new Object();

lan.user.title = '我的用户中心';
lan.user.id = '用户编号';
lan.user.email = '注册邮箱<sup>1,2</sup>';
lan.user.name = '注册姓名<sup>3</sup>';
lan.user.sname = '企业名称<sup>3</sup>';
lan.user.type = '注册平台';
lan.user.address = '注册地址';
lan.user.pass = '当前密码';
lan.user.state = '当前状态';
lan.user.balance = '账户余额';
lan.user.point = '用户积分';
lan.user.register_time = '注册时间<sup>4</sup>';
lan.user.update_time = '最后更新时间<sup>4</sup>';
lan.user.access_time = '最近访问时间<sup>4</sup>';
lan.user.order_time = '最近订单时间<sup>4</sup>';
lan.user.birthday = '出生日期<sup>3</sup>';
lan.user.sbirthday = '注册日期<sup>3</sup>';
lan.user.manage = '商铺管理中心';

lan.user.state_0 = '未验证';
lan.user.state_1 = '已验证';
lan.user.state_2 = '未锁定';
lan.user.state_3 = '已锁定';

lan.user.info = new Array();
lan.user.info[0] = '修改注册邮箱后您需要重新验证您的帐户。';
lan.user.info[1] = '如果您通过第三方平台注册，您需要通过该平台修改您的注册邮箱。';
lan.user.info[2] = '请联系我们的客服人员修改该信息。';
lan.user.info[3] = '本页面内的所有时间信息均为您当前客户端的时间。';
lan.user.info[4] = '操作记录功能只保存您的基本操作信息。有关具体订单的信息请参考订单管理中的更新记录。';



lan.ce = new Array();

lan.ce.stitle = '修改注册邮箱';
lan.ce.title = '修改注册邮箱';
lan.ce.submit = '修改';

lan.ce.passwordi = '当前登录密码';
lan.ce.email = '新电子邮箱';

lan.ce.tip = '请填写您的当前用户密码以及新电子邮箱。如果您通过第三方服务在网站注册，请联系相应的服务商修改注册邮箱。请注意修改邮箱后您需要重新验证您的帐户。';

lan.ce.err = new Array();
lan.ce.err[0] = '来自当前IP地址/针对当前用户的请求过多，请稍后再试！';
lan.ce.err[1] = '您没有填写当前登录密码或者密码错误！';
lan.ce.err[2] = '您没有填写电子邮箱地址，地址无效或者已经被注册！';



lan.ci = new Array();

lan.ci.stitle = '修改注册地址';
lan.ci.title = '修改注册地址';
lan.ci.submit = '修改';

lan.ci.organization = '公司或组织';
lan.ci.street = '街道';
lan.ci.num = '门牌号';
lan.ci.extension = '附加地址信息';
lan.ci.zip = '邮编';
lan.ci.city = '城市';
lan.ci.country = '国家';
lan.ci.telephone = '电话';

lan.ci.err = new Array();
lan.ci.err[0] = '无效信息';
lan.ci.err[1] = '无效信息';
lan.ci.err[2] = '无效信息';
lan.ci.err[3] = '无效信息';
lan.ci.err[4] = '无效信息';
lan.ci.err[5] = '无效信息';
lan.ci.err[6] = '无效信息';
lan.ci.err[7] = '无效信息';



lan.cp = new Object();

lan.cp.stitle = '修改登录密码';
lan.cp.title = '修改登录密码';
lan.cp.submit = '修改';

lan.cp.passwordi = '当前登录密码';
lan.cp.password = '新登录密码';
lan.cp.passwordc = '确认新密码';

lan.cp.tip = '请填写您的当前用户密码以及新密码。如果您通过第三方服务在网站注册，请联系相应的服务商修改密码。';
lan.cp.succ = '修改密码成功！';

lan.cp.err = new Array();
lan.cp.err[0] = '您没有填写当前登录密码或者密码错误！';
lan.cp.err[1] = '您没有填写新登录密码或者密码无效（系统规定密码长度为8-32位）！';
lan.cp.err[2] = '您两次填写的登录密码不一致！';



lan.chg = new Object();

lan.chg.stitle = '礼券充值';
lan.chg.title = '礼券充值';
lan.chg.submit = '充值';

lan.chg.pass = '礼券序列号';

lan.chg.tip = '请填写礼券序列号。请注意折扣券和购物卡无法通过此方法充值。';
lan.chg.succ = '礼券充值成功。请在用户中心检查您当前的余额！';

lan.chg.err = new Array();
lan.chg.err[0] = '您没有填写礼券序列号或者序列号无效！';
lan.chg.err[1] = '来自当前IP地址的序列号请求过多，请稍后再试！';



lan.cti = new Object();

lan.cti.stitle = '查看购物卡信息';
lan.cti.title = '查看购物卡信息';
lan.cti.submit = '查看';

lan.cti.code = '购物卡序列号';

lan.cti.tip = '请填写购物卡序列号。请注意礼券和折扣券的信息无法通过此方法查看。';
lan.cti.info = '购物卡号：%A%<br>购物卡余额：%C%<br>起始生效时间：%D%<br>截止生效时间：%E%<br>最后使用时间：%B%<br><br>本页面内的所有时间信息均为您当前客户端的时间。<br>请留意有关购物卡使用方法和限制的相关说明。';

lan.cti.err = new Array();
lan.cti.err[0] = '您没有填写购物卡序列号或者序列号无效！';
lan.cti.err[1] = '来自当前IP地址的序列号请求过多，请稍后再试！';



lan.cps = new Object();

lan.cps.stitle = '查看礼券信息';
lan.cps.title = '查看礼券信息';
lan.cps.submit = '查看';

lan.cps.state0 = '未使用';
lan.cps.state1 = '已使用';

lan.cps.pass = '礼券序列号';

lan.cps.tip = '请填写礼券序列号。请注意购物卡和折扣券的信息无法通过此方法查看。';
lan.cps.info = '礼券号：%A%<br>礼券名称：%B%<br>起始生效时间：%E%<br>截止生效时间：%F%<br>礼券状态：%D%<br><br>本页面内的所有时间信息均为您当前客户端的时间。<br>请留意有关礼券使用方法和限制的相关说明。';

lan.cps.err = new Array();
lan.cps.err[0] = '您没有填写礼券序列号或者序列号无效！';
lan.cps.err[1] = '来自当前IP地址的序列号请求过多，请稍后再试！';



lan.cco = new Object();

lan.cco.stitle = '查看折扣券信息';
lan.cco.title = '查看折扣券信息';
lan.cco.submit = '查看';

lan.cco.state0 = '未使用';
lan.cco.state1 = '已使用';

lan.cco.code = '折扣券序列号';

lan.cco.tip = '请填写折扣序列号。请注意购物卡和礼券的信息无法通过此方法查看。';
lan.cco.info = '折扣券号：%A%<br>折扣券名称：%B%<br>起始生效时间：%E%<br>截止生效时间：%F%<br>折扣券状态：%D%<br><br>本页面内的所有时间信息均为您当前客户端的时间。<br>请留意有关折扣券使用方法和限制的相关说明。';

lan.cco.err = new Array();
lan.cco.err[0] = '您没有填写折扣卡序列号或者序列号无效！';
lan.cco.err[1] = '来自当前IP地址的序列号请求过多，请稍后再试！';



lan.rec = new Object();

lan.rec.stitle = '我的操作记录';
lan.rec.title = '我的操作记录';

lan.rec.name = '事件名称<sup>1</sup>';
lan.rec.inf = '事件内容<sup>1</sup>';
lan.rec.time = '操作时间<sup>2</sup>';
lan.rec.ip = '操作地址';
lan.rec.unknown = '未知事件';
lan.rec.empty = '没有任何记录。';
lan.rec.background = '后台操作';

lan.rec.ftitle = '查看所有操作记录';
lan.rec.utitle = '我的操作记录';
lan.rec.uname = '事件名称<sup>5</sup>';
lan.rec.uinf = '事件内容<sup>5</sup>';
lan.rec.utime = '操作时间<sup>4</sup>';
lan.rec.uip = '操作地址';

lan.rec.info = new Array();
lan.rec.info[0] = '操作记录功能只保存您的基本操作信息。有关具体订单的信息请参考订单管理中的更新记录。';
lan.rec.info[1] = '本页面内的所有时间信息均为您当前客户端的时间。';



lan.addr = new Object();

lan.addr.stitle = '管理我的地址';
lan.addr.title = '地址管理';

lan.addr.address = '地址信息';
lan.addr.insert_time = '添加时间<sup>1</sup>';
lan.addr.update_time = '编辑时间<sup>1</sup>';
lan.addr.empty = '没有任何地址。';
lan.addr.add = '添加地址';
lan.addr.edit = '编辑地址';
lan.addr.del = '删除地址';
lan.addr.del_tip = "删除地址的操作无法被恢复，您确定要继续吗？";

lan.addr.ftitle = '管理我的地址';

lan.addr.info = new Array();
lan.addr.info[0] = '本页面内的所有时间信息均为您当前客户端的时间。';



lan.adda = new Array();

lan.adda.title = '添加地址';
lan.adda.submit = '添加';

lan.adda.name = '名';
lan.adda.surname = '姓';
lan.adda.organization = '公司或组织';
lan.adda.street = '街道';
lan.adda.num = '门牌号';
lan.adda.extension = '附加地址信息';
lan.adda.zip = '邮编';
lan.adda.city = '城市';
lan.adda.country = '国家';
lan.adda.telephone = '电话';

lan.adda.err = new Array();
lan.adda.err[0] = '无效信息';
lan.adda.err[1] = '无效信息';
lan.adda.err[2] = '无效信息';
lan.adda.err[3] = '无效信息';
lan.adda.err[4] = '无效信息';
lan.adda.err[5] = '无效信息';
lan.adda.err[6] = '无效信息';
lan.adda.err[7] = '无效信息';
lan.adda.err[8] = '无效信息';
lan.adda.err[9] = '无效信息';



lan.eda = new Array();

lan.eda.title = '编辑地址';
lan.eda.submit = '修改';

lan.eda.name = '名';
lan.eda.surname = '姓';
lan.eda.organization = '公司或组织';
lan.eda.street = '街道';
lan.eda.num = '门牌号';
lan.eda.extension = '附加地址信息';
lan.eda.zip = '邮编';
lan.eda.city = '城市';
lan.eda.country = '国家';
lan.eda.telephone = '电话';

lan.eda.err = new Array();
lan.eda.err[0] = '无效信息';
lan.eda.err[1] = '无效信息';
lan.eda.err[2] = '无效信息';
lan.eda.err[3] = '无效信息';
lan.eda.err[4] = '无效信息';
lan.eda.err[5] = '无效信息';
lan.eda.err[6] = '无效信息';
lan.eda.err[7] = '无效信息';
lan.eda.err[8] = '无效信息';
lan.eda.err[9] = '无效信息';



lan.sup = new Object();

lan.sup.stitle = '查看我的工单';
lan.sup.title = '工单管理';

lan.sup.id = '工单编号';
lan.sup.state = '状态<sup>1</sup>';
lan.sup.insert_time = '添加时间<sup>2</sup>';
lan.sup.update_time = '最后更新<sup>2</sup>';
lan.sup.empty = '没有任何工单。';
lan.sup.add = '添加工单';
lan.sup.message = '查看工单';
lan.sup.system = '客户服务';
lan.sup.close = '结束工单';
lan.sup.reply = '回复';
lan.sup.closed = '已关闭';

lan.addr.ftitle = '查看地址列表';

lan.sup.info = new Array();
lan.sup.info[0] = '已关闭的工单无法被重新开启，如果您认为您的问题未被解决，请添加一个新的工单。';
lan.sup.info[1] = '本页面内的所有时间信息均为您当前客户端的时间。';

lan.sup.err = new Array();
lan.sup.err[0] = '您没有填写信息或者您填写的信息过长！';



lan.ord = new Object();

lan.ord.stitle = '查看我的订单';
lan.ord.title = '订单管理';

lan.ord.id = '订单编号';
lan.ord.state = '订单状态<sup>1</sup>';
lan.ord.address = '客户地址';
lan.ord.insert_time = '添加时间<sup>2</sup>';
lan.ord.sum = '总金额';
//lan.ord.update_time = '编辑时间<sup>1</sup>';
lan.ord.empty = '没有任何订单。';
lan.ord.show = '订单详情';
lan.ord.download_invoice = '下载账单 (%A%)';
lan.ord.download_shipment = '下载发货单 (%A%)';
lan.ord.tracking_shipment = '查看物流信息 (%A%)';

lan.ord.state_0 = '等待付款';
lan.ord.state_1 = '等待补款';
lan.ord.state_2 = '等待退款';
lan.ord.state_3 = '等待发货';
lan.ord.state_4 = '已经发货';

lan.ord.ftitle = '查看我的订单';

lan.ord.info = new Array();
lan.ord.info[0] = '有关订单状态的的更多细节请查看订单详情。';
lan.ord.info[1] = '本页面内的所有时间信息均为您当前客户端的时间。';

lan.ship = new Object();

lan.ship.link = new Array();
lan.ship.link[1] = 'https://www.dhl.de/de/privatkunden/pakete-empfangen/verfolgen.html?piececode=%A%';



lan.cata = new Array();

lan.cata.name = '商品分类';



lan.art = new Array();

lan.art.artinfo = '已售 %A%件，商品好评率 %B%% (%C%人)';
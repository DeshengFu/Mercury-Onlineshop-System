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
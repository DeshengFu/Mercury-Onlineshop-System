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
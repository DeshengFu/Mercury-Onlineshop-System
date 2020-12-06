var benchmark = new Object();
benchmark.sale = new Object();

var dra = new Object();

dra.save = function(draft)
{
	buf.draft = draft;
}

var prof = new Object();

prof.save = function(profile)
{
	buf.profile = profile;
}

var lvl = new Object();

lvl.save = function(level)
{
	buf.level = level;
}

var svs = new Object();

svs.save = function(service)
{
	buf.service = service;
}

var fla = new Object();

fla.save = function(flag)
{
	buf.flag = flag;
}

var coup = new Object();

coup.save = function(coupon)
{
	buf.coupon = coupon;
}
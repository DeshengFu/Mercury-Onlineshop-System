<?php
$couponArr = array();
$rs = query('Select `ID`, `Title`, `SubTitle`, `State`, `Service`, `Discount`, `MinPrice`, `MaxPrice` from `' . $sitePosition . '.Coupon` order by `ID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$couponArr[] = '{id:' . $rsInfo[0] . ', title:"' . strtr($rsInfo[1], $arrEncodeJS) . '", subtitle:"' . strtr($rsInfo[2], $arrEncodeJS) . '", state:' . $rsInfo[3] . ', service:' . $rsInfo[4] . ', discount:' . $rsInfo[5] . ', minprice:' . $rsInfo[6] . ', maxprice:' . $rsInfo[7] . '}';
}
freeResult($rs);
echo 'coup.save([' . implode(', ', $couponArr) . ']);';
?>
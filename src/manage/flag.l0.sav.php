<?php
$flagArr = array();
$rs = query('Select `Index`, `Name` from `' . $sitePosition . '.Flag` order by `Index`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$flagArr[] = '{index:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '"}';
}
freeResult($rs);
echo 'fla.save([' . implode(', ', $flagArr) . ']);';
?>
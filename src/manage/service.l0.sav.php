<?php
$serviceArr = array();
$rs = query('Select `Index`, `Name` from `' . $sitePosition . '.Service` order by `Index`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$serviceArr[] = '{index:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '"}';
}
freeResult($rs);
echo 'svs.save([' . implode(', ', $serviceArr) . ']);';
?>
<?php
$layer = array(0 => 0);
$catalogArr = array();
$rs = query('Select `ID`, `CatalogID`, `ShowID`, `Name`, `Type` from `' . $sitePosition . '.Catalog` order by `ShowID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$layer[$rsInfo[0]] = $layer[$rsInfo[1]] + 1;
	$catalogArr[] = '{id:' . $rsInfo[0] . ', catalog:' . $rsInfo[1] . ', showid:' . $rsInfo[2] . ', layer:' . $layer[$rsInfo[0]] . ', name:"' . strtr($rsInfo[3], $arrEncodeJS) . '", type:' . $rsInfo[4] . '}';
}
freeResult($rs);
echo 'cata.save([' . implode(', ', $catalogArr) . ']);';
?>
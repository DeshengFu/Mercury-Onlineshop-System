<?php
$profileArr = array();
$rs = query('Select `ID`, `Name`, `Type` from `' . $sitePosition . '.Profile` order by `ID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$profileArr[] = '{id:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '", type:' . $rsInfo[2] . '}';
}
freeResult($rs);
echo 'prof.save([' . implode(', ', $profileArr) . ']);';
?>
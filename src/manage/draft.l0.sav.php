<?php
$draftArr = array();
$rs = query('Select `ID`, `Name`, `Type` from `' . $sitePosition . '.Draft` order by `ID`', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$draftArr[] = '{id:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '", type:' . $rsInfo[2] . '}';
}
freeResult($rs);
echo 'dra.save([' . implode(', ', $draftArr) . ']);';
?>
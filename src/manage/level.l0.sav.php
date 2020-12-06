<?php
$levelArr = array();
$rs = query('Select `Level`, `Name` from `' . $sitePosition . '.Level` order by `Level` desc', false);
while(true)
{
	$rsInfo = fetchRow($rs);
	if($rsInfo === null) break;
	$levelArr[] = '{level:' . $rsInfo[0] . ', name:"' . strtr($rsInfo[1], $arrEncodeJS) . '"}';
}
freeResult($rs);
echo 'lvl.save([' . implode(', ', $levelArr) . ']);';
?>
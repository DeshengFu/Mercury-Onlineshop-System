<?php
class Band
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Band` write'];
	}

	public static function update_check($sourceID, $targetID, $flow)
	{
		global $sitePosition;

		//Check the band
		$rs = query('Select `State`, `Flow` from `' . $sitePosition . '.Band` where `SourceID` = ' . $sourceID . ' and `TargetID` = ' . $targetID, false);
		$rsInfo = fetchRow($rs);
		freeResult($rs);
		if($rsInfo === null || $rsInfo[0] == 0 || abs($rsInfo[1] + $flow) > PHP_INT_MAX) return false;

		//Return
		return true;
	}

	public static function update_process($sourceID, $targetID, $flow)
	{
		global $sitePosition;

		//Update the band
		query('Update `' . $sitePosition . '.Band` set `Flow` = `Flow` + ' . $flow . ' where `SourceID` = ' . $sourceID . ' and `TargetID` = ' . $targetID, false);
	}
}
?>
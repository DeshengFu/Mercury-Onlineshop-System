<?php
class Article
{
	public static function write_lock()
	{
		global $sitePosition;

		return ['`' . $sitePosition . '.Article` write'];
	}

	public static function sell_process($ID, $num)
	{
		global $sitePosition;

		//Update the article
		query('Update `' . $sitePosition . '.Article` set `Sold` = least(`Sold` + ' . $num . ', 2147483647) where `ID` = ' . $ID, false);
	}
}
?>
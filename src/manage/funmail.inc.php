<?php
//Function: prepare a functional mail
function prepareFunMail($receiverName, $receiverEmail, $attachments, $draftID, $stArr, $type)
{
	global $sitePosition, $siteHost, $siteName, $siteEmail;
	global $arrEncodeStr;

	//Get the draft
	$rs = query('Select * from `' . $sitePosition . '.Draft` where `ID` = ' . $draftID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[2] != $type) return null;
	$title = $rsInfo[3];
	$body = $rsInfo[4];
	
	//Prepare the mail
	$stArr = array_merge($stArr, array(
		'%SITEHOST%' => $siteHost,
		'%SITENAME%' => $siteName,
		'%SITEEMAIL%' => $siteEmail,
		'%RECEIVERNAME%' => $receiverName,
		'%RECEIVEREMAIL%' => $receiverEmail
	));
	$title = strtr($title, $stArr);
	$body = strtr($body, $stArr);

	//Return the mail
	return prepareMail($siteName, $siteEmail, $receiverName, $receiverEmail, $title, $body, $attachments);
}
?>
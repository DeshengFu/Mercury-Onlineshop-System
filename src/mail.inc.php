<?php
require($gsetting['phpmailerPath'] . 'class.phpmailer.php');
require($gsetting['phpmailerPath'] . 'class.smtp.php');



//Function: prepare mail
function prepareMail($senderName, $senderEmail, $receiverName, $receiverEmail, $title, $body, $attachments)
{
	global $charSetPHP;

	$mail = new PHPMailer();
	$mail->CharSet = $charSetPHP;
	$mail->From = $senderEmail;
	$mail->FromName = html_entity_decode($senderName);
	$mail->Subject = html_entity_decode($title);
	$mail->Body = $body;
	$mail->IsHTML(true);
	$mail->AddAddress($receiverEmail, html_entity_decode($receiverName));
	for($i = 0; $i < count($attachments); $i++) $mail->addStringAttachment($attachments[$i][0], $attachments[$i][1]);
	return $mail;
}

//Function: send mail
function sendMail($mail)
{
	return $mail->Send();
}
?>
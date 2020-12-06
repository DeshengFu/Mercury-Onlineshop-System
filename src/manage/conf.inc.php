<?php
//Set environment
set_time_limit(15);



//Define languages and versions
$version = '1.0.b8';
$templateVersion = '1.0';
$charSetHTML = 'utf-8';
$charSetSQL = 'utf8';
$collateSQL = 'utf8_general_ci';
$charSetPHP = 'utf-8';
$language = 'chs';



//Define the list of features

$flevel = 8;
$feature = array();

$feature['buffer'] = array(			'table' => '',				'weight' => 0,		'level' => array(array('', '+', 4, 5, 6, 7)));

$feature['user'] = array(			'table' => 'User',			'weight' => 10,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['userbuffer'] = array(		'table' => '',				'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['order'] = array(			'table' => 'Order',			'weight' => 1,		'level' => array(array('', '', 4, 5), array('', '', 6, 7)));

$feature['catalog'] = array(		'table' => 'Catalog',		'weight' => 10,		'level' => array(array('', '+', 4, 5, 6, 7)));
$feature['article'] = array(		'table' => 'Article',		'weight' => 10,		'level' => array(array('', '', 4), array('', '', 5, 6, 7)));
$feature['articlebuffer'] = array(	'table' => '',				'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));

$feature['shoprecord'] = array(		'table' => 'ShopRecord',	'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['shop'] = array(			'table' => 'Shop',			'weight' => 100,	'level' => array(array('', '', 4, 5, 6, 7)));
$feature['shopbuffer'] = array(		'table' => '',				'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['shopinfo'] = array(		'table' => '',				'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['master'] = array(			'table' => 'Master',		'weight' => 1,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['band'] = array(			'table' => 'Band',			'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['offer'] = array(			'table' => 'Offer',			'weight' => 1,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['shipment'] = array(		'table' => 'Shipment',		'weight' => 0,		'level' => array(array('', '', 4, 5), array('', '', 6, 7)));
$feature['transaction'] = array(	'table' => 'Transaction',	'weight' => 1,		'level' => array(array('', '', 4), array('', '', 5, 6, 7)));
$feature['support'] = array(		'table' => 'Support',		'weight' => 1,		'level' => array(array('', '', 4, 5, 6, 7)));
$feature['message'] = array(		'table' => 'Message',		'weight' => 0,		'level' => array(array('', '', 4, 5, 6, 7)));

$feature['inventory'] = array(		'table' => 'Inventory',		'weight' => 1,		'level' => array(array('', '', 5, 6, 7)));

$feature['tracking'] = array(		'table' => 'Tracking',		'weight' => 0,		'level' => array(array('+', '', 6, 7)));



//Define database information
$dbInfo = array();
$dbInfo['server'] = 'localhost';
$dbInfo['port'] = 3306;
$dbInfo['username'] = 'm01';
$dbInfo['password'] = 'zRfS4TsNTcWdHMPv';
$dbInfo['database'] = 'm01';
$dbInfo['key'] = '';
$dbInfo['cert'] = '';
$dbInfo['ca'] = '';



//Define global settings
$gsetting = array();
$gsetting['phpmailerPath'] = '../../phpmailer/';
$gsetting['tcpdfPath'] = '../../tcpdf/';
$gsetting['pslibPath'] = '../../phpseclib/';

$gsetting['bufferValid'] = 864000;

$gsetting['accessLimit'] = 10;
$gsetting['accessTime'] = 600;
$gsetting['accessValid'] = 1800;

$gsetting['ftypeList'] = array('zip', 'jpg', 'bmp', 'gif', 'png', 'mp3', 'wav', 'mid', 'txt', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'ico');
$gsetting['itypeList'] = array('jpg', 'bmp', 'gif', 'png');
$gsetting['maxSize'] = 10485760;
?>
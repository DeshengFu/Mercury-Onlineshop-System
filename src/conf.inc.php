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

$feature['userrecord'] = array(		'table' => 'UserRecord',	'weight' => 0,		'level' => array(array('+', '', 2, 3, 4, 5, 6, 7)));
$feature['user'] = array(			'table' => 'User',			'weight' => 10,		'level' => array(array('+', '', 2, 3), array('', '', 4, 5), array('+', '', 6, 7)));
$feature['address'] = array(		'table' => 'Address',		'weight' => 0,		'level' => array(array('+', '', 2, 3, 4, 5), array('', '', 6, 7)));
$feature['order'] = array(			'table' => 'Order',			'weight' => 1,		'level' => array(array('+', '', 2, 3), array('', '', 4, 5), array('', '', 6, 7)));
$feature['element'] = array(		'table' => 'Element',		'weight' => 0,		'level' => array(array('+', '', 2), array('', '', 3)));
$feature['payment'] = array(		'table' => 'Payment',		'weight' => 0,		'level' => array(array('+', '', 2, 3, 4, 5, 6, 7)));

$feature['subscription'] = array(	'table' => 'Subscription',	'weight' => 1,		'level' => array(array('+', '', 4, 5, 6, 7)));
$feature['shipment'] = array(		'table' => 'Shipment',		'weight' => 0,		'level' => array(array('+', '', 4, 5), array('', '', 6, 7)));
$feature['transaction'] = array(	'table' => 'Transaction',	'weight' => 1,		'level' => array(array('+', '', 4), array('', '', 5, 6, 7)));
$feature['inventory'] = array(		'table' => 'Inventory',		'weight' => 1,		'level' => array(array('+', '', 4, 5, 6, 7)));



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
$gsetting['phpmailerPath'] = '../phpmailer/';
$gsetting['tcpdfPath'] = '../tcpdf/';
$gsetting['pslibPath'] = '../phpseclib/';
$gsetting['filePath'] = './source/';
$gsetting['pagePath'] = './page/';

$gsetting['iaccessLimit'] = 10;
$gsetting['iaccessTime'] = 600;
$gsetting['uaccessLimit'] = 10;
$gsetting['uaccessTime'] = 600;
$gsetting['registerLimit'] = 3;
$gsetting['registerTime'] = 600;
$gsetting['iresetLimit'] = 10;
$gsetting['iresetTime'] = 600;
$gsetting['uresetLimit'] = 10;
$gsetting['uresetTime'] = 600;
$gsetting['ireactLimit'] = 10;
$gsetting['ireactTime'] = 600;
$gsetting['ureactLimit'] = 10;
$gsetting['ureactTime'] = 600;
$gsetting['codeLimit'] = 10;
$gsetting['codeTime'] = 600;
$gsetting['accessValid'] = 1800;
$gsetting['evalidTime'] = 30;
$gsetting['bufferValid'] = 864000;

$gsetting['guardTime'] = 60;
?>
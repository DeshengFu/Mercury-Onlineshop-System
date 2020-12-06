<?php
require('conf.inc.php');
require('ginclude.inc.php');
require('finclude.inc.php');



//Get the page
$page = basename(strtolower(strtok(strval($_SERVER['REQUEST_URI']), '?')), '.html');
if(strlen($page) > 31)
{
	header('HTTP/1.0 404 Not Found');
	exit;
}
if($page == '') $page = 'index';



//Create the path
if(!file_exists($gsetting['pagePath'] . $siteServer)) mkdir($gsetting['pagePath'] . $siteServer);



//Buffer pages
if($page == 'user')
{
	$content = file_get_contents('https://' . $siteServer . '/user.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/user.html', $content, LOCK_EX);
}
else if($page == 'record')
{
	$content = file_get_contents('https://' . $siteServer . '/record.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/record.html', $content, LOCK_EX);
}
else if($page == 'address')
{
	$content = file_get_contents('https://' . $siteServer . '/address.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/address.html', $content, LOCK_EX);
}
else if($page == 'order')
{
	$content = file_get_contents('https://' . $siteServer . '/order.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/order.html', $content, LOCK_EX);
}
else if($page == 'support')
{
	$content = file_get_contents('https://' . $siteServer . '/support.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/support.html', $content, LOCK_EX);
}
else if(preg_match('/\Aart(?P<id>\d+)\z/', $page, $result) === 1)
{
	$content = file_get_contents('https://' . $siteServer . '/article.php?' . $result['id']);
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/art' . $result['id'] . '.html', $content, LOCK_EX);
}
else if(preg_match('/\Aainfo(?P<id>\d+)\z/', $page, $result) === 1)
{
	$content = file_get_contents('https://' . $siteServer . '/articleinfo.php?' . $result['id']);
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/ainfo' . $result['id'] . '.html', $content, LOCK_EX);
}
else
{
	$content = file_get_contents('https://' . $siteServer . '/' . $page . '.php');
	if($content == '')
	{
		header('HTTP/1.0 404 Not Found');
		exit;
	}
	file_put_contents($gsetting['pagePath'] . $siteServer . '/' . $page . '.html', $content, LOCK_EX);
}



//Redirect
header('Location: ' . $page . '.html' . '?' . $_SERVER['QUERY_STRING']);
die;
?>
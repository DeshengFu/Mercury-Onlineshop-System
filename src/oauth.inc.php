<?php
//Define the list of oauth systems
$oauth = array();
$oauth['google_login'] = array('id' => 11,	'secret' => 12,	'agent' => 13,	'authurl' => 'https://github.com/login/oauth/authorize',	'tokenurl' => 'https://github.com/login/oauth/access_token',	'apiurl' => 'https://api.github.com/user',	'scope' => 'user', 'type' => 1);

//Define the functions
$oauth['google_login']['tokenfun'] = function($response)
{
	parse_str($response, $result);
	return isset($result['access_token']) ? $result['access_token'] : '';
};

$oauth['google_login']['apifun'] = function($response)
{
	$result = json_decode($response);
	return array('id' => $result->id, 'email' => '');
};
?>
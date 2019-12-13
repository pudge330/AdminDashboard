<?php
include __DIR__ . '/skeleton.class.php';
use SkeletonWidget\SkeletonWidget;

if ($data['mainMenu'] && sizeof($data['mainMenu'])) {
	$data['mainMenu']['name'] = 'mainMenu';
	echo SkeletonWidget::render(__DIR__ . '/navigation.html.php', $data['mainMenu']);
}

if (isset($data['content']['mainMenu'])) {
	echo $data['content']['mainMenu'];
}
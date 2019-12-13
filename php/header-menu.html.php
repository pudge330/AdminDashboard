<?php
include __DIR__ . '/skeleton.class.php';
use SkeletonWidget\SkeletonWidget;

if ($data['headerMenu'] && sizeof($data['headerMenu'])) {
	$data['headerMenu']['name'] = 'memberMenu';
	echo SkeletonWidget::render(__DIR__ . '/navigation.html.php', $data['headerMenu']);
}

if (isset($data['content']['headerMenu'])) {
	echo $data['content']['headerMenu'];
}
<?php
include __DIR__ . '/skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

if ($data['headerMenu'] && sizeof($data['headerMenu'])) {
	$data['headerMenu']['name'] = 'memberMenu';
	echo AdminPanelSkeleton::renderPartial(__DIR__ . '/navigation.html.php', $data['headerMenu']);
}

if (isset($data['content']['headerMenu'])) {
	echo $data['content']['headerMenu'];
}
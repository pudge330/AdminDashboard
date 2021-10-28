<?php
include __DIR__ . '/../skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

if ($data['mainMenu'] && sizeof($data['mainMenu'])) {
	$data['mainMenu']['name'] = 'mainMenu';
	echo AdminPanelSkeleton::renderTemplate('navigation', $data['mainMenu']);
}

if (isset($data['content']['mainMenu'])) {
	echo $data['content']['mainMenu'];
}
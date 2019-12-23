<?php

use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

if ($data['mainMenu'] && sizeof($data['mainMenu'])) {
	$data['mainMenu']['name'] = 'mainMenu';
	echo AdminPanelSkeleton::renderPartial(__DIR__ . '/navigation.html.php', $data['mainMenu']);
}

if (isset($data['content']['mainMenu'])) {
	echo $data['content']['mainMenu'];
}
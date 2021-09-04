<?php
include __DIR__ . '/skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

if ($data['headerMenu'] && sizeof($data['headerMenu'])) {
	$data['headerMenu']['name'] = 'memberMenu';
	foreach ($data['headerMenu']['links'] as $key => $link) {
		if (isset($link['links']) && is_array($link['links'])) {
			foreach ($link['links'] as $key2 => $link2) {
				$link['links'][$key2]['isOpened'] = false;
			}
			$data['headerMenu']['links'][$key] = $link;
		}
	}
	echo AdminPanelSkeleton::renderPartial(__DIR__ . '/navigation.html.php', $data['headerMenu']);
}

if (isset($data['content']['headerMenu'])) {
	echo $data['content']['headerMenu'];
}
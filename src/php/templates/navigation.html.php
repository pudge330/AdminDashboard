<?php
include __DIR__ . '/../skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

$data = array_merge(AdminPanelSkeleton::defaults(Array(
	'name' => null,
	'links' => Array(),
	'isChild' => false,
	'toggleIcon' => AdminPanelSkeleton::icon('arrow_down')
)), $data);

$linkCount = sizeof($data['links']);
$count = 0;

if (!$linkCount) {
	return;
}

$data['class'] .= " page-skeleton-menu" . ($data['name'] ? " page-skeleton-menu-{$data['name']}" : '');

if ($data['id']) {
	$data['attr']['id'] = $data['id'];
}
if ($data['class']) {
	$data['attr']['class'] = trim($data['class']);
}
if ($data['style']) {
	$data['attr']['style'] = trim($data['style']);
}

$data['attr']['role'] = 'navigation';

$attr = AdminPanelSkeleton::attr($data['attr']) . AdminPanelSkeleton::attr($data['dataAttr'], 'data-');
?>
<nav<?=$attr?>>
	<ul class="navLinks">
		<?php
			foreach ($data['links'] as $link) {
				$count++;
				$link['isChild'] = $data['isChild'];
				$link['parentName'] = $data['name'];
				$link['i'] = $count;
				echo AdminPanelSkeleton::renderTemplate('navigation-item', $link);
			}
		?>
	</ul>
</nav>
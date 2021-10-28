<?php
include __DIR__ . '/../skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

$toggleIcon = AdminPanelSkeleton::icon('arrow_down');
$data = array_merge(AdminPanelSkeleton::defaults(array_merge(Array(
	'i' => null,
	'isChild' => false,
	'parentName' => null,
	'text' => null,
	'url' => null,
	'urlNewWindow' => false,
	'icon' => null,
	'image' => null,
	'active' => null,
	'specialContent' => null,
	'toggle' => null,
	'jsAction' => true,
	'links' => Array(),
	'isOpened' => true
), $data)), Array());

$data['class'] = trim("navLink nl-{$data['i']} {$data['class']}");

if ($data['specialContent'] && $data['specialContent'] !== null) {
	if (file_exists($data['specialContent'])) {
		$data['specialContent'] = AdminPanelSkeleton::renderPartial($data['specialContent'], $data);
	}
}

if ($data['links'] && !$data['isChild']) {
	$childLinksData = Array('links' => $data['links'], 'isChild' => true);
	foreach ($data['links'] as $key => $dataItem) {
		$childLinksData['links'][$key]['isOpened'] = $data['active'] ? true : false;
	}
	if ($data['parentName']) {
		$childLinksData['name'] = "{$data['parentName']}-sub-menu";
	}
	$data['toggle'] = true;
	$data['specialContent'] = AdminPanelSkeleton::renderTemplate('navigation', $childLinksData) . $data['specialContent'];
}

if ($data['active']) {
	$data['class'] .= ' active-link';
	$data['active'] = ' active-link';
}

if ($data['specialContent'] && trim($data['specialContent']) !== '') {
	$data['dataAttr']['sub-state'] = $data['active'] ? 'opened' : 'closed';
	$data['class'] .= ' navLinkSpecialAction';
}


if ($data['id']) {
	$data['attr']['id'] = $data['id'];
}
if ($data['class']) {
	$data['attr']['class'] = trim($data['class']);
}
if ($data['style']) {
	$data['attr']['style'] = trim($data['style']);
}

$target = $data['urlNewWindow'] == 1 ? ' target="_blank"' : '';
$attr = AdminPanelSkeleton::attr($data['attr']) . AdminPanelSkeleton::attr($data['dataAttr'], 'data-');

$tabIndex = $data['isOpened'] ? 0 : -1;

?>
<li<?=$attr?>>
	<?php if ($data['url']) { ?>
		<a class="navLinkAction<?=$data['active']?>" href="<?=$data['url']?>"<?=$target?> tabindex="<?=$tabIndex?>">
	<?php } else if ($data['specialContent']) { ?>
		<button class="navLinkAction<?=$data['active']?>" tabindex="<?=$tabIndex?>">
	<?php } else { ?>
		<span class="navLinkActionAlt">
	<?php } ?>
			<div class="navLinkActionContent">
				<?php if (!$data['isChild'] && $data['icon']) { ?>
					<span class="navLinkIcon"><?=$data['icon']?></span>
				<?php } else if (!$data['isChild'] && $data['image']) { ?>
					<?php
						if (substr($data['image'], strlen($data['image']) - 3) == 'svg' && file_exists($data['image'])) {
							$data['image'] = file_get_contents($data['image']);
					?>
						<span class="navLinkIcon"><?=$data['image']?></span>
					<?php } else { ?>
						<span class="navLinkIcon"><img src="<?=$data['image']?>" alt="Image Icon"></span>
					<?php } ?>
				<?php } ?>
				<span class="navLinkText">
					<?=$data['text']?>
				</span>
			</div>
			<?php if ($data['specialContent']) { ?>
				<?php if ($data['toggle']) { ?>
					<span class="navLinkSpecialToggle"<?php if ($data['url']) { ?> tabindex="<?=$tabIndex?>"<?php } ?>><?=$toggleIcon?></span>
				<?php } ?>
			<?php } ?>
	<?php if ($data['url']) { ?>
		</a>
	<?php } else if ($data['specialContent']) { ?>
		</button>
	<?php } else { ?>
		</span>
	<?php } ?>
	<?php if ($data['specialContent'] && trim($data['specialContent']) !== '') { ?>
		<div class="navLinkSpecialContent<?=($data['specialContent'] && !$data['active']) ? ' initiallyClosed' : ''?>"><?=$data['specialContent']?></div>
	<?php } ?>
</li>
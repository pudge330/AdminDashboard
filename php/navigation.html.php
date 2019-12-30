<?php
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

$data = array_merge(AdminPanelSkeleton::defaults(Array(
	'name' => null,
	'links' => Array(),
	'isChild' => false,
	'toggleIcon' => '<svg class="ion_ios-arrow-down" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><polygon class="layer_1" points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "></polygon></svg>'
)), $data);

$skeletonWidget_processLink = function($link) use ($data) {
	$link = array_merge(AdminPanelSkeleton::defaults(array_merge(Array(
		'i' => null,
		'text' => null,
		'url' => null,
		'urlNewWindow' => false,
		'icon' => null,
		'image' => null,
		'format' => 'text-image',
		'display' => 'vertical',
		'active' => null,
		'specialContent' => null,
		'toggle' => null,
		'jsAction' => true,
		'links' => Array()
	), $link)), Array(

	));
	$link['class'] .= $link['class'] ? ' ' : '';
	$link['class'] .= "navLink nl-{$link['i']}";

	if ($link['specialContent'] && $link['specialContent'] !== null) {
		if (file_exists($link['specialContent'])) {
			$link['specialContent'] = AdminPanelSkeleton::renderPartial($link['specialContent'], $link);
		}
	}

	if ($link['links'] && !$data['isChild']) {
		$childLinksData = Array('links' => $link['links'], 'isChild' => true);
		if ($data['name']) {
			$childLinksData['name'] = "{$data['name']}-sub-menu";
		}
		$link['toggle'] = true;
		$link['specialContent'] = AdminPanelSkeleton::renderPartial(__DIR__ . '/navigation.html.php', $childLinksData) . $link['specialContent'];
	}

	if ($link['active']) {
		$link['class'] .= ' active-link';
		$link['active'] = ' active-link';
	}

	if ($link['specialContent'] && trim($link['specialContent']) !== '') {
		$link['dataAttr']['sub-state'] = $link['active'] ? 'opened' : 'closed';
		$link['class'] .= ' navLinkSubAction';
	}


	if ($link['id']) {
		$link['attr']['id'] = $link['id'];
	}
	if ($link['class']) {
		$link['attr']['class'] = trim($link['class']);
	}
	if ($link['style']) {
		$link['attr']['style'] = trim($link['style']);
	}

	$link['dataAttr']['format'] = $link['format'];
	$link['dataAttr']['display'] = $link['display'];

	return $link;
};

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
				$link['i'] = $count;
				$link = $skeletonWidget_processLink($link);
				$target = $link['urlNewWindow'] == 1 ? ' data-target="_blank"' : '';
				$linkAttr = AdminPanelSkeleton::attr($link['attr']) . AdminPanelSkeleton::attr($link['dataAttr'], 'data-');
		?>
			<li<?=$linkAttr?>>
				<?php if ($link['url']) { ?>
					<div class="navLinkAction<?=$link['active']?>" data-href="<?=$link['url']?>"<?=$target?> tabindex="0">
				<?php } else if ($link['specialContent']) { ?>
					<div class="navLinkAction<?=$link['active']?>" tabindex="0">
				<?php } else { ?>
					<span class="navLinkActionAlt">
				<?php } ?>
					<?php if (!$data['isChild'] && $link['icon'] && ($link['format'] == 'text-image' || $link['format'] == 'image'/* || $data['alwaysOutputImage']*/)) { ?>
						<span class="navLinkIcon"><?=$link['icon']?></span>
					<?php } else if (!$data['isChild'] && $link['image'] && ($link['format'] == 'text-image' || $link['format'] == 'image'/* || $data['alwaysOutputImage']*/)) { ?>
						<?php
							if (substr($link['image'], strlen($link['image']) - 3) == 'svg' && file_exists($link['image'])) {
								$link['image'] = file_get_contents($link['image']);
						?>
							<span class="navLinkIcon"><?=$link['image']?></span>
						<?php } else { ?>
							<span class="navLinkIcon"><img src="<?=$link['image']?>" alt="Image Icon"></span>
						<?php } ?>
					<?php } ?>
					<span class="navLinkText">
						<?=$link['text']?>
						<?php if ($link['toggle']) { ?>
							<span class="subMenuToggle" tabindex="0"><?=$data['toggleIcon']?></span>
						<?php } ?>
					</span>
				<?php if ($link['url'] || $link['specialContent']) { ?>
					</div>
				<?php } else { ?>
					</span>
				<?php } ?>
				<?php if ($link['specialContent'] && trim($link['specialContent']) !== '') { ?>
					<span class="navLinkSpecial<?=($link['specialContent'] && !$link['active']) ? ' initiallyClosed' : ''?>"><?=$link['specialContent']?></span>
				<?php } ?>
			</li>
		<?php
			}
		?>
	</ul>
</nav>
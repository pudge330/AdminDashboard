<?php
include __DIR__ . '/skeleton.class.php';
use SkeletonWidget\SkeletonWidget;

$data = array_merge(SkeletonWidget::defaults(Array(
	'title' => null
	,'version' => null
	,'mainMenu' => Array()
	,'headerMenu' => Array()
	,'memberLabel' => null
	,'memberImage' => null
	,'lockIcon' => false
	,'hideEmptyHeader' => true
	,'mainMenuState' => true
	,'appMenuState' => false
	,'headerMenuState' => false
	,'sideMenuState' => false
	,'mainMenuIcon' => null
	,'mainMenuLockIcon' => null
	,'appMenuIcon' => null
	,'headerMenuIcon' => null
	,'sideMenuIcon' => null
	,'content' => Array()
)), $data);
$data['content'] = array_merge(Array(
	'page' => null
	,'header' => null
	,'headerMenu' => null
	,'mainMenu' => null
	,'sideMenu' => null
	,'appMenu' => null
	,'topToolbar' => null
	,'bottomToolbar' => null
), $data['content']);
foreach ($data['content'] as $key => $value) {
	if ($value instanceof Closure) {
		ob_start();
		$returnValue = $value($data);
		$value = ob_get_contents();
		ob_end_clean();
		$data['content'][$key] = $value;
	}
}

$data['content']['headerMenu'] = SkeletonWidget::render(__DIR__ . '/header-menu.html.php', $data);
$data['content']['mainMenu'] = SkeletonWidget::render(__DIR__ . '/page-menu.html.php', $data);
$data['content']['header'] = SkeletonWidget::render(__DIR__ . '/header.html.php', $data);

$data['class'] .= ' page-skeleton';

$hasPageMenu = (trim($data['content']['mainMenu']) !== '');
$hasSideMenu = (trim($data['content']['sideMenu']) !== '');
$hasAppMenu = (trim($data['content']['appMenu']) !== '');
$hasHeaderMenu = (trim($data['content']['headerMenu']) !== '');

$data['dataAttr']['menu-state'] = $data['mainMenuState'] ? 'opened' : 'closed';
$data['dataAttr']['app-menu-state'] = $data['appMenuState'] ? 'opened' : 'closed';
$data['dataAttr']['member-menu-state'] = $data['headerMenuState'] ? 'opened' : 'closed';
$data['dataAttr']['side-menu-state'] = $data['sideMenuState'] ? 'opened' : 'closed';

if (!$hasPageMenu) {
	$data['dataAttr']['nomenu'] = null;
}
if (!$hasSideMenu) {
	$data['dataAttr']['nosidemenu'] = null;
}
if (!$hasAppMenu) {
	$data['dataAttr']['noappmenu'] = null;
}
if (!$hasHeaderMenu) {
	$data['dataAttr']['noheadermenu'] = null;
}
if (!$data['memberLabel']) {
	$data['dataAttr']['nomemberlabel'] = null;
}
if (!$data['memberImage']) {
	$data['dataAttr']['nomemberimage'] = null;
}

$showHeader = (
	($hasPageMenu || $hasAppMenu || $hasHeaderMenu || $hasSideMenu ||
	$data['title'] || $data['memberImage'] || $data['memberLabel']) ||
	!$data['hideEmptyHeader']
);

if (!$showHeader) {
	$data['dataAttr']['noheader'] = null;
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

$attr = SkeletonWidget::attr($data['attr']) . SkeletonWidget::attr($data['dataAttr'], 'data-');
?>
<div<?=$attr?>>
	<?php if ($showHeader) { ?>
	<div class="page-header">
		<?=$data['content']['header']?>
	</div>
	<?php } ?>
	<?php if (trim($data['content']['appMenu']) !== '') { ?>
		<div class="page-app-menu">
			<div class="inner-wrap" tabindex="-1">
				<?=$data['content']['appMenu']?>
			</div>
		</div>
	<?php } ?>
	<?php if (trim($data['content']['headerMenu']) !== '') { ?>
		<div class="page-header-menu">
			<div class="inner-wrap" tabindex="-1">
				<?=$data['content']['headerMenu']?>
			</div>
		</div>
	<?php } ?>
	<div class="page-main-wrap"<?=($hasPageMenu ? '' : " data-nomenu")?>>
		<?php if ($hasPageMenu) { ?>
			<div class="page-menu">
				<div class="inner-wrap">
					<?=$data['content']['mainMenu']?>
				</div>
				<?php if ($data['version']) { ?>
					<div class="library-version">
						<?=$data['version']?>
					</div>
				<?php } ?>
			</div>
		<?php } ?>
		<?php if ($hasSideMenu) { ?>
			<div class="page-side-menu">
				<div class="inner-wrap" tabindex="-1">
					<?=$data['content']['sideMenu']?>
				</div>
			</div>
		<?php } ?>
		<div class="page-content-wrap" id="page-content-wrap">
			<?php if (trim($data['content']['topToolbar']) !== '') { ?>
				<div class="page-toolbar-wrap">
					<div class="inner-wrap">
						<?=$data['content']['topToolbar']?>
					</div>
				</div>
			<?php } ?>
			<main class="main-content" id="main-content">
				<?=$data['content']['page']?>
			</main>
			<?php if (trim($data['content']['bottomToolbar']) !== '') { ?>
				<div class="page-toolbar-wrap">
					<div class="inner-wrap">
						<?=$data['content']['bottomToolbar']?>
					</div>
				</div>
			<?php } ?>
		</div>
		<?php if ($hasPageMenu) { ?>
			<div class="menu-toggle main-menu-toggle" data-state="showing">
				<svg class="ion_android-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><polygon class="layer_1" points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798 
  375.202,405 405,375.202 285.798,256 "></polygon></g></g></svg>
			</div>
		<?php } ?>
		<?php if ($hasSideMenu) { ?>
			<div class="menu-toggle side-menu-toggle" data-state="showing">
				<svg class="ion_android-close" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g><g><polygon class="layer_1" points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798 
  375.202,405 405,375.202 285.798,256 "></polygon></g></g></svg>
			</div>
		<?php } ?>
	</div>
</div>
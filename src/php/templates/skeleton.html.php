<?php
include __DIR__ . '/../skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

$data = array_merge(AdminPanelSkeleton::defaults(Array(
	'title' => null
	,'titleUrl' => null
	,'titleUrlAttributes' => Array('target' => '_blank')
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
	,'contentOnly' => false
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

$data['content']['headerMenu'] = AdminPanelSkeleton::renderTemplate('header-menu', $data);
$data['content']['mainMenu'] = AdminPanelSkeleton::renderTemplate('page-menu', $data);
$data['content']['header'] = AdminPanelSkeleton::renderTemplate('header', $data);

$data['class'] .= ' page-skeleton';

$hasPageMenu = (trim($data['content']['mainMenu']) !== '' && !$data['contentOnly']);
$hasSideMenu = (trim($data['content']['sideMenu']) !== '' && !$data['contentOnly']);
$hasAppMenu = (trim($data['content']['appMenu']) !== '' && !$data['contentOnly']);
$hasHeaderMenu = (trim($data['content']['headerMenu']) !== '' && !$data['contentOnly']);

if ($hasPageMenu)
	$data['dataAttr']['menu-state'] = $data['mainMenuState'] ? 'opened' : 'closed';
if ($hasAppMenu)
	$data['dataAttr']['app-menu-state'] = $data['appMenuState'] ? 'opened' : 'closed';
if ($hasHeaderMenu)
	$data['dataAttr']['member-menu-state'] = $data['headerMenuState'] ? 'opened' : 'closed';
if ($hasSideMenu)
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
	(($hasPageMenu || $hasAppMenu || $hasHeaderMenu || $hasSideMenu ||
	$data['title'] || $data['memberImage'] || $data['memberLabel']) ||
	!$data['hideEmptyHeader']) && !$data['contentOnly']
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

$attr = AdminPanelSkeleton::attr($data['attr']) . AdminPanelSkeleton::attr($data['dataAttr'], 'data-');
?>
<div<?=$attr?>>
	<?php if ($showHeader) { ?>
	<div class="page-header">
		<?=$data['content']['header']?>
	</div>
	<?php } ?>
	<?php if ($hasAppMenu) { ?>
		<div class="page-app-menu">
			<div class="inner-wrap" tabindex="0">
				<?=$data['content']['appMenu']?>
			</div>
		</div>
	<?php } ?>
	<?php if ($hasHeaderMenu) { ?>
		<div class="page-header-menu">
			<div class="inner-wrap" tabindex="0">
				<?=$data['content']['headerMenu']?>
			</div>
		</div>
	<?php } ?>
	<div class="page-main-wrap"<?=($hasPageMenu ? '' : " data-nomenu")?>>
		<?php if ($hasPageMenu) { ?>
			<div class="page-menu">
				<div class="inner-wrap" tabindex="0">
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
				<div class="inner-wrap" tabindex="0">
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
				<?=AdminPanelSkeleton::icon('close')?>
			</div>
		<?php } ?>
		<?php if ($hasSideMenu) { ?>
			<div class="menu-toggle side-menu-toggle" data-state="showing">
				<?=AdminPanelSkeleton::icon('close')?>
			</div>
		<?php } ?>
	</div>
</div>
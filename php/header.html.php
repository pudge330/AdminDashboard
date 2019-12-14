<?php
include __DIR__ . '/skeleton.class.php';
use SkeletonWidget\SkeletonWidget;

$hasPageMenu = (trim($data['content']['mainMenu']) ? true : false);
$hasAppMenu = (trim($data['content']['appMenu']) ? true : false);
$hasHeaderMenu = (trim($data['content']['headerMenu']) ? true : false);
$hasSideMenu = (trim($data['content']['sideMenu']) ? true : false);
$mainMenuIcon = $data['mainMenuIcon'] ?: '<svg class="ion_navicon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><rect class="layer_1" x="96" y="241" width="320" height="32"></rect><rect class="layer_2" x="96" y="145" width="320" height="32"></rect><rect class="layer_3" x="96" y="337" width="320" height="32"></rect></g></svg>';
$mainMenuLockIcon = $data['appMenuIcon'] ?: '<svg class="ion_locked" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path class="layer_1" d="M86.4,480h339.2c12.3,0,22.4-9.9,22.4-22.1V246c0-12.2-10-22-22.4-22H404v-30.9c0-41.5-16.2-87.6-42.6-115.4
  C335.1,49.9,297.4,32,256.1,32c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-41.3,0-79,17.9-105.3,45.6c-26.4,27.8-42.6,73.9-42.6,115.4V224
  H89h-2.6C74,224,64,233.9,64,246v211.9C64,470.1,74,480,86.4,480z M161,193.1c0-27.3,9.9-61.1,28.1-80.3l0,0l0-0.3
  C206.7,93.9,231,83,255.9,83h0.1h0.1c24.9,0,49.2,10.9,66.8,29.5l0,0.2l-0.1,0.1c18.3,19.2,28.1,53,28.1,80.3V224h-17.5h-155H161 V193.1z"></path></svg>';
$appMenuIcon = $data['appMenuIcon'] ?: '<svg class="ion_grid" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path class="layer_1" d="M160,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path><path class="layer_2" d="M288,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path><path class="layer_3" d="M416,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path></g><g><path class="layer_4" d="M160,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path><path class="layer_5" d="M288,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path><path class="layer_6" d="M416,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path></g><g><path class="layer_7" d="M160,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path><path class="layer_8" d="M288,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path><path class="layer_9" d="M416,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path></g></g></svg>';
$headerMenuIcon = $data['headerMenuIcon'] ?: '<svg class="ion_chevron-down" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path class="layer_1" d="M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9
  c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3 z"></path></svg>';
$sideMenuIcon = $data['sideMenuIcon'] ?: '<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M32,48l24,0l0,-5.333l-24,0l0,5.333Zm0,-13.333l24,0l0,-5.334l-24,0l0,5.334Zm0,-18.667l0,5.333l24,0l0,-5.333l-24,0Z" style="fill-rule:nonzero;"></path><g><path d="M13.536,28.465l-3.536,3.535l3.536,3.536l3.535,-3.536l-3.535,-3.535Z"></path><path d="M12.582,34.59l8.486,8.486l3.535,-3.536l-8.485,-8.485l-3.536,3.535Z"></path><path d="M21.068,20.924l-8.486,8.486l3.536,3.535l8.485,-8.485l-3.535,-3.536Z"></path></g></svg>';
?>
<header>
	<?php if ($hasPageMenu) { ?>
		<button class="header-nav-action">
			<span class="nav-icon">
				<?=$mainMenuIcon?>
			</span>
			<span class="nav-label"><?=($data['mainMenuState'] == 'opened' ? 'Close' : 'Open')?> Page Navigation</span>
		</button>
	<?php } else if ($data['lockIcon']) { ?>
		<span class="header-nav-action">
			<span class="nav-icon">
				<?=$mainMenuLockIcon?>
			</span>
		</span>
	<?php } ?>
	<div class="header-content-wrap header-component">
		<div class="header-branding header-component">
			<h2><?=$data['title']?></h2>
		</div>
		<?php if ($hasAppMenu) { ?>
			<div class="header-app-menu-toggle header-component">
				<button class="header-app-menu-action">
					<span class="nav-icon">
						<?=$appMenuIcon?>
					</span>
					<span class="nav-label">Open App Panel</span>
				</button>
			</div>
		<?php } ?>
		<?php if ($hasHeaderMenu) { ?>
			<div class="header-member-menu header-component">
				<button class="header-member-toggle"<?=($data['memberLabel'] ? '' : ' data-nomemberlabel')?>>
					<?php if ($data['memberImage']) { ?><span class="member-image" style="background-image: url('<?=$data['memberImage']?>');"></span><?php } ?>
					<?php if ($data['memberLabel']) { ?><span class="member-label" aria-hidden="true"><?=$data['memberLabel']?></span><?php } ?>
					<span class="member-icon">
						<?=$headerMenuIcon?>
					</span>
					<span class="member-menu-sro">Open Member Menu</span>
				</button>
			</div>
		<?php } ?>
		<?php if ($hasSideMenu) { ?>
			<div class="header-side-menu-toggle header-component">
				<button class="header-side-menu-action">
					<span class="nav-icon">
						<?=$sideMenuIcon?>
					</span>
					<span class="nav-label">Open Side Panel</span>
				</button>
			</div>
		<?php } ?>
	</div>
</header>
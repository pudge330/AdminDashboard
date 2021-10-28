<?php
include __DIR__ . '/../skeleton.class.php';
use BAG\AdminPanelSkeleton\AdminPanelSkeleton;

$hasPageMenu = (trim($data['content']['mainMenu']) ? true : false);
$hasAppMenu = (trim($data['content']['appMenu']) ? true : false);
$hasHeaderMenu = (trim($data['content']['headerMenu']) ? true : false);
$hasSideMenu = (trim($data['content']['sideMenu']) ? true : false);
$mainMenuIcon = $data['mainMenuIcon'] ?: AdminPanelSkeleton::icon('navicon');
$mainMenuLockIcon = $data['appMenuIcon'] ?: AdminPanelSkeleton::icon('lock');
$appMenuIcon = $data['appMenuIcon'] ?: AdminPanelSkeleton::icon('grid');
$headerMenuIcon = $data['headerMenuIcon'] ?: AdminPanelSkeleton::icon('chevron_down');
$sideMenuIcon = $data['sideMenuIcon'] ?: AdminPanelSkeleton::icon('sidemenu');
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
			<?php
				if ($data['titleUrl']) {
					$data['titleUrlAttributes']['href'] = $data['titleUrl'];
					$titleUrlAttr = AdminPanelSkeleton::attr($data['titleUrlAttributes']);
			?>
				<h2><a<?=$titleUrlAttr?>><span><?=$data['title']?></span></a></h2>
			<?php } else { ?>
				<h2><span><?=$data['title']?></span></h2>
			<?php } ?>
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
SkeletonWidget.modules.Navigation = SkeletonWidget.modules.Base.extend({
	init: function(opts) {
		if (this.$el && !this.initialized()) {
			var _self = this;
			this.$el.data('SkeletonWidget_Navigation', this);
			this.setState('loaded');
			this.$el.find('> .navLinks > .navLink > .navLinkAction').on('click', function(e) {
				_self.handleLink(jQuery(this).closest('.navLink'), e);
			});
			this.$el.find('.navLinkAction .subMenuToggle').on('click', function(e) {
				_self.toggleSubMenu(jQuery(this).closest('.navLinkSubAction'));
				e.preventDefault();
				return false;
			});
			this.$el.find('.navLinkAction').on('keydown', function (e){
				if(e.keyCode == 13){
					_self.handleLink(jQuery(this).closest('.navLink'), e);
				}
			});
			this.$el.find('.navLinkAction .subMenuToggle').on('keydown', function (e){
				if(e.keyCode == 13){
					_self.toggleSubMenu(jQuery(this).closest('.navLinkSubAction'));
					e.preventDefault();
					return false;
				}
			});
			this.$el.find('.navLinkAction .subMenuToggle').on('focusin', function() {
				jQuery(this).closest('.navLinkAction').addClass('focus');
			});
			this.$el.find('.navLinkAction .subMenuToggle').on('focusout', function() {
				jQuery(this).closest('.navLinkAction').removeClass('focus');
			});
		}
	}
	,toggleSubMenu: function($action) {
		var $link = $action.find('.navLinkAction');
		if ($action.attr('data-sub-state') == 'closed') {
			$action.find('> .navLinkSpecial').slideDown({
				duration: 400
				,start: function() {
					if ($action.find('> .navLinkSpecial').css('display') == 'inline-block') {
						$action.find('> .navLinkSpecial').css('display', 'block');
					}
					$action.attr('data-sub-state', 'opened');
				}
				,complete: function() {
					if ($action.find('> .navLinkSpecial').css('display') == 'inline-block') {
						$action.find('> .navLinkSpecial').css('display', 'block');
					}
					$action.attr('data-sub-state', 'opened');
				}
			});
		}
		else {
			$action.find('> .navLinkSpecial').slideUp({
				duration: 400
				,start: function() {
					$action.attr('data-sub-state', 'closed');
				}
				,complete: function() {
					$action.attr('data-sub-state', 'closed');
				}
			});
		}
		$link.blur();
		$link.find('> .subMenuToggle').blur();
	}
	,handleLink: function($action, e) {
		var $link = $action.find('> .navLinkAction');
		if ($link.attr('data-href')) {
			if (jQuery(window).width() < 600) {
				jQuery('.pageSkeleton').data('SkeletonWidget_Skeleton').closePageMenu();
			}
			var _newWindow = (
				(e.ctrlKey || e.metaKey) ||
				$link.attr('data-target') == '_blank'
			);
			if (_newWindow) {
				window.open($link.attr('data-href'), '_blank');
				e.preventDefault();
			}
			else
				location = $link.attr('data-href');
		}
		else if ($action.hasClass('navLinkSubAction')) {
			this.toggleSubMenu($action);
		}
	}
}, {
	widgetSelector: '.navMenu-pageNav'
	,initWidgets: function() {
		jQuery(SkeletonWidget.modules.Navigation.widgetSelector).each(function() {
			SkeletonWidget.modules.Navigation.initWidget(jQuery(this));
		});
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.Navigation({el: el});
	}
});
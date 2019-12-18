SkeletonWidget.modules.Skeleton = SkeletonWidget.modules.Base.extend({
	cookieKey: 'adminpanel_menu_state'
	,events: undefined
	,nvpWidth: 640
	,$pageMenuAction: undefined
	,$memberMenuAction: undefined
	,$appMenuAction: undefined
	,$sideMenuAction: undefined
	,$pageMenuWrap: undefined
	,$memberMenuWrap: undefined
	,$appMenuWrap: undefined
	,$sideMenuWrap: undefined
	,$pageContentWrap: undefined
	,$html: undefined
	,$window: undefined
	,init: function(opts) {
		var _self = this;
		if (this.$el && !this.initialized()) {
			this.$html = jQuery('html');
			this.$window = jQuery(window);
			this.$el.data('SkeletonWidget_Skeleton', this);
			this.setState('loaded');
			this.events = {
				pageMenuClick: []
				,pageMenuOpen: []
				,pageMenuClose: []
				,pageMenuToggle: []
				,memberMenuClick: []
				,memberMenuOpen: []
				,memberMenuClose: []
				,memberMenuToggle: []
				,appMenuClick: []
				,appMenuOpen: []
				,appMenuClose: []
				,appMenuToggle: []
				,sideMenuClick: []
				,sideMenuOpen: []
				,sideMenuClose: []
				,sideMenuToggle: []
			};
			this.$pageMenuAction = this.$el.find('.page-header .header-nav-action');
			this.$memberMenuAction = this.$el.find('.page-header .header-member-toggle');
			this.$appMenuAction = this.$el.find('.page-header .header-app-menu-action');
			this.$sideMenuAction = this.$el.find('.page-header .header-side-menu-action');
			this.$pageMenuWrap = this.$el.find('.page-menu');
			this.$memberMenuWrap = this.$el.find('.page-header-menu');
			this.$appMenuWrap = this.$el.find('.page-app-menu');
			this.$sideMenuWrap = this.$el.find('.page-side-menu');
			this.$pageContentWrap = this.$el.find('.page-content-wrap');
			this.$pageMenuAction.on('click', function() {
				_self.trigger('pageMenuClick');
				_self.handlePageMenuClick();
			});
			this.$memberMenuAction.on('click', function() {
				_self.trigger('memberMenuClick');
				_self.handleMemberMenuClick();
			});
			this.$memberMenuAction.on('keydown', function(e) {
				if (e.which === 9) {
					if(e.shiftKey == false) {
						if (_self.$el.attr('data-member-menu-state') == 'opened') {
							setTimeout(function() {
								_self.$memberMenuWrap.find('.navLink.nl-2 .navLinkAction').focus();
							}, 1);
						}
					}
				}
			});
			this.$memberMenuWrap.find('.navLink.nl-2 .navLinkAction').on('keydown', function(e) {
				if (e.which === 9) {
					if(e.shiftKey === true) {
						// member is tabbing backward
						setTimeout(function() {
							_self.$memberMenuAction[0].focus();
						}, 1);
					}
				}
			});
			this.$sideMenuAction.on('click', function() {
				_self.trigger('sideMenuClick');
				_self.handleSideMenuClick();
			});
			this.$appMenuAction.on('click', function() {
				_self.trigger('appMenuClick');
				_self.handleAppMenuClick();
			});
			this.$el.find('.menu-toggle.main-menu-toggle').on('click', function() {
				_self.handlePageMenuClick();
			});
			this.$el.find('.menu-toggle.side-menu-toggle').on('click', function() {
				_self.handleSideMenuClick();
			});
			// lynkApp.on('resize', function() {
			_self.$window.on('resize', function() {
				if (jQuery(_self.$window).width() < _self.nvpWidth) {
					if (_self.$html.attr('data-menu-state') == 'opened' && _self.$html.attr('data-side-menu-state') == 'opened') {
						_self.$html.attr('data-side-menu-state', 'closed');
						_self.$sideMenuAction.find('.nav-label').html('Open Side Menu');
						_self.trigger('sideMenuClose');
						_self.trigger('sideMenuToggle', {type: 'close'});
					}
				}
				_self.adjustBrandingMaxWidth();
			});
			_self.adjustBrandingMaxWidth();
			jQuery(_self.$window).on('click', function(e) {
				var $this = jQuery(e.target);
				if (_self.$el.attr('data-member-menu-state') == 'opened') {
					if (!$this.closest('.page-header-menu').length && !$this.closest('.header-member-toggle').length) {
						_self.closeMemberMenu();
					}
				}
				if (_self.$el.attr('data-app-menu-state') == 'opened') {
					if (!$this.closest('.page-app-menu').length && !$this.closest('.header-app-menu-action').length) {
						_self.closeAppMenu();
					}
				}
			});
		}
	}
	,adjustBrandingMaxWidth: function() {
		var minus = 0
		var elms = [
			'.header-nav-action', '.header-app-menu-toggle', '.header-member-menu', '.header-side-menu-toggle', '.app-menu-spacer', '.header-menu-spacer'
		];
		for (var i = 0; i < elms.length; i++) {
			var $el = jQuery(elms[i]);
			if ($el.length) {
				minus = minus + $el.width();
				minus = minus + parseInt($el.css('margin-right'), 10);
			}
		}
		this.$el.find('.page-header .header-branding h2').css('max-width', 'calc(100vw - ' + minus + 'px)');
	}
	,handlePageMenuClick: function() {
		var _self = this;
		if (_self.$html.attr('data-menu-state') == 'closed') {
			if (_self.$html.attr('data-side-menu-state') == 'opened' && jQuery(_self.$window).width() < _self.nvpWidth) {
				_self.closeSideMenu();
			}
			_self.openPageMenu();
		}
		else {
			_self.closePageMenu();
		}
	}
	,handleMemberMenuClick: function() {
		var _self = this;
		if (_self.$el.attr('data-member-menu-state') == 'closed') {
			_self.openMemberMenu();
		}
		else {
			_self.closeMemberMenu();
		}
	}
	,handleAppMenuClick: function() {
		var _self = this;
		if (_self.$el.attr('data-app-menu-state') == 'closed') {
			_self.openAppMenu();
		}
		else {
			_self.closeAppMenu();
		}
	}
	,handleSideMenuClick: function() {
		var _self = this;
		if (_self.$html.attr('data-side-menu-state') == 'closed') {
			if (_self.$html.attr('data-menu-state') == 'opened' && jQuery(_self.$window).width() < _self.nvpWidth) {
				_self.closePageMenu();
			}
			_self.openSideMenu();
		}
		else {
			_self.closeSideMenu();
		}
	}
	,openPageMenu: function() {
		var _self = this;
		_self.$html.attr('data-menu-state', 'opened');
		_self.$pageMenuAction.find('.nav-label').html('Close Page Navigation');
		// _self.updatePageMenuCookie('opened');
		_self.$pageMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.trigger('pageMenuOpen');
		_self.trigger('pageMenuToggle', {type: 'open'});
	}
	,closePageMenu: function() {
		var _self = this;
		_self.$html.attr('data-menu-state', 'closed');
		_self.$pageMenuAction.find('.nav-label').html('Open Page Navigation');
		// _self.updatePageMenuCookie('closed');
		_self.trigger('pageMenuCLose');
		_self.trigger('pageMenuToggle', {type: 'close'});
	}
	,openMemberMenu: function() {
		var _self = this;
		_self.$el.attr('data-member-menu-state', 'opened');
		_self.$memberMenuAction.find('.member-menu-sro').html('Close Member Menu');
		_self.$memberMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.$memberMenuWrap.find('.inner-wrap').focus();
		_self.trigger('memberMenuOpen');
		_self.trigger('memberMenuToggle', {type: 'open'});
	}
	,closeMemberMenu: function() {
		var _self = this;
		_self.$el.attr('data-member-menu-state', 'closed');
		_self.$memberMenuAction.find('.member-menu-sro').html('Open Member Menu');
		_self.trigger('memberMenuClose');
		_self.trigger('memberMenuToggle', {type: 'close'});
	}
	,openAppMenu: function() {
		var _self = this;
		_self.$el.attr('data-app-menu-state', 'opened');
		_self.$appMenuAction.find('.nav-label').html('Close App Menu');
		_self.$appMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.trigger('appMenuOpen');
		_self.trigger('appMenuToggle', {type: 'open'});
	}
	,closeAppMenu: function() {
		var _self = this;
		_self.$el.attr('data-app-menu-state', 'closed');
		_self.$appMenuAction.find('.nav-label').html('Open App Menu');
		_self.trigger('appMenuClose');
		_self.trigger('appMenuToggle', {type: 'close'});
	}
	,openSideMenu: function() {
		var _self = this;
		_self.$html.attr('data-side-menu-state', 'opened');
		_self.$sideMenuAction.find('.nav-label').html('Close Side Menu');
		_self.$sideMenuAction.find('.nav-icon svg g').attr('transform', 'rotate(180, 18, 32)');
		_self.$sideMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.trigger('sideMenuOpen');
		_self.trigger('sideMenuToggle', {type: 'open'});
	}
	,closeSideMenu: function() {
		var _self = this;
		_self.$html.attr('data-side-menu-state', 'closed');
		_self.$sideMenuAction.find('.nav-label').html('Open Side Menu');
		_self.$sideMenuAction.find('.nav-icon svg g').attr('transform', '');
		_self.trigger('sideMenuClose');
		_self.trigger('sideMenuToggle', {type: 'close'});
	}
	,updatePageMenuCookie: function(value) {
		var _self = this;
		value = value || _self.$html.attr('data-menu-state');
		// Cookies.set(_self.cookieKey, value);
	}
}, {
	widgetSelector: '.page-skeleton'
	,initWidgets: function() {
		jQuery(SkeletonWidget.modules.Skeleton.widgetSelector).each(function() {
			SkeletonWidget.modules.Skeleton.initWidget(jQuery(this));
		});
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.Skeleton({el: el});
	}
});
define(['jquery'], function(jQuery) {
var SkeletonWidget = {
	modules: {}
	,load: function() {
		var _self = this;
		for (var name in _self.modules) {
			_self.loadModule(name);
		}
		this.__loaded = true;
		for (var i = 0; i < _self.__onloadCallbacks.length; i++) {
			_self.__onloadCallbacks[i]();
		}
	}
	,loadModule: function(name) {
		var _self = this;
		if (_self.modules.hasOwnProperty(name) && _self.modules[name].initWidgets) {
			_self.modules[name].initWidgets();
		}
	}
	,__loaded: false
	,__onloadCallbacks: []
	,onLoad: function(cb) {
		if (!this.__loaded) {
			this.__onloadCallbacks.push(cb);
		}
		else {
			cb();
		}
	}
};
SkeletonWidget.modules.Base = bglib.EventModule.extend({
	$el: undefined
	,constructor: function() {
		var _self = this;
		if (arguments[0]) {
			var opts = arguments[0] || {};
			if (!bglib.DT.isObject(opts)) {
				opts = { el: opts };
			}
			var elm = bglib.El.element(opts.el);
			elm = jQuery(elm);
			opts.el = elm;
			this.$el = elm;
			bglib.EventModule.apply(_self, [opts]);
		}
	}
	,initialized: function() {
		return (this.$el.attr('data-state') == 'loaded');
	}
	,setState: function(state) {
		this.$el.attr('data-state', state);
	}
	,getState: function(state) {
		return this.$el.attr('data-state');
	}
}, {
	load: function () {}
});
/*

Widget module

SkeletonWidget.modules.MODULE_NAME = BaseWidget.extend({
	,init: function(opts) {
		if (this.$el && !this.initialized()) {
			this.$el.data('SkeletonWidgetMODULE_NAME', this);
			this.setState('loaded');
		}
	}
}, {
	widgetSelector: '.MODULE_CLASS'
	,initWidgets: function() {
		jQuery(SkeletonWidget.modules.MODULE_NAME.widgetSelector).each(function() {
			SkeletonWidget.modules.MODULE_NAME.initWidget(jQuery(this));
		});
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.MODULE_NAME({el: el});
	}
});
*/
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
						if (_self.$html.attr('data-member-menu-state') == 'opened') {
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
				if (_self.$html.attr('data-member-menu-state') == 'opened') {
					if (!$this.closest('.page-header-menu').length && !$this.closest('.header-member-toggle').length) {
						_self.closeMemberMenu();
					}
				}
				if (_self.$html.attr('data-app-menu-state') == 'opened') {
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
		if (_self.$html.attr('data-member-menu-state') == 'closed') {
			_self.openMemberMenu();
		}
		else {
			_self.closeMemberMenu();
		}
	}
	,handleAppMenuClick: function() {
		var _self = this;
		if (_self.$html.attr('data-app-menu-state') == 'closed') {
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
		_self.$html.attr('data-member-menu-state', 'opened');
		_self.$memberMenuAction.find('.member-menu-sro').html('Close Member Menu');
		_self.$memberMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.$memberMenuWrap.find('.inner-wrap').focus();
		_self.trigger('memberMenuOpen');
		_self.trigger('memberMenuToggle', {type: 'open'});
	}
	,closeMemberMenu: function() {
		var _self = this;
		_self.$html.attr('data-member-menu-state', 'closed');
		_self.$memberMenuAction.find('.member-menu-sro').html('Open Member Menu');
		_self.trigger('memberMenuClose');
		_self.trigger('memberMenuToggle', {type: 'close'});
	}
	,openAppMenu: function() {
		var _self = this;
		_self.$html.attr('data-app-menu-state', 'opened');
		_self.$appMenuAction.find('.nav-label').html('Close App Menu');
		_self.$appMenuWrap.find('.inner-wrap').scrollTop(0);
		_self.trigger('appMenuOpen');
		_self.trigger('appMenuToggle', {type: 'open'});
	}
	,closeAppMenu: function() {
		var _self = this;
		_self.$html.attr('data-app-menu-state', 'closed');
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
return SkeletonWidget;
});
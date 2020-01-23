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
			this.$el = opts.el;
			bglib.EventModule.apply(_self, [opts]);
		}
	}
	,initialized: function() {
		return (this.$el.getAttribute('data-state') == 'loaded');
	}
	,setState: function(state) {
		this.$el.setAttribute('data-state', state);
	}
	,getState: function(state) {
		return this.$el.getAttribute('data-state');
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
		var widgets = document.querySelectorAll(SkeletonWidget.modules.MODULE_NAME.widgetSelector);
		for (var i = 0; i < widgets.length; i++) {
			SkeletonWidget.modules.MODULE_NAME.initWidget(widgets[i]);
		}
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.MODULE_NAME({el: el});
	}
});
*/

SkeletonWidget.modules.Navigation = SkeletonWidget.modules.Base.extend({
	topSelector: undefined,
	instanceId: undefined,
	init: function(opts) {
		if (this.$el && !this.initialized()) {
			var _self = this;
			this.topSelector = SkeletonWidget.modules.Navigation.widgetSelector;
			this.instanceId = Math.floor((Math.random() * 100000000) + 1);
			this.topSelector = this.topSelector + '-' + this.instanceId;
			this.$el.className += ' ' + this.topSelector.replace(/^\./, '');
			this.$el['SkeletonWidget_Navigation'] = this;
			this.setState('loaded');
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('click', function(e) {
					var target = e.target;
					var subMenuToggle = bglib.El.hasClass(target, 'subMenuToggle') ? target : target.closest('.subMenuToggle');
					if ((' ' + target.className + ' ').indexOf(' navLinkAction ') === -1) {
						target = target.closest('.navLinkAction');
					}
					if (!subMenuToggle) {
						_self.handleLink(target.closest('.navLink'), e);
					}
				});
			}
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction .subMenuToggle');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('click', function(e) {
					var target = e.target;
					if (!bglib.El.hasClass(target, 'subMenuToggle')) {
						target = target.closest('.subMenuToggle');
					}
					_self.toggleSubMenu(target.closest('.navLinkSubAction'));
					e.preventDefault();
					return false;
				});
				$elms[i].addEventListener('keydown', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' subMenuToggle ') === -1) {
						target = target.closest('.subMenuToggle');
					}
					if(e.keyCode == 13){
						_self.toggleSubMenu(target.closest('.navLinkSubAction'));
						e.preventDefault();
						return false;
					}
				});
				$elms[i].addEventListener('focusin', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' subMenuToggle ') === -1) {
						target = target.closest('.subMenuToggle');
					}
					bglib.El.addClass(target.closest('.navLinkAction'), 'focus');
				});
				$elms[i].addEventListener('focusout', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' subMenuToggle ') === -1) {
						target = target.closest('.subMenuToggle');
					}
					bglib.El.removeClass(target.closest('.navLinkAction'), 'focus');
				});
			}
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('keydown', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' navLinkAction ') === -1) {
						target = target.closest('.navLinkAction');
					}
					if(e.keyCode == 13){
						_self.handleLink(target.closest('.navLink'), e);
					}
				});
			}
			this.toggleSubMenuTimeout = bglib.fn.debounce(function() {
				var $elms = _self.$el.querySelectorAll('.navLinkSpecial');
				for (var i = 0; i < $elms.length; i++) {
					$elms[i].style.height = 'auto';
				}
			}, 400);
		}
	}
	,toggleSubMenu: function($action) {
		var _self = this;
		var $link = $action.querySelector('.navLinkAction');
		var innerHeight = $action.querySelector('.navLinkSpecial > .page-skeleton-menu').offsetHeight;
		if ($action.getAttribute('data-sub-state') == 'closed') {
			$action.querySelector('.navLinkSpecial').style.height = innerHeight + 'px';
			$action.setAttribute('data-sub-state', 'opened');
			this.toggleSubMenuTimeout();
		}
		else {
			$action.querySelector('.navLinkSpecial').style.height = innerHeight + 'px';
			//--needs a 50ms delay when clsoing otherwise height isn't set or simply ignored
			setTimeout(function() {
				$action.setAttribute('data-sub-state', 'closed');
				_self.toggleSubMenuTimeout();
			}, 50);
		}
		$link.blur();
		$link.querySelector('.subMenuToggle').blur();
	}
	,handleLink: function($action, e) {
		var $link = $action.querySelector('.navLinkAction');
		if ($link.getAttribute('data-href')) {
			if (window.innerWidth < 600) {
				document.querySelector('.pageSkeleton')['SkeletonWidget_Skeleton'].closePageMenu();
			}
			var _newWindow = (
				(e.ctrlKey || e.metaKey) ||
				$link.getAttribute('data-target') == '_blank'
			);
			if (_newWindow) {
				window.open($link.getAttribute('data-href'), '_blank');
				e.preventDefault();
			}
			else
				location = $link.getAttribute('data-href');
		}
		else if ((' ' + $action.className + ' ').indexOf(' navLinkSubAction ') !== -1) {
			this.toggleSubMenu($action);
		}
	}
}, {
	widgetSelector: '.page-skeleton-menu'
	,initWidgets: function() {
		var widgets = document.querySelectorAll(SkeletonWidget.modules.Navigation.widgetSelector);
		for (var i = 0; i < widgets.length; i++) {
			SkeletonWidget.modules.Navigation.initWidget(widgets[i]);
		}
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.Navigation({el: el});
	}
});
//--polyfills
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
//--@https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
SkeletonWidget.modules.Skeleton = SkeletonWidget.modules.Base.extend({
	events: undefined
	,nvpWidth: 608
	,$pageMenuAction: undefined
	,$memberMenuAction: undefined
	,$appMenuAction: undefined
	,$sideMenuAction: undefined
	,$pageMenuWrap: undefined
	,$memberMenuWrap: undefined
	,$appMenuWrap: undefined
	,$sideMenuWrap: undefined
	,$pageContentWrap: undefined
	,init: function(opts) {
		var _self = this;
		if (this.$el && !this.initialized()) {
			this.$el['SkeletonWidget_Skeleton'] = this;
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
			this.$pageMenuAction = this.$el.querySelector('.page-header .header-nav-action');
			this.$memberMenuAction = this.$el.querySelector('.page-header .header-member-toggle');
			this.$appMenuAction = this.$el.querySelector('.page-header .header-app-menu-action');
			this.$sideMenuAction = this.$el.querySelector('.page-header .header-side-menu-action');
			this.$pageMenuWrap = this.$el.querySelector('.page-menu');
			this.$memberMenuWrap = this.$el.querySelector('.page-header-menu');
			this.$appMenuWrap = this.$el.querySelector('.page-app-menu');
			this.$sideMenuWrap = this.$el.querySelector('.page-side-menu');
			this.$pageContentWrap = this.$el.querySelector('.page-content-wrap');
			if (this.$pageMenuAction) {
				this.$pageMenuAction.addEventListener('click', function() {
					_self.trigger('pageMenuClick');
					_self.handlePageMenuClick();
				});
			}
			if (this.$memberMenuAction) {
				this.$memberMenuAction.addEventListener('click', function() {
					_self.trigger('memberMenuClick');
					_self.handleMemberMenuClick();
				});
				this.$memberMenuAction.addEventListener('keydown', function(e) {
					if (e.keyCode === 9) {
						if(e.shiftKey == false) {
							if (_self.$el.getAttribute('data-member-menu-state') == 'opened') {
								setTimeout(function() {
									_self.$memberMenuWrap.querySelector('.navLink.nl-2 .navLinkAction').focus();
								}, 1);
							}
						}
					}
				});
			}
			if (this.$memberMenuWrap) {
				var menuItem = this.$memberMenuWrap.querySelector('.navLink.nl-1 .navLinkAction');
				if (menuItem) {
					menuItem.addEventListener('keydown', function(e) {
						if (e.keyCode === 9) {
							if(e.shiftKey === true) {
								// member is tabbing backward
								setTimeout(function() {
									_self.$memberMenuAction.focus();
								}, 1);
							}
						}
					});
				}
			}
			if (this.$sideMenuAction) {
				this.$sideMenuAction.addEventListener('click', function() {
					_self.trigger('sideMenuClick');
					_self.handleSideMenuClick();
				});
			}
			if (this.$appMenuAction) {
				this.$appMenuAction.addEventListener('click', function() {
					_self.trigger('appMenuClick');
					_self.handleAppMenuClick();
				});
			}
			var $mainMenuToggle = this.$el.querySelector('.menu-toggle.main-menu-toggle');
			if ($mainMenuToggle) {
				$mainMenuToggle.addEventListener('click', function() {
					_self.handlePageMenuClick();
				});
			}
			var $sideMenuToggle = this.$el.querySelector('.menu-toggle.side-menu-toggle');
			if ($sideMenuToggle) {
				$sideMenuToggle.addEventListener('click', function() {
					_self.handleSideMenuClick();
				});
			}
			window.addEventListener('resize', function(e) {
				if (window.innerWidth < _self.nvpWidth) {
					if (_self.$el.getAttribute('data-menu-state') == 'opened' && _self.$el.getAttribute('data-side-menu-state') == 'opened') {
						_self.closeSideMenu();
					}
				}
				_self.adjustBrandingMaxWidth();
			});
			_self.adjustBrandingMaxWidth();
			window.addEventListener('click', function(e) {
				var target = e.target;
				if (_self.$el.getAttribute('data-member-menu-state') == 'opened') {
					if (!target.closest('.page-header-menu') && !target.closest('.header-member-toggle')) {
						_self.closeMemberMenu();
					}
				}
				if (_self.$el.getAttribute('data-app-menu-state') == 'opened') {
					if (!target.closest('.page-app-menu') && !target.closest('.header-app-menu-action')) {
						_self.closeAppMenu();
					}
				}
			});
		}
	}
	,adjustBrandingMaxWidth: function() {
		var minus = 0;
		var elms = [
			'.header-nav-action', '.header-app-menu-toggle', '.header-member-menu', '.header-side-menu-toggle', '.app-menu-spacer', '.header-menu-spacer'
		];
		var header = this.$el.querySelector('.page-header .header-branding h2');
		if (header) {
			for (var i = 0; i < elms.length; i++) {
				var el = document.querySelector(elms[i]);
				if (el) {
					minus = minus + el.offsetWidth;
					minus = minus + parseInt(getComputedStyle(el)['margin-right'], 10);
				}
			}
			header.style['max-width'] = 'calc(100vw - ' + minus + 'px)';
		}
	}
	,handlePageMenuClick: function() {
		var _self = this;
		if (_self.$el.getAttribute('data-menu-state') == 'closed') {
			if (_self.$el.getAttribute('data-side-menu-state') == 'opened' && window.innerWidth < _self.nvpWidth) {
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
		if (_self.$el.getAttribute('data-member-menu-state') == 'closed') {
			_self.openMemberMenu();
		}
		else {
			_self.closeMemberMenu();
		}
	}
	,handleAppMenuClick: function() {
		var _self = this;
		if (_self.$el.getAttribute('data-app-menu-state') == 'closed') {
			_self.openAppMenu();
		}
		else {
			_self.closeAppMenu();
		}
	}
	,handleSideMenuClick: function() {
		var _self = this;
		if (_self.$el.getAttribute('data-side-menu-state') == 'closed') {
			if (_self.$el.getAttribute('data-menu-state') == 'opened' && window.innerWidth < _self.nvpWidth) {
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
		_self.$el.setAttribute('data-menu-state', 'opened');
		_self.$pageMenuAction.querySelector('.nav-label').innerHTML = 'Close Page Navigation';
		_self.$pageMenuWrap.querySelector('.inner-wrap').scrollTop = 0;
		_self.trigger('pageMenuOpen');
		_self.trigger('pageMenuToggle', {type: 'open'});
	}
	,closePageMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-menu-state', 'closed');
		_self.$pageMenuAction.querySelector('.nav-label').innerHTML = 'Open Page Navigation';
		_self.trigger('pageMenuCLose');
		_self.trigger('pageMenuToggle', {type: 'close'});
	}
	,openMemberMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-member-menu-state', 'opened');
		_self.$memberMenuAction.querySelector('.member-menu-sro').innerHTML = 'Close Member Menu';
		_self.$memberMenuWrap.querySelector('.inner-wrap').scrollTop = 0;
		_self.$memberMenuWrap.querySelector('.inner-wrap').focus();
		_self.trigger('memberMenuOpen');
		_self.trigger('memberMenuToggle', {type: 'open'});
	}
	,closeMemberMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-member-menu-state', 'closed');
		_self.$memberMenuAction.querySelector('.member-menu-sro').innerHTML = 'Open Member Menu';
		_self.trigger('memberMenuClose');
		_self.trigger('memberMenuToggle', {type: 'close'});
	}
	,openAppMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-app-menu-state', 'opened');
		_self.$appMenuAction.querySelector('.nav-label').innerHTML = 'Close App Menu';
		_self.$appMenuWrap.querySelector('.inner-wrap').scrollTop = 0;
		_self.trigger('appMenuOpen');
		_self.trigger('appMenuToggle', {type: 'open'});
	}
	,closeAppMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-app-menu-state', 'closed');
		_self.$appMenuAction.querySelector('.nav-label').innerHTML = 'Open App Menu';
		_self.trigger('appMenuClose');
		_self.trigger('appMenuToggle', {type: 'close'});
	}
	,openSideMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-side-menu-state', 'opened');
		_self.$sideMenuAction.querySelector('.nav-label').innerHTML = 'Close Side Menu';
		_self.$sideMenuAction.querySelector('.nav-icon svg g').setAttribute('transform', 'rotate(180, 18, 32)');
		_self.$sideMenuWrap.querySelector('.inner-wrap').scrollTop = 0;
		_self.trigger('sideMenuOpen');
		_self.trigger('sideMenuToggle', {type: 'open'});
	}
	,closeSideMenu: function() {
		var _self = this;
		_self.$el.setAttribute('data-side-menu-state', 'closed');
		_self.$sideMenuAction.querySelector('.nav-label').innerHTML = 'Open Side Menu';
		_self.$sideMenuAction.querySelector('.nav-icon svg g').setAttribute('transform', '');
		_self.trigger('sideMenuClose');
		_self.trigger('sideMenuToggle', {type: 'close'});
	}
}, {
	widgetSelector: '.page-skeleton'
	,initWidgets: function() {
		var widgets = document.querySelectorAll(SkeletonWidget.modules.Skeleton.widgetSelector);
		for (var i = 0; i < widgets.length; i++) {
			SkeletonWidget.modules.Skeleton.initWidget(widgets[i]);
		}
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.Skeleton({el: el});
	}
});
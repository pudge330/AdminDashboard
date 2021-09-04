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
					var navLinkSpecialToggle = bglib.El.hasClass(target, 'navLinkSpecialToggle') ? target : target.closest('.navLinkSpecialToggle');
					target = bglib.El.hasClass(target, 'navLinkAction') ? target : target.closest('.navLinkAction');
					if (!navLinkSpecialToggle) {
						_self.handleLink(target.closest('.navLink'), e);
					}
					else {
						e.preventDefault();
						return false;
					}
				});
			}
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction .navLinkSpecialToggle');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('click', function(e) {
					var target = bglib.El.hasClass(e.target, 'navLinkSpecialToggle') ? e.target : e.target.closest('.navLinkSpecialToggle');
					if (bglib.El.hasClass(target, 'navLinkSpecialToggle')) {
						_self.toggleSubMenu(target.closest('.navLinkSpecialAction'));
						e.preventDefault();
						return false;
					}
				});
				$elms[i].addEventListener('keydown', function(e) {
					var target = bglib.El.hasClass(e.target, 'navLinkSpecialToggle') ? e.target : e.target.closest('.navLinkSpecialToggle');
					if(e.keyCode == 13){
						console.log('navLinkSpecialToggle:enter_key');
						_self.toggleSubMenu(target.closest('.navLinkSpecialAction'));
						e.preventDefault();
						return false;
					}
				});
				$elms[i].addEventListener('focusin', function(e) {
					var target = bglib.El.hasClass(e.target, 'navLinkSpecialToggle') ? e.target : e.target.closest('.navLinkSpecialToggle');
					bglib.El.addClass(target.closest('.navLinkAction'), 'focus');
				});
				$elms[i].addEventListener('focusout', function(e) {
					var target = bglib.El.hasClass(e.target, 'navLinkSpecialToggle') ? e.target : e.target.closest('.navLinkSpecialToggle');
					bglib.El.removeClass(target.closest('.navLinkAction'), 'focus');
				});
			}
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('keydown', function(e) {
					var target = bglib.El.hasClass(e.target, 'navLinkAction') ? e.target : e.target.closest('.navLinkAction');
					if(e.keyCode == 13){
						console.log('navLinkAction:enter_key');
						_self.handleLink(target.closest('.navLink'), e);
					}
				});
			}
			this.toggleSubMenuTimeout = bglib.fn.debounce(function() {
				var $elms = _self.$el.querySelectorAll('.navLinkSpecialContent');
				for (var i = 0; i < $elms.length; i++) {
					$elms[i].style.height = 'auto';
					var $parent = $elms[i].closest('.navLinkSpecialAction');
					if ($parent) {
						var $actions = $parent.querySelectorAll('.navLinkSpecialContent .navLinkAction');
						for (var j = 0; j < $actions.length; j++) {
							if ($parent.getAttribute('data-sub-state') == 'closed') {
								$actions[j].setAttribute('tabindex', '-1');
							}
							else {
								$actions[j].setAttribute('tabindex', '0');
							}
						}
					}
				}

			}, 400);
		}
	}
	,toggleSubMenu: function($action) {
		var _self = this;
		var $link = $action.querySelector('.navLinkAction');
		var innerHeight = $action.querySelector('.navLinkSpecialContent > .page-skeleton-menu').offsetHeight;
		if ($action.getAttribute('data-sub-state') == 'closed') {
			$action.querySelector('.navLinkSpecialContent').style.height = innerHeight + 'px';
			$action.setAttribute('data-sub-state', 'opened');
			this.toggleSubMenuTimeout();
		}
		else {
			$action.querySelector('.navLinkSpecialContent').style.height = innerHeight + 'px';
			//--needs a 50ms delay when clsoing otherwise height isn't set or simply ignored
			setTimeout(function() {
				$action.setAttribute('data-sub-state', 'closed');
				_self.toggleSubMenuTimeout();
			}, 50);
		}
	}
	,handleLink: function($action, e) {
		var $link = $action.querySelector('.navLinkAction');
		if ($link.getAttribute('data-href')) {
			if (window.innerWidth < 600) {
				document.querySelector('.page-skeleton')['SkeletonWidget_Skeleton'].closePageMenu();
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
		else if (!$link.getAttribute('href') && bglib.El.hasClass($action, 'navLinkSpecialAction')) {
			this.toggleSubMenu($action);
			e.preventDefault();
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
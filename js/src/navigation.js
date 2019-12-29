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
			window.addEventListener('resize', bglib.fn.debounce(function() {
				_self.updateMaxHeights();
			}), 250);
			this.toggleSubMenuTimeout = bglib.fn.debounce(function() {
				_self.$el.querySelector('.navLinkSpecial').style.height = 'auto';
			}, 500);
		}
	}
	,updateMaxHeights: function() {
		var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLinkSubAction > .navLinkSpecial');
		for (var i = 0; i < $elms.length; i++) {
			$elms[i].style.height = $elms[i].querySelector('.navMenu').offsetHeight + 'px';
		}
	}
	,toggleSubMenu: function($action) {
		var _self = this;
		var $link = $action.querySelector('.navLinkAction');
		var innerHeight = $action.querySelector('.navLinkSpecial > .navMenu').offsetHeight;
		if ($action.getAttribute('data-sub-state') == 'closed') {
			$action.querySelector('.navLinkSpecial').style.height = innerHeight + 'px';
			$action.setAttribute('data-sub-state', 'opened');
			this.toggleSubMenuTimeout();
		}
		else {
			$action.querySelector('.navLinkSpecial').style.height = innerHeight + 'px';
			//--needs a 10ms delay when clsoing otherwise height isn't set or simply ignored
			setTimeout(function() {
				$action.setAttribute('data-sub-state', 'closed');
				_self.toggleSubMenuTimeout();
			}, 10);
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
	widgetSelector: '.navMenu-pageNav'
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
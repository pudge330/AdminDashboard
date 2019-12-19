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
			// this.$el = jQuery(this.$el);
			this.setState('loaded');
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('click', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' navLinkAction ') === -1) {
						target = target.closest('.navLinkAction');
					}
					_self.handleLink(target.closest('.navLink'), e);
				});
			}
			// this.$el.find('> .navLinks > .navLink > .navLinkAction').on('click', function(e) {
			// 	_self.handleLink(jQuery(this).closest('.navLink'), e);
			// });
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction .subMenuToggle');
			for (var i = 0; i < $elms.length; i++) {
				$elms[i].addEventListener('click', function(e) {
					var target = e.target;
					if ((' ' + target.className + ' ').indexOf(' subMenuToggle ') === -1) {
						target = target.closest('.subMenuToggle');
					}
					_self.toggleSubMenu(target.closest('.navLinkSubAction'));
					e.preventDefault();
					return false;
				});
			}
			// this.$el.find('.navLinkAction .subMenuToggle').on('click', function(e) {
			// 	_self.toggleSubMenu(jQuery(this).closest('.navLinkSubAction'));
			// 	e.preventDefault();
			// 	return false;
			// });
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
			// this.$el.find('.navLinkAction').on('keydown', function (e){
			// 	if(e.keyCode == 13){
			// 		_self.handleLink(jQuery(this).closest('.navLink'), e);
			// 	}
			// });
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction .subMenuToggle');
			for (var i = 0; i < $elms.length; i++) {
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
			}
			// this.$el.find('.navLinkAction .subMenuToggle').on('keydown', function (e){
			// 	if(e.keyCode == 13){
			// 		_self.toggleSubMenu(jQuery(this).closest('.navLinkSubAction'));
			// 		e.preventDefault();
			// 		return false;
			// 	}
			// });
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction .subMenuToggle');
			for (var i = 0; i < $elms.length; i++) {
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
			// this.$el.find('.navLinkAction .subMenuToggle').on('focusin', function() {
			// 	jQuery(this).closest('.navLinkAction').addClass('focus');
			// });
			// this.$el.find('.navLinkAction .subMenuToggle').on('focusout', function() {
			// 	jQuery(this).closest('.navLinkAction').removeClass('focus');
			// });
			var $elms = document.querySelectorAll(this.topSelector + ' > .navLinks > .navLink > .navLinkAction > .navLinkSpecial');
			for (var i = 0; i < $elms.length; i++) {
				$elms.style['max-height'] = $elms[i].querySelector('.navMenu').offsetHeight + 'px';
			}
		}
	}
	,toggleSubMenu: function($action) {
		var $link = $action.querySelector('.navLinkAction');
		var innerHeight = $action.querySelector('.navLinkSpecial > .navMenu').offsetHeight;
		console.log(innerHeight);
		if ($action.getAttribute('data-sub-state') == 'closed') {
			$action.querySelector('.navLinkSpecial').style.height = innerHeight + 'px';
			// $action.querySelector('.navLinkSpecial').style.display = 'block';
			$action.setAttribute('data-sub-state', 'opened');
			// $action.querySelector('.navLinkSpecial').style.display = 'block';
			// $action.find('> .navLinkSpecial').slideDown({
			// 	duration: 400
			// 	,start: function() {
			// 		if ($action.find('> .navLinkSpecial').css('display') == 'inline-block') {
			// 			$action.find('> .navLinkSpecial').css('display', 'block');
			// 		}
			// 		$action.attr('data-sub-state', 'opened');
			// 	}
			// 	,complete: function() {
			// 		if ($action.find('> .navLinkSpecial').css('display') == 'inline-block') {
			// 			$action.find('> .navLinkSpecial').css('display', 'block');
			// 		}
			// 		$action.attr('data-sub-state', 'opened');
			// 	}
			// });
		}
		else {
			// $action.querySelector('.navLinkSpecial').style.display = 'none';
			$action.setAttribute('data-sub-state', 'closed');
			// $action.find('> .navLinkSpecial').slideUp({
			// 	duration: 400
			// 	,start: function() {
			// 		$action.attr('data-sub-state', 'closed');
			// 	}
			// 	,complete: function() {
			// 		$action.attr('data-sub-state', 'closed');
			// 	}
			// });
		}
		$link.blur();
		$link.querySelector('.subMenuToggle').blur();
	}
	,handleLink: function($action, e) {
		var $link = $action.querySelector('.navLinkAction');
		if ($link.getAttribute('data-href')) {
			if (window.innerWidth < 600) {
				document.querySelector('.pageSkeleton')['SkeletonWidget_Skeleton'].closePageMenu();
				// jQuery('.pageSkeleton').data('SkeletonWidget_Skeleton').closePageMenu();
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
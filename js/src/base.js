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

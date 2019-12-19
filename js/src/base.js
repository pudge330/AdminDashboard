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
		if (this.$el instanceof jQuery) {
			return (this.$el.attr('data-state') == 'loaded');
		}
		return (this.$el.getAttribute('data-state') == 'loaded');
	}
	,setState: function(state) {
		if (this.$el instanceof jQuery) {
			this.$el.attr('data-state', state);
			return;
		}
		this.$el.setAttribute('data-state', state);
	}
	,getState: function(state) {
		if (this.$el instanceof jQuery) {
			return this.$el.attr('data-state');
		}
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
		jQuery(SkeletonWidget.modules.MODULE_NAME.widgetSelector).each(function() {
			SkeletonWidget.modules.MODULE_NAME.initWidget(jQuery(this));
		});
	}
	,initWidget: function(el) {
		return new SkeletonWidget.modules.MODULE_NAME({el: el});
	}
});
*/
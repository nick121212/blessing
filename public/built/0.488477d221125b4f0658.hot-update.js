webpackHotUpdate(0,{

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(281);
	__webpack_require__(282);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(25);
	var module_1 = __webpack_require__(281);
	var Controller = (function () {
	    function Controller() {
	        this.selected = this.selected || [];
	        this.key = this.key || "key";
	    }
	    Controller.prototype.isChecked = function (item) {
	        var _this = this;
	        return _.some(this.selected, function (selectItem) {
	            return item[_this.key] == selectItem[_this.key];
	        });
	    };
	    Controller.prototype.selectAll = function () {
	        var _this = this;
	        _.each(this.selected, function (item) {
	            _this.toggle(item, item.perGroupActions);
	        });
	    };
	    Controller.prototype.toggle = function (item, selected) {
	        var _this = this;
	        var remove = _.remove(selected || this.selected, function (selectItem) {
	            return item[_this.key] == selectItem[_this.key];
	        });
	        if (!remove.length) {
	            (selected || this.selected).push(item);
	        }
	    };
	    return Controller;
	}());
	exports.Controller = Controller;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: false,
	        bindToController: {
	            "key": "@?",
	            "selected": "=modandact"
	        },
	        controller: Controller,
	        controllerAs: 'modandactCtl'
	    };
	}
	module_1.module.directive("modandact", [Directive]);


/***/ }

})
//# sourceMappingURL=0.488477d221125b4f0658.hot-update.js.map
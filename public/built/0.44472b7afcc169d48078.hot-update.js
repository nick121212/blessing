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
	    Controller.prototype.toggle = function (item) {
	        var _this = this;
	        var remove = _.remove(this.selected, function (selectItem) {
	            return item[_this.key] == selectItem[key];
	        });
	        if (!remove.length) {
	            this.selected.push(item);
	        }
	    };
	    return Controller;
	}());
	exports.Controller = Controller;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: false,
	        require: "^ngModel",
	        bindToController: {
	            "ngModel": '=',
	            "key": "@?",
	            "selected": "=?"
	        },
	        controller: Controller
	    };
	}
	module_1.module.directive("modandact", [Directive]);


/***/ }

})
//# sourceMappingURL=0.44472b7afcc169d48078.hot-update.js.map
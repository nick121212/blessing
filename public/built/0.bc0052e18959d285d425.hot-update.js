webpackHotUpdate(0,{

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(221);
	__webpack_require__(223);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(221);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.key = "devices";
	        this.itemToolbars = [];
	        this.clientData = {
	            rows: []
	        };
	        this.itemToolbars = [];
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(224),
	        controller: Controller,
	        controllerAs: 'qtCtl',
	        link: function ($scope, $element, $attrs, $ctrl) {
	        }
	    };
	}
	module_1.module.directive('fxQueryTable', Directive);


/***/ }

})
//# sourceMappingURL=0.bc0052e18959d285d425.hot-update.js.map
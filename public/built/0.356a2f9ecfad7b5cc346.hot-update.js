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
	    function Controller($scope, fxAction, toolbarUtils) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.key = "devices";
	        this.itemToolbars = [];
	        this.clientData = {
	            rows: []
	        };
	        this.itemToolbars = [
	            this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event) {
	            }).toValue()
	        ];
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
//# sourceMappingURL=0.356a2f9ecfad7b5cc346.hot-update.js.map
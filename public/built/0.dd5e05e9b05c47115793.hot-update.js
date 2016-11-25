webpackHotUpdate(0,{

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(221);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.key = "devices";
	        this.clientData = {
	            rows: []
	        };
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tpls/query.table.jade\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	        controller: Controller,
	        controllerAs: 'qtCtl',
	        link: function ($scope, $element, $attrs, $ctrl) {
	        }
	    };
	}
	module_1.module.directive('fxQueryTable', Directive);


/***/ }

})
//# sourceMappingURL=0.dd5e05e9b05c47115793.hot-update.js.map
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
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.key = "devices";
	        this.itemToolbars = [];
	        this.toolbars = [];
	        this.layout = "column";
	        this.clientData = {
	            rows: []
	        };
	        this.itemToolbars.push(this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	        this.toolbars.push(this.toolbarUtils.btnBuilder("删除", "md-fab md-raised md-mini", false).iconBuilder("{{qtCtl.layout=='column'?'vertical_align_center':'toggle-switch-off'}}", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction", "toolbarUtils"];
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
//# sourceMappingURL=0.96866d45b21718ba8496.hot-update.js.map
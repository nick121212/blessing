webpackHotUpdate(0,{

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(149);
	__webpack_require__(150);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(149);
	var Controller = (function () {
	    function Controller($scope, fxAction, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.key = "devices";
	        this.itemToolbars = [];
	        this.toolbars = [];
	        this.topToolbars = [];
	        this.layout = "column";
	        this.clientData = {
	            rows: []
	        };
	        this.topToolbars.push(this.toolbarUtils.labelBuilder("\u6240\u9009\u9879\u76EE").attrBuilder({ flex: "" }).toValue());
	        this.itemToolbars.push(this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	        this.toolbars.push(this.toolbarUtils.btnBuilder("改变布局方向", "md-fab md-raised md-mini", false).iconBuilder("{{qtCtl.layout=='column'?'format-vertical-align-center':'format-horizontal-align-center'}}", {}).btnClick(function ($event, item, index) {
	            _this.layout === "column" ? _this.layout = "row" : _this.layout = "column";
	        }).toValue());
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction", "toolbarUtils", "materialUtils"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(151),
	        controller: Controller,
	        controllerAs: 'qtCtl',
	        link: function ($scope, $element, $attrs, $ctrl) {
	        }
	    };
	}
	module_1.module.directive('fxQueryTable', Directive);


/***/ }

})
//# sourceMappingURL=0.38df8d800fe14679b821.hot-update.js.map
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
	        this.topToolbars = [];
	        this.layout = "column";
	        this.clientData = {
	            rows: []
	        };
	        this.topToolbars.push(this.toolbarUtils.noneBuilder("icon").iconBuilder(this.actionModel.icon, { fill: "black" }).toValue());
	        this.topToolbars.push(this.toolbarUtils.labelBuilder("" + this.actionModel.title).attrBuilder({ flex: "" }).toValue());
	        this.itemToolbars.push(this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	        this.toolbars.push(this.toolbarUtils.btnBuilder("改变布局方向", "md-fab md-raised md-mini", false).iconBuilder("{{qtCtl.layout=='column'?'format-vertical-align-center':'format-horizontal-align-center'}}", {}).btnClick(function ($event, item, index) {
	            _this.layout === "column" ? _this.layout = "row" : _this.layout = "column";
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
//# sourceMappingURL=0.be453fe33139f19f495c.hot-update.js.map
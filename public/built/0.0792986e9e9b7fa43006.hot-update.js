webpackHotUpdate(0,{

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(151);
	__webpack_require__(152);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(151);
	var _ = __webpack_require__(27);
	var Controller = (function () {
	    function Controller($scope, fxAction, toolbarUtils, $mdDialog, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.materialUtils = materialUtils;
	        this.itemToolbars = [];
	        this.toolbars = [];
	        this.topToolbars = [];
	        this.layout = "row";
	        this.showSearchTable = true;
	        if (!this.clientData) {
	            this.clientData = {};
	        }
	        this.topToolbars.push(this.toolbarUtils.labelBuilder("\u6240\u9009\u9879\u76EE").attrBuilder({ flex: "" }).toValue());
	        this.itemToolbars.push(this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	        this.closeFn && this.toolbars.push(this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close", {}).btnClick(function ($event, item, index) {
	            console.log(_this.closeFn);
	            _this.closeFn && _this.closeFn();
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("改变布局方向", "md-icon-button", false).iconBuilder("{{qtCtl.layout=='column'?'format-vertical-align-center':'format-horizontal-align-center'}}", {}).btnClick(function ($event, item, index) {
	            _this.layout === "column" ? _this.layout = "row" : _this.layout = "column";
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("{{!qtCtl.showSearchTable?'显示资产信息':'隐藏资产信息'}}", "md-icon-button", false).iconBuilder("{{!qtCtl.showSearchTable?'arrow-down-bold-circle-outline':'arrow-up-bold-circle-outline'}}", {}).btnClick(function ($event, item, index) {
	            _this.showSearchTable = !_this.showSearchTable;
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("清空所有选中数据", "md-icon-button", false).iconBuilder("clear_all", {}).btnClick(function ($event, item, index) {
	            _this.ngModel.length = 0;
	        }).toValue());
	        this.$scope.$watch(function () {
	            return _this.ngModel;
	        }, function (newValue) {
	            if (_.isArray(newValue)) {
	                _this.clientData.rows = newValue;
	                _this.clientData.count = _this.clientData.rows.length;
	            }
	        });
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction", "toolbarUtils", "$mdDialog", "materialUtils"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: false,
	        require: "^ngModel",
	        transclude: true,
	        bindToController: {
	            key: '@fxQueryTable',
	            closeFn: '&?closeFn',
	            ngModel: '=?'
	        },
	        template: __webpack_require__(153),
	        controller: Controller,
	        controllerAs: 'qtCtl',
	        link: function ($scope, $element, $attrs, $ctrl) {
	        }
	    };
	}
	module_1.module.directive('fxQueryTable', Directive);


/***/ }

})
//# sourceMappingURL=0.0792986e9e9b7fa43006.hot-update.js.map
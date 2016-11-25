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
	    function Controller($scope, fxAction, toolbarUtils, $mdDialog, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
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
	            var confirm = _this.$mdDialog.confirm()
	                .title("删除")
	                .textContent("确定吗！")
	                .targetEvent($event)
	                .ok("确定")
	                .cancel("取消");
	            return _this.$mdDialog.show(confirm).then(function () {
	                _this.clientData.rows.splice(index, 1);
	            });
	        }).toValue());
	        this.toolbars.push(this.toolbarUtils.btnBuilder("改变布局方向", "md-fab md-raised md-mini", false).iconBuilder("{{qtCtl.layout=='column'?'format-vertical-align-center':'format-horizontal-align-center'}}", {}).btnClick(function ($event, item, index) {
	            _this.layout === "column" ? _this.layout = "row" : _this.layout = "column";
	        }).toValue());
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction", "toolbarUtils", "$mdDialog", "materialUtils"];
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
//# sourceMappingURL=0.f4a3dd14f61bcc88c069.hot-update.js.map
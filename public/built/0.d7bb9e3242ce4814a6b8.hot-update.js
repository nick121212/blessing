webpackHotUpdate(0,{

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(40);
	__webpack_require__(54);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	var module_1 = __webpack_require__(41);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var pointer = __webpack_require__(56);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            if (actionModel.type === action_model_1.ActionType.form || actionModel.type === action_model_1.ActionType.wizard) {
	                if (pointer.has(_this.formData, actionModel.path || "")) {
	                    _this.formData = pointer.get(_this.formData, actionModel.path || "");
	                }
	            }
	            return _this.fxAction.getSchema(actionModel);
	        }).then(function (model) {
	            _this.actionModel = model;
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(130)(),
	        scope: true,
	        require: "^fxFormAction",
	        bindToController: {
	            formData: "=ngModel",
	            actionModel: "=?",
	            isBusy: "=?ngDisabled",
	            key: "@?"
	        },
	        controller: Controller,
	        controllerAs: 'formCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attrs, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxFormAction", Directive);


/***/ }

})
//# sourceMappingURL=0.d7bb9e3242ce4814a6b8.hot-update.js.map
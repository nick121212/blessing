webpackHotUpdate(0,{

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(42);
	__webpack_require__(57);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(135);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	__webpack_require__(144);
	var module_1 = __webpack_require__(43);
	__webpack_require__(146);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(43);
	var action_model_1 = __webpack_require__(29);
	var pointer = __webpack_require__(58);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.$scope.$on("$destroy", function () {
	            _this.formData = null;
	            _this.actionModel = null;
	            _this.ngModel = null;
	        });
	        if (this.actionModel) {
	            this.getModelData(this.actionModel);
	        }
	    }
	    Controller.prototype.getModelData = function (actionModel) {
	        if (actionModel.type === action_model_1.ActionType.form && actionModel.form) {
	            if (pointer.has(this.ngModel, actionModel.form.path || "")) {
	                this.formData = pointer.get(this.ngModel, actionModel.form.path || "");
	            }
	        }
	        !this.formData && (this.formData = {});
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            _this.getModelData(actionModel);
	            return _this.fxAction.getSchema(actionModel);
	        }).then(function (model) {
	            _this.actionModel = model;
	        }).then((this.actionModel), {}).then(function () {
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
	        template: __webpack_require__(132)(),
	        scope: true,
	        require: "^fxFormAction",
	        bindToController: {
	            ngModel: "=ngModel",
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
	            }, function (newValue) {
	                newValue && $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxFormAction", Directive);


/***/ }

})
//# sourceMappingURL=0.6aff346813b7012cbe88.hot-update.js.map
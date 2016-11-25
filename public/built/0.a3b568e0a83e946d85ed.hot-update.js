webpackHotUpdate(0,{

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(43);
	__webpack_require__(57);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(145);
	var module_1 = __webpack_require__(44);
	__webpack_require__(147);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 132:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(44);
	var action_model_1 = __webpack_require__(31);
	var pointer = __webpack_require__(59);
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
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            if (actionModel.type === action_model_1.ActionType.form && actionModel.form) {
	                if (pointer.has(_this.ngModel, actionModel.form.path || "")) {
	                    _this.formData = pointer.get(_this.ngModel, actionModel.form.path || "");
	                }
	            }
	            !_this.formData && (_this.formData = {});
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
	        template: __webpack_require__(133)(),
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
//# sourceMappingURL=0.a3b568e0a83e946d85ed.hot-update.js.map
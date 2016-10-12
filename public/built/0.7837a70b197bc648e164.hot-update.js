webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(35);
	__webpack_require__(37);
	var action_provider_1 = __webpack_require__(38);
	var utils_service_1 = __webpack_require__(45);
	var rest_service_1 = __webpack_require__(30);
	var login_value_1 = __webpack_require__(46);
	var modules_value_1 = __webpack_require__(47);
	var crawler_value_1 = __webpack_require__(48);
	var common_value_1 = __webpack_require__(49);
	var backup_value_1 = __webpack_require__(50);
	var salt_api_value_1 = __webpack_require__(51);
	var schema_value_1 = __webpack_require__(258);
	var form_directive_1 = __webpack_require__(52);
	var list_directive_1 = __webpack_require__(54);
	var dialog_form_directive_1 = __webpack_require__(56);
	var search_directive_1 = __webpack_require__(58);
	var wizard_directive_1 = __webpack_require__(60);
	var dialog_wizard_directive_1 = __webpack_require__(62);
	var builder_directive_1 = __webpack_require__(64);
	var autocomplete_provider_1 = __webpack_require__(66);
	var jsoneditor_provider_1 = __webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(72);
	__webpack_require__(73);
	var _name = "fxAction";
	var module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	utils_service_1.default(module);
	action_provider_1.default(module);
	form_directive_1.default(module);
	list_directive_1.default(module);
	modules_value_1.default(module);
	login_value_1.default(module);
	dialog_form_directive_1.default(module);
	search_directive_1.default(module);
	wizard_directive_1.default(module);
	dialog_wizard_directive_1.default(module);
	builder_directive_1.default(module);
	crawler_value_1.default(module);
	common_value_1.default(module);
	autocomplete_provider_1.default(module);
	jsoneditor_provider_1.default(module);
	salt_api_value_1.default(module);
	backup_value_1.default(module);
	schema_value_1.default(module);
	function sfLayout(args) {
	    var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	    if (layoutDiv && args.form.grid) {
	        Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	            layoutDiv.setAttribute(property, args.form.grid[property]);
	        });
	    }
	}
	;
	module
	    .config(["sfErrorMessageProvider", function (sfErrorMessageProvider) {
	        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
	        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
	        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
	        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
	        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
	        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
	        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
	    }])
	    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", function (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder) {
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'jeditor', "./decorators/jsoneditor.jade", sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder));
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'card', "./decorators/card.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]);
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfLayout, sfBuilderProvider.builders.condition, autoCompleteBuilder.builder, sfBuilderProvider.builders.transclusion]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(138)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(140)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(141)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var Controller = (function () {
	    function Controller($scope, $timeout, fxAction, toolbarUtils, materialUtils, $mdDialog) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.$mdDialog = $mdDialog;
	        this.isShow = true;
	        this.selectedIndex = 0;
	        this.initToolbar();
	        this.$scope.$on("$destroy", function () {
	            _this.formData = null;
	            _this.$forms = null;
	            _this.toolbars = null;
	            _this.actionModel = null;
	        });
	    }
	    Controller.prototype.initForm = function (action, $scope) {
	        if (!this.$forms) {
	            this.$forms = {};
	        }
	        this.$forms[action.key] = $scope[(action.key + "Form")];
	    };
	    Controller.prototype.showForm = function (action, index) {
	        return index === 0 || this.$forms.hasOwnProperty(action.key) || index == this.selectedIndex || index == this.selectedIndex + 1;
	    };
	    Controller.prototype.doCheckCurrentForm = function (index) {
	        var actionModel = this.actionModel.wizard.actions[_.isUndefined(index) ? this.selectedIndex : index];
	        if (this.$forms) {
	            var formController = this.$forms[("" + actionModel.key)];
	            if (!this.fxAction.doFormCheck(formController)) {
	                return false;
	            }
	        }
	        return true;
	    };
	    Controller.prototype.doCheckForms = function () {
	        var _this = this;
	        var res = true;
	        _.each(this.actionModel.wizard.actions, function (action, index) {
	            res = _this.doCheckCurrentForm(index);
	            if (!res) {
	                _this.selectedIndex = index;
	                return false;
	            }
	        });
	        return res;
	    };
	    Controller.prototype.reset = function () {
	        var _this = this;
	        this.formData = {};
	        this.$forms = {};
	        this.selectedIndex = 0;
	        this.isShow = false;
	        this.$timeout(function () {
	            _this.isShow = true;
	        }, 0);
	    };
	    Controller.prototype.initToolbar = function () {
	        var _this = this;
	        this.toolbars = [
	            this.toolbarUtils.btnBuilder("上一步", null, true, "top").iconBuilder("navigate_before").conditionBuilder("wizardCtl.selectedIndex>0", false).btnClick(function ($event) {
	                _this.selectedIndex && _this.selectedIndex--;
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("下一步", null, true, "top").iconBuilder(null, null, "navigate_next").conditionBuilder("wizardCtl.selectedIndex < wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckCurrentForm() && _.isArray(_this.actionModel.wizard.actions) && _this.actionModel.wizard.actions.length > _this.selectedIndex) {
	                    _this.selectedIndex++;
	                }
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("完成", "md-primary", true, "top").iconBuilder("done_all").conditionBuilder("!wizardCtl.isBusy && wizardCtl.selectedIndex===wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckForms()) {
	                    _this.isBusy = true;
	                    _this.fxAction.doAction(_this.actionModel.key, _this.formData).then(function (result) {
	                        _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                        if (_.isFunction(_this.submitCallBack)) {
	                            _this.submitCallBack();
	                        }
	                    }).finally(function () {
	                        _this.isBusy = false;
	                    });
	                }
	            }).toValue()
	        ];
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        var actionModel;
	        this.fxAction.getModel(this.key).then(function (model) {
	            actionModel = _.cloneDeep(model);
	            return _this.fxAction.getModels(model.wizard.actions);
	        }).then(function (actionModels) {
	            var actions = [];
	            _.each(actionModel.wizard.actions, function (action) {
	                if (_.isString(action)) {
	                    action = actionModels[action];
	                }
	                if (action && (action.type === action_model_1.ActionType.form || action.type === action_model_1.ActionType.wizard)) {
	                    actions.push(action);
	                }
	            });
	            actionModel.wizard.actions = actions;
	            _this.actionModel = actionModel;
	        });
	    };
	    Controller.$inject = ["$scope", "$timeout", "fxAction", "toolbarUtils", "materialUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(61)(),
	        scope: true,
	        require: "^fxWizardAction",
	        bindToController: {
	            formData: "=ngModel",
	            submitCallBack: "=?ngSubmit",
	            key: "@"
	        },
	        controller: Controller,
	        controllerAs: 'wizardCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attr, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive("fxWizardAction", Directive);
	};


/***/ }

})
//# sourceMappingURL=0.7837a70b197bc648e164.hot-update.js.map
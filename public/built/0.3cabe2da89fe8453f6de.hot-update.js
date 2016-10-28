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
	var schema_value_1 = __webpack_require__(51);
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
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfLayout, sfBuilderProvider.builders.condition, autoCompleteBuilder.builder, sfBuilderProvider.builders.transclusion]);
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

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pointer = __webpack_require__(41);
	function Provider() {
	    var Builder = (function () {
	        function Builder(form, fxAction) {
	            this.form = form;
	            this.fxAction = fxAction;
	        }
	        Builder.prototype.init = function (modelValue, formData) {
	            this.formData = formData;
	            if (modelValue) {
	                this.onChange(modelValue);
	            }
	        };
	        Builder.prototype.onChange = function (item) {
	            if (!item) {
	                return pointer.remove(this.formData, "/" + this.form.key.join('/'));
	            }
	            this.selected = item;
	            if (this.form.acOptions.keyField) {
	                return pointer.set(this.formData, "/" + this.form.key.join('/'), pointer.get(item, this.form.acOptions.keyField));
	            }
	            pointer.set(this.formData, "/" + this.form.key.join('/'), item);
	        };
	        Builder.prototype.query = function () {
	            var _this = this;
	            var actionModel, clientData = {};
	            var filter = {};
	            if (this.form.acOptions.actionKey) {
	                pointer.set(filter, this.form.acOptions.search, this.searchText);
	                return this.fxAction.getModel(this.form.acOptions.actionKey).then(function (aModel) {
	                    actionModel = aModel;
	                    return _this.fxAction.doAction(actionModel.key, filter);
	                }).then(function (results) {
	                    return _this.fxAction.doDealResult(actionModel, results, clientData);
	                }).then(function (results) {
	                    return results[_this.form.acOptions.dataField];
	                });
	            }
	            return this.form.data || [];
	        };
	        Builder.$inject = ["form", "fxAction"];
	        return Builder;
	    }());
	    var config = {
	        fxAction: null,
	    };
	    this.builder = function (args) {
	        args.form.acOptions = _.extend({
	            textField: "",
	            keyField: "",
	            dataField: "",
	            noCache: false,
	            search: "",
	            actionKey: ""
	        }, args.form.acOptions || {});
	        args.form.boost = new Builder(args.form, config.fxAction);
	    };
	    this.$get = ["fxAction", function (fxAction) {
	            config.fxAction = fxAction;
	            return {};
	        }];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.provider('autoCompleteBuilder', [Provider]);
	};


/***/ }

})
//# sourceMappingURL=0.3cabe2da89fe8453f6de.hot-update.js.map
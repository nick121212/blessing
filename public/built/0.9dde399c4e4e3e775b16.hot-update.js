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
	var modules_value_1 = __webpack_require__(46);
	var common_value_1 = __webpack_require__(47);
	var backup_value_1 = __webpack_require__(48);
	var schema_value_1 = __webpack_require__(49);
	var action_value_1 = __webpack_require__(50);
	var form_directive_1 = __webpack_require__(51);
	var list_directive_1 = __webpack_require__(53);
	var dialog_form_directive_1 = __webpack_require__(55);
	var search_directive_1 = __webpack_require__(57);
	var wizard_directive_1 = __webpack_require__(59);
	var dialog_wizard_directive_1 = __webpack_require__(61);
	var builder_directive_1 = __webpack_require__(63);
	var autocomplete_provider_1 = __webpack_require__(65);
	var jsoneditor_provider_1 = __webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(71);
	__webpack_require__(72);
	var _name = "fxAction";
	var module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	utils_service_1.default(module);
	action_provider_1.default(module);
	form_directive_1.default(module);
	list_directive_1.default(module);
	modules_value_1.default(module);
	dialog_form_directive_1.default(module);
	search_directive_1.default(module);
	wizard_directive_1.default(module);
	dialog_wizard_directive_1.default(module);
	builder_directive_1.default(module);
	common_value_1.default(module);
	autocomplete_provider_1.default(module);
	jsoneditor_provider_1.default(module);
	backup_value_1.default(module);
	schema_value_1.default(module);
	action_value_1.default(module);
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
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(137)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(138)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(140)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pointer = __webpack_require__(41);
	var _ = __webpack_require__(31);
	function Provider() {
	    var config = {
	        fxAction: null,
	    };
	    var Builder = (function () {
	        function Builder(form) {
	            this.form = form;
	        }
	        Builder.prototype.init = function (form, modelValue, formData) {
	            form.boost = new Builder(form);
	            form.boost.formData = formData;
	            if (modelValue) {
	                form.boost.onChange(modelValue);
	            }
	        };
	        Builder.prototype.onChange = function (item) {
	            if (!item) {
	                return pointer.remove(this.formData, "/" + this.form.key.join('/'));
	            }
	            this.selected = item;
	            if (this.form.acOptions.keyField) {
	                if (pointer.has(item, "/" + this.form.acOptions.keyField)) {
	                    return pointer.set(this.formData, "/" + this.form.key.join('/'), pointer.get(item, "/" + this.form.acOptions.keyField));
	                }
	                else {
	                    console.error("autocomplete-1-\u6CA1\u6709\u5728item\u4E2D\u627E\u5230" + this.form.acOptions.keyField);
	                    return pointer.remove(this.formData, "/" + this.form.key.join('/'));
	                }
	            }
	            pointer.set(this.formData, "/" + this.form.key.join('/'), item);
	        };
	        Builder.prototype.query = function () {
	            var _this = this;
	            var actionModel, clientData = {};
	            var filter = {};
	            if (this.form.acOptions.actionKey) {
	                pointer.set(filter, this.form.acOptions.search, this.searchText);
	                _.forEach(this.form.acOptions._where, function (val, key) {
	                    pointer.set(filter, key, val);
	                });
	                return config.fxAction.getModel(this.form.acOptions.actionKey).then(function (aModel) {
	                    actionModel = aModel;
	                    return config.fxAction.doAction(actionModel.key, filter);
	                }).then(function (results) {
	                    return config.fxAction.doDealResult(actionModel, results, clientData);
	                }).then(function (results) {
	                    return results[_this.form.acOptions.dataField];
	                });
	            }
	            return this.form.data || [];
	        };
	        Builder.$inject = ["form", "fxAction"];
	        return Builder;
	    }());
	    this.builder = function (args) {
	        args.form.acOptions = _.extend({
	            textField: "",
	            keyField: "",
	            dataField: "",
	            noCache: false,
	            _where: {},
	            search: "",
	            actionKey: ""
	        }, args.form.acOptions || {});
	        args.form.boost = new Builder(args.form, 0);
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
//# sourceMappingURL=0.9dde399c4e4e3e775b16.hot-update.js.map
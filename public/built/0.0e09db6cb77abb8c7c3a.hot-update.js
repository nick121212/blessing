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
	        function Builder(form, arrayIndex) {
	            this.arrayIndex = arrayIndex;
	            this.form = _.cloneDeep(form);
	        }
	        Builder.prototype.init = function (form, modelValue, formData) {
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


/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(13);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<md-input-container sf-layout md-is-error=\"ngModel.$error &amp;&amp; ngModel.$invalid\" class=\"schema-form-autocomplete {{form.htmlClass}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<md-autocomplete style=\"height:48px;margin-top:-20px;\" ng-disabled=\"form.readonly\" ng-model=\"$$value$$\" sf-field-model=\"replaceAll\" ng-init=\"form.boost.init(form,$$value$$,model)\" md-no-cache=\"form.acOptions.noCache\" md-autoselect=\"true\" md-selected-item=\"form.boost.selected\" md-search-text=\"form.boost.searchText\" md-selected-item-change=\"form.boost.onChange(item)\" md-items=\"item in form.boost.query()\" md-item-text=\"item[form.acOptions.textField]\" md-floating-label=\"{{ form.title }}\" placeholder=\"{{ form.placeholder }}\" md-menu-class=\"autocomplete-custom-template\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<md-item-template>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 20, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<div>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<span ng-if=\"!form.muti\" md-highlight-text=\"searchText\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 21, jade_debug[0].filename ));
	buf.push("{{ item[form.acOptions.textField] }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 22, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<span ng-if=\"form.muti\" md-highlight-text=\"searchText\" ng-repeat=\"key in form.muti\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 22, jade_debug[0].filename ));
	buf.push("{{ !$first ? (form.acOptions.prefix || '-'):'' }} {{ item[form.acOptions.textField] }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-item-template>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<md-not-found>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 23, jade_debug[0].filename ));
	buf.push("没有记录");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-not-found>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-autocomplete>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 25, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 25, jade_debug[0].filename ));
	buf.push("{{ form.boost }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 27, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<input name=\"{{::form.key|sfCamelKey}}\" ng-model=\"form.boost.selected[form.acOptions.textField]\" schema-validate=\"form\" sf-changed=\"form\" class=\"ng-hide\">");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 28, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<div ng-messages=\"ngModel.$error\" aria-live=\"assertive\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 29, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<div sf-message ng-message ng-class=\"{'fx-invalid':ngModel.$invalid}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 30, "/srv/blessing/public/src/directives/action/decorators/autocomplete-1.jade" ));
	buf.push("<div ng-if=\"form.showHints\" ng-bind=\"form.description\" class=\"hint md-char-counter\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-input-container>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-input-container(class=\"schema-form-autocomplete {{form.htmlClass}}\",sf-layout,md-is-error=\"ngModel.$error && ngModel.$invalid\")\n    md-autocomplete(\n    style=\"height:48px;margin-top:-20px;\",\n    ng-disabled=\"form.readonly\",\n    ng-model=\"$$value$$\",\n    sf-field-model=\"replaceAll\",\n    ng-init=\"form.boost.init(form,$$value$$,model)\",\n    md-no-cache=\"form.acOptions.noCache\",\n    md-autoselect=\"true\",\n    md-selected-item=\"form.boost.selected\",\n    md-search-text=\"form.boost.searchText\",\n    md-selected-item-change=\"form.boost.onChange(item)\",\n    md-items=\"item in form.boost.query()\",\n    md-item-text=\"item[form.acOptions.textField]\",\n    md-floating-label=\"{{ form.title }}\",\n    placeholder=\"{{ form.placeholder }}\",\n    md-menu-class=\"autocomplete-custom-template\",\n    )\n        md-item-template\n            div\n                span(ng-if=\"!form.muti\",md-highlight-text=\"searchText\") {{ item[form.acOptions.textField] }}\n                span(ng-if=\"form.muti\",md-highlight-text=\"searchText\",ng-repeat=\"key in form.muti\") {{ !$first ? (form.acOptions.prefix || '-'):'' }} {{ item[form.acOptions.textField] }}\n        md-not-found 没有记录\n\n    span {{ form.boost }}\n\n    input.ng-hide(name=\"{{::form.key|sfCamelKey}}\",ng-model=\"form.boost.selected[form.acOptions.textField]\",schema-validate=\"form\",sf-changed=\"form\")\n    div(ng-messages=\"ngModel.$error\",aria-live=\"assertive\")\n        div(sf-message,ng-message,ng-class=\"{'fx-invalid':ngModel.$invalid}\")\n    div.hint.md-char-counter(ng-if=\"form.showHints\",ng-bind=\"form.description\")");
	}
	}

/***/ }

})
//# sourceMappingURL=0.0e09db6cb77abb8c7c3a.hot-update.js.map
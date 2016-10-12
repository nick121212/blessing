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

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var ModuleList = (function () {
	    function ModuleList(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleList.key,
	            type: action_model_1.ActionType.list,
	            title: "模块管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.title }}</span>", "模块名称").toValue(),
	                    actionUtils.columnBuilder("<ng-md-icon icon=\"{{ ::item.icon }}\"></ng-md-icon>", "图标").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.lft }}</span>", "lft", "lft").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.rgt }}</span>", "rgt", "rgt").toValue()
	                ],
	                showPagination: true,
	                searchActionKey: ModuleSearch.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: ModuleEdit.key }, { key: ModuleDelete.key }],
	            actions: [ModuleAdd.key],
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    jpp: {
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ModuleList.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleList.key = "module";
	    return ModuleList;
	}());
	var ModuleMenus = (function () {
	    function ModuleMenus(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleMenus.key,
	            type: action_model_1.ActionType.list,
	            title: "模块管理",
	            icon: "view-module",
	            interfaces: [{
	                    key: "moduleMenu",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/modules/menu",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ModuleMenus.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleMenus.key = "moduleMenuAction";
	    return ModuleMenus;
	}());
	var ModuleAdd = (function () {
	    function ModuleAdd(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleAdd.key,
	            type: action_model_1.ActionType.form,
	            title: "新建模块",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "parentKey",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "title",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "link",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "icon",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "checkbox"
	                    }]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "modulesAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ModuleAdd.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleAdd.key = "modulesAddAction";
	    return ModuleAdd;
	}());
	var ModuleEdit = (function () {
	    function ModuleEdit(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleEdit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改模块",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "parentKey",
	                        type: "text",
	                        readonly: true,
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "title",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "link",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "icon",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "checkbox"
	                    }]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "modulesEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ModuleEdit.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleEdit.key = "modulesEditAction";
	    return ModuleEdit;
	}());
	var ModuleDelete = (function () {
	    function ModuleDelete() {
	        var actionModel = {
	            key: ModuleDelete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除模块",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除模块吗!"
	            },
	            interfaces: [{
	                    key: "modulesDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ModuleDelete.key = "modulesDeleteAction";
	    return ModuleDelete;
	}());
	var ModuleSearch = (function () {
	    function ModuleSearch() {
	        var actionModel = {
	            key: ModuleSearch.key,
	            icon: "search",
	            type: action_model_1.ActionType.form,
	            title: "模块搜索表单",
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        required: false,
	                        placeHolder: "KEY",
	                        description: "请输入key来进行搜索,不支持模糊查询",
	                        showHints: true,
	                        copyValueTo: ["/key/$eq"],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "select",
	                        copyValueTo: ["/showed/$eq"],
	                        titleMap: [{ value: null, name: "全部" }, { value: true, name: "显示" }, { value: false, name: "不显示" }],
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    ModuleSearch.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleSearch.key = "modulesSearchAction";
	    return ModuleSearch;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [ModuleDelete, ModuleMenus, ModuleList, ModuleSearch, ModuleAdd, ModuleEdit];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.040ec4af3b57b74b13d6.hot-update.js.map
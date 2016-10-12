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

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "爬虫配置文件管理",
	            icon: "content-save-settings",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.host }}</span>", "域名").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.interval }}</span>", "间隔时间").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.downloader }}</span>", "下载策略").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.description }}</span>", "详情").toValue()
	                ],
	                showPagination: true,
	                searchActionKey: Search.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Edit.key }, { key: Delete.key }, { key: Copy.key }],
	            actions: [Add.key],
	            interfaces: [{
	                    key: "crawlerSettingList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
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
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "crawlerSettingListAction";
	    return List;
	}());
	var AddFirst = (function () {
	    function AddFirst(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFirst.key,
	            type: action_model_1.ActionType.form,
	            title: "基础设置",
	            icon: "add",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: "crawlerAddFirstActionForm"
	            }
	        };
	        return actionModel;
	    }
	    AddFirst.$inject = ["toolbarUtils", "actionUtils"];
	    AddFirst.key = "crawlerSettingAddFirstAction";
	    return AddFirst;
	}());
	var AddSecond = (function () {
	    function AddSecond(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddSecond.key,
	            type: action_model_1.ActionType.form,
	            title: "白名单设置",
	            icon: "add",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: "crawlerAddSecondActionForm"
	            }
	        };
	        return actionModel;
	    }
	    AddSecond.$inject = ["toolbarUtils", "actionUtils"];
	    AddSecond.key = "crawlerSettingAddSecondAction";
	    return AddSecond;
	}());
	var AddThird = (function () {
	    function AddThird(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddThird.key,
	            type: action_model_1.ActionType.form,
	            title: "其他设置",
	            icon: "add",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: "crawlerAddThirdActionForm"
	            }
	        };
	        return actionModel;
	    }
	    AddThird.$inject = ["toolbarUtils", "actionUtils"];
	    AddThird.key = "crawlerSettingAddThirdAction";
	    return AddThird;
	}());
	var AddForth = (function () {
	    function AddForth(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFifth.key,
	            type: action_model_1.ActionType.form,
	            title: "页面配置",
	            icon: "add",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: "crawlerAddForthActionForm"
	            }
	        };
	        return actionModel;
	    }
	    AddForth.$inject = ["toolbarUtils", "actionUtils"];
	    AddForth.key = "crawlerSettingAddForthAction";
	    return AddForth;
	}());
	var AddFifth = (function () {
	    function AddFifth(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFifth.key,
	            type: action_model_1.ActionType.form,
	            title: "页面配置",
	            icon: "add",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: "crawlerAddFifthActionForm"
	            }
	        };
	        return actionModel;
	    }
	    AddFifth.$inject = ["toolbarUtils", "actionUtils"];
	    AddFifth.key = "crawlerSettingAddFifthAction";
	    return AddFifth;
	}());
	var Add = (function () {
	    function Add() {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.wizard,
	            title: "新建爬虫配置文件",
	            icon: "add",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: "crawlerActionData",
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "crawlerSettingAddAction";
	    return Add;
	}());
	var Copy = (function () {
	    function Copy() {
	        var actionModel = {
	            key: Copy.key,
	            type: action_model_1.ActionType.wizard,
	            title: "复制爬虫配置文件",
	            icon: "content_copy",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: "crawlerActionData",
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "crawlerSettingCopyAction";
	    return Copy;
	}());
	var Edit = (function () {
	    function Edit(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.wizard,
	            title: "修改爬虫配置文件",
	            icon: "edit",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: "crawlerActionData",
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/key",
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.$inject = ["toolbarUtils", "actionUtils"];
	    Edit.key = "crawlerSettingEditAction";
	    return Edit;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除爬虫配置文件",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除爬虫配置文件吗!"
	            },
	            interfaces: [{
	                    key: "crawlerSettingDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/key",
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "crawlerSettingDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索爬虫配置文件",
	            icon: "search",
	            form: {
	                dataSchema: "crawlerActionData",
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        required: false,
	                        copyValueTo: ["/key/$eq"],
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "crawlerSettingSearchAction";
	    return Search;
	}());
	var Ack = (function () {
	    function Ack() {
	        var actionModel = {
	            key: Ack.key,
	            type: action_model_1.ActionType.form,
	            title: "爬虫命令",
	            icon: "apple-keyboard-command",
	            form: {
	                dataSchema: "crawlerAckActionData",
	                formSchema: "crawlerAckActionForm"
	            }
	        };
	        return actionModel;
	    }
	    Ack.key = "crawlerSettingAckAction";
	    return Ack;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List, Search, Add, Edit, Delete, Copy, Ack, AddFirst, AddSecond, AddThird, AddForth, AddFifth];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.9ece74ee2b34f9c41c92.hot-update.js.map
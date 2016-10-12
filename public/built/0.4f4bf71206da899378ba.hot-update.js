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
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "host",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "initDomain",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "interval",
	                        type: "number",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "downloader",
	                        type: "select",
	                        titleMap: [{
	                                "name": "SUPERAGENT",
	                                "value": "superagent"
	                            }, {
	                                "name": "PHANTOM",
	                                "value": "phantom"
	                            }],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }]
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
	                formSchema: [{
	                        key: "domainWhiteList",
	                        type: "chips",
	                        startEmpty: true,
	                        description: "域名白名单，配置可以爬取的域名列表",
	                        showHints: true,
	                        htmlClass: "md-block"
	                    }, {
	                        key: "whitePathList",
	                        type: "array",
	                        fieldHtmlClass: "layout-row flex",
	                        startEmpty: true,
	                        description: "路径白名单，配置可以爬取的路径列表",
	                        showHints: true,
	                        items: [{
	                                type: "section",
	                                htmlClass: "layout-row flex",
	                                items: [{
	                                        key: "whitePathList[].enable",
	                                        type: "select",
	                                        titleMap: [{
	                                                name: "启用",
	                                                value: true
	                                            }, {
	                                                name: "不启用",
	                                                value: false
	                                            }]
	                                    }, {
	                                        key: "whitePathList[].regexp",
	                                        htmlClass: "md-block flex",
	                                        type: "text"
	                                    }, {
	                                        key: "whitePathList[].scope",
	                                        type: "text"
	                                    }, {
	                                        key: "whitePathList[].description",
	                                        type: "text"
	                                    }]
	                            }]
	                    }]
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
	                formSchema: [{
	                        key: "proxySettings",
	                        type: "card",
	                        items: [{
	                                key: "proxySettings.useProxy",
	                                type: "checkbox"
	                            }, {
	                                key: "proxySettings.timeout",
	                                type: "number",
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.charset",
	                                type: "text",
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.ua",
	                                type: "textarea",
	                                maxLength: 300,
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.ipInfo",
	                                type: "card",
	                                items: [{
	                                        key: "proxySettings.ipInfo.host",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "proxySettings.ipInfo.port",
	                                        type: "number",
	                                        htmlClass: "md-block"
	                                    }]
	                            }],
	                        htmlClass: "md-block"
	                    }]
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
	                formSchema: [{
	                        key: "pages",
	                        type: "tabarray",
	                        startEmpty: true,
	                        fieldHtmlClass: "layout-column flex",
	                        items: [{
	                                type: "section",
	                                grid: { flex: "" },
	                                items: [{
	                                        key: "pages[].key",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].priority",
	                                        type: "number",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].fieldKey",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].strict",
	                                        type: "switch",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].strictFields",
	                                        startEmpty: true,
	                                        type: "chips",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].rule",
	                                        type: "array",
	                                        startEmpty: true,
	                                        items: [{
	                                                type: "section",
	                                                htmlClass: "layout-row flex",
	                                                items: [{
	                                                        key: "pages[].rule[].regexp",
	                                                        htmlClass: "md-block flex",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].rule[].scope",
	                                                        type: "text"
	                                                    }]
	                                            }]
	                                    }]
	                            }]
	                    }]
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
	                formSchema: [{
	                        key: "pages",
	                        type: "tabarray",
	                        items: [{
	                                type: "section",
	                                htmlClass: "column-row flex",
	                                items: [{
	                                        key: "pages[].key",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].areas",
	                                        type: "array",
	                                        startEmpty: true,
	                                        description: "区域配置，用户优化分析性能，减少dom的查询。",
	                                        showHints: true,
	                                        items: [{
	                                                type: "section",
	                                                grid: { flex: "", layout: "row" },
	                                                items: [{
	                                                        key: "pages[].areas[].key",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].areas[].selector",
	                                                        htmlClass: "md-block flex",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].areas[].dealStrategy",
	                                                        type: "text"
	                                                    }]
	                                            }]
	                                    }, {
	                                        key: "pages[].fields",
	                                        type: "jeditor",
	                                        htmlClass: "md-block"
	                                    }]
	                            }]
	                    }]
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
	                    dataSchema: dataSchema
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
	                    dataSchema: "crawlerActionData"
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
	                    dataSchema: "crawlerActionData"
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
	                dataSchema: {
	                    type: "object",
	                    required: ["key", "action"],
	                    properties: {
	                        key: {
	                            type: "string",
	                            title: "配置文件KEY"
	                        },
	                        action: {
	                            type: "string",
	                            title: "执行的命令"
	                        },
	                        options: {
	                            type: "object",
	                            title: "可选项",
	                            properties: {
	                                url: {
	                                    type: "string",
	                                    title: "测试的地址"
	                                },
	                                type: {
	                                    type: "string",
	                                    default: "forever",
	                                    title: "爬虫启动模式"
	                                },
	                                startCrawler: {
	                                    type: "boolean",
	                                    default: true,
	                                    title: "开启爬取链接模块"
	                                },
	                                startDeal: {
	                                    type: "boolean",
	                                    default: true,
	                                    title: "开启html处理模块"
	                                },
	                                startDownload: {
	                                    type: "boolean",
	                                    default: false,
	                                    title: "开启图片下载模块"
	                                },
	                                startChip: {
	                                    type: "boolean",
	                                    default: false,
	                                    title: "开启更换ip模块"
	                                }
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "action",
	                        type: "select",
	                        titleMap: [
	                            { "value": "crawler:start", "name": "开始爬虫", "group": "" },
	                            { "value": "crawler:stop", "name": "停止爬虫", "group": "" },
	                            { "value": "crawler:create", "name": "开启一个新爬虫", "group": "" },
	                            { "value": "crawler:reset", "name": "重置一个数据库", "group": "" },
	                            { "value": "crawler:test", "name": "测试地址", "group": "" },
	                            { "value": "crawler:retrydeal", "name": "重新分析一个网址", "group": "" }
	                        ],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "autocomplete-1",
	                        condition: "model.action==='crawler:start' || model.action==='crawler:retrydeal' || model.action==='crawler:reset' || model.action==='crawler:test'",
	                        acOptions: {
	                            textField: "key",
	                            dataField: "rows",
	                            noCache: false,
	                            search: "/where/key/$like",
	                            actionKey: List.key
	                        },
	                        htmlClass: "md-block"
	                    }, {
	                        key: "options",
	                        type: "card",
	                        grid: { "flex": "" },
	                        condition: "!!model.action",
	                        items: [{
	                                key: "options.type",
	                                type: "select",
	                                htmlClass: "md-block",
	                                titleMap: [
	                                    { "value": "forever", "name": "FOREVER启动" },
	                                    { "value": "", "name": "NODE启动" }
	                                ]
	                            }, {
	                                key: "options.url",
	                                htmlClass: "md-block",
	                                type: "text"
	                            }, {
	                                key: "options.startCrawler",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startDeal",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startDownload",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startChip",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }]
	                    }]
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
//# sourceMappingURL=0.4f4bf71206da899378ba.hot-update.js.map
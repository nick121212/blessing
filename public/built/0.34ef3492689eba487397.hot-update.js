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
	var autocomplete_directive_1 = __webpack_require__(55);
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
	exports.module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	utils_service_1.default(exports.module);
	action_provider_1.default(exports.module);
	form_directive_1.default(exports.module);
	list_directive_1.default(exports.module);
	modules_value_1.default(exports.module);
	dialog_form_directive_1.default(exports.module);
	search_directive_1.default(exports.module);
	wizard_directive_1.default(exports.module);
	dialog_wizard_directive_1.default(exports.module);
	builder_directive_1.default(exports.module);
	common_value_1.default(exports.module);
	autocomplete_provider_1.default(exports.module);
	jsoneditor_provider_1.default(exports.module);
	backup_value_1.default(exports.module);
	schema_value_1.default(exports.module);
	action_value_1.default(exports.module);
	autocomplete_directive_1.default(exports.module);
	function sfLayout(args) {
	    var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	    if (layoutDiv && args.form.grid) {
	        Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	            layoutDiv.setAttribute(property, args.form.grid[property]);
	        });
	    }
	}
	;
	exports.module
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
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfLayout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilder.builder]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(138)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(140)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(141)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "数据库备份文件管理",
	            icon: "backup",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<a target='_blank' href='/backups/{{ ::item }}'>{{::item}}</a>", "文件名称").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.replace('.sql','') | date: 'yyyy-MM-dd HH:mm:ss Z'}}</span>", "备份时间").toValue(),
	                ],
	                showPagination: false,
	                searchActionKey: "",
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Delete.key }, { key: Dump.key }],
	            actions: [Backup.key],
	            interfaces: [{
	                    key: "backupList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    jpp: {
	                        set: { "/rows": "" }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "backupListAction";
	    return List;
	}());
	var Backup = (function () {
	    function Backup() {
	        var actionModel = {
	            key: Backup.key,
	            type: action_model_1.ActionType.confirm,
	            title: "备份数据库文件",
	            icon: "backup",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要备份此文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDump",
	                    method: interface_model_1.MethodType.POST,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Backup.key = "backupBackupAction";
	    return Backup;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除备份数据库文件",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除备份文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "backupDeleteAction";
	    return Delete;
	}());
	var Dump = (function () {
	    function Dump() {
	        var actionModel = {
	            key: Dump.key,
	            type: action_model_1.ActionType.confirm,
	            title: "还原文件",
	            icon: "backup",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要还原此文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDump",
	                    method: interface_model_1.MethodType.PUT,
	                    params: false,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Dump.key = "backupDumpAction";
	    return Dump;
	}());
	var Download = (function () {
	    function Download() {
	        var actionModel = {
	            key: Download.key,
	            type: action_model_1.ActionType.form,
	            title: "上传文件",
	            icon: "upload",
	            refreshList: true,
	            interfaces: [{
	                    key: "backupDownload",
	                    method: interface_model_1.MethodType.GET,
	                    idFieldPath: "",
	                    params: true,
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Download.key = "backupDownloadAction";
	    return Download;
	}());
	var services = [List, Dump, Delete, Backup, Download];
	_.each(services, function (model) {
	    index_1.module.service(model.key, model);
	});


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "SCHEMA管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.type}}</span>", "操作类型", "type").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.title }}</span>", "操作标题").toValue()
	                ],
	                queryData: { limit: 50 },
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
	                    key: "actionList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "actions",
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
	    List.key = "action";
	    return List;
	}());
	var Add = (function () {
	    function Add() {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.form,
	            title: "新建SCHEMA",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: [
	                    {
	                        "key": "key",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "title",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "icon",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "type",
	                        "type": "select",
	                        "htmlClass": "md-block",
	                        "titleMap": [
	                            {
	                                "name": "NONE",
	                                "value": 0
	                            },
	                            {
	                                "name": "列表操作",
	                                "value": 1
	                            },
	                            {
	                                "name": "表单操作",
	                                "value": 2
	                            },
	                            {
	                                "name": "多表单操作",
	                                "value": 3
	                            },
	                            {
	                                "name": "确认操作",
	                                "value": 4
	                            }
	                        ]
	                    },
	                    {
	                        "key": "condition",
	                        "type": "text",
	                        "condition": "model.type>1",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "successMsg",
	                        "condition": "model.type>1",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "refreshList",
	                        "condition": "model.type>1",
	                        "type": "checkbox"
	                    },
	                    {
	                        "key": "closeDialog",
	                        "condition": "model.type>1",
	                        "type": "checkbox"
	                    },
	                    {
	                        "key": "list",
	                        "type": "card",
	                        "condition": "model.type==1",
	                        "fieldClass": "flex layout-column",
	                        "items": [
	                            {
	                                "key": "list.columns",
	                                "type": "array",
	                                "htmlClass": "flex",
	                                "items": [
	                                    {
	                                        "key": "list.columns[].content",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].title",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].name",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].sort",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].unit",
	                                        "type": "text"
	                                    }
	                                ]
	                            }, {
	                                "key": "list.searchActionKey",
	                                "type": "autocomplete-1",
	                                "htmlClass": "md-block flex",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "actionKey": "schemaListAction"
	                                }
	                            }, {
	                                "key": "list.showPagination",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showSearchBtn",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showRefreshBtn",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showSearchPanel",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.queryData.limit",
	                                "type": "number"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "wizard",
	                        "type": "card",
	                        "condition": "model.type==3",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "wizard.actions",
	                                "type": "array",
	                                "htmlClass": "flex",
	                                "items": [
	                                    {
	                                        "key": "wizard.actions[]",
	                                        "type": "autocomplete-1",
	                                        "startEmpty": true,
	                                        "htmlClass": "md-block flex",
	                                        "acOptions": {
	                                            "textField": "title",
	                                            "keyField": "key",
	                                            "dataField": "rows",
	                                            "noCache": false,
	                                            "search": "/where/key/$like",
	                                            "actionKey": "action"
	                                        }
	                                    }
	                                ]
	                            }
	                        ]
	                    },
	                    {
	                        "key": "form",
	                        "type": "card",
	                        "condition": "model.type==2",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "form.dataSchema",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "_where": {
	                                        "/where/type/$eq": "DATA"
	                                    },
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "form.formSchema",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "_where": {
	                                        "/where/type/$eq": "FORM"
	                                    },
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "form.title",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.path",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "confirm",
	                        "type": "card",
	                        "condition": "model.type==4",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "confirm.confirmTitle",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmContent",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmOk",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmCancel",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "interfaces",
	                        "type": "array",
	                        "items": [
	                            {
	                                "key": "interfaces[].key",
	                                "type": "text"
	                            },
	                            {
	                                "key": "interfaces[]",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "dataField": "rows",
	                                    "noCache": true,
	                                    "search": "/where/key/$like",
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    }
	                ]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "actionAddAction";
	    return Add;
	}());
	var Edit = (function () {
	    function Edit() {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改SCHEMA",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionEditActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.key = "actionEditAction";
	    return Edit;
	}());
	var Copy = (function () {
	    function Copy() {
	        var actionModel = {
	            key: Copy.key,
	            type: action_model_1.ActionType.form,
	            title: "复制SCHEMA",
	            icon: "content_copy",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionAddActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    jpp: {
	                        del: ["/id"]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "actionCopyAction";
	    return Copy;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除SCHEMA",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除SCHEMA吗!"
	            },
	            interfaces: [{
	                    key: "actionDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "actionDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索操作",
	            icon: "search",
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionSearchActionForm"
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "actionSearchAction";
	    return Search;
	}());
	var services = [List, Add, Edit, Delete, Copy, Search];
	_.each(services, function (ser) {
	    index_1.module.service(ser.key, ser);
	});


/***/ }

})
//# sourceMappingURL=0.34ef3492689eba487397.hot-update.js.map
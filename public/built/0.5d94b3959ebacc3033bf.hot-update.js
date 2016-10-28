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

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	                                "key": "interfaces[].key"
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List, Add, Edit, Delete, Copy, Search];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.5d94b3959ebacc3033bf.hot-update.js.map
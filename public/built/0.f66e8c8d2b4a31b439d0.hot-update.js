webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(35);
	__webpack_require__(49);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(212);
	__webpack_require__(129);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	var module_1 = __webpack_require__(36);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(36);
	var action_model_1 = __webpack_require__(50);
	var interface_model_1 = __webpack_require__(51);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "接口管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.group}}</span>", "分组名称", "group").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.type }}</span>", "模块类型").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.description }}</span>", "描述").toValue(),
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
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "schemas",
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
	    List.key = "schemaListAction";
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
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "schemaAddAction";
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
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.key = "schemaEditAction";
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
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        del: ["/id"]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "schemaCopyAction";
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
	                    key: "schemaDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "schemaDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索SCHEMA",
	            icon: "search",
	            form: {
	                dataSchema: "schemaActionData",
	                formSchema: "schemaSearchActionData"
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "schemaSearchAction";
	    return Search;
	}());
	var services = [List, Add, Edit, Delete, Copy, Search];
	_.each(services, function (ser) {
	    module_1.module.service(ser.key, ser);
	});


/***/ }

})
//# sourceMappingURL=0.f66e8c8d2b4a31b439d0.hot-update.js.map
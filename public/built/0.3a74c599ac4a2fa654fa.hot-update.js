webpackHotUpdate(0,{

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(42);
	__webpack_require__(58);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(145);
	var module_1 = __webpack_require__(43);
	__webpack_require__(147);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(43);
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
	var ListSchema = (function () {
	    function ListSchema(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListSchema.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ListSchema.$inject = ["toolbarUtils", "actionUtils"];
	    ListSchema.key = "schemaCommonfx-1";
	    return ListSchema;
	}());
	var ListAction = (function () {
	    function ListAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "actionList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/actions/manual/opera",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ListAction.$inject = ["toolbarUtils", "actionUtils"];
	    ListAction.key = "actionCommonfx-1";
	    return ListAction;
	}());
	var ConfigAction = (function () {
	    function ConfigAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ConfigAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "configAction",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/home/config",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ConfigAction.$inject = ["toolbarUtils", "actionUtils"];
	    ConfigAction.key = "configAction";
	    return ConfigAction;
	}());
	var services = [ListSchema, ListAction, ConfigAction];
	_.each(services, function (ser) {
	    module_1.module.service(ser.key, ser);
	});


/***/ }

})
//# sourceMappingURL=0.3a74c599ac4a2fa654fa.hot-update.js.map
webpackHotUpdate(0,{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(14);
	var ngMaterialIcons = __webpack_require__(18);
	var mdDataTable = __webpack_require__(20);
	var router_1 = __webpack_require__(22);
	var material_service_1 = __webpack_require__(38);
	var rest_service_1 = __webpack_require__(39);
	var action_1 = __webpack_require__(41);
	var dycompile_1 = __webpack_require__(149);
	var query_table_1 = __webpack_require__(150);
	var compare_1 = __webpack_require__(154);
	var execute_cmd_1 = __webpack_require__(32);
	var execute_1 = __webpack_require__(157);
	var pages_1 = __webpack_require__(208);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	exports.module = angular.module("pageModule", [pages_1.default, execute_1.default, compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', 'btford.socket-io', material_service_1.default, rest_service_1.default, query_table_1.default]);
	execute_cmd_1.default(exports.module);
	exports.module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", "fxAction", function ($rootScope, $state, restUtils, materialUtils, fxAction) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	        $rootScope.$on("executeCmdList:clickItem", function (event, actionModel, item) {
	            if (actionModel.key === "executeCmdResList-detail") {
	                $rootScope.$broadcast("showExecuteCmdResult", item._id);
	                actionModel.cancel = true;
	            }
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var execute_cmd_1 = __webpack_require__(32);
	var PageExecuteCmdController = (function () {
	    function PageExecuteCmdController($rootScope, $stateParams, $timeout, materilUtils, fxAction, toolbarUtils) {
	        this.$rootScope = $rootScope;
	        this.$stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.materilUtils = materilUtils;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.executeResult = {};
	        this.key = execute_cmd_1.ExecuteCmdForm.key;
	        this.doInitToolbar();
	        this.formData = {
	            listIps: []
	        };
	    }
	    PageExecuteCmdController.prototype.doInitToolbar = function () {
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
	    };
	    PageExecuteCmdController.prototype.doSubmit = function ($event, form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, form);
	        var results;
	        if (promise) {
	            this.isBusy = true;
	            promise.then(function (res) {
	                _this.materilUtils.showMsg("执行命令成功！");
	                results = res;
	                return _this.fxAction.getModel(_this.key);
	            }).then(function (actionModel) {
	                _this.actionModel = actionModel;
	                return _this.fxAction.doDealResult(actionModel, results, _this.executeResult);
	            }).then(function (res) {
	                _this.$rootScope.$broadcast("showExecuteCmdResult", res.data.cmdid);
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }
	    };
	    PageExecuteCmdController.$inject = ["$rootScope", "$stateParams", "$timeout", "materialUtils", "fxAction", "toolbarUtils"];
	    return PageExecuteCmdController;
	}());
	exports.PageExecuteCmdController = PageExecuteCmdController;


/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
	var ExecuteCmdForm = (function () {
	    function ExecuteCmdForm() {
	        var actionModel = {
	            key: ExecuteCmdForm.key,
	            type: action_model_1.ActionType.form,
	            title: "",
	            icon: "",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["command", "listIps"],
	                    properties: {
	                        command: {
	                            type: "object",
	                            title: "命令"
	                        },
	                        listIps: {
	                            type: "array",
	                            default: [],
	                            title: "服务器列表",
	                            minItems: 1,
	                            items: {
	                                type: "object"
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "command",
	                        type: "autocomplete-1",
	                        placeHolder: "请选择命令",
	                        acOptions: {
	                            textField: "title",
	                            dataField: "rows",
	                            noCache: true,
	                            fields: [{ key: ["key"] }, { key: ["args"] }, { key: ["description"] }, { key: ["title"] }, { key: ["cmd"] }],
	                            search: "/where/key/$like",
	                            actionKey: "command"
	                        },
	                        htmlClass: "md-block"
	                    }, {
	                        key: "command.args[0]",
	                        type: "text",
	                        required: true,
	                        title: "命令参数",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "listIps",
	                        type: "querytable",
	                        qtOptions: {
	                            key: "devices"
	                        },
	                        startEmpty: true,
	                        htmlClass: "md-block"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "execute.cmd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    path: "/commands/manual/test",
	                    jpp: {
	                        set: [{ "from": "/queueItem", "to": "/data" }]
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ExecuteCmdForm.key = "execute.cmd";
	    return ExecuteCmdForm;
	}());
	exports.ExecuteCmdForm = ExecuteCmdForm;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [ExecuteCmdForm];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.34572f899153adb50ce5.hot-update.js.map
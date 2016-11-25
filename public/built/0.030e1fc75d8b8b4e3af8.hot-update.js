webpackHotUpdate(0,{

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var execute_cmd_1 = __webpack_require__(227);
	var PageExecuteCmdController = (function () {
	    function PageExecuteCmdController($stateParams, materilUtils, fxAction, toolbarUtils) {
	        this.$stateParams = $stateParams;
	        this.materilUtils = materilUtils;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.actionModel = new execute_cmd_1.ExecuteCmdForm().actionModel;
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
	    PageExecuteCmdController.prototype.showSivenav = function () {
	        this.isOpen = !this.isOpen;
	    };
	    PageExecuteCmdController.prototype.doSubmit = function ($event, form) {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.doAction(this.actionModel.key, this.formData, form).then(function (result) {
	            console.log(result);
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    PageExecuteCmdController.$inject = ["$stateParams", "materialUtils", "fxAction", "toolbarUtils"];
	    return PageExecuteCmdController;
	}());
	exports.PageExecuteCmdController = PageExecuteCmdController;


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(58);
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
	                            type: "string",
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
	                            keyField: "key",
	                            dataField: "rows",
	                            noCache: true,
	                            search: "/where/key/$like",
	                            actionKey: "command"
	                        },
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
	                    path: "login",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        this.actionModel = actionModel;
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
//# sourceMappingURL=0.030e1fc75d8b8b4e3af8.hot-update.js.map
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
	        this.actionModel = new execute_cmd_1.ExecuteCmdForm();
	        this.doInitToolbar();
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
	                    required: ["username", "password"],
	                    properties: {
	                        username: {
	                            type: "string",
	                            minLength: 4,
	                            maxLength: 20,
	                            title: "用户名"
	                        },
	                        eauth: {
	                            type: "string",
	                            default: "pam"
	                        },
	                        password: {
	                            type: "string",
	                            title: "密码",
	                            minLength: 4,
	                            maxLength: 20
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "username",
	                        type: "string",
	                        placeHolder: "用户名",
	                        icon: {
	                            leftIcon: "account"
	                        },
	                        htmlClass: "md-icon-left md-block"
	                    }, {
	                        key: "password",
	                        type: "password",
	                        icon: {
	                            leftIcon: "lock"
	                        },
	                        htmlClass: "md-icon-left md-block"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiLogin",
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
//# sourceMappingURL=0.7c1b07d3e6d4f564dd46.hot-update.js.map
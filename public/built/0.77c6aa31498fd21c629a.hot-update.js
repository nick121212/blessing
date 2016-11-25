webpackHotUpdate(0,{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(25);
	var page_d3_controller_1 = __webpack_require__(26);
	var page_allin_controller_1 = __webpack_require__(32);
	var page_execute_cmd_1 = __webpack_require__(33);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.page", {
	        url: "page/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: page_controller_1.PageController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(34)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(35)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(36)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(37)()
	            }
	        }
	    }).state('home.qt', {
	        url: "qt",
	        views: {
	            "content": {
	                controller: function () {
	                },
	                controllerAs: "pageCtl",
	                template: __webpack_require__(38)()
	            }
	        }
	    });
	};


/***/ },

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
	    var services = [ExecuteForm];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.77c6aa31498fd21c629a.hot-update.js.map
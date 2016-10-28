webpackHotUpdate(0,{

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var router_1 = __webpack_require__(240);
	var material_service_1 = __webpack_require__(29);
	var rest_service_1 = __webpack_require__(30);
	var salt_api_value_1 = __webpack_require__(259);
	var module = angular.module("saltModule", [ngMaterialIcons, ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "RestangularProvider",
	    function ($stateProvider, $urlRouterProvider, RestangularProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        RestangularProvider.setDefaultHeaders({
	            'Content-Type': 'application/json'
	        });
	        RestangularProvider.setDefaultHttpFields({
	            'withCredentials': true
	        });
	    }])
	    .run(["$state", "restUtils", "materialUtils", function ($state, restUtils, materialUtils) {
	    }]);
	salt_api_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(241);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.salt", {
	        url: "salt/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: index_controller_1.SaltController,
	                controllerAs: "saltCtl",
	                template: __webpack_require__(242)()
	            }
	        }
	    });
	};


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(31);
	var SaltController = (function () {
	    function SaltController($scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({ flex: "" }).toValue()
	        ];
	        this.fxAction.getModels(["saltApiLogin", "saltApiLogout", "saltApiMinions", "saltApiJobs", "saltApiEvents"]).then(function (actionModels) {
	            console.log(actionModels);
	            _.forEach(actionModels, function (actionModel) {
	                _this.toolbar.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-icon-button", false).iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                }).toValue());
	            });
	        });
	    }
	    SaltController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return SaltController;
	}());
	exports.SaltController = SaltController;


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var ip = "https://172.16.140.164";
	var Login = (function () {
	    function Login() {
	        var actionModel = {
	            key: Login.key,
	            type: action_model_1.ActionType.form,
	            title: "登陆",
	            icon: "login",
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
	                    address: ip,
	                    port: 8888,
	                    path: "login",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    header: {
	                        set: {
	                            "/X-Auth-Token": "/return/0/token"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Login.key = "saltApiLogin";
	    return Login;
	}());
	var Logout = (function () {
	    function Logout() {
	        var actionModel = {
	            key: Logout.key,
	            type: action_model_1.ActionType.confirm,
	            title: "salt退出登录",
	            icon: "logout",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要退出登录吗!"
	            },
	            interfaces: [{
	                    key: "saltApiLogin",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: 8888,
	                    path: "logout",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Logout.key = "saltApiLogout";
	    return Logout;
	}());
	var Minions = (function () {
	    function Minions() {
	        var actionModel = {
	            key: Minions.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有CLIENT",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取minions!"
	            },
	            interfaces: [{
	                    key: "saltApiMinions",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: 8888,
	                    path: "minions",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Minions.key = "saltApiMinions";
	    return Minions;
	}());
	var Jobs = (function () {
	    function Jobs() {
	        var actionModel = {
	            key: Jobs.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有JOBS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取JOBS!"
	            },
	            interfaces: [{
	                    key: "saltApiJobs",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: 8888,
	                    path: "jobs",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Jobs.key = "saltApiJobs";
	    return Jobs;
	}());
	var Events = (function () {
	    function Events() {
	        var actionModel = {
	            key: Events.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有EVENTS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取EVENTS!"
	            },
	            interfaces: [{
	                    key: "saltApiEvents",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: 8888,
	                    path: "events",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Events.key = "saltApiEvents";
	    return Events;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login, Logout, Minions, Jobs, Events];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.e7f1195e7558d17b2bd0.hot-update.js.map
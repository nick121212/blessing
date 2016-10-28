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
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", function ($rootScope, $state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
	                if (response.status === 200 && response.config["salt"] && what === "login") {
	                    $rootScope.$emit("saltLoginEvent", data);
	                }
	                return data;
	            });
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status === 401 && response.config["salt"]) {
	                    materialUtils.showErrMsg("SALT未登录");
	                    return false;
	                }
	                return true;
	            });
	        });
	    }]);
	salt_api_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var ip = "https://172.16.140.164";
	var port = 8888;
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
	                    port: port,
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
	                    config: {
	                        salt: true
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
	                    port: port,
	                    path: "logout",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    config: {
	                        salt: true
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
	                    port: port,
	                    path: "minions",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    config: {
	                        salt: true
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
	                    port: port,
	                    path: "jobs",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    config: {
	                        salt: true
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
	                    port: port,
	                    path: "events",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Events.key = "saltApiEvents";
	    return Events;
	}());
	var Stats = (function () {
	    function Stats() {
	        var actionModel = {
	            key: Stats.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有Stats",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取Stats!"
	            },
	            interfaces: [{
	                    key: "saltApiStats",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "stats",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Stats.key = "saltApiStats";
	    return Stats;
	}());
	var Run = (function () {
	    function Run() {
	        var actionModel = {
	            key: Run.key,
	            type: action_model_1.ActionType.form,
	            title: "执行命令",
	            icon: "run",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["client"],
	                    properties: {
	                        client: {
	                            type: "string",
	                            default: "local"
	                        },
	                        tgt: {
	                            type: "string",
	                            default: "*"
	                        },
	                        fun: {
	                            type: "string",
	                            default: "test.ping"
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "client",
	                        type: "text"
	                    }, {
	                        key: "tgt",
	                        type: "text"
	                    }, {
	                        key: "fun",
	                        type: "text"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiLogin",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
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
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Run.key = "saltApiRun";
	    return Run;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login, Logout, Minions, Jobs, Events, Stats];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.5d3b126e733457374789.hot-update.js.map
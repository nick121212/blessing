webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(1);
	var router_1 = __webpack_require__(256);
	var material_service_1 = __webpack_require__(140);
	var rest_service_1 = __webpack_require__(18);
	var action_1 = __webpack_require__(15);
	var login_value_1 = __webpack_require__(263);
	__webpack_require__(19);
	var module = angular.module("passportModule", [ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default, action_1.default, 'restangular']);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", function ($state, restUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status === 401 && !response.config["salt"]) {
	                    !$state.is("passport.login") && $state.go("passport.login");
	                }
	                return true;
	            });
	        });
	    }]);
	login_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var login_controller_1 = __webpack_require__(257);
	var register_controller_1 = __webpack_require__(258);
	var index_controller_1 = __webpack_require__(259);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("passport", {
	        url: "/passport",
	        abstract: true,
	        views: {
	            "": {
	                controller: index_controller_1.IndexController,
	                controllerAs: "indexCtl",
	                template: __webpack_require__(260)()
	            }
	        }
	    }).state("passport.login", {
	        url: "/login",
	        views: {
	            "passportContent": {
	                controller: login_controller_1.LoginController,
	                controllerAs: "loginCtl",
	                template: __webpack_require__(261)()
	            }
	        }
	    }).state("passport.register", {
	        url: "/register",
	        views: {
	            "passportContent": {
	                controller: register_controller_1.RegisterController,
	                controllerAs: "registerCtl",
	                template: __webpack_require__(262)()
	            }
	        }
	    });
	};


/***/ },

/***/ 257:
/***/ function(module, exports) {

	"use strict";
	var LoginController = (function () {
	    function LoginController($rootScope, $state, fxAction, materialUtils) {
	        this.$rootScope = $rootScope;
	        this.$state = $state;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.key = "login";
	        this.formData = { username: "nick", password: "nick" };
	    }
	    LoginController.prototype.doSubmit = function ($form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, $form);
	        promise && promise.then(function (user) {
	            _this.$rootScope.$emit('$stateRefresh');
	            _this.materialUtils.showMsg("登陆成功,正在跳转!");
	            _this.$state.go("home");
	            _this.$rootScope['user'] = user.loginAction.username;
	        });
	    };
	    LoginController.$inject = ["$rootScope", "$state", "fxAction", "materialUtils"];
	    return LoginController;
	}());
	exports.LoginController = LoginController;


/***/ },

/***/ 258:
/***/ function(module, exports) {

	"use strict";
	var RegisterController = (function () {
	    function RegisterController($rootScope, $timeout) {
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.title = "用户注册";
	    }
	    return RegisterController;
	}());
	exports.RegisterController = RegisterController;
	RegisterController.$inject = ["$rootScope", "$timeout"];


/***/ },

/***/ 259:
/***/ function(module, exports) {

	"use strict";
	var IndexController = (function () {
	    function IndexController($scope, $mdMedia) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$mdMedia = $mdMedia;
	        $scope.$watch(function () {
	            return $mdMedia('xs');
	        }, function (small) {
	            _this.screenIsSmall = small;
	        });
	    }
	    IndexController.$inject = ["$scope", "$mdMedia"];
	    return IndexController;
	}());
	exports.IndexController = IndexController;


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/index.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/passport/tpls/index.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/index.template.jade" ));
	buf.push("<md-content layout=\"row\" flex=\"100\" layout-align=\"center {{indexCtl.screenIsSmall?'stretch':'center'}}\" class=\"passport\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/passport/tpls/index.template.jade" ));
	buf.push("<md-content ui-view=\"passportContent\" md-whiteframe=\"2\" flex=\"20\" flex-sm=\"50\" flex-lg=\"30\" flex-xs=\"100\" flex-md=\"40\" class=\"passport-content\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content.passport(layout=\"row\",flex=\"100\",layout-align=\"center {{indexCtl.screenIsSmall?'stretch':'center'}}\")\n    md-content.passport-content(ui-view=\"passportContent\",md-whiteframe=\"2\",flex=\"20\", flex-sm=\"50\",flex-lg=\"30\",flex-xs=\"100\",flex-md=\"40\")\n");
	}
	}

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-content layout=\"column\" layout-padding>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<div flex class=\"logo center\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<form name=\"loginForm\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<div fx-form-action key=\"{{loginCtl.key}}\" ng-model=\"loginCtl.formData\" layout=\"column\" ng-submit=\"loginCtl.doSubmit(loginForm)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</form>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<div layout=\"row\" layout-align=\"space-around center\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-button ng-click=\"loginCtl.doSubmit(loginForm)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<ng-md-icon icon=\"login\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, jade_debug[0].filename ));
	buf.push("Login In");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<div layout=\"row\" layout-align=\"space-around center\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-button href=\"/passport/auth/gitlab\" class=\"md-icon-button\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-tooltip>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 13, jade_debug[0].filename ));
	buf.push("GITLAB");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	buf.push("<ng-md-icon icon=\"github-circle\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 18, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 20, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 22, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/pages/passport/tpls/login.template.jade" ));
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(layout=\"column\",layout-padding)\n    div.logo.center(flex)\n    form(name=\"loginForm\")\n        div(fx-form-action,key=\"{{loginCtl.key}}\",ng-model=\"loginCtl.formData\",layout=\"column\",ng-submit=\"loginCtl.doSubmit(loginForm)\")\n    div(layout=\"row\",layout-align=\"space-around center\")\n        md-button(ng-click=\"loginCtl.doSubmit(loginForm)\")\n            md-icon\n                ng-md-icon(icon=\"login\")\n            span Login In\n    md-divider\n    div(layout=\"row\",layout-align=\"space-around center\")\n        md-button.md-icon-button(href=\"/passport/auth/gitlab\")\n            md-tooltip GITLAB\n            md-icon\n                ng-md-icon(icon=\"github-circle\")\n        //- md-button.md-icon-button\n        //-     md-tooltip 微博\n        //-     md-icon\n        //-         ng-md-icon(icon=\"weibo\")\n        //- md-button.md-icon-button\n        //-     md-tooltip 微信\n        //-     md-icon\n        //-         ng-md-icon(icon=\"wechat\")");
	}
	}

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(29);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/register.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/passport/tpls/register.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/passport/tpls/register.template.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 1, jade_debug[0].filename ));
	buf.push("i am register template");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "span i am register template");
	}
	}

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(37);
	var interface_model_1 = __webpack_require__(38);
	function LoginSchemaValue() {
	    var actionModel = {
	        key: "login",
	        type: action_model_1.ActionType.form,
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
	        interfaces: [{
	                key: "loginAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/login",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	function LogoutSchemaValue() {
	    var actionModel = {
	        key: "logout",
	        type: action_model_1.ActionType.confirm,
	        icon: "",
	        confirm: {
	            confirmTitle: '用户中心',
	            confirmContent: '确定要退出么?',
	            confirmOk: "果断退出",
	            confirmCancel: '在看看'
	        },
	        interfaces: [{
	                key: "logoutAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/logout",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var models = [LoginSchemaValue(), LogoutSchemaValue()];
	    _.each(models, function (model) {
	        module.value(model.key, model);
	    });
	};


/***/ }

});
//# sourceMappingURL=passport.bundle.js.map
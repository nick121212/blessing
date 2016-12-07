webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var ngAnimate = __webpack_require__(3);
	var loading_1 = __webpack_require__(5);
	var page_1 = __webpack_require__(13);
	var home_1 = __webpack_require__(215);
	var passport_1 = __webpack_require__(250);
	__webpack_require__(259);
	__webpack_require__(261);
	var module = angular.module("indexApp", [ngAnimate, "angular-loading-bar", passport_1.default, home_1.default, page_1.default, loading_1.default]);
	module.config(["cfpLoadingBarProvider", "$mdThemingProvider", "$mdAriaProvider", function (cfpLoadingBarProvider, $mdThemingProvider, $mdAriaProvider) {
	        cfpLoadingBarProvider.includeSpinner = true;
	        cfpLoadingBarProvider.latencyThreshold = 1000;
	        $mdThemingProvider.alwaysWatchTheme(true);
	        $mdAriaProvider.disableWarnings();
	        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
	        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
	        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
	    }]);
	window.onload = function () {
	    console.log("bootstrap");
	    angular.bootstrap(document, [module.name]);
	};


/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(14);
	__webpack_require__(216);
	var ngMaterialIcons = __webpack_require__(18);
	var _ = __webpack_require__(25);
	var router_1 = __webpack_require__(217);
	var material_service_1 = __webpack_require__(38);
	var svg_service_1 = __webpack_require__(226);
	var toolbar_1 = __webpack_require__(227);
	var sidemenu_1 = __webpack_require__(236);
	__webpack_require__(248);
	var action_model_1 = __webpack_require__(29);
	var module = angular.module("homeModule", [toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.theme('default')
	            .dark()
	            .primaryPalette('grey')
	            .accentPalette('purple')
	            .warnPalette('red');
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils, fxAction) {
	        var state = {};
	        var handleResolve = function (isComplete) {
	            state.$$isFinish = true;
	            $state.go(state.toState.name, state.toParams, state.options);
	        };
	        $rootScope.$on("$stateRefresh", function () {
	            console.log("dfadfa");
	            state.$$isFinish = false;
	        });
	        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
	            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
	        });
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
	            if (!state.$$isFinish) {
	                _.extend(state, {
	                    toState: toState,
	                    toParams: toParams,
	                    fromState: fromState,
	                    fromParams: fromParams,
	                    options: options
	                });
	                event.preventDefault();
	                $q.all({
	                    mdi: svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg'),
	                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg'),
	                    configConfig: fxAction.doAction("configAction", {}).then(function (result) {
	                        $rootScope["config"] = result.configAction.config;
	                    }),
	                    userinfoAction: fxAction.doAction("userinfoAction", {}).then(function (result) {
	                        result.userinfo && ($rootScope["user"] = result.userinfo.username);
	                    })
	                }).then(function () { handleResolve(true); }, function () { handleResolve(false); });
	            }
	        });
	    }]);
	module.value("iconInfoDetailForm", {
	    key: "iconInfoDetailForm",
	    icon: "search",
	    type: action_model_1.ActionType.form,
	    title: "ICON详情",
	    form: {
	        dataSchema: {
	            type: "object",
	            properties: {
	                key: {
	                    type: "string",
	                    title: "KEY"
	                }
	            }
	        },
	        formSchema: [{
	                key: "key",
	                type: "string",
	                placeHolder: "KEY",
	                htmlClass: "md-block"
	            }]
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var login_controller_1 = __webpack_require__(252);
	var register_controller_1 = __webpack_require__(253);
	var index_controller_1 = __webpack_require__(254);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("passport", {
	        url: "/passport",
	        abstract: true,
	        views: {
	            "": {
	                controller: index_controller_1.IndexController,
	                controllerAs: "indexCtl",
	                template: __webpack_require__(255)()
	            }
	        }
	    }).state("passport.login", {
	        url: "/login",
	        views: {
	            "passportContent": {
	                controller: login_controller_1.LoginController,
	                controllerAs: "loginCtl",
	                template: __webpack_require__(256)()
	            }
	        }
	    }).state("passport.register", {
	        url: "/register",
	        views: {
	            "passportContent": {
	                controller: register_controller_1.RegisterController,
	                controllerAs: "registerCtl",
	                template: __webpack_require__(257)()
	            }
	        }
	    });
	};


/***/ },

/***/ 252:
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


/***/ }

})
//# sourceMappingURL=0.4e8289291f377b0da178.hot-update.js.map
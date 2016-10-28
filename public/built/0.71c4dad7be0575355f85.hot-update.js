webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(145);
	var passport_1 = __webpack_require__(178);
	var salt_1 = __webpack_require__(187);
	__webpack_require__(192);
	var module = angular.module("indexApp", [ngAnimate, "angular-loading-bar", passport_1.default, home_1.default, page_1.default, loading_1.default, salt_1.default]);
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
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var router_1 = __webpack_require__(179);
	var material_service_1 = __webpack_require__(29);
	var rest_service_1 = __webpack_require__(30);
	var action_1 = __webpack_require__(34);
	var login_value_1 = __webpack_require__(186);
	__webpack_require__(33);
	var module = angular.module("loginModule", [ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default, action_1.default, 'restangular']);
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
	                    return false;
	                }
	                return true;
	            });
	        });
	    }]);
	login_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ }

})
//# sourceMappingURL=0.71c4dad7be0575355f85.hot-update.js.map
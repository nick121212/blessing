webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(146);
	var passport_1 = __webpack_require__(179);
	var salt_1 = __webpack_require__(239);
	__webpack_require__(243);
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
	                if (response.status !== 401 && response.config["salt"]) {
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


/***/ }

})
//# sourceMappingURL=0.bf1cd2fabfbc94ec9543.hot-update.js.map
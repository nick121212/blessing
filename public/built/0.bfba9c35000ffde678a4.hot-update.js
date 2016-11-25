webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(153);
	var passport_1 = __webpack_require__(188);
	var salt_1 = __webpack_require__(197);
	__webpack_require__(202);
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

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _this = this;
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var pointer = __webpack_require__(56);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(36);
	var rest_service_1 = __webpack_require__(37);
	var action_1 = __webpack_require__(39);
	var dycompile_1 = __webpack_require__(144);
	var compare_1 = __webpack_require__(145);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(151);
	var module = angular.module("pageModule", [compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", "materialUtils", function ($state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	        var set = pointer.set;
	        pointer.set = function (obj, pointer, value) {
	            var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer), nextTok = refTokens[0];
	            for (var i = 0; i < refTokens.length - 1; ++i) {
	                var tok = refTokens[i];
	                if (tok === '-' && Array.isArray(obj)) {
	                    tok = obj.length;
	                }
	                nextTok = refTokens[i + 1];
	                if (!(tok in obj)) {
	                    if (nextTok.match(/^(\d+|-)$/)) {
	                        obj[tok] = [];
	                    }
	                    else {
	                        obj[tok] = {};
	                    }
	                }
	                obj = obj[tok];
	            }
	            if (nextTok === '-' && Array.isArray(obj)) {
	                nextTok = obj.length;
	            }
	            obj[nextTok] = value;
	            return _this;
	        };
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ }

})
//# sourceMappingURL=0.bfba9c35000ffde678a4.hot-update.js.map
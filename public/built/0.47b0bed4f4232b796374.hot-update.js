webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var ngAnimate = __webpack_require__(3);
	var loading_1 = __webpack_require__(5);
	var page_1 = __webpack_require__(13);
	var home_1 = __webpack_require__(209);
	var passport_1 = __webpack_require__(244);
	__webpack_require__(258);
	__webpack_require__(260);
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


/***/ }
])
//# sourceMappingURL=0.47b0bed4f4232b796374.hot-update.js.map
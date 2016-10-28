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

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(8);
	var angular = __webpack_require__(1);
	var _name = "fxLoading";
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(12)(),
	        scope: {},
	        replace: false,
	        link: function ($scope) {
	        }
	    };
	}
	Directive.$inject = [];
	var module = angular.module(_name + "Module", []).directive(_name, Directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ }

})
//# sourceMappingURL=0.509f70e27da8e1c6005e.hot-update.js.map
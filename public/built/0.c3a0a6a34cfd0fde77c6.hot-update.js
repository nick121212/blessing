webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(3);
	var uiRouter = __webpack_require__(9);
	var loading_directive_1 = __webpack_require__(10);
	var hello_directive_1 = __webpack_require__(18);
	var module = angular.module("indexApp", [ngMaterial, uiRouter]);
	hello_directive_1.default(module);
	loading_directive_1.default(module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name], {
	        strictDi: true
	    });
	});


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var template = __webpack_require__(11)();
	__webpack_require__(14);
	function LoadingDirective($timeout) {
	    return {
	        template: template,
	        scope: {},
	        replace: true,
	        link: function ($scope) {
	            console.log($scope);
	        }
	    };
	}
	LoadingDirective.$inject = ["$timeout"];
	function register(module) {
	    module.directive('fxLoading', LoadingDirective);
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = register;


/***/ }

})
//# sourceMappingURL=0.c3a0a6a34cfd0fde77c6.hot-update.js.map
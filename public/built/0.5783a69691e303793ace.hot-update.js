webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by NICK on 16/8/9.
	 */
	"use strict";
	var angular = __webpack_require__(1);
	var hello_directive_1 = __webpack_require__(3);
	var angularMaterial = __webpack_require__(4);
	var module = angular.module("indexApp", [angularMaterial]);
	hello_directive_1["default"].register(module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by NICK on 16/8/9.
	 */
	"use strict";
	function HelloDirective($timeout) {
	    return {
	        template: "<div>{{ name }}</div>",
	        scope: {},
	        link: function (scope) {
	            scope.name = 'Nick';
	            $timeout(function () {
	                scope.name = "Changed to Nicholas!";
	            }, 2000);
	        }
	    };
	}
	HelloDirective.$inject = ["$timeout"];
	function register(module) {
	    module.directive('hello', HelloDirective);
	}
	exports.__esModule = true;
	exports["default"] = register;


/***/ }
])
//# sourceMappingURL=0.5783a69691e303793ace.hot-update.js.map
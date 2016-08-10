webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(3);
	var uiRouter = __webpack_require__(9);
	var loading_directive_1 = __webpack_require__(10);
	var module = angular.module("indexApp", [ngMaterial, uiRouter]);
	loading_directive_1.default(module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name], {
	        strictDi: true
	    });
	});


/***/ }
])
//# sourceMappingURL=0.b74a84c0aa67e3a37ccd.hot-update.js.map
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
	var uiRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"angular-ui-router\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var module = angular.module("indexApp", [angularMaterial, uiRouter]);
	hello_directive_1["default"](module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ }
])
//# sourceMappingURL=0.6dce8030aea7702dbf1d.hot-update.js.map
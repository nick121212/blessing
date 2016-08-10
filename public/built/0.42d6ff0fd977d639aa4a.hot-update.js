webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by NICK on 16/8/9.
	 */
	"use strict";
	var angular = __webpack_require__(1);
	var hello_directive_1 = __webpack_require__(3);
	var ngMaterial = __webpack_require__(4);
	var uiRouter = __webpack_require__(10);
	console.log(uiRouter);
	var module = angular.module("indexApp", [ngMaterial, "ui.router"]);
	hello_directive_1["default"](module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ }
])
//# sourceMappingURL=0.42d6ff0fd977d639aa4a.hot-update.js.map
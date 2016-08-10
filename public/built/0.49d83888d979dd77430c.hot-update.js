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
	var module = angular.module("indexApp", [ngMaterial.toString(), uiRouter.toString()]);
	hello_directive_1["default"](module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ }
])
//# sourceMappingURL=0.49d83888d979dd77430c.hot-update.js.map
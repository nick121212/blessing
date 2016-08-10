webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by NICK on 16/8/9.
	 */
	"use strict";
	var angular = __webpack_require__(1);
	var hello_directive_1 = __webpack_require__(3);
	var module = angular.module("indexApp", []);
	hello_directive_1.register(module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ }
])
//# sourceMappingURL=0.260d9096a5e92b59e6c3.hot-update.js.map
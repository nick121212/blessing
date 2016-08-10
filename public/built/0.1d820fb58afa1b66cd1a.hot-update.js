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
	console.log(angularMaterial);
	var module = angular.module("indexApp", ['angular-material']);
	hello_directive_1.register(module);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ }
])
//# sourceMappingURL=0.1d820fb58afa1b66cd1a.hot-update.js.map
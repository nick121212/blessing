webpackHotUpdate(0,{

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(211);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(177);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(211);
	function Directive() {
	    return {
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $scope['$sideMenuTransclude']($scope, function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	}
	module_1.module.directive('fxSideMenuContentTransclude', Directive);


/***/ }

})
//# sourceMappingURL=0.f0cd9ddaa752de7084e4.hot-update.js.map
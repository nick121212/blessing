webpackHotUpdate(0,{

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(36);
	var rest_service_1 = __webpack_require__(37);
	var action_1 = __webpack_require__(39);
	var dycompile_1 = __webpack_require__(146);
	var query_table_1 = __webpack_require__(220);
	var compare_1 = __webpack_require__(147);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(153);
	var module = angular.module("pageModule", [compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', material_service_1.default, rest_service_1.default, query_table_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", "materialUtils", function ($state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(221);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ }

})
//# sourceMappingURL=0.51c5c015b3ef227f7a89.hot-update.js.map
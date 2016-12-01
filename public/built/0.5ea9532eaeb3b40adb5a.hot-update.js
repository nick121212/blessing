webpackHotUpdate(0,{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(14);
	var ngMaterialIcons = __webpack_require__(18);
	var mdDataTable = __webpack_require__(20);
	var router_1 = __webpack_require__(22);
	var material_service_1 = __webpack_require__(38);
	var rest_service_1 = __webpack_require__(39);
	var action_1 = __webpack_require__(41);
	var dycompile_1 = __webpack_require__(148);
	var query_table_1 = __webpack_require__(149);
	var compare_1 = __webpack_require__(153);
	var execute_cmd_1 = __webpack_require__(32);
	var execute_1 = __webpack_require__(156);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	exports.module = angular.module("pageModule", [execute_1.default, compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', 'btford.socket-io', material_service_1.default, rest_service_1.default, query_table_1.default]);
	execute_cmd_1.default(exports.module);
	exports.module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", "fxAction", function ($rootScope, $state, restUtils, materialUtils, fxAction) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(23);
	var page_d3_controller_1 = __webpack_require__(24);
	var page_allin_controller_1 = __webpack_require__(30);
	var page_execute_cmd_1 = __webpack_require__(31);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.page", {
	        url: "page/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: page_controller_1.PageController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(34)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(35)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(36)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(37)()
	            }
	        }
	    });
	};


/***/ }

})
//# sourceMappingURL=0.5ea9532eaeb3b40adb5a.hot-update.js.map
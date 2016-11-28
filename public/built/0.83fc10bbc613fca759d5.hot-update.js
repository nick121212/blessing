webpackHotUpdate(0,{

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var io = __webpack_require__(317);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(41);
	var rest_service_1 = __webpack_require__(42);
	var action_1 = __webpack_require__(44);
	var dycompile_1 = __webpack_require__(151);
	var query_table_1 = __webpack_require__(152);
	var compare_1 = __webpack_require__(156);
	var execute_cmd_1 = __webpack_require__(34);
	__webpack_require__(365);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(250);
	exports.module = angular.module("pageModule", [compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', 'btford.socket-io', material_service_1.default, rest_service_1.default, query_table_1.default]);
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
	exports.module.factory("sockets", ["socketFactory", function (socketFactory) {
	        var events = socketFactory({
	            ioSocket: io("http://localhost:3000/events"),
	        });
	        events.forward("error");
	        events.forward("events");
	        events.forward("connect");
	        events.forward("disconnect");
	        return {
	            events: events
	        };
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(25);
	var page_d3_controller_1 = __webpack_require__(26);
	var page_allin_controller_1 = __webpack_require__(32);
	var page_execute_cmd_1 = __webpack_require__(33);
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
	                template: __webpack_require__(36)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(37)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(38)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(39)()
	            }
	        }
	    });
	};


/***/ }

})
//# sourceMappingURL=0.83fc10bbc613fca759d5.hot-update.js.map
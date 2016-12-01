webpackHotUpdate(0,{

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(74);
	var page_d3_controller_1 = __webpack_require__(75);
	var page_allin_controller_1 = __webpack_require__(80);
	var page_execute_cmd_1 = __webpack_require__(81);
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
	                template: __webpack_require__(84)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(85)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(86)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(87)()
	            },
	            "result@home.executeCmd": {
	                controller: page_execute_cmd_1.PageExecuteCmdResultController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(88)()
	            }
	        }
	    });
	};


/***/ }

})
//# sourceMappingURL=0.b7f2440fb3e6a389437a.hot-update.js.map
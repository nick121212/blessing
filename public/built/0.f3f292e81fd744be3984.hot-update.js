webpackHotUpdate(0,{

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(148);
	var sidenavl_controller_1 = __webpack_require__(149);
	var sidenavr_controller_1 = __webpack_require__(150);
	var content_controller_1 = __webpack_require__(151);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $urlRouterProvider.otherwise(function ($injector) {
	        var $state = $injector.get("$state");
	        $state.go("home");
	    });
	    $stateProvider.state("home", {
	        url: "/",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "": {
	                controller: home_controller_1.HomeController,
	                controllerAs: "homeCtl",
	                template: __webpack_require__(152)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(153)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(154)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tpls/content.template.jade\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))(),
	            }
	        }
	    });
	};


/***/ }

})
//# sourceMappingURL=0.f3f292e81fd744be3984.hot-update.js.map
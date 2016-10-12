webpackHotUpdate(0,{

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var router_1 = __webpack_require__(187);
	var material_service_1 = __webpack_require__(31);
	var rest_service_1 = __webpack_require__(32);
	var module = angular.module("ttyModule", [ngMaterialIcons, ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(188);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.tty", {
	        url: "tty/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: index_controller_1.TtyController,
	                controllerAs: "ttyCtl",
	                template: __webpack_require__(237)()
	            }
	        }
	    });
	};


/***/ }

})
//# sourceMappingURL=0.ba44b767ec93101398a1.hot-update.js.map
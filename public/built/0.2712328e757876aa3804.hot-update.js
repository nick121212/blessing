webpackHotUpdate(0,{

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(163);
	var sidenavl_controller_1 = __webpack_require__(164);
	var sidenavr_controller_1 = __webpack_require__(165);
	var content_controller_1 = __webpack_require__(166);
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
	                template: __webpack_require__(167)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(168)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(169)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(170)(),
	            }
	        }
	    });
	};


/***/ },

/***/ 163:
/***/ function(module, exports) {

	"use strict";
	var HomeController = (function () {
	    function HomeController($rootScope, materialUtils, toolbarUtils) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.title = "Ἀσάνα";
	        $rootScope["user"] = "NICK";
	        this.toolbar = [
	            toolbarUtils.btnBuilder("logo", "md-icon-button", false).iconBuilder("blender", { fill: "white" }).btnClick(function ($event) {
	                _this.doOpenNav($event);
	            }).toValue(),
	            toolbarUtils.labelBuilder(this.title).attrBuilder({ flex: "" }).toValue(),
	            toolbarUtils.btnBuilder($rootScope["user"], null, true).iconBuilder("more_vert", { fill: "white" }), btnClick(function ($event) {
	                _this.doOpenNav($event, 'right');
	            }).toValue(),
	        ];
	    }
	    HomeController.prototype.doOpenNav = function ($event, directive) {
	        if (directive === void 0) { directive = "left"; }
	        this.materialUtils.buildToggle(directive).call(this, $event);
	    };
	    HomeController.$inject = ["$rootScope", "materialUtils", "toolbarUtils"];
	    return HomeController;
	}());
	exports.HomeController = HomeController;


/***/ }

})
//# sourceMappingURL=0.2712328e757876aa3804.hot-update.js.map
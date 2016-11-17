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
	                template: __webpack_require__(155)(),
	            }
	        }
	    });
	};


/***/ },

/***/ 148:
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
	            toolbarUtils.btnBuilder("logo", "md-icon-button", false).iconBuilder("blender").btnClick(function ($event) {
	                _this.doOpenNav($event);
	            }).toValue(),
	            toolbarUtils.labelBuilder(this.title).attrBuilder({ flex: "" }).toValue(),
	            toolbarUtils.btnBuilder($rootScope["user"], null, true).iconBuilder("more_vert").btnClick(function ($event) {
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
//# sourceMappingURL=0.e760e1d95fc30ce323fb.hot-update.js.map
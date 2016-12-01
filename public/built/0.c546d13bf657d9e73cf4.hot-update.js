webpackHotUpdate(0,{

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(212);
	var sidenavl_controller_1 = __webpack_require__(213);
	var sidenavr_controller_1 = __webpack_require__(214);
	var content_controller_1 = __webpack_require__(215);
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
	                template: __webpack_require__(216)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(217)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(218)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(219)(),
	            }
	        }
	    });
	};


/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(25);
	var ContentController = (function () {
	    function ContentController($rootScope, $timeout, materialUtils, svgUtils, fxAction, iconInfoDetailForm) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.materialUtils = materialUtils;
	        this.svgUtils = svgUtils;
	        this.fxAction = fxAction;
	        this.iconInfoDetailForm = iconInfoDetailForm;
	        this.icons = [];
	        this.icons.length = 0;
	        _.each(svgUtils.getAllIcons(), function (shape, key) {
	            _this.icons.push(key);
	        });
	        this.text = "\n        Filesystem    512-blocks      Used Available Capacity iused      ifree %iused  Mounted on\n        /dev/disk1     487882752 161082016 326288736    34% 2076675 4292890604    0%   /\n        devfs                363       363         0   100%     629          0  100%   /dev\n        map -hosts             0         0         0   100%       0          0  100%   /net\n        map auto_home          0         0         0   100%       0          0  100%   /home\n        ";
	    }
	    ContentController.prototype.doOpenIconInfo = function ($event, iconInfo) {
	        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
	    };
	    ContentController.$inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];
	    return ContentController;
	}());
	exports.ContentController = ContentController;


/***/ }

})
//# sourceMappingURL=0.c546d13bf657d9e73cf4.hot-update.js.map
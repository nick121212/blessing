webpackHotUpdate(0,{

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(241);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.salt", {
	        url: "salt/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: index_controller_1.SaltController,
	                controllerAs: "saltCtl",
	                template: __webpack_require__(242)()
	            }
	        }
	    });
	};


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(31);
	var SaltController = (function () {
	    function SaltController($scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({ flex: "" }).toValue(),
	        ];
	        this.fxAction.getModels(["saltApiLogin", "saltApiLogout", "saltApiMinions"]).then(function (actionModels) {
	            console.log(actionModels);
	            _.forEach(actionModels, function (actionModel) {
	            });
	        });
	    }
	    SaltController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return SaltController;
	}());
	exports.SaltController = SaltController;


/***/ }

})
//# sourceMappingURL=0.bc4700ebd984a5b5476c.hot-update.js.map
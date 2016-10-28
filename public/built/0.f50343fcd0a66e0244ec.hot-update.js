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
/***/ function(module, exports) {

	"use strict";
	var SaltController = (function () {
	    function SaltController($scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("登陆", "md-icon-button", false).iconBuilder("login", { fill: "black" }).btnClick(function ($event) {
	                _this.fxAction.getModel("saltApiLogin").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                });
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("退出登陆", "md-icon-button", false).iconBuilder("logout", { fill: "black" }).btnClick(function ($event) {
	                _this.fxAction.getModel("saltApiLogout").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                });
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("退出登陆", "md-icon-button", false).iconBuilder("logout", { fill: "black" }).btnClick(function ($event) {
	                _this.fxAction.getModel("saltApiLogout").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                });
	            }).toValue()
	        ];
	        this.fxAction.getModels(["saltApiLogin", "saltApiLogout", "saltApiMinions"]).then(function (actionModels) {
	        });
	    }
	    SaltController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return SaltController;
	}());
	exports.SaltController = SaltController;


/***/ }

})
//# sourceMappingURL=0.f50343fcd0a66e0244ec.hot-update.js.map
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
	var io = __webpack_require__(190);
	var _ = __webpack_require__(31);
	var SaltController = (function () {
	    function SaltController($scope, $stateParams, toolbarUtils, materialUtils, fxAction, restUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.restUtils = restUtils;
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({ flex: "" }).toValue()
	        ];
	        this.fxAction.getModels(["saltApiLogin", "saltApiLogout", "saltApiMinions", "saltApiJobs"]).then(function (actionModels) {
	            _this.toolbarTest = [];
	            _.forEach(actionModels, function (actionModel) {
	                _this.toolbarTest.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-button", true).iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                }).toValue());
	            });
	        });
	        this.$scope.$on("saltLoginEvent", function (data) {
	            _this.initEvents();
	        });
	    }
	    SaltController.prototype.initEvents = function () {
	        this.socket = io("ws://172.16.140.164:8888/ws/" + this.restUtils.headers["X-Auth-Token"]);
	        this.socket.on("connect", function () {
	            console.log("ws connected!");
	        });
	    };
	    SaltController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction", "restUtils"];
	    return SaltController;
	}());
	exports.SaltController = SaltController;


/***/ }

})
//# sourceMappingURL=0.dcb1180878ba2f5d8edf.hot-update.js.map
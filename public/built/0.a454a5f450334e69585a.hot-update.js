webpackHotUpdate(0,{

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(187);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.tty", {
	        url: "tty",
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
	                template: __webpack_require__(236)()
	            }
	        }
	    });
	};


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var io = __webpack_require__(188);
	var TtyController = (function () {
	    function TtyController($scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.crawlers = {};
	        this.itemToolbar = [
	            toolbarUtils.btnBuilder("执行操作", "", true).btnClick(function ($event, crawler) {
	                _this.fxAction.getModel("crawlerSettingAckAction").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, crawler, function () {
	                        _this.socket.emit('ack', crawler, function (result) {
	                            if (result.ret === 0) {
	                                _this.materialUtils.showMsg("操作成功！");
	                            }
	                            else {
	                                _this.materialUtils.showErrMsg(result.msg);
	                            }
	                        });
	                    });
	                });
	            }).toValue()
	        ];
	        this.$scope.$on("$destroy", function () {
	            _this.socket.disconnect();
	            _this.crawlers = {};
	        });
	        this.init();
	    }
	    TtyController.prototype.init = function () {
	        var _this = this;
	        this.socket = io('http://0.0.0.0:3000/crawler');
	        this.socket.on('disconnect', (function () {
	            _this.crawlers = {};
	            _this.materialUtils.showErrMsg("socket失去连接！！！");
	        }).bind(this));
	        this.socket.on("crawler:left", (function (socketId) {
	            if (_this.crawlers.hasOwnProperty(socketId)) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    delete _this.crawlers[socketId];
	                });
	            }
	        }).bind(this));
	        this.socket.on("crawler:update", (function (result) {
	            if (_this.crawlers.hasOwnProperty(result.socketId)) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    _.extend(_this.crawlers[result.socketId], result.data);
	                });
	            }
	        }).bind(this));
	        this.socket.on('crawler:join', (function (data) {
	            if (!_this.crawlers) {
	                _this.crawlers = {};
	            }
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.crawlers[data.id] = data.data;
	            });
	        }).bind(this));
	        this.socket.emit("getCrawlers", {}, (function (crawlers) {
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.crawlers = crawlers;
	            });
	        }).bind(this));
	    };
	    TtyController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return TtyController;
	}());
	exports.TtyController = TtyController;


/***/ }

})
//# sourceMappingURL=0.a454a5f450334e69585a.hot-update.js.map
webpackHotUpdate(0,{

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(189);
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
	                template: __webpack_require__(238)()
	            }
	        }
	    });
	};


/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var io = __webpack_require__(190);
	var ip = "http://106.75.78.203:3000/crawler";
	var TtyController = (function () {
	    function TtyController($rootScope, $scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.showLogs = true;
	        this.errorCount = 0;
	        this.crawlers = {};
	        this.logs = [];
	        this.toolbar_logs = [
	            this.toolbarUtils.labelBuilder('爬取日志-{{ttyCtl.errorCount/(this.logs.length||1)}}%').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("清空日志", "md-icon-button", false).iconBuilder("clear_all").btnClick(function ($event) {
	                _this.logs.length = 0;
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("{{ttyCtl.showLogs?'关闭日志':'打开日志'}}", "md-icon-button", false).iconBuilder("{{ttyCtl.showLogs?'window-open':'window-closed'}}").btnClick(function ($event) {
	                _this.showLogs = !_this.showLogs;
	            }).toValue()
	        ];
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('爬虫进程管理').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("{{ttyCtl.showLogs?'关闭日志':'打开日志'}}", "md-icon-button", false).iconBuilder("{{ttyCtl.showLogs?'window-open':'window-closed'}}", { fill: "black" }).btnClick(function ($event) {
	                _this.showLogs = !_this.showLogs;
	            }).toValue()
	        ];
	        this.itemToolbar = [
	            toolbarUtils.btnBuilder("执行操作", "", true, "top").btnClick(function ($event, crawler) {
	                _this.fxAction.getModel("crawlerSettingAckAction").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, crawler, function () {
	                        _this.socket.emit('ack', crawler, function (result) {
	                            if (result.ret === 0) {
	                                if (result.showResult) {
	                                    return _this.fxAction.getModel("resultAction").then(function (actionModel) {
	                                        _this.fxAction.doActionModel($event, actionModel, result, function () {
	                                            _this.materialUtils.close();
	                                        });
	                                    });
	                                }
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
	        var config = this.$rootScope["config"];
	        if (config) {
	            return console.error("没有配置项！");
	        }
	        console.log(config);
	        this.socket = io(ip);
	        this.socket.on('connect', function () {
	            var _this = this;
	            this.socket.emit("getCrawlers", {}, (function (crawlers) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    _this.crawlers = crawlers;
	                });
	            }).bind(this));
	        }.bind(this));
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
	        this.socket.on("crawler:log", (function (result) {
	            if (_this.logs.length > 100) {
	                _this.logs.pop();
	            }
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.logs.unshift(result.data);
	                _this.errorCount = _.filter(_this.logs, function (log) {
	                    return !!log.isError;
	                }).length;
	            });
	        }).bind(this));
	        this.socket.on('crawler:join', (function (data) {
	            if (!_this.crawlers) {
	                _this.crawlers = {};
	            }
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.crawlers[data.id] = data.data;
	            });
	        }).bind(this));
	    };
	    TtyController.$inject = ["$rootScope", "$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return TtyController;
	}());
	exports.TtyController = TtyController;


/***/ }

})
//# sourceMappingURL=0.d606f642eea1e3443f70.hot-update.js.map
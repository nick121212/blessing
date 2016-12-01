webpackHotUpdate(0,{

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(74);
	var page_d3_controller_1 = __webpack_require__(75);
	var page_allin_controller_1 = __webpack_require__(80);
	var page_execute_cmd_1 = __webpack_require__(81);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.page", {
	        url: "page/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: page_controller_1.PageController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(84)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(85)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(86)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(87)()
	            }
	        }
	    });
	};


/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var execute_cmd_1 = __webpack_require__(82);
	var _ = __webpack_require__(76);
	var PageExecuteCmdResultController = (function () {
	    function PageExecuteCmdResultController($scope, fxAction, sockets, $q, $timeout) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.sockets = sockets;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.cmdClientData = {};
	        this.cmdResClientData = {};
	        this.deviceClientData = {};
	        this.deviceSelected = [];
	        this.$scope.$on("socket:connect", function () {
	        });
	        this.$scope.$on("socket:events", function (event, msg) {
	            if (msg._source.jid !== _this.cmdId) {
	                return;
	            }
	            if (!_this.cmdResClientData.rows) {
	                return _this.cmdResClientData.rows = [msg];
	            }
	            if (!_.some(_this.cmdResClientData.rows, function (row) {
	                return row._id === msg._id;
	            })) {
	                _this.$timeout(function () {
	                    _this.cmdResClientData.rows.push(msg);
	                }, 500);
	            }
	        });
	        this.$scope.$on("showExecuteCmdResult", function (event, cmdId) {
	            _this.cmdClientData = {};
	            _this.cmdResClientData = {};
	            _this.deviceClientData = {};
	            _this.deviceSelected = [];
	            _this.getCommandResult(cmdId);
	        });
	        this.filterDeviceSnBind = this.filterDeviceSn.bind(this);
	    }
	    PageExecuteCmdResultController.prototype.filterDeviceSn = function (currentItem) {
	        if (this.deviceSelected.length) {
	            return _.some(this.deviceSelected, function (item) {
	                return item._source.deviceSn == currentItem._source.deviceSn;
	            });
	        }
	        return false;
	    };
	    PageExecuteCmdResultController.prototype.getCommandResult = function (cmdId) {
	        var _this = this;
	        this.cmdId = cmdId;
	        this.$timeout(function () {
	            _this.isBusy = true;
	            _this.$q.all([
	                _this.fxAction.doAction("executeCmdList", { where: { "query": { "and": [{ "match": { "_id": cmdId } }] } } }),
	                _this.fxAction.doAction("executeCmdResList", { where: { "query": { "and": [{ "match": { "jid": cmdId } }] } } })
	            ]).then(function (results) {
	                _this.fxAction.doDealResult(results[0].actionModel, results[0], _this.cmdClientData);
	            }).then(function () {
	                if (_this.cmdClientData.rows.length) {
	                    _this.command = _this.cmdClientData.rows[0]._source.command;
	                    _this.deviceClientData.rows = _this.cmdClientData.rows[0]._source.listip;
	                    _this.deviceClientData.rows.length && (_this.deviceSelected = [].concat(_this.deviceClientData.rows));
	                }
	                else {
	                    return _this.getCommandResult(cmdId);
	                }
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }, 200);
	    };
	    PageExecuteCmdResultController.$inject = ["$scope", "fxAction", "sockets", "$q", "$timeout"];
	    return PageExecuteCmdResultController;
	}());
	exports.PageExecuteCmdResultController = PageExecuteCmdResultController;
	var PageExecuteCmdController = (function () {
	    function PageExecuteCmdController($rootScope, $stateParams, $timeout, materilUtils, fxAction, toolbarUtils) {
	        this.$rootScope = $rootScope;
	        this.$stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.materilUtils = materilUtils;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.executeResult = {};
	        this.key = execute_cmd_1.ExecuteCmdForm.key;
	        this.doInitToolbar();
	        this.formData = {
	            listIps: []
	        };
	    }
	    PageExecuteCmdController.prototype.doInitToolbar = function () {
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
	    };
	    PageExecuteCmdController.prototype.doSubmit = function ($event, form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, form);
	        var results;
	        if (promise) {
	            this.isBusy = true;
	            promise.then(function (res) {
	                _this.materilUtils.showMsg("执行命令成功！");
	                results = res;
	                return _this.fxAction.getModel(_this.key);
	            }).then(function (actionModel) {
	                _this.actionModel = actionModel;
	                return _this.fxAction.doDealResult(actionModel, results, _this.executeResult);
	            }).then(function (res) {
	                _this.$rootScope.$broadcast("showExecuteCmdResult", res.data.cmdid);
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }
	    };
	    PageExecuteCmdController.$inject = ["$rootScope", "$stateParams", "$timeout", "materialUtils", "fxAction", "toolbarUtils"];
	    return PageExecuteCmdController;
	}());
	exports.PageExecuteCmdController = PageExecuteCmdController;


/***/ }

})
//# sourceMappingURL=0.9c07737aeecc9e370bd2.hot-update.js.map
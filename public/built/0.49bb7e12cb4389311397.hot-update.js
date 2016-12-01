webpackHotUpdate(0,{

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(282);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(76);
	var module_1 = __webpack_require__(279);
	var PageExecuteCmdResultController = (function () {
	    function PageExecuteCmdResultController($scope, fxAction, sockets, $q, $timeout, toolbarUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.sockets = sockets;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.toolbarUtils = toolbarUtils;
	        this.cmdClientData = {};
	        this.cmdResClientData = {};
	        this.deviceClientData = {};
	        this.deviceSelected = [];
	        this.$scope.$on("socket:connect", function () {
	        });
	        this.$scope.$on("socket:events", function (event, msg) {
	            if (msg._source.jid !== _this.jid) {
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
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
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
	    PageExecuteCmdResultController.$inject = ["$scope", "fxAction", "sockets", "$q", "$timeout", "toolbarUtils"];
	    return PageExecuteCmdResultController;
	}());
	exports.PageExecuteCmdResultController = PageExecuteCmdResultController;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: {},
	        replace: true,
	        template: __webpack_require__(281),
	        controller: PageExecuteCmdResultController
	    };
	}
	module_1.module.directive("executeCmd", [Directive]);


/***/ }

})
//# sourceMappingURL=0.49bb7e12cb4389311397.hot-update.js.map
webpackHotUpdate(0,{

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(160);
	__webpack_require__(277);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(25);
	var module_1 = __webpack_require__(157);
	var PageExecuteCmdResultController = (function () {
	    function PageExecuteCmdResultController($scope, fxAction, sockets, $q, $timeout, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.sockets = sockets;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.cmdClientData = {};
	        this.cmdResClientData = {};
	        this.deviceClientData = {};
	        this.deviceSelected = [];
	        if (this.realTime) {
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
	        }
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
	        this.jid = cmdId;
	        this.$timeout(function () {
	            _this.isBusy = true;
	            _this.isOpen = true;
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
	    PageExecuteCmdResultController.$inject = ["$scope", "fxAction", "sockets", "$q", "$timeout", "toolbarUtils", "materialUtils"];
	    return PageExecuteCmdResultController;
	}());
	exports.PageExecuteCmdResultController = PageExecuteCmdResultController;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: {},
	        bindToController: {
	            "realTime": '=?'
	        },
	        template: __webpack_require__(159),
	        controller: PageExecuteCmdResultController,
	        controllerAs: "executeCmdCtl"
	    };
	}
	module_1.module.directive("executeCmd", [Directive]);
	module_1.module.filter('to_trusted', ['$sce', function ($sce) {
	        return function (text) {
	            return $sce.trustAsHtml(text);
	        };
	    }]);
	module_1.module.directive('angularTerminal', ['$rootScope', function ($rootScope) {
	        return {
	            restrict: 'A',
	            link: function (scope, element, attrs) {
	                var namespace = 'terminal.' + (attrs.angularTerminal || 'default'), t;
	                t = element.terminal(function (input, terminal) {
	                    $rootScope.$emit(namespace, input, terminal);
	                }, {
	                    greetings: attrs.greetings || '',
	                    enabled: false
	                });
	                $rootScope.$on(namespace + '.echo', function (e, msg) {
	                    t.echo(msg);
	                });
	            }
	        };
	    }]);


/***/ }

})
//# sourceMappingURL=0.e6036b62e87c95f08f17.hot-update.js.map
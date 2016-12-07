webpackHotUpdate(0,{

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(161);
	__webpack_require__(206);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(25);
	var module_1 = __webpack_require__(158);
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
	        this.deviceSelected = [];
	        this.cmdResMap = {};
	        this.listKey = 'executeCmdResList';
	        this.process = { fail: 0, success: 0, total: 0 };
	        if (this.realTime) {
	            this.$scope.$on("socket:connect", function () { });
	            this.$scope.$on("socket:events", function (event, msg) {
	                console.log("socket", msg._source.jid, _this.jid);
	                if (msg._source.jid !== _this.jid) {
	                    return;
	                }
	                _this.cmdResMap[msg._id] = msg;
	                if (msg._source.success) {
	                    _this.process.success++;
	                }
	                else {
	                    _this.process.fail++;
	                }
	                if (_.isArray(_this.cmdResClientData.rows)) {
	                    var devices_1 = _.filter(_this.cmdResClientData.rows, function (item) {
	                        return item._id == msg._id;
	                    });
	                    if (devices_1.length == 0) {
	                        _this.cmdResClientData.rows.push(msg);
	                    }
	                    else {
	                        _.each(devices_1, function (dev, key) {
	                            _.extend(devices_1[key], msg);
	                        });
	                    }
	                }
	                _this.$scope.$emit(_this.listKey + ":refresh");
	            });
	        }
	        this.$scope.$on("showExecuteCmdResult", function (event, cmdId) {
	            _this.cmdClientData = {};
	            _this.cmdResClientData = {};
	            _this.deviceSelected = [];
	            _this.cmdResMap = { len: 0 };
	            _this.jid = "";
	            _this.getCommandResult(cmdId);
	        });
	        this.$scope.$on(this.listKey + ":searchComplete", function (event, data) {
	            _this.resetProcess();
	            _.each(data.rows, function (item, key) {
	                if (_this.cmdResMap.hasOwnProperty(item._id)) {
	                    _.extend(data.rows[key], _this.cmdResMap[item._id]);
	                }
	            });
	            _this.setProcess(data['aggregations']);
	        });
	        this.cmdResClientData = {};
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
	    }
	    PageExecuteCmdResultController.prototype.resetProcess = function () {
	        this.process.fail = 0;
	        this.process.success = 0;
	        this.process.complete = 0;
	        this.process.buffer = 0;
	    };
	    PageExecuteCmdResultController.prototype.setProcess = function (aggregations) {
	        var _this = this;
	        _.each(aggregations.count_success.buckets, function (bucket) {
	            switch (bucket.key_as_string) {
	                case "true":
	                    _this.process.success = bucket.doc_count;
	                    break;
	                case "false":
	                    _this.process.fail = bucket.doc_count;
	                    break;
	                default:
	            }
	        });
	        this.process.complete = (this.process.success + this.process.fail) / this.process.total * 100;
	        this.process.buffer = 100;
	    };
	    PageExecuteCmdResultController.prototype.getCommandResult = function (cmdId) {
	        var _this = this;
	        this.resFilter = { "query": { "and": [{ "match": { "jid": cmdId } }] } };
	        this.cmdResMap = {};
	        this.jid = cmdId;
	        this.realTime = true;
	        this.isBusy = true;
	        this.isOpen = true;
	        this.$q.all([
	            this.fxAction.doAction("executeCmdList", { where: { "query": { "and": [{ "match": { "_id": cmdId } }] } } })
	        ]).then(function (results) {
	            _this.fxAction.doDealResult(results[0].actionModel, results[0], _this.cmdClientData);
	        }).then(function () {
	            if (_this.cmdClientData.rows.length) {
	                _this.command = _this.cmdClientData.rows[0]._source.command;
	                _this.process.total = _this.cmdClientData.rows[0]._source.devLen;
	            }
	            else {
	                return _this.getCommandResult(cmdId);
	            }
	        }).finally(function () {
	            _this.isBusy = false;
	        });
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
	            "realTime": '@?'
	        },
	        template: __webpack_require__(160),
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
//# sourceMappingURL=0.11a19af5e38d08cbe482.hot-update.js.map
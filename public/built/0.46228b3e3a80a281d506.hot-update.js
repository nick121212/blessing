webpackHotUpdate(0,{

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(42);
	__webpack_require__(58);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(143);
	__webpack_require__(145);
	var module_1 = __webpack_require__(43);
	__webpack_require__(147);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(43);
	var action_model_1 = __webpack_require__(29);
	var pointer = __webpack_require__(59);
	var _ = __webpack_require__(25);
	var Controller = (function () {
	    function Controller($rootScope, $scope, $q, $timeout, fxAction, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$scope = $scope;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.mdLimitOptions = [1, 10, 30, 50, 100, 300];
	        this.isBusy = false;
	        this.showPage = true;
	        !this.clientData && (this.clientData = {});
	        !this.selected && (this.selected = []);
	        fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = _.cloneDeep(model);
	            _this.queryData = _.extend({ offset: 0, limit: 10, page: 1 }, _this.actionModel.list.queryData || {}, _this.queryData || {});
	            if (!_this.local) {
	                _this.initToolbar();
	                _this.initItemToolbar();
	                _this.doSearch();
	                _this.initEvents();
	            }
	            else {
	                _this.actionModel.list.itemToolbars = _this.itemToolbars || [];
	                _this.actionModel.list.toolbars = _this.topToolbars || [];
	            }
	        });
	        this.onOrderChange = this.orderChange.bind(this);
	        this.onPageChange = this.pageChange.bind(this);
	        this.doSearchBind = this.doSearch.bind(this);
	        this.$scope.$on("$destroy", function () {
	            _this.actionModel = null;
	            _this.queryData = null;
	            _this.onOrderChange = null;
	            _this.onPageChange = null;
	            _this.doSearchBind = null;
	            _this.selected = null;
	            _this.itemToolbars = null;
	            _this.topToolbars = null;
	        });
	        this.$scope.$watch(function () {
	            return _this._filter;
	        }, function (newValue, oldValue) {
	            if (newValue && newValue != oldValue) {
	                _this.doSearch();
	            }
	        });
	    }
	    Controller.prototype.initEvents = function () {
	        var _this = this;
	        var timeId;
	        this.$rootScope.$on(this.key + ":refresh", function () {
	            if (timeId)
	                _this.$timeout.cancel(timeId);
	            timeId = _this.$timeout(function () {
	                _this.doSearch(_this.queryData.where || {});
	            }, 200);
	        });
	    };
	    Controller.prototype.orderFunc = function () {
	        if (this.queryData && this.queryData.order) {
	            return this.queryData.order.replace(/\-/ig, '');
	        }
	        return [];
	    };
	    Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        var itemSource = _.clone(item);
	        actionModel.cancel = false;
	        this.$rootScope.$broadcast(this.key + ":clickItem", actionModel, item);
	        if (actionModel.cancel) {
	            return;
	        }
	        if (actionModel.type === action_model_1.ActionType.form || actionModel.type === action_model_1.ActionType.wizard) {
	            itemSource = {};
	            if (pointer.has(item, actionModel.path || "")) {
	                itemSource = pointer.get(item, actionModel.path || "");
	            }
	        }
	        var promise = this.fxAction.doActionModel($event, actionModel, itemSource);
	        promise && promise.then(function (result) {
	            _this.materialUtils.showMsg("" + (actionModel.successMsg || "操作成功!"));
	            _this.$timeout(function () {
	                if (actionModel.refreshList) {
	                    _this.doSearch(_this.queryData.where || {});
	                }
	            }, 200);
	        });
	    };
	    Controller.prototype.initToolbar = function () {
	        var _this = this;
	        this.actionModel.list.toolbars = [];
	        this.fxAction.getModels(this.actionModel.actions).then(function (actionModels) {
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon, {}).toValue());
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.labelBuilder("" + _this.actionModel.title).attrBuilder({ flex: "" }).toValue());
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-icon-button", false).tooltipBuilder("").iconBuilder(actionModel.icon, {}).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false).iconBuilder("refresh", {}).btnClick(function ($event) {
	                    _this.doSearch(_this.queryData.where || {});
	                }).toValue());
	            }
	            if (_this.actionModel.list.showSearchBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}", {}).btnClick(function ($event) {
	                    _this.actionModel.list.showSearchPanel = !_this.actionModel.list.showSearchPanel;
	                }).toValue());
	            }
	            _this.$rootScope.$broadcast(_this.key + ":toolbarComplete", _this.actionModel.list.toolbars);
	        });
	    };
	    Controller.prototype.initItemToolbar = function () {
	        var _this = this;
	        var menuTool = this.toolbarUtils.menuBuilder("", "md-icon-button").tooltipBuilder("操作菜单").iconBuilder("expand_more").menuOptionsBuilder().toValue();
	        var keys = [];
	        var itemActionsObj = _.keyBy(this.actionModel.itemActions, "key");
	        _.each(this.actionModel.itemActions, function (item) {
	            keys.push(item.key);
	        });
	        keys.length && this.fxAction.getModels(keys).then(function (actionModels) {
	            _.each(keys, function (key) {
	                var actionModel = actionModels[key];
	                if (actionModel) {
	                    var condition = itemActionsObj[key].condition;
	                    switch (actionModel.type) {
	                        case action_model_1.ActionType.none:
	                        case action_model_1.ActionType.form:
	                        case action_model_1.ActionType.wizard:
	                        case action_model_1.ActionType.confirm:
	                            var menu = _this.toolbarUtils.menuItemBuilder(actionModel.title, null, true).tooltipBuilder("").noOptions(true, false).iconBuilder(actionModel.icon).btnClick(function ($event, item) {
	                                _this.doClickActionMenu($event, actionModel, item);
	                            });
	                            if (condition) {
	                                menu.conditionBuilder(condition);
	                            }
	                            menuTool.items.push(menu.toValue());
	                            break;
	                    }
	                }
	            });
	            menuTool.items.length && (_this.actionModel.list.itemToolbars = [menuTool]);
	            _this.$rootScope.$broadcast(_this.key + ":itemToolbarComplete", menuTool.items);
	        });
	    };
	    Controller.prototype.orderChange = function (order) {
	        this.queryData.order = order;
	        this.doSearch(this.queryData.where || {});
	        this.orderFunc();
	    };
	    Controller.prototype.pageChange = function (page, limit) {
	        if (limit !== this.queryData.limit) {
	            page = 1;
	        }
	        this.queryData.page = page;
	        if (page > 0) {
	            this.queryData.offset = (page - 1) * limit;
	        }
	        this.doSearch(this.queryData.where || {});
	    };
	    Controller.prototype.doSearch = function (filterData) {
	        var _this = this;
	        if (this.local) {
	            return;
	        }
	        this.isBusy = true;
	        this.queryData.where = filterData || {};
	        if (_.isObject(this._filter) && _.isObject(this.queryData["where"])) {
	            _.extend(this.queryData["where"], this._filter);
	        }
	        this.promise = this.fxAction.doAction(this.key, this.queryData);
	        if (!this.promise) {
	            return;
	        }
	        this.promise.then(function (result) {
	            _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	            _this.$rootScope.$broadcast(_this.key + ":searchComplete", _this.clientData);
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$rootScope", "$scope", "$q", "$timeout", "fxAction", "toolbarUtils", "materialUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(135)(),
	        scope: true,
	        bindToController: {
	            key: "@",
	            selected: '=?',
	            _filter: '=?filter',
	            clientData: '=?',
	            showToolbar: '=?',
	            multiple: '=?',
	            autoSelect: '=?',
	            local: '=?',
	            itemToolbars: '=?',
	            topToolbars: '=?',
	            qtCtl: '=?'
	        },
	        controller: Controller,
	        controllerAs: 'listCtl',
	        replace: true,
	        transclude: true
	    };
	}
	module_1.module.filter('skip', function () {
	    return function (inputArray, skip, isLocal) {
	        if (!inputArray)
	            return [];
	        if (skip && isLocal) {
	            return _.drop(inputArray.concat([]), skip);
	        }
	        return inputArray;
	    };
	});
	module_1.module.directive("fxListAction", Directive);


/***/ }

})
//# sourceMappingURL=0.46228b3e3a80a281d506.hot-update.js.map
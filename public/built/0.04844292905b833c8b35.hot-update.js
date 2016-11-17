webpackHotUpdate(0,{

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	var force_d3_1 = __webpack_require__(29);
	var action_model_1 = __webpack_require__(31);
	var D3Controller = (function () {
	    function D3Controller($stateParams, fxAction, toolbarUtils, materialUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.clientData = {};
	        this.key = $stateParams["key"];
	        this.doInit();
	    }
	    D3Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        this.fxAction.doActionModel($event, actionModel, item).then(function (result) {
	            _this.materialUtils.showMsg("" + (actionModel.successMsg || "操作成功!"));
	            if (actionModel.refreshList) {
	            }
	        });
	    };
	    D3Controller.prototype.doGetData = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, { limit: 100, where: {} });
	        if (!promise) {
	            return;
	        }
	        this.isBusy = true;
	        promise.then(function (result) {
	            return _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	        }).then(function (results) {
	        }).finally(function () {
	            _this.isBusy = false;
	            setTimeout(function () {
	                new force_d3_1.Force("#paged3", _this.clientData.rows);
	            }, 200);
	        });
	    };
	    D3Controller.prototype.doInit = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            _this.actionModel = actionModel;
	            _this.actionModel.list.toolbars = [];
	            _this.doGetData();
	            return _this.fxAction.getModels(_this.actionModel.actions);
	        }).then(function (actionModels) {
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-fab md-raised md-mini", false).tooltipBuilder("").iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-fab md-raised md-mini", false).iconBuilder("refresh", { fill: "black" }).btnClick(function ($event) {
	                    _this.doGetData();
	                }).toValue());
	            }
	        });
	    };
	    D3Controller.$inject = ["$stateParams", "fxAction", "toolbarUtils", "materialUtils"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ },

/***/ 31:
/***/ function(module, exports) {

	"use strict";
	(function (ActionType) {
	    ActionType[ActionType["none"] = 0] = "none";
	    ActionType[ActionType["list"] = 1] = "list";
	    ActionType[ActionType["form"] = 2] = "form";
	    ActionType[ActionType["wizard"] = 3] = "wizard";
	    ActionType[ActionType["confirm"] = 4] = "confirm";
	})(exports.ActionType || (exports.ActionType = {}));
	var ActionType = exports.ActionType;


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var Service = (function () {
	    function Service() {
	    }
	    Service._builderName = "actionUtils";
	    Service.builder = [function () {
	            var Base = (function () {
	                function Base(data) {
	                    this.data = data;
	                }
	                Base.prototype.columnUnitBuilder = function (unit, numeric) {
	                    if (numeric === void 0) { numeric = false; }
	                    this.data = _.extend({}, this.data, {
	                        unit: unit,
	                        numeric: numeric
	                    });
	                    return this;
	                };
	                Base.prototype.toValue = function () {
	                    return this.data;
	                };
	                return Base;
	            }());
	            var Service = (function (_super) {
	                __extends(Service, _super);
	                function Service(data) {
	                    _super.call(this, data);
	                    this.data = data;
	                }
	                Service.prototype.columnBuilder = function (content, title, name, sort, unit) {
	                    return new Service({
	                        content: content,
	                        title: title,
	                        name: name,
	                        sort: sort,
	                        unit: unit
	                    });
	                };
	                return Service;
	            }(Base));
	            return new Service();
	        }];
	    return Service;
	}());
	module_1.module.service(Service._builderName, Service.builder);


/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mdl = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var pointer = __webpack_require__(56);
	var _ = __webpack_require__(27);
	var DialogController = (function () {
	    function DialogController($scope, item, key, submit) {
	        this.$scope = $scope;
	        this.item = item;
	        this.key = key;
	        this.submit = submit;
	    }
	    DialogController.$inject = ["$scope", "item", "key", "submit"];
	    return DialogController;
	}());
	var Provider = (function () {
	    function Provider($rootScope, $injector, restUtils, mdUtils, $q, $mdDialog) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$injector = $injector;
	        this.restUtils = restUtils;
	        this.mdUtils = mdUtils;
	        this.$q = $q;
	        this.$mdDialog = $mdDialog;
	        this.$get = ["$injector", function ($injector) {
	                var service = $injector.invoke(Provider, _this, null);
	                return new Provider(service.$rootScope, service.$injector, service.restUtils, service.mdUtils, service.$q, service.$mdDialog);
	            }];
	        return this;
	    }
	    Provider.prototype.getInjector = function (key) {
	        if (this.$injector.has(key)) {
	            return _.cloneDeepWith(this.$injector.get(key));
	        }
	        return null;
	    };
	    Provider.prototype.getModelFromServer = function (key) {
	        var _this = this;
	        var defer = this.$q.defer();
	        this.getModel("actionCommonfx-1").then(function (actionModel) {
	            _this.doAction(actionModel.key, {
	                where: {
	                    key: {
	                        "$eq": key
	                    }
	                }
	            }).then(function (results) {
	                var resource = { rows: [] };
	                _this.doDealResult(actionModel, results, resource);
	                if (resource.rows && resource.rows.length) {
	                    mdl.module.value(key, resource.rows[0]);
	                    return defer.resolve(resource.rows[0]);
	                }
	                _this.mdUtils.showErrMsg("\u6CA1\u6709\u627E\u5230key[" + key + "]!");
	                defer.reject(key);
	            });
	        }).catch(defer.reject);
	        return defer.promise;
	    };
	    Provider.prototype.getModel = function (key) {
	        var defer = this.$q.defer();
	        if (!key) {
	            defer.reject();
	        }
	        else {
	            if (this.$injector.has(key)) {
	                defer.resolve(_.cloneDeepWith(this.$injector.get(key)));
	            }
	            else {
	                if (angular.injector([mdl.module.name]).has(key)) {
	                    defer.resolve(angular.injector([mdl.module.name]).get(key));
	                }
	                else {
	                    return this.getModelFromServer(key);
	                }
	            }
	        }
	        return defer.promise;
	    };
	    Provider.prototype.getSchema = function (actionModel) {
	        var _this = this;
	        var keys = [], defer = this.$q.defer(), schemaActionModel;
	        if (actionModel.type === action_model_1.ActionType.form) {
	            _.isString(actionModel.form.dataSchema) && keys.push(actionModel.form.dataSchema);
	            _.isString(actionModel.form.formSchema) && keys.push(actionModel.form.formSchema);
	        }
	        if (keys.length) {
	            this.getModel("schemaCommonfx-1").then(function (model) {
	                schemaActionModel = model;
	                return _this.doAction(model.key, {
	                    limit: keys.length,
	                    where: {
	                        "key": {
	                            "$in": keys
	                        }
	                    }
	                });
	            }).then(function (results) {
	                var data = _this.doDealResult(schemaActionModel, results, {});
	                var schemas = _.keyBy(data.rows, "key");
	                if (actionModel.type === action_model_1.ActionType.form) {
	                    if (_.isString(actionModel.form.dataSchema) && schemas[actionModel.form.dataSchema.toString()]) {
	                        actionModel.form.dataSchema = schemas[actionModel.form.dataSchema.toString()]["text"];
	                    }
	                    if (_.isString(actionModel.form.formSchema) && schemas[actionModel.form.formSchema.toString()]) {
	                        actionModel.form.formSchema = schemas[actionModel.form.formSchema.toString()]["textForm"];
	                    }
	                }
	            }).finally(function () {
	                defer.resolve(actionModel);
	            });
	        }
	        else {
	            defer.resolve(actionModel);
	        }
	        return defer.promise;
	    };
	    Provider.prototype.getModels = function (keys) {
	        var _this = this;
	        var defer = this.$q.defer();
	        var actionModels = {};
	        var notFoundsKeys = [];
	        var promises = {};
	        _.each(keys, function (key) {
	            if (_.isObject(key)) {
	                actionModels[key.key] = key;
	            }
	            else {
	                promises[key] = _this.getModel(key).then(function (actionModel) {
	                    actionModels[key] = actionModel;
	                }).catch(function (key) {
	                    notFoundsKeys.push(key);
	                });
	            }
	        });
	        this.$q.all(promises).then(function () {
	            defer.resolve(actionModels);
	        }).catch(function () {
	            defer.resolve(actionModels);
	        });
	        return defer.promise;
	    };
	    Provider.prototype.doActionModel = function ($event, actionModel, item, callback) {
	        var _this = this;
	        switch (actionModel.type) {
	            case action_model_1.ActionType.wizard:
	            case action_model_1.ActionType.form:
	                var templates = (_a = {},
	                    _a[action_model_1.ActionType.form] = __webpack_require__(58)(),
	                    _a[action_model_1.ActionType.wizard] = __webpack_require__(59)(),
	                    _a
	                );
	                return this.$mdDialog.show({
	                    targetEvent: $event,
	                    clickOutsideToClose: false,
	                    escapeToClose: false,
	                    fullscreen: true,
	                    locals: {
	                        'item': item || {},
	                        'key': actionModel.key,
	                        'submit': callback
	                    },
	                    controller: DialogController,
	                    controllerAs: "dialogCtl",
	                    template: templates[actionModel.type]
	                }).then(function () {
	                    item = null;
	                });
	            case action_model_1.ActionType.confirm:
	                var confirm_1 = this.$mdDialog.confirm()
	                    .title(actionModel.confirm.confirmTitle)
	                    .textContent(actionModel.confirm.confirmContent)
	                    .ariaLabel(actionModel.confirm.confirmTitle)
	                    .targetEvent($event)
	                    .ok(actionModel.confirm.confirmOk || "确定")
	                    .cancel(actionModel.confirm.confirmCancel || "取消");
	                return this.$mdDialog.show(confirm_1).then(function () {
	                    return _this.doAction(actionModel.key, item).then(function (results) {
	                        _.isFunction(callback) && callback(results);
	                    });
	                });
	        }
	        return null;
	        var _a;
	    };
	    Provider.prototype.doFormCheck = function ($form) {
	        if ($form) {
	            this.$rootScope.$broadcast("schemaFormValidate");
	            if (!$form.$valid) {
	                console.log($form.$error);
	                this.mdUtils.showErrMsg("表单没有填写正确!");
	                return false;
	            }
	        }
	        return true;
	    };
	    Provider.prototype.doDealResult = function (actionModel, results, clientData, key) {
	        if (key === void 0) { key = 'jpp'; }
	        _.forEach(actionModel.interfaces, function (iInterface) {
	            var result = results[iInterface.key];
	            var jpp = iInterface[key];
	            if (result && jpp) {
	                _.each(jpp.set, function (val) {
	                    pointer.has(result, val.from) && pointer.set(clientData, val.to, pointer.get(result, val.from));
	                });
	                _.isArray(jpp.del) && _.each(jpp.del, function (val) {
	                    pointer.has(clientData, val) && pointer.remove(clientData, val);
	                });
	            }
	        });
	        return clientData;
	    };
	    Provider.prototype.doAction = function (key, queryData, $form) {
	        var _this = this;
	        var queryDataCline, actionModel;
	        if (!this.doFormCheck($form)) {
	            return;
	        }
	        return this.getModel(key).then(function (aModel) {
	            var interfacesRest = {};
	            var headers = _this.restUtils.headers;
	            var params = _this.restUtils.params;
	            actionModel = aModel;
	            _.each(actionModel.interfaces, function (interfaceModel) {
	                var promise, restAngular = interfaceModel.isRestful
	                    ? _this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
	                    : _this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
	                queryDataCline = _.cloneDeep(queryData);
	                if (interfaceModel.jpp) {
	                    _.each(interfaceModel.jpp.del, function (val) {
	                        pointer.has(queryDataCline, val) && pointer.remove(queryDataCline, val);
	                    });
	                }
	                interfaceModel.config && restAngular.withHttpConfig(interfaceModel.config);
	                var idFieldPath = interfaceModel.idFieldPath || "/id";
	                if (idFieldPath === "/") {
	                    idFieldPath = "";
	                }
	                switch (interfaceModel.method) {
	                    case interface_model_1.MethodType.POST:
	                        promise = restAngular.post(queryDataCline, null, headers);
	                        break;
	                    case interface_model_1.MethodType.GET:
	                        promise = restAngular.customGET((interfaceModel.params && pointer.has(queryDataCline, idFieldPath)) ? pointer.get(queryDataCline, idFieldPath) : null, queryDataCline, headers);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        if (!pointer.has(queryDataCline, idFieldPath)) {
	                            return console.error("\u6CA1\u6709\u627E\u5230" + idFieldPath);
	                        }
	                        promise = restAngular.customPUT(_.isObject(queryDataCline) ? queryDataCline : null, pointer.get(queryDataCline, idFieldPath), headers);
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        if (!pointer.has(queryDataCline, idFieldPath)) {
	                            return console.error("\u6CA1\u6709\u627E\u5230" + idFieldPath);
	                        }
	                        promise = restAngular.customDELETE(pointer.get(queryDataCline, idFieldPath), headers);
	                }
	                interfacesRest[interfaceModel.key] = promise;
	            });
	            return interfacesRest;
	        }).then(function (interfacesRest) {
	            return _this.$q.all(interfacesRest);
	        }).then(function (results) {
	            _this.doDealResult(actionModel, results, _this.restUtils.headers, 'header');
	            return results;
	        });
	    };
	    Provider.$inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q", "$mdDialog"];
	    Provider._name = 'fxAction';
	    return Provider;
	}());
	mdl.module.provider(Provider._name, [Provider]);


/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var ListSchema = (function () {
	    function ListSchema(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListSchema.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ListSchema.$inject = ["toolbarUtils", "actionUtils"];
	    ListSchema.key = "schemaCommonfx-1";
	    return ListSchema;
	}());
	var ListAction = (function () {
	    function ListAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "actionList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ListAction.$inject = ["toolbarUtils", "actionUtils"];
	    ListAction.key = "actionCommonfx-1";
	    return ListAction;
	}());
	var ConfigAction = (function () {
	    function ConfigAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ConfigAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "configAction",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/home/config",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ConfigAction.$inject = ["toolbarUtils", "actionUtils"];
	    ConfigAction.key = "configAction";
	    return ConfigAction;
	}());
	var services = [ListSchema, ListAction, ConfigAction];
	_.each(services, function (ser) {
	    module_1.module.service(ser.key, ser);
	});


/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.getModel(this.key).then(function (model) {
	            return _this.fxAction.getSchema(model);
	        }).then(function (model) {
	            _this.actionModel = model;
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(130)(),
	        scope: true,
	        require: "^fxFormAction",
	        bindToController: {
	            formData: "=ngModel",
	            actionModel: "=?",
	            isBusy: "=?ngDisabled",
	            key: "@?"
	        },
	        controller: Controller,
	        controllerAs: 'formCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attrs, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxFormAction", Directive);


/***/ },

/***/ 131:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var pointer = __webpack_require__(56);
	var Controller = (function () {
	    function Controller($scope, $q, $timeout, fxAction, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.mdLimitOptions = [10, 30, 50, 100, 300];
	        this.clientData = {};
	        this.queryData = { offset: 0, limit: 10, page: 1 };
	        this.isBusy = false;
	        this.showPage = false;
	        this.selected = [];
	        fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = _.cloneDeep(model);
	            _this.queryData = _.extend({ offset: 0, limit: 10, page: 1 }, _this.actionModel.list.queryData || {});
	            _this.initToolbar();
	            _this.initItemToolbar();
	            _this.doSearch();
	        });
	        this.onOrderChange = this.orderChange.bind(this);
	        this.onPageChange = this.pageChange.bind(this);
	        this.doSearchBind = this.doSearch.bind(this);
	    }
	    Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        var itemSource = _.clone(item);
	        if (actionModel.type === action_model_1.ActionType.form || actionModel.type === action_model_1.ActionType.wizard) {
	            if (pointer.has(item, actionModel.path || "/")) {
	                itemSource = pointer.get(item, actionModel.form.path || "/");
	            }
	            itemSource = {};
	        }
	        this.fxAction.doActionModel($event, actionModel, itemSource).then(function (result) {
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
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon, { fill: "black" }).toValue());
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.labelBuilder("" + _this.actionModel.title).attrBuilder({ flex: "" }).toValue());
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-icon-button", false).tooltipBuilder("").iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false).iconBuilder("refresh", { fill: "black" }).btnClick(function ($event) {
	                    _this.doSearch(_this.queryData.where || {});
	                }).toValue());
	            }
	            if (_this.actionModel.list.showSearchBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}", { fill: "black" }).btnClick(function ($event) {
	                    _this.actionModel.list.showSearchPanel = !_this.actionModel.list.showSearchPanel;
	                }).toValue());
	            }
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
	            _.forEach(actionModels, function (actionModel, key) {
	                var condition = itemActionsObj[key].condition;
	                switch (actionModel.type) {
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
	            });
	            _this.actionModel.list.itemToolbars = [menuTool];
	        });
	    };
	    Controller.prototype.orderChange = function (order) {
	        this.queryData.order = order;
	        this.doSearch(this.queryData.where || {});
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
	        this.isBusy = true;
	        this.queryData.where = filterData || {};
	        this.promise = this.fxAction.doAction(this.key, this.queryData);
	        if (!this.promise) {
	            return;
	        }
	        this.promise.then(function (result) {
	            _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$scope", "$q", "$timeout", "fxAction", "toolbarUtils", "materialUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(132)(),
	        scope: true,
	        bindToController: {
	            key: "@",
	            selected: '=?'
	        },
	        controller: Controller,
	        controllerAs: 'listCtl',
	        replace: true,
	        transclude: true
	    };
	}
	module_1.module.directive("fxListAction", Directive);


/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var _dirName = 'fxDialogFormAction';
	var Controller = (function () {
	    function Controller($scope, fxAction, materialUtils, toolbarUtils, $mdDialog) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.doSubmit = function ($form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, $form);
	        if (promise) {
	            this.isBusy = true;
	            promise.then(function (result) {
	                _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                if (_.isFunction(_this.submitCallBack)) {
	                    _this.submitCallBack(result);
	                }
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }
	        return promise;
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = model;
	            _this.toolbars = [
	                _this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon).toValue(),
	                _this.toolbarUtils.labelBuilder(_this.actionModel.title).attrBuilder({ flex: "" }).toValue(),
	                _this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close").btnClick(function ($event) {
	                    _this.$mdDialog.cancel();
	                }).toValue()
	            ];
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction", "materialUtils", "toolbarUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(135)(),
	        scope: true,
	        require: "^" + _dirName,
	        bindToController: {
	            key: "@",
	            formData: '=ngModel',
	            submitCallBack: '=?ngSubmit'
	        },
	        controller: Controller,
	        controllerAs: 'dialogFormCtl',
	        replace: false,
	        compile: function ($ele) {
	            $ele.replaceWith(angular.element($ele.html()));
	            return function ($scope, $ele, $attrs, $ctl) {
	                $scope.$watch(function () {
	                    return $ctl.key;
	                }, function () {
	                    $ctl.getActionModel();
	                });
	            };
	        }
	    };
	}
	module_1.module.directive(_dirName, Directive);


/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var pointer = __webpack_require__(56);
	var _name = "fxSearchAction";
	var Controller = (function () {
	    function Controller(fxAction, toolbarUtils) {
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.initSearchToolbar();
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.clearFilterData = function () {
	        var _this = this;
	        _.forEach(this.formData, function (val, key) {
	            delete _this.formData[key];
	        });
	    };
	    Controller.prototype.initSearchToolbar = function () {
	        var _this = this;
	        this.toolbars = [
	            this.toolbarUtils.labelBuilder('{{searchCtl.title}}搜索').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("清空搜索条件", "md-icon-button", false).iconBuilder("clear_all").btnClick(function ($event) {
	                _this.clearFilterData();
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("关闭搜索栏", "md-icon-button", false).iconBuilder("{{searchCtl.isShow?'window-open':'window-closed'}}").btnClick(function ($event) {
	                _this.isShow = !_this.isShow;
	            }).toValue()
	        ];
	    };
	    Controller.prototype.doPreSearch = function ($event, $form) {
	        var searchData = {};
	        if (this.fxAction.doFormCheck($form) && _.isFunction(this.doSearch)) {
	            _.forEach(this.formData, function (data, key) {
	                if (key.substr(0, 1) === "/") {
	                    if (!_.isNull(data) && !_.isUndefined(data)) {
	                        pointer.set(searchData, key, data);
	                    }
	                    else {
	                        pointer.has(searchData, key) && pointer.remove(searchData, key);
	                    }
	                }
	            });
	            this.doSearch(searchData);
	        }
	    };
	    Controller.$inject = ["fxAction", "toolbarUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(137)(),
	        bindToController: {
	            formData: "=ngModel",
	            key: "@",
	            disabled: '=',
	            isShow: '=',
	            doSearch: '=?',
	            title: '=?'
	        },
	        require: "^" + _name,
	        controller: Controller,
	        controllerAs: 'searchCtl',
	        replace: true
	    };
	}
	module_1.module.directive(_name, Directive);


/***/ },

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var Controller = (function () {
	    function Controller($scope, $timeout, fxAction, toolbarUtils, materialUtils, $mdDialog) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.$mdDialog = $mdDialog;
	        this.isShow = true;
	        this.selectedIndex = 0;
	        this.initToolbar();
	        this.$scope.$on("$destroy", function () {
	            _this.formData = null;
	            _this.$forms = null;
	            _this.toolbars = null;
	            _this.actionModel = null;
	        });
	    }
	    Controller.prototype.initForm = function (action, $scope) {
	        if (!this.$forms) {
	            this.$forms = {};
	        }
	        this.$forms[action.key] = $scope[(action.key + "Form")];
	    };
	    Controller.prototype.showForm = function (action, index) {
	        return index === 0 || this.$forms.hasOwnProperty(action.key) || index == this.selectedIndex || index == this.actionModel.wizard.actions.length - 1;
	    };
	    Controller.prototype.doCheckCurrentForm = function (index) {
	        var actionModel = this.actionModel.wizard.actions[_.isUndefined(index) ? this.selectedIndex : index];
	        if (this.$forms) {
	            var formController = this.$forms[("" + actionModel.key)];
	            if (!this.fxAction.doFormCheck(formController)) {
	                return false;
	            }
	        }
	        return true;
	    };
	    Controller.prototype.doCheckForms = function () {
	        var _this = this;
	        var res = true;
	        _.each(this.actionModel.wizard.actions, function (action, index) {
	            res = _this.doCheckCurrentForm(index);
	            if (!res) {
	                _this.selectedIndex = index;
	                return false;
	            }
	        });
	        return res;
	    };
	    Controller.prototype.reset = function () {
	        var _this = this;
	        this.formData = {};
	        this.$forms = {};
	        this.selectedIndex = 0;
	        this.isShow = false;
	        this.$timeout(function () {
	            _this.isShow = true;
	        }, 0);
	    };
	    Controller.prototype.initToolbar = function () {
	        var _this = this;
	        this.toolbars = [
	            this.toolbarUtils.btnBuilder("上一步", null, true, "top").iconBuilder("navigate_before").conditionBuilder("wizardCtl.selectedIndex>0", false).btnClick(function ($event) {
	                _this.selectedIndex && _this.selectedIndex--;
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("下一步", null, true, "top").iconBuilder(null, null, "navigate_next").conditionBuilder("wizardCtl.selectedIndex < wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckCurrentForm() && _.isArray(_this.actionModel.wizard.actions) && _this.actionModel.wizard.actions.length > _this.selectedIndex) {
	                    _this.selectedIndex++;
	                }
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("完成", "md-primary", true, "top").iconBuilder("done_all").conditionBuilder("!wizardCtl.isBusy && wizardCtl.selectedIndex===wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckForms()) {
	                    _this.isBusy = true;
	                    _this.fxAction.doAction(_this.actionModel.key, _this.formData).then(function (result) {
	                        _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                        if (_.isFunction(_this.submitCallBack)) {
	                            _this.submitCallBack(result);
	                        }
	                    }).finally(function () {
	                        _this.isBusy = false;
	                    });
	                }
	            }).toValue()
	        ];
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        var actionModel;
	        this.fxAction.getModel(this.key).then(function (model) {
	            actionModel = _.cloneDeep(model);
	            return _this.fxAction.getModels(model.wizard.actions);
	        }).then(function (actionModels) {
	            var actions = [];
	            _.each(actionModel.wizard.actions, function (action) {
	                if (_.isString(action)) {
	                    action = actionModels[action];
	                }
	                if (action && (action.type === action_model_1.ActionType.form || action.type === action_model_1.ActionType.wizard)) {
	                    actions.push(action);
	                }
	            });
	            actionModel.wizard.actions = actions;
	            _this.actionModel = actionModel;
	        });
	    };
	    Controller.$inject = ["$scope", "$timeout", "fxAction", "toolbarUtils", "materialUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(139)(),
	        scope: true,
	        require: "^fxWizardAction",
	        bindToController: {
	            formData: "=ngModel",
	            submitCallBack: "=?ngSubmit",
	            key: "@"
	        },
	        controller: Controller,
	        controllerAs: 'wizardCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attr, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxWizardAction", Directive);


/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _dirName = 'fxDialogWizardAction';
	var Controller = (function () {
	    function Controller($scope, fxAction, materialUtils, toolbarUtils, $mdDialog) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = model;
	            _this.toolbars = [
	                _this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon).toValue(),
	                _this.toolbarUtils.labelBuilder(_this.actionModel.title).attrBuilder({ flex: "" }).toValue(),
	                _this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close").btnClick(function ($event) {
	                    _this.$mdDialog.cancel("用户关闭");
	                }).toValue()
	            ];
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction", "materialUtils", "toolbarUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(141)(),
	        scope: true,
	        require: "^" + _dirName,
	        bindToController: {
	            key: "@",
	            formData: '=ngModel',
	            submitCallBack: "=?ngSubmit",
	        },
	        controller: Controller,
	        controllerAs: 'dialogWizardCtl',
	        replace: false,
	        compile: function ($ele) {
	            $ele.replaceWith(angular.element($ele.html()));
	            return function ($scope, $ele, $attr, $ctl) {
	                $scope.$watch(function () {
	                    return $ctl.key;
	                }, function () {
	                    $ctl.getActionModel();
	                });
	            };
	        }
	    };
	}
	module_1.module.directive(_dirName, Directive);


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _name = "fxBuilderAction";
	var Controller = (function () {
	    function Controller(fxAction, toolbarUtils) {
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.formData = this.formData || {};
	    }
	    Controller.$inject = ["fxAction", "toolbarUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(143)(),
	        bindToController: {
	            formData: "=ngModel",
	            key: "@"
	        },
	        require: "^" + _name,
	        controller: Controller,
	        controllerAs: 'formBuilderCtl',
	        replace: true
	    };
	}
	Directive.$inject = [];
	module_1.module.directive(_name, Directive);


/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(151);
	var ngMaterialIcons = __webpack_require__(20);
	var _ = __webpack_require__(27);
	var router_1 = __webpack_require__(152);
	var material_service_1 = __webpack_require__(36);
	var svg_service_1 = __webpack_require__(161);
	var toolbar_1 = __webpack_require__(162);
	var sidemenu_1 = __webpack_require__(171);
	__webpack_require__(183);
	var action_model_1 = __webpack_require__(31);
	var module = angular.module("homeModule", [toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.definePalette('amazingPaletteName', {
	            '50': 'E8EAF6',
	            '100': 'C5CAE9',
	            '200': 'B39DDB',
	            '300': 'B39DDB',
	            '400': 'BDBDBD',
	            '500': '9B26AF',
	            '600': '757575',
	            '700': '7A1EA1',
	            '800': '691A99',
	            '900': '263238',
	            'A100': 'FFE57F',
	            'A200': '68EFAD',
	            'A400': 'FF3D00',
	            'A700': 'DD2C00',
	            'contrastDefaultColor': 'light',
	            'contrastDarkColors': ['50', '100',
	                '200', '300', '400', 'A100'],
	            'contrastLightColors': ['50', '100',
	                '200', '300', '400', 'A100']
	        });
	        $mdThemingProvider.theme('default')
	            .primaryPalette('purple')
	            .accentPalette('red')
	            .warnPalette('grey');
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils, fxAction) {
	        var state = {};
	        var handleResolve = function () {
	            state.$$isFinish = true;
	            $state.go(state.toState.name, state.toParams, state.options);
	        };
	        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
	            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
	        });
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
	            if (!state.$$isFinish) {
	                _.extend(state, {
	                    toState: toState,
	                    toParams: toParams,
	                    fromState: fromState,
	                    fromParams: fromParams,
	                    options: options
	                });
	                event.preventDefault();
	                $q.all({
	                    mdi: svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg'),
	                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg'),
	                    config: fxAction.doAction("configAction", {}).then(function (result) {
	                        $rootScope["config"] = result.configAction;
	                    })
	                }).then(handleResolve, handleResolve);
	            }
	        });
	    }]);
	module.value("iconInfoDetailForm", {
	    key: "iconInfoDetailForm",
	    icon: "search",
	    type: action_model_1.ActionType.form,
	    title: "ICON详情",
	    form: {
	        dataSchema: {
	            type: "object",
	            properties: {
	                key: {
	                    type: "string",
	                    title: "KEY"
	                }
	            }
	        },
	        formSchema: [{
	                key: "key",
	                type: "string",
	                placeHolder: "KEY",
	                htmlClass: "md-block"
	            }]
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	function LoginSchemaValue() {
	    var actionModel = {
	        key: "login",
	        type: action_model_1.ActionType.form,
	        icon: "",
	        form: {
	            dataSchema: {
	                type: "object",
	                required: ["username", "password"],
	                properties: {
	                    username: {
	                        type: "string",
	                        minLength: 4,
	                        maxLength: 20,
	                        title: "用户名"
	                    },
	                    password: {
	                        type: "string",
	                        title: "密码",
	                        minLength: 4,
	                        maxLength: 20
	                    }
	                }
	            },
	            formSchema: [{
	                    key: "username",
	                    type: "string",
	                    placeHolder: "用户名",
	                    icon: {
	                        leftIcon: "account"
	                    },
	                    htmlClass: "md-icon-left md-block"
	                }, {
	                    key: "password",
	                    type: "password",
	                    icon: {
	                        leftIcon: "lock"
	                    },
	                    htmlClass: "md-icon-left md-block"
	                }]
	        },
	        interfaces: [{
	                key: "loginAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/login",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	function LogoutSchemaValue() {
	    var actionModel = {
	        key: "logout",
	        type: action_model_1.ActionType.confirm,
	        icon: "",
	        confirm: {
	            confirmTitle: '用户中心',
	            confirmContent: '确定要退出么?',
	            confirmOk: "果断退出",
	            confirmCancel: '在看看'
	        },
	        interfaces: [{
	                key: "logoutAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/logout",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var models = [LoginSchemaValue(), LogoutSchemaValue()];
	    _.each(models, function (model) {
	        module.value(model.key, model);
	    });
	};


/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var ip = "https://172.16.140.164";
	var port = 8888;
	var Login = (function () {
	    function Login() {
	        var actionModel = {
	            key: Login.key,
	            type: action_model_1.ActionType.form,
	            title: "登陆",
	            icon: "login",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["username", "password"],
	                    properties: {
	                        username: {
	                            type: "string",
	                            minLength: 4,
	                            maxLength: 20,
	                            title: "用户名"
	                        },
	                        eauth: {
	                            type: "string",
	                            default: "pam"
	                        },
	                        password: {
	                            type: "string",
	                            title: "密码",
	                            minLength: 4,
	                            maxLength: 20
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "username",
	                        type: "string",
	                        placeHolder: "用户名",
	                        icon: {
	                            leftIcon: "account"
	                        },
	                        htmlClass: "md-icon-left md-block"
	                    }, {
	                        key: "password",
	                        type: "password",
	                        icon: {
	                            leftIcon: "lock"
	                        },
	                        htmlClass: "md-icon-left md-block"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiLogin",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "login",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    header: {
	                        set: [{
	                                "from": "/return/0/token", "to": "/X-Auth-Token"
	                            }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Login.key = "saltApiLogin";
	    return Login;
	}());
	var Logout = (function () {
	    function Logout() {
	        var actionModel = {
	            key: Logout.key,
	            type: action_model_1.ActionType.confirm,
	            title: "salt退出登录",
	            icon: "logout",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要退出登录吗!"
	            },
	            interfaces: [{
	                    key: "saltApiLogin",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "logout",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Logout.key = "saltApiLogout";
	    return Logout;
	}());
	var Minions = (function () {
	    function Minions() {
	        var actionModel = {
	            key: Minions.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有CLIENT",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取minions!"
	            },
	            interfaces: [{
	                    key: "saltApiMinions",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "minions",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Minions.key = "saltApiMinions";
	    return Minions;
	}());
	var Jobs = (function () {
	    function Jobs() {
	        var actionModel = {
	            key: Jobs.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有JOBS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取JOBS!"
	            },
	            interfaces: [{
	                    key: "saltApiJobs",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "jobs",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Jobs.key = "saltApiJobs";
	    return Jobs;
	}());
	var Events = (function () {
	    function Events() {
	        var actionModel = {
	            key: Events.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有EVENTS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取EVENTS!"
	            },
	            interfaces: [{
	                    key: "saltApiEvents",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "events",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Events.key = "saltApiEvents";
	    return Events;
	}());
	var Stats = (function () {
	    function Stats() {
	        var actionModel = {
	            key: Stats.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有Stats",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取Stats!"
	            },
	            interfaces: [{
	                    key: "saltApiStats",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "stats",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Stats.key = "saltApiStats";
	    return Stats;
	}());
	var Run = (function () {
	    function Run() {
	        var actionModel = {
	            key: Run.key,
	            type: action_model_1.ActionType.form,
	            title: "执行命令",
	            icon: "run",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["client"],
	                    properties: {
	                        username: {
	                            type: "string",
	                            title: "用户名",
	                            default: "saltapi"
	                        },
	                        eauth: {
	                            type: "string",
	                            default: "pam"
	                        },
	                        password: {
	                            type: "string",
	                            title: "密码",
	                            default: "saltapi",
	                            minLength: 4,
	                            maxLength: 20
	                        },
	                        client: {
	                            type: "string",
	                            default: "local"
	                        },
	                        tgt: {
	                            type: "string",
	                            default: "*"
	                        },
	                        fun: {
	                            type: "string",
	                            default: "test.ping"
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "client",
	                        type: "text"
	                    }, {
	                        key: "tgt",
	                        type: "text"
	                    }, {
	                        key: "fun",
	                        type: "text"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiRun",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "run",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Run.key = "saltApiRun";
	    return Run;
	}());
	var Run1 = (function () {
	    function Run1() {
	        var actionModel = {
	            key: Run1.key,
	            type: action_model_1.ActionType.form,
	            title: "执行命令-1",
	            icon: "run",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["client"],
	                    properties: {
	                        mode: {
	                            type: "string",
	                            default: "async"
	                        },
	                        tgt: {
	                            type: "string",
	                            default: "*"
	                        },
	                        fun: {
	                            type: "string",
	                            default: "test.ping"
	                        },
	                        arg: {
	                            "type": "array",
	                            "title": "参数",
	                            "default": [],
	                            "items": {
	                                "type": "string",
	                                "title": "参数"
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "tgt",
	                        type: "text"
	                    }, {
	                        key: "fun",
	                        type: "text"
	                    }, {
	                        key: "arg",
	                        startEmpty: true,
	                        type: "chips"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiRun",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "minions",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Run1.key = "saltApiRun1";
	    return Run1;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login, Logout, Minions, Jobs, Events, Stats, Run, Run1];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.04844292905b833c8b35.hot-update.js.map
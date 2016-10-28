webpackHotUpdate(0,{

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(29);
	var rest_service_1 = __webpack_require__(30);
	var action_1 = __webpack_require__(34);
	var dycompile_1 = __webpack_require__(142);
	__webpack_require__(143);
	var module = angular.module("pageModule", [ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", "materialUtils", function ($state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(35);
	__webpack_require__(37);
	var rest_service_1 = __webpack_require__(30);
	__webpack_require__(68);
	__webpack_require__(72);
	var _name = "fxAction";
	exports.module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	__webpack_require__(45);
	__webpack_require__(38);
	__webpack_require__(207);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(73);
	exports.module
	    .config(["sfErrorMessageProvider", function (sfErrorMessageProvider) {
	        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
	        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
	        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
	        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
	        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
	        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
	        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
	    }])
	    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", "layoutBuilderProvider", function (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder, layoutBuilder) {
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'jeditor', "./decorators/jsoneditor.jade", sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder));
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'card', "./decorators/card.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]);
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, layoutBuilder.builder, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilder.builder]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(138)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(140)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(141)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(53);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(58);
	__webpack_require__(60);
	__webpack_require__(62);
	__webpack_require__(64);


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var pointer = __webpack_require__(41);
	var _ = __webpack_require__(31);
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
	                this.mdUtils.showErrMsg("\u6CA1\u6709\u627E\u5230key[" + key + "]!");
	                defer.reject(key);
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
	            this.getModel("schemaListAction").then(function (model) {
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
	                    _a[action_model_1.ActionType.form] = __webpack_require__(43)(),
	                    _a[action_model_1.ActionType.wizard] = __webpack_require__(44)(),
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
	                _.forEach(jpp.set, function (val, key) {
	                    pointer.has(result, val) && pointer.set(clientData, key, pointer.get(result, val));
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
	                switch (interfaceModel.method) {
	                    case interface_model_1.MethodType.POST:
	                        promise = restAngular.post(queryDataCline, null, headers);
	                        break;
	                    case interface_model_1.MethodType.GET:
	                        promise = restAngular.customGET((interfaceModel.params && pointer.has(queryDataCline, interfaceModel.idFieldPath)) ? pointer.get(queryDataCline, interfaceModel.idFieldPath) : null, queryDataCline, headers);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        if (!pointer.has(queryDataCline, interfaceModel.idFieldPath)) {
	                            return console.error("\u6CA1\u6709\u627E\u5230" + interfaceModel.idFieldPath);
	                        }
	                        promise = restAngular.customPUT(_.isObject(queryDataCline) ? queryDataCline : null, pointer.get(queryDataCline, interfaceModel.idFieldPath), headers);
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        if (!pointer.has(queryDataCline, interfaceModel.idFieldPath)) {
	                            return console.error("\u6CA1\u6709\u627E\u5230" + interfaceModel.idFieldPath);
	                        }
	                        promise = restAngular.customDELETE(pointer.get(queryDataCline, interfaceModel.idFieldPath), headers);
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
	index_1.module.provider(Provider._name, [Provider]);


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
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
	index_1.module.service(Service._builderName, Service.builder);


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "模块管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.title }}</span>", "模块名称").toValue(),
	                    actionUtils.columnBuilder("<ng-md-icon icon=\"{{ ::item.icon }}\"></ng-md-icon>", "图标").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.lft }}</span>", "lft", "lft").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.rgt }}</span>", "rgt", "rgt").toValue()
	                ],
	                queryData: { limit: 50 },
	                showPagination: true,
	                searchActionKey: Search.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Edit.key }, { key: Delete.key }],
	            actions: [Add.key],
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    jpp: {
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "module";
	    return List;
	}());
	var Menus = (function () {
	    function Menus(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Menus.key,
	            type: action_model_1.ActionType.list,
	            title: "模块管理",
	            icon: "view-module",
	            interfaces: [{
	                    key: "moduleMenu",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/modules/menu",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Menus.$inject = ["toolbarUtils", "actionUtils"];
	    Menus.key = "moduleMenuAction";
	    return Menus;
	}());
	var Add = (function () {
	    function Add(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.form,
	            title: "新建模块",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: "moduleActionData",
	                formSchema: "moduleAddActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "modulesAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.$inject = ["toolbarUtils", "actionUtils"];
	    Add.key = "modulesAddAction";
	    return Add;
	}());
	var Edit = (function () {
	    function Edit(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改模块",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: "moduleActionData",
	                formSchema: "moduleEditActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "modulesEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.$inject = ["toolbarUtils", "actionUtils"];
	    Edit.key = "modulesEditAction";
	    return Edit;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除模块",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除模块吗!"
	            },
	            interfaces: [{
	                    key: "modulesDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "modules",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "modulesDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            icon: "search",
	            type: action_model_1.ActionType.form,
	            title: "模块搜索表单",
	            form: {
	                dataSchema: "moduleActionData",
	                formSchema: "moduleSearchActionForm"
	            }
	        };
	        return actionModel;
	    }
	    Search.$inject = ["toolbarUtils", "actionUtils"];
	    Search.key = "modulesSearchAction";
	    return Search;
	}());
	var services = [Delete, Menus, List, Search, Add, Edit];
	_.each(services, function (ser) {
	    index_1.module.service(ser.key, ser);
	});


/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var Config = (function () {
	    function Config(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Config.key,
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
	    Config.$inject = ["toolbarUtils", "actionUtils"];
	    Config.key = "configAction";
	    return Config;
	}());
	var Result = (function () {
	    function Result(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Result.key,
	            type: action_model_1.ActionType.form,
	            title: "结果反馈",
	            icon: "view-module",
	            form: {
	                dataSchema: "resultActionData",
	                formSchema: "resultActionForm"
	            }
	        };
	        return actionModel;
	    }
	    Result.$inject = ["toolbarUtils", "actionUtils"];
	    Result.key = "resultAction";
	    return Result;
	}());
	var services = [Result, Config];
	_.each(services, function (ser) {
	    index_1.module.service(ser.key, ser);
	});


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "数据库备份文件管理",
	            icon: "backup",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<a target='_blank' href='/backups/{{ ::item }}'>{{::item}}</a>", "文件名称").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.replace('.sql','') | date: 'yyyy-MM-dd HH:mm:ss Z'}}</span>", "备份时间").toValue(),
	                ],
	                showPagination: false,
	                searchActionKey: "",
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Delete.key }, { key: Dump.key }],
	            actions: [Backup.key],
	            interfaces: [{
	                    key: "backupList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    jpp: {
	                        set: { "/rows": "" }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "backupListAction";
	    return List;
	}());
	var Backup = (function () {
	    function Backup() {
	        var actionModel = {
	            key: Backup.key,
	            type: action_model_1.ActionType.confirm,
	            title: "备份数据库文件",
	            icon: "backup",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要备份此文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDump",
	                    method: interface_model_1.MethodType.POST,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Backup.key = "backupBackupAction";
	    return Backup;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除备份数据库文件",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除备份文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "backupDeleteAction";
	    return Delete;
	}());
	var Dump = (function () {
	    function Dump() {
	        var actionModel = {
	            key: Dump.key,
	            type: action_model_1.ActionType.confirm,
	            title: "还原文件",
	            icon: "backup",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要还原此文件吗!"
	            },
	            interfaces: [{
	                    key: "backupDump",
	                    method: interface_model_1.MethodType.PUT,
	                    params: false,
	                    idFieldPath: "",
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Dump.key = "backupDumpAction";
	    return Dump;
	}());
	var Download = (function () {
	    function Download() {
	        var actionModel = {
	            key: Download.key,
	            type: action_model_1.ActionType.form,
	            title: "上传文件",
	            icon: "upload",
	            refreshList: true,
	            interfaces: [{
	                    key: "backupDownload",
	                    method: interface_model_1.MethodType.GET,
	                    idFieldPath: "",
	                    params: true,
	                    address: "",
	                    port: null,
	                    path: "backups",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Download.key = "backupDownloadAction";
	    return Download;
	}());
	var services = [List, Dump, Delete, Backup, Download];
	_.each(services, function (model) {
	    index_1.module.service(model.key, model);
	});


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "SCHEMA管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.group}}</span>", "分组名称", "group").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.type }}</span>", "模块类型").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.description }}</span>", "描述").toValue(),
	                ],
	                queryData: { limit: 50 },
	                showPagination: true,
	                searchActionKey: Search.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Edit.key }, { key: Delete.key }, { key: Copy.key }],
	            actions: [Add.key],
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "schemaListAction";
	    return List;
	}());
	var Add = (function () {
	    function Add() {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.form,
	            title: "新建SCHEMA",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "schemaAddAction";
	    return Add;
	}());
	var Edit = (function () {
	    function Edit() {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改SCHEMA",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.key = "schemaEditAction";
	    return Edit;
	}());
	var Copy = (function () {
	    function Copy() {
	        var actionModel = {
	            key: Copy.key,
	            type: action_model_1.ActionType.form,
	            title: "复制SCHEMA",
	            icon: "content_copy",
	            refreshList: true,
	            form: {
	                dataSchema: "schemaActionData",
	                formSchema: "schemaAddActionData"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "schemaAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        del: ["/id"]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "schemaCopyAction";
	    return Copy;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除SCHEMA",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除SCHEMA吗!"
	            },
	            interfaces: [{
	                    key: "schemaDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "schemaDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索SCHEMA",
	            icon: "search",
	            form: {
	                dataSchema: "schemaActionData",
	                formSchema: "schemaSearchActionData"
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "schemaSearchAction";
	    return Search;
	}());
	var services = [List, Add, Edit, Delete, Copy, Search];
	_.each(services, function (ser) {
	    index_1.module.service(ser.key, ser);
	});


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "SCHEMA管理",
	            icon: "view-module",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.type}}</span>", "操作类型", "type").toValue(),
	                    actionUtils.columnBuilder("<span>{{::item.title }}</span>", "操作标题").toValue()
	                ],
	                queryData: { limit: 50 },
	                showPagination: true,
	                searchActionKey: Search.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: Edit.key }, { key: Delete.key }, { key: Copy.key }],
	            actions: [Add.key],
	            interfaces: [{
	                    key: "actionList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    jpp: {
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        }
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "action";
	    return List;
	}());
	var Add = (function () {
	    function Add() {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.form,
	            title: "新建SCHEMA",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: [
	                    {
	                        "key": "key",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "title",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "icon",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "type",
	                        "type": "select",
	                        "htmlClass": "md-block",
	                        "titleMap": [
	                            {
	                                "name": "NONE",
	                                "value": 0
	                            },
	                            {
	                                "name": "列表操作",
	                                "value": 1
	                            },
	                            {
	                                "name": "表单操作",
	                                "value": 2
	                            },
	                            {
	                                "name": "多表单操作",
	                                "value": 3
	                            },
	                            {
	                                "name": "确认操作",
	                                "value": 4
	                            }
	                        ]
	                    },
	                    {
	                        "key": "condition",
	                        "type": "text",
	                        "condition": "model.type>1",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "successMsg",
	                        "condition": "model.type>1",
	                        "type": "text",
	                        "htmlClass": "md-block"
	                    },
	                    {
	                        "key": "refreshList",
	                        "condition": "model.type>1",
	                        "type": "checkbox"
	                    },
	                    {
	                        "key": "closeDialog",
	                        "condition": "model.type>1",
	                        "type": "checkbox"
	                    },
	                    {
	                        "key": "list",
	                        "type": "card",
	                        "condition": "model.type==1",
	                        "fieldClass": "flex layout-column",
	                        "items": [
	                            {
	                                "key": "list.columns",
	                                "type": "array",
	                                "htmlClass": "flex",
	                                "items": [
	                                    {
	                                        "key": "list.columns[].content",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].title",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].name",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].sort",
	                                        "type": "text"
	                                    },
	                                    {
	                                        "key": "list.columns[].unit",
	                                        "type": "text"
	                                    }
	                                ]
	                            }, {
	                                "key": "list.searchActionKey",
	                                "type": "autocomplete-1",
	                                "htmlClass": "md-block flex",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "actionKey": "schemaListAction"
	                                }
	                            }, {
	                                "key": "list.showPagination",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showSearchBtn",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showRefreshBtn",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.showSearchPanel",
	                                "type": "checkbox"
	                            }, {
	                                "key": "list.queryData.limit",
	                                "type": "number"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "wizard",
	                        "type": "card",
	                        "condition": "model.type==3",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "wizard.actions",
	                                "type": "array",
	                                "htmlClass": "flex",
	                                "items": [
	                                    {
	                                        "key": "wizard.actions[]",
	                                        "type": "autocomplete-1",
	                                        "startEmpty": true,
	                                        "htmlClass": "md-block flex",
	                                        "acOptions": {
	                                            "textField": "title",
	                                            "keyField": "key",
	                                            "dataField": "rows",
	                                            "noCache": false,
	                                            "search": "/where/key/$like",
	                                            "actionKey": "action"
	                                        }
	                                    }
	                                ]
	                            }
	                        ]
	                    },
	                    {
	                        "key": "form",
	                        "type": "card",
	                        "condition": "model.type==2",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "form.dataSchema",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "_where": {
	                                        "/where/type/$eq": "DATA"
	                                    },
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "form.formSchema",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "keyField": "key",
	                                    "dataField": "rows",
	                                    "noCache": false,
	                                    "search": "/where/key/$like",
	                                    "_where": {
	                                        "/where/type/$eq": "FORM"
	                                    },
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "form.title",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.path",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "confirm",
	                        "type": "card",
	                        "condition": "model.type==4",
	                        "fieldClass": "flex layout-gt-md-row layout-column",
	                        "items": [
	                            {
	                                "key": "confirm.confirmTitle",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmContent",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmOk",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            },
	                            {
	                                "key": "confirm.confirmCancel",
	                                "text": "text",
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    },
	                    {
	                        "key": "interfaces",
	                        "type": "array",
	                        "items": [
	                            {
	                                "key": "interfaces[].key",
	                                "type": "text"
	                            },
	                            {
	                                "key": "interfaces[]",
	                                "type": "autocomplete-1",
	                                "acOptions": {
	                                    "textField": "description",
	                                    "dataField": "rows",
	                                    "noCache": true,
	                                    "search": "/where/key/$like",
	                                    "actionKey": "schemaListAction"
	                                },
	                                "htmlClass": "md-block flex"
	                            }
	                        ]
	                    }
	                ]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "actionAddAction";
	    return Add;
	}());
	var Edit = (function () {
	    function Edit() {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改SCHEMA",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionEditActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.key = "actionEditAction";
	    return Edit;
	}());
	var Copy = (function () {
	    function Copy() {
	        var actionModel = {
	            key: Copy.key,
	            type: action_model_1.ActionType.form,
	            title: "复制SCHEMA",
	            icon: "content_copy",
	            refreshList: true,
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionAddActionForm"
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "actionAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    jpp: {
	                        del: ["/id"]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "actionCopyAction";
	    return Copy;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除SCHEMA",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除SCHEMA吗!"
	            },
	            interfaces: [{
	                    key: "actionDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/id",
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "actionDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索操作",
	            icon: "search",
	            form: {
	                dataSchema: "actionActionData",
	                formSchema: "actionSearchActionForm"
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "actionSearchAction";
	    return Search;
	}());
	var services = [List, Add, Edit, Delete, Copy, Search];
	_.each(services, function (ser) {
	    index_1.module.service(ser.key, ser);
	});


/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
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
	        template: __webpack_require__(52)(),
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
	index_1.module.directive("fxFormAction", Directive);


/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
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
	        this.fxAction.doActionModel($event, actionModel, item).then(function (result) {
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
	        this.actionModel.list.toolbars.push(this.toolbarUtils.noneBuilder("icon").iconBuilder(this.actionModel.icon, { fill: "black" }).toValue());
	        this.actionModel.list.toolbars.push(this.toolbarUtils.labelBuilder("" + this.actionModel.title).attrBuilder({ flex: "" }).toValue());
	        this.fxAction.getModels(this.actionModel.actions).then(function (actionModels) {
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
	        template: __webpack_require__(54)(),
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
	index_1.module.directive("fxListAction", Directive);


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
	var pointer = __webpack_require__(41);
	var _name = "fxAutocompleteBoost";
	var Builder = (function () {
	    function Builder(form, fxAction, formData) {
	        this.form = form;
	        this.fxAction = fxAction;
	        this.formData = formData;
	        this.init();
	    }
	    Builder.prototype.init = function () {
	        var viewModel = null;
	        if (pointer.has(this.formData, "/" + this.form.key.join('/'))) {
	            viewModel = pointer.get(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (!viewModel) {
	            return;
	        }
	        if (this.form.acOptions.keyField) {
	            return this.searchText = viewModel;
	        }
	        this.searchText = viewModel[this.form.acOptions.textField];
	        this.onChange(viewModel);
	    };
	    Builder.prototype.onChange = function (item) {
	        this.selected = item;
	        if (_.isEmpty(item) || !this.searchText) {
	            this.selected = null;
	            return pointer.remove(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (this.form.acOptions.keyField) {
	            if (pointer.has(item, "/" + this.form.acOptions.keyField)) {
	                return pointer.set(this.formData, "/" + this.form.key.join('/'), pointer.get(item, "/" + this.form.acOptions.keyField));
	            }
	            else {
	                return console.error("autocomplete-1-\u6CA1\u6709\u5728item\u4E2D\u627E\u5230" + this.form.acOptions.keyField);
	            }
	        }
	        pointer.set(this.formData, "/" + this.form.key.join('/'), item);
	    };
	    Builder.prototype.query = function () {
	        var _this = this;
	        var actionModel, clientData = {};
	        var filter = {};
	        if (this.form.acOptions.actionKey) {
	            pointer.set(filter, this.form.acOptions.search, this.searchText);
	            _.forEach(this.form.acOptions._where, function (val, key) {
	                pointer.set(filter, key, val);
	            });
	            return this.fxAction.getModel(this.form.acOptions.actionKey).then(function (aModel) {
	                actionModel = aModel;
	                return _this.fxAction.doAction(actionModel.key, filter);
	            }).then(function (results) {
	                return _this.fxAction.doDealResult(actionModel, results, clientData);
	            }).then(function (results) {
	                return results[_this.form.acOptions.dataField];
	            });
	        }
	        return this.form.data || [];
	    };
	    return Builder;
	}());
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        var formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;
	        formWithIndex && (formWithIndex = _.first(_.filter(formWithIndex.items, function (item) {
	            return item['key'].join('') === $scope.form["key"].join('') ||
	                _.filter(item['key'], function (key) {
	                    return key && !_.isNumber(key);
	                }).join('') === $scope.form["key"].join('');
	        })));
	        $scope.boost = new Builder(formWithIndex ? formWithIndex : $scope.form, fxAction, $scope.model);
	    }
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'A',
	        scope: false,
	        controller: Controller,
	        replace: false
	    };
	}
	Directive.$inject = [];
	index_1.module.directive(_name, Directive);


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
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
	        template: __webpack_require__(57)(),
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
	index_1.module.directive(_dirName, Directive);


/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
	var pointer = __webpack_require__(41);
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
	                    pointer.set(searchData, key, data);
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
	        template: __webpack_require__(59)(),
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
	index_1.module.directive(_name, Directive);


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var action_model_1 = __webpack_require__(39);
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
	        template: __webpack_require__(61)(),
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
	index_1.module.directive("fxWizardAction", Directive);


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
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
	        template: __webpack_require__(63)(),
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
	index_1.module.directive(_dirName, Directive);


/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
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
	        template: __webpack_require__(65)(),
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
	index_1.module.directive(_name, Directive);


/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	var _ = __webpack_require__(31);
	function Provider() {
	    this.builder = function (args) {
	        args.form.acOptions = _.extend({
	            textField: "",
	            keyField: "",
	            dataField: "",
	            delay: 300,
	            noCache: false,
	            _where: {},
	            search: "",
	            actionKey: ""
	        }, args.form.acOptions || {});
	    };
	    this.$get = [function () {
	            return {};
	        }];
	}
	index_1.module.provider('autoCompleteBuilder', [Provider]);


/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	function Provider() {
	    function Builder(args) {
	        var options = {
	            modes: ['tree', 'code', 'text'],
	            mode: 'code',
	            name: args.form.key.join('')
	        };
	        args.form.preferText = !!args.form.preferText;
	        args.form.jsonOptions = _.extend(args.form.jsonOptions || {}, options);
	    }
	    this.builder = Builder;
	    this.$get = [function () {
	            return {};
	        }];
	}
	index_1.module.provider('jsonEditorBuilder', [Provider]);


/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var router_1 = __webpack_require__(171);
	var material_service_1 = __webpack_require__(29);
	var rest_service_1 = __webpack_require__(30);
	var action_1 = __webpack_require__(34);
	var login_value_1 = __webpack_require__(178);
	__webpack_require__(33);
	var module = angular.module("loginModule", [ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default, action_1.default, 'restangular']);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", function ($state, restUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status === 401 && !response.config["salt"]) {
	                    !$state.is("passport.login") && $state.go("passport.login");
	                    return false;
	                }
	                return true;
	            });
	        });
	    }]);
	login_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(34);
	function Provider() {
	    this.builder = function (args) {
	        var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	        if (layoutDiv && args.form.grid) {
	            Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	                layoutDiv.setAttribute(property, args.form.grid[property]);
	            });
	        }
	        ;
	    };
	    this.$get = [function () {
	            return {};
	        }];
	}
	index_1.module.provider('layoutBuilder', [Provider]);


/***/ }

})
//# sourceMappingURL=0.2ee3baadef310ed41046.hot-update.js.map
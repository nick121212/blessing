webpackHotUpdate(0,{

/***/ 29:
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

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
	var ExecuteCmdForm = (function () {
	    function ExecuteCmdForm() {
	        var actionModel = {
	            key: ExecuteCmdForm.key,
	            type: action_model_1.ActionType.form,
	            title: "",
	            icon: "",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["command", "listIps"],
	                    properties: {
	                        command: {
	                            type: "string",
	                            title: "命令"
	                        },
	                        listIps: {
	                            type: "array",
	                            default: [],
	                            title: "服务器列表",
	                            minItems: 1,
	                            items: {
	                                type: "object"
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "command",
	                        type: "autocomplete-1",
	                        placeHolder: "请选择命令",
	                        acOptions: {
	                            textField: "title",
	                            keyField: "key",
	                            dataField: "rows",
	                            noCache: true,
	                            search: "/where/key/$like",
	                            actionKey: "command"
	                        },
	                        htmlClass: "md-block"
	                    }, {
	                        key: "listIps",
	                        type: "querytable",
	                        qtOptions: {
	                            key: "devices"
	                        },
	                        startEmpty: true,
	                        htmlClass: "md-block"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "execute.cmd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    path: "/commands/manual/test",
	                    jpp: {
	                        set: [{ "from": "/queueItem", "to": "/data" }]
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ExecuteCmdForm.key = "execute.cmd";
	    return ExecuteCmdForm;
	}());
	exports.ExecuteCmdForm = ExecuteCmdForm;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [ExecuteCmdForm];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ },

/***/ 33:
/***/ function(module, exports) {

	"use strict";
	(function (MethodType) {
	    MethodType[MethodType["GET"] = 0] = "GET";
	    MethodType[MethodType["POST"] = 1] = "POST";
	    MethodType[MethodType["DELETE"] = 2] = "DELETE";
	    MethodType[MethodType["PUT"] = 3] = "PUT";
	    MethodType[MethodType["HEAD"] = 4] = "HEAD";
	})(exports.MethodType || (exports.MethodType = {}));
	var MethodType = exports.MethodType;


/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mdl = __webpack_require__(43);
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
	var pointer = __webpack_require__(58);
	var _ = __webpack_require__(25);
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
	        var config = this.$rootScope["config"] || {};
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
	                    config.env === "production" && mdl.module.value(key, resource.rows[0]);
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
	                    _a[action_model_1.ActionType.form] = __webpack_require__(60)(),
	                    _a[action_model_1.ActionType.wizard] = __webpack_require__(61)(),
	                    _a
	                );
	                return this.$mdDialog.show({
	                    targetEvent: $event,
	                    clickOutsideToClose: false,
	                    escapeToClose: false,
	                    fullscreen: true,
	                    preserveScope: false,
	                    autoWrap: false,
	                    locals: {
	                        'item': _.cloneDeep(item || {}),
	                        'key': actionModel.key,
	                        'submit': callback
	                    },
	                    controller: DialogController,
	                    controllerAs: "dialogCtl",
	                    template: templates[actionModel.type]
	                }).then(function () {
	                    item = null;
	                    console.log("关闭");
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
	    Provider.prototype.doGetField = function (restAngular, queryDataCline, interfaceModel, defaults) {
	        if (defaults === void 0) { defaults = []; }
	        var idFieldPaths = (!_.isArray(interfaceModel.idFieldPath) || !interfaceModel.idFieldPath.length) ? defaults : interfaceModel.idFieldPath;
	        _.each(idFieldPaths, function (field) {
	            if (!pointer.has(queryDataCline, field)) {
	                var err = new Error("\u6CA1\u6709\u627E\u5230\u8DEF\u5F84" + field);
	                console.error(err);
	                throw err;
	            }
	            restAngular = restAngular.all(pointer.get(queryDataCline, field));
	        });
	        console.log(restAngular.getRestangularUrl());
	        return restAngular;
	    };
	    Provider.prototype.doAction = function (key, queryData, $form, useType) {
	        var _this = this;
	        if ($form === void 0) { $form = null; }
	        if (useType === void 0) { useType = ""; }
	        var queryDataCline, actionModel;
	        if (!this.doFormCheck($form)) {
	            return;
	        }
	        return this.getModel(key).then(function (aModel) {
	            var interfacesRest = {};
	            var headers = _this.restUtils.headers;
	            var params = _this.restUtils.params;
	            actionModel = aModel;
	            _.each(_.filter(actionModel.interfaces, function (inter) {
	                return inter.useType == useType;
	            }), function (interfaceModel) {
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
	                        restAngular = _this.doGetField(restAngular, queryDataCline, interfaceModel);
	                        promise = restAngular.customGET(null, queryDataCline, headers);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        restAngular = _this.doGetField(restAngular, queryDataCline, interfaceModel, ["/id"]);
	                        promise = restAngular.customPUT(_.isObject(queryDataCline) ? queryDataCline : null, null, headers);
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        restAngular = _this.doGetField(restAngular, queryDataCline, interfaceModel, ["/id"]);
	                        promise = restAngular.customDELETE(null, headers);
	                        break;
	                }
	                interfacesRest[interfaceModel.key] = promise;
	            });
	            return interfacesRest;
	        }).then(function (interfacesRest) {
	            return _this.$q.all(interfacesRest);
	        }).then(function (results) {
	            _this.doDealResult(actionModel, results, _this.restUtils.headers, 'header');
	            results.actionModel = actionModel;
	            return results;
	        });
	    };
	    Provider.$inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q", "$mdDialog"];
	    Provider._name = 'fxAction';
	    return Provider;
	}());
	mdl.module.provider(Provider._name, [Provider]);


/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(43);
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
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

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(29);
	var interface_model_1 = __webpack_require__(33);
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


/***/ }

})
//# sourceMappingURL=0.3db6e0733caad36981e0.hot-update.js.map
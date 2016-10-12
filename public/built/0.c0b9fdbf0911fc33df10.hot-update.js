webpackHotUpdate(0,{

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(31);
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var pointer = __webpack_require__(41);
	var DialogController = (function () {
	    function DialogController($scope, item, key, submit) {
	        this.$scope = $scope;
	        this.item = item;
	        this.key = key;
	        this.submit = submit;
	        console.log(arguments);
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
	                    return _this.doAction(actionModel.key, item);
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
	    Provider.prototype.doDealResult = function (actionModel, results, clientData) {
	        _.forEach(actionModel.interfaces, function (iInterface) {
	            var result = results[iInterface.key];
	            if (result) {
	                _.forEach(iInterface.jpp.set, function (val, key) {
	                    pointer.set(clientData, key, pointer.get(result, val));
	                });
	                _.forEach(iInterface.jpp.del, function (val, key) {
	                    pointer.remove(clientData, key);
	                });
	            }
	        });
	        return clientData;
	    };
	    Provider.prototype.doAction = function (key, queryData, $form) {
	        var _this = this;
	        if (!this.doFormCheck($form)) {
	            return;
	        }
	        return this.getModel(key).then(function (actionModel) {
	            var interfacesRest = {};
	            _.each(actionModel.interfaces, function (interfaceModel) {
	                var promise, restAngular = interfaceModel.isRestful
	                    ? _this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
	                    : _this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
	                switch (interfaceModel.method) {
	                    case interface_model_1.MethodType.POST:
	                        promise = restAngular.post(queryData, null);
	                        break;
	                    case interface_model_1.MethodType.GET:
	                        promise = restAngular.customGET(interfaceModel.params ? pointer.get(queryData, interfaceModel.idFieldPath) : null, queryData, null);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        promise = restAngular.customPUT(_.isObject(queryData) ? queryData : null, pointer.get(queryData, interfaceModel.idFieldPath));
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        promise = restAngular.customDELETE(pointer.get(queryData, interfaceModel.idFieldPath), null);
	                }
	                interfacesRest[interfaceModel.key] = promise;
	            });
	            return interfacesRest;
	        }).then(function (interfacesRest) {
	            return _this.$q.all(interfacesRest);
	        });
	    };
	    Provider.$inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q", "$mdDialog"];
	    Provider._name = 'fxAction';
	    return Provider;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.provider(Provider._name, [Provider]);
	};


/***/ },

/***/ 39:
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

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
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

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var dataSchema = {
	    type: "object",
	    required: ["key", "title", "icon"],
	    properties: {
	        key: {
	            type: "string",
	            title: "KEY"
	        },
	        title: {
	            type: "string",
	            title: "模块名称"
	        },
	        link: {
	            type: "string",
	            title: "路由状态名"
	        },
	        icon: {
	            type: "string",
	            title: "图标"
	        },
	        parentKey: {
	            type: "string",
	            title: "父亲节点KEY"
	        },
	        description: {
	            type: "string",
	            title: "描述",
	            maxLength: "500"
	        },
	        showed: {
	            type: "boolean",
	            title: "是否显示"
	        }
	    }
	};
	var ModuleList = (function () {
	    function ModuleList(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleList.key,
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
	                showPagination: true,
	                searchActionKey: ModuleSearch.key,
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [{ key: ModuleEdit.key }, { key: ModuleDelete.key }],
	            actions: [ModuleAdd.key],
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
	                        },
	                        copy: {},
	                        move: {},
	                        del: {}
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ModuleList.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleList.key = "module";
	    return ModuleList;
	}());
	var ModuleMenus = (function () {
	    function ModuleMenus(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleMenus.key,
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
	    ModuleMenus.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleMenus.key = "moduleMenuAction";
	    return ModuleMenus;
	}());
	var ModuleAdd = (function () {
	    function ModuleAdd(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleAdd.key,
	            type: action_model_1.ActionType.form,
	            title: "新建模块",
	            icon: "add",
	            refreshList: true,
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "parentKey",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "title",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "link",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "icon",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "checkbox"
	                    }]
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
	    ModuleAdd.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleAdd.key = "modulesAddAction";
	    return ModuleAdd;
	}());
	var ModuleEdit = (function () {
	    function ModuleEdit(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ModuleEdit.key,
	            type: action_model_1.ActionType.form,
	            title: "修改模块",
	            icon: "edit",
	            refreshList: true,
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "parentKey",
	                        type: "text",
	                        readonly: true,
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "title",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "link",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "icon",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "checkbox"
	                    }]
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
	    ModuleEdit.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleEdit.key = "modulesEditAction";
	    return ModuleEdit;
	}());
	var ModuleDelete = (function () {
	    function ModuleDelete() {
	        var actionModel = {
	            key: ModuleDelete.key,
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
	    ModuleDelete.key = "modulesDeleteAction";
	    return ModuleDelete;
	}());
	var ModuleSearch = (function () {
	    function ModuleSearch() {
	        var actionModel = {
	            key: ModuleSearch.key,
	            icon: "search",
	            type: action_model_1.ActionType.form,
	            title: "模块搜索表单",
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        required: false,
	                        placeHolder: "KEY",
	                        description: "请输入key来进行搜索,不支持模糊查询",
	                        showHints: true,
	                        copyValueTo: ["/key/$eq"],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "showed",
	                        type: "select",
	                        copyValueTo: ["/showed/$eq"],
	                        titleMap: [{ value: null, name: "全部" }, { value: true, name: "显示" }, { value: false, name: "不显示" }],
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    ModuleSearch.$inject = ["toolbarUtils", "actionUtils"];
	    ModuleSearch.key = "modulesSearchAction";
	    return ModuleSearch;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [ModuleDelete, ModuleMenus, ModuleList, ModuleSearch, ModuleAdd, ModuleEdit];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
	var dataSchema = {
	    type: "object",
	    required: ["key", "host", "interval"],
	    properties: {
	        key: {
	            type: "string",
	            title: "KEY"
	        },
	        host: {
	            type: "string",
	            title: "主HOST"
	        },
	        domainWhiteList: {
	            type: "array",
	            title: "域名白名单",
	            default: [],
	            items: {
	                type: "string",
	                format: "url-ip",
	                title: "域名或者IP"
	            }
	        },
	        whitePathList: {
	            type: "array",
	            title: "路径白名单",
	            default: [],
	            items: {
	                type: "object",
	                title: "路径配置",
	                required: ["regexp", "scope"],
	                properties: {
	                    enable: {
	                        type: "boolean",
	                        title: "是否启用"
	                    },
	                    regexp: {
	                        type: "string",
	                        title: "正则规则"
	                    },
	                    scope: {
	                        type: "string",
	                        title: "修饰符"
	                    },
	                    description: {
	                        type: "string",
	                        title: "介绍"
	                    },
	                }
	            }
	        },
	        interval: {
	            type: "number",
	            default: 1000,
	            minimum: 1000,
	            title: "下载间隔，单位ms"
	        },
	        downloader: {
	            type: "string",
	            default: "superagent",
	            title: "下载策略"
	        },
	        initDomain: {
	            type: "string",
	            title: "初始化域名"
	        },
	        proxySettings: {
	            type: "object",
	            title: "基础设置",
	            properties: {
	                useProxy: {
	                    type: "boolean",
	                    title: "是否启用代理"
	                },
	                timeout: {
	                    type: "number",
	                    title: "超时时间"
	                },
	                charset: {
	                    type: "string",
	                    title: "字符编码"
	                },
	                ua: {
	                    type: "string",
	                    title: "USERAGENT"
	                },
	                ipInfo: {
	                    type: "object",
	                    title: "代理ip设置",
	                    properties: {
	                        host: {
	                            type: "string",
	                            format: 'url-ip',
	                            title: "代理ip或域名"
	                        },
	                        port: {
	                            type: "number",
	                            title: "代理端口"
	                        }
	                    }
	                }
	            }
	        },
	        pages: {
	            type: "array",
	            title: "分析页面配置",
	            items: {
	                type: "object",
	                required: ["key", "fieldKey"],
	                title: "分析页面配置",
	                properties: {
	                    key: {
	                        type: "string",
	                        title: "页面的KEY"
	                    },
	                    priority: {
	                        type: "number",
	                        default: 0,
	                        minimum: 0,
	                        maximum: 10,
	                        title: "爬取的优先级，数字越大越优先"
	                    },
	                    areas: {
	                        type: "array",
	                        title: "页面区域",
	                        items: {
	                            type: "object",
	                            required: ["selector", "dealStrategy", "key"],
	                            properties: {
	                                key: {
	                                    type: "string",
	                                    title: "区域KEY"
	                                },
	                                selector: {
	                                    type: "string",
	                                    title: "选择器"
	                                },
	                                dealStrategy: {
	                                    type: "string",
	                                    default: "jsdom",
	                                    title: "分析策略"
	                                }
	                            }
	                        }
	                    },
	                    rule: {
	                        type: "array",
	                        title: "匹配规则",
	                        default: [],
	                        items: {
	                            type: "object",
	                            title: "路径配置",
	                            required: ["regexp", "scope"],
	                            properties: {
	                                regexp: {
	                                    type: "string",
	                                    title: "正则规则"
	                                },
	                                scope: {
	                                    type: "string",
	                                    title: "修饰符"
	                                }
	                            }
	                        }
	                    },
	                    fieldKey: {
	                        type: "string",
	                        title: "主键字段"
	                    },
	                    strict: {
	                        type: "boolean",
	                        title: "是否启用严格模式"
	                    },
	                    strictFields: {
	                        type: "array",
	                        title: "严格模式下，验证字段",
	                        default: [],
	                        items: {
	                            type: "string",
	                            title: "验证字段"
	                        }
	                    },
	                    fields: {
	                        type: "object",
	                        title: "分析字段配置"
	                    }
	                }
	            }
	        },
	        description: {
	            type: "string",
	            title: "描述",
	            maxLength: 500
	        }
	    }
	};
	var List = (function () {
	    function List(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: List.key,
	            type: action_model_1.ActionType.list,
	            title: "爬虫配置文件管理",
	            icon: "content-save-settings",
	            list: {
	                columns: [
	                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.host }}</span>", "域名").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.interval }}</span>", "间隔时间").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.downloader }}</span>", "下载策略").toValue(),
	                    actionUtils.columnBuilder("<span>{{ ::item.description }}</span>", "详情").toValue()
	                ],
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
	                    key: "crawlerSettingList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    jpp: {
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        },
	                        copy: {},
	                        move: {},
	                        del: {}
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    List.$inject = ["toolbarUtils", "actionUtils"];
	    List.key = "crawlerSettingListAction";
	    return List;
	}());
	var AddFirst = (function () {
	    function AddFirst(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFirst.key,
	            type: action_model_1.ActionType.form,
	            title: "基础设置",
	            icon: "add",
	            form: {
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "host",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "initDomain",
	                        type: "text",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "interval",
	                        type: "number",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "downloader",
	                        type: "select",
	                        titleMap: [{
	                                "name": "SUPERAGENT",
	                                "value": "superagent"
	                            }, {
	                                "name": "PHANTOM",
	                                "value": "phantom"
	                            }],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "description",
	                        type: "textarea",
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    AddFirst.$inject = ["toolbarUtils", "actionUtils"];
	    AddFirst.key = "crawlerSettingAddFirstAction";
	    return AddFirst;
	}());
	var AddSecond = (function () {
	    function AddSecond(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddSecond.key,
	            type: action_model_1.ActionType.form,
	            title: "白名单设置",
	            icon: "add",
	            form: {
	                formSchema: [{
	                        key: "domainWhiteList",
	                        type: "chips",
	                        startEmpty: true,
	                        description: "域名白名单，配置可以爬取的域名列表",
	                        showHints: true,
	                        htmlClass: "md-block"
	                    }, {
	                        key: "whitePathList",
	                        type: "array",
	                        fieldHtmlClass: "layout-row flex",
	                        startEmpty: true,
	                        description: "路径白名单，配置可以爬取的路径列表",
	                        showHints: true,
	                        items: [{
	                                type: "section",
	                                htmlClass: "layout-row flex",
	                                items: [{
	                                        key: "whitePathList[].enable",
	                                        type: "select",
	                                        titleMap: [{
	                                                name: "启用",
	                                                value: true
	                                            }, {
	                                                name: "不启用",
	                                                value: false
	                                            }]
	                                    }, {
	                                        key: "whitePathList[].regexp",
	                                        htmlClass: "md-block flex",
	                                        type: "text"
	                                    }, {
	                                        key: "whitePathList[].scope",
	                                        type: "text"
	                                    }, {
	                                        key: "whitePathList[].description",
	                                        type: "text"
	                                    }]
	                            }]
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    AddSecond.$inject = ["toolbarUtils", "actionUtils"];
	    AddSecond.key = "crawlerSettingAddSecondAction";
	    return AddSecond;
	}());
	var AddThird = (function () {
	    function AddThird(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddThird.key,
	            type: action_model_1.ActionType.form,
	            title: "其他设置",
	            icon: "add",
	            form: {
	                formSchema: [{
	                        key: "proxySettings",
	                        type: "card",
	                        items: [{
	                                key: "proxySettings.useProxy",
	                                type: "checkbox"
	                            }, {
	                                key: "proxySettings.timeout",
	                                type: "number",
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.charset",
	                                type: "text",
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.ua",
	                                type: "textarea",
	                                maxLength: 300,
	                                htmlClass: "md-block"
	                            }, {
	                                key: "proxySettings.ipInfo",
	                                type: "card",
	                                items: [{
	                                        key: "proxySettings.ipInfo.host",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "proxySettings.ipInfo.port",
	                                        type: "number",
	                                        htmlClass: "md-block"
	                                    }]
	                            }],
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    AddThird.$inject = ["toolbarUtils", "actionUtils"];
	    AddThird.key = "crawlerSettingAddThirdAction";
	    return AddThird;
	}());
	var AddForth = (function () {
	    function AddForth(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFifth.key,
	            type: action_model_1.ActionType.form,
	            title: "页面配置",
	            icon: "add",
	            form: {
	                formSchema: [{
	                        key: "pages",
	                        type: "tabarray",
	                        startEmpty: true,
	                        fieldHtmlClass: "layout-column flex",
	                        items: [{
	                                type: "section",
	                                grid: { flex: "" },
	                                items: [{
	                                        key: "pages[].key",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].priority",
	                                        type: "number",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].fieldKey",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].strict",
	                                        type: "switch",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].strictFields",
	                                        startEmpty: true,
	                                        type: "chips",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].rule",
	                                        type: "array",
	                                        startEmpty: true,
	                                        items: [{
	                                                type: "section",
	                                                htmlClass: "layout-row flex",
	                                                items: [{
	                                                        key: "pages[].rule[].regexp",
	                                                        htmlClass: "md-block flex",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].rule[].scope",
	                                                        type: "text"
	                                                    }]
	                                            }]
	                                    }]
	                            }]
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    AddForth.$inject = ["toolbarUtils", "actionUtils"];
	    AddForth.key = "crawlerSettingAddForthAction";
	    return AddForth;
	}());
	var AddFifth = (function () {
	    function AddFifth(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: AddFifth.key,
	            type: action_model_1.ActionType.form,
	            title: "页面配置",
	            icon: "add",
	            form: {
	                formSchema: [{
	                        key: "pages",
	                        type: "tabarray",
	                        items: [{
	                                type: "section",
	                                htmlClass: "column-row flex",
	                                items: [{
	                                        key: "pages[].key",
	                                        type: "text",
	                                        htmlClass: "md-block"
	                                    }, {
	                                        key: "pages[].areas",
	                                        type: "array",
	                                        startEmpty: true,
	                                        description: "区域配置，用户优化分析性能，减少dom的查询。",
	                                        showHints: true,
	                                        items: [{
	                                                type: "section",
	                                                grid: { flex: "", layout: "row" },
	                                                items: [{
	                                                        key: "pages[].areas[].key",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].areas[].selector",
	                                                        htmlClass: "md-block flex",
	                                                        type: "text"
	                                                    }, {
	                                                        key: "pages[].areas[].dealStrategy",
	                                                        type: "text"
	                                                    }]
	                                            }]
	                                    }, {
	                                        key: "pages[].fields",
	                                        type: "jeditor",
	                                        htmlClass: "md-block"
	                                    }]
	                            }]
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    AddFifth.$inject = ["toolbarUtils", "actionUtils"];
	    AddFifth.key = "crawlerSettingAddFifthAction";
	    return AddFifth;
	}());
	var Add = (function () {
	    function Add() {
	        var actionModel = {
	            key: Add.key,
	            type: action_model_1.ActionType.wizard,
	            title: "新建爬虫配置文件",
	            icon: "add",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: dataSchema
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Add.key = "crawlerSettingAddAction";
	    return Add;
	}());
	var Copy = (function () {
	    function Copy() {
	        var actionModel = {
	            key: Copy.key,
	            type: action_model_1.ActionType.wizard,
	            title: "复制爬虫配置文件",
	            icon: "content_copy",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: dataSchema
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingAdd",
	                    method: interface_model_1.MethodType.POST,
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Copy.key = "crawlerSettingCopyAction";
	    return Copy;
	}());
	var Edit = (function () {
	    function Edit(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Edit.key,
	            type: action_model_1.ActionType.wizard,
	            title: "修改爬虫配置文件",
	            icon: "edit",
	            refreshList: true,
	            wizard: {
	                defaultSchema: {
	                    dataSchema: dataSchema
	                },
	                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
	            },
	            closeDialog: true,
	            interfaces: [{
	                    key: "crawlerSettingEdit",
	                    method: interface_model_1.MethodType.PUT,
	                    idFieldPath: "/key",
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Edit.$inject = ["toolbarUtils", "actionUtils"];
	    Edit.key = "crawlerSettingEditAction";
	    return Edit;
	}());
	var Delete = (function () {
	    function Delete() {
	        var actionModel = {
	            key: Delete.key,
	            type: action_model_1.ActionType.confirm,
	            title: "删除爬虫配置文件",
	            icon: "delete",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要删除爬虫配置文件吗!"
	            },
	            interfaces: [{
	                    key: "crawlerSettingDelete",
	                    method: interface_model_1.MethodType.DELETE,
	                    idFieldPath: "/key",
	                    address: "",
	                    port: null,
	                    path: "crawler_settings",
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    Delete.key = "crawlerSettingDeleteAction";
	    return Delete;
	}());
	var Search = (function () {
	    function Search() {
	        var actionModel = {
	            key: Search.key,
	            type: action_model_1.ActionType.form,
	            title: "搜索爬虫配置文件",
	            icon: "search",
	            form: {
	                dataSchema: dataSchema,
	                formSchema: [{
	                        key: "key",
	                        type: "text",
	                        required: false,
	                        copyValueTo: ["/key/$eq"],
	                        htmlClass: "md-block"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    Search.key = "crawlerSettingSearchAction";
	    return Search;
	}());
	var Ack = (function () {
	    function Ack() {
	        var actionModel = {
	            key: Ack.key,
	            type: action_model_1.ActionType.form,
	            title: "爬虫命令",
	            icon: "apple-keyboard-command",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["key", "action"],
	                    properties: {
	                        key: {
	                            type: "string",
	                            title: "配置文件KEY"
	                        },
	                        action: {
	                            type: "string",
	                            title: "执行的命令"
	                        },
	                        options: {
	                            type: "object",
	                            title: "可选项",
	                            properties: {
	                                url: {
	                                    type: "string",
	                                    title: "测试的地址"
	                                },
	                                type: {
	                                    type: "string",
	                                    default: "forever",
	                                    title: "爬虫启动模式"
	                                },
	                                startCrawler: {
	                                    type: "boolean",
	                                    default: true,
	                                    title: "开启爬取链接模块"
	                                },
	                                startDeal: {
	                                    type: "boolean",
	                                    default: true,
	                                    title: "开启html处理模块"
	                                },
	                                startDownload: {
	                                    type: "boolean",
	                                    default: false,
	                                    title: "开启图片下载模块"
	                                },
	                                startChip: {
	                                    type: "boolean",
	                                    default: false,
	                                    title: "开启更换ip模块"
	                                }
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "action",
	                        type: "select",
	                        titleMap: [
	                            { "value": "crawler:start", "name": "开始爬虫", "group": "" },
	                            { "value": "crawler:stop", "name": "停止爬虫", "group": "" },
	                            { "value": "crawler:create", "name": "开启一个新爬虫", "group": "" },
	                            { "value": "crawler:reset", "name": "重置一个数据库", "group": "" },
	                            { "value": "crawler:test", "name": "测试地址", "group": "" },
	                            { "value": "crawler:retrydeal", "name": "重新分析一个网址", "group": "" }
	                        ],
	                        htmlClass: "md-block"
	                    }, {
	                        key: "key",
	                        type: "autocomplete-1",
	                        condition: "model.action==='crawler:start' || model.action==='crawler:retrydeal' || model.action==='crawler:reset' || model.action==='crawler:test'",
	                        acOptions: {
	                            textField: "key",
	                            dataField: "rows",
	                            noCache: false,
	                            search: "/where/key/$like",
	                            actionKey: List.key
	                        },
	                        htmlClass: "md-block"
	                    }, {
	                        key: "options",
	                        type: "card",
	                        grid: { "flex": "" },
	                        condition: "!!model.action",
	                        items: [{
	                                key: "options.type",
	                                type: "select",
	                                htmlClass: "md-block",
	                                titleMap: [
	                                    { "value": "forever", "name": "FOREVER启动" },
	                                    { "value": "", "name": "NODE启动" }
	                                ]
	                            }, {
	                                key: "options.url",
	                                htmlClass: "md-block",
	                                type: "text"
	                            }, {
	                                key: "options.startCrawler",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startDeal",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startDownload",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }, {
	                                key: "options.startChip",
	                                condition: "model.action==='crawler:start'",
	                                htmlClass: "md-block",
	                                type: "checkbox"
	                            }]
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    Ack.key = "crawlerSettingAckAction";
	    return Ack;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List, Search, Add, Edit, Delete, Copy, Ack, AddFirst, AddSecond, AddThird, AddForth, AddFifth];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var Result = (function () {
	    function Result(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: Result.key,
	            type: action_model_1.ActionType.form,
	            title: "结果反馈",
	            icon: "view-module",
	            form: {
	                dataSchema: "resultActionData",
	                formSchema: [{
	                        key: "data",
	                        type: "jeditor"
	                    }]
	            }
	        };
	        return actionModel;
	    }
	    Result.$inject = ["toolbarUtils", "actionUtils"];
	    Result.key = "resultAction";
	    return Result;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Result];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	                        set: { "/rows": "" },
	                        copy: {},
	                        move: {},
	                        del: {}
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List, Dump, Delete, Backup, Download];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(39);
	var interface_model_1 = __webpack_require__(40);
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
	                    address: "https://172.16.140.164",
	                    port: 8888,
	                    path: "login",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Login.key = "saltApiLogin";
	    return Login;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	                        },
	                        copy: {},
	                        move: {},
	                        del: {}
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
	                        set: {
	                            "/total": "/count",
	                            "/rows": "/rows"
	                        },
	                        copy: {},
	                        move: {},
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List, Add, Edit, Delete, Copy, Search];
	    _.each(services, function (ser) {
	        module.service(ser.key, ser);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.c0b9fdbf0911fc33df10.hot-update.js.map
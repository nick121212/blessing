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
	                        promise = restAngular.customGET(null, queryData, null);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        promise = restAngular.customPUT(queryData, pointer.get(queryData, interfaceModel.idFieldPath));
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

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var _ = __webpack_require__(31);
	var Service = (function () {
	    function Service() {
	    }
	    Service._builderName = "actionUtils";
	    Service._toolbarName = "toolbarActionUtils";
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
	    Service.toolbar = ['fxAction', 'toolbarUtils', function (fxAction, toolbarUtils) {
	            var Service = (function () {
	                function Service() {
	                }
	                Service.prototype.initToolbar = function (key) {
	                };
	                return Service;
	            }());
	            return new Service();
	        }];
	    return Service;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.service(Service._builderName, Service.builder);
	    module.service(Service._toolbarName, Service.toolbar);
	};


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
	                dataSchema: {
	                    type: "object",
	                    properties: {
	                        data: {
	                            type: "object",
	                            title: "返回结果"
	                        }
	                    }
	                },
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
	                    actionUtils.columnBuilder("<span>{{::item}}</span>", "文件名称").toValue(),
	                ],
	                searchActionKey: "",
	                showRefreshBtn: true,
	                showSearchBtn: true,
	                showSearchPanel: false,
	                toolbars: [],
	                itemToolbars: []
	            },
	            itemActions: [],
	            actions: [],
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [List];
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

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = model;
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(53)(),
	        scope: true,
	        require: "^fxFormAction",
	        bindToController: {
	            formData: "=ngModel",
	            actionModel: "=?",
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive("fxFormAction", Directive);
	};


/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	        template: __webpack_require__(55)(),
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive("fxListAction", Directive);
	};


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(13);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/action/tpls/list.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-content layout=\"row\" flex style=\"overflow:hidden;\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-content layout=\"column\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<!--头部toolbar-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-toolbar class=\"md-table-toolbar md-default\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<div fx-toolbar layout=\"row\" items=\"listCtl.actionModel.list.toolbars\" ctls=\"listCtl\" ng-disabled=\"listCtl.isBusy\" class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-toolbar>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<!--表格主题-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-table-container flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<table md-table flex md-row-select ng-model=\"listCtl.selected\" md-progress=\"listCtl.promise\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<thead md-head md-order=\"listCtl.queryData.order\" md-on-reorder=\"listCtl.onOrderChange\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<tr md-row>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<th md-column md-numeric=\"column.numeric\" md-order-by=\"{{column.name}}\" ng-repeat=\"column in listCtl.actionModel.list.columns\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, jade_debug[0].filename ));
	buf.push("{{column.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</th>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<th md-column md-numeric ng-if=\"listCtl.item.toolbar.length\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</th>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</tr>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</thead>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<tbody md-body>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<tr md-row md-auto-select ng-repeat=\"row in listCtl.clientData.rows\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<td md-cell ng-repeat=\"column in listCtl.actionModel.list.columns\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<section dy-compile item=\"row\" html=\"{{column.content}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 17, jade_debug[0].filename ));
	buf.push("{{column.content}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</td>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 18, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<td md-cell layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<span flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 20, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<div fx-toolbar items=\"listCtl.actionModel.list.itemToolbars\" ctls=\"listCtl\" ng-model=\"row\" ng-disabled=\"listCtl.isBusy\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</td>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</tr>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</tbody>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</table>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-table-container>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<md-table-pagination ng-if=\"listCtl.actionModel.list.showPagination\" flex=\"none\" md-boundary-links=\"0==0\" md-page-select=\"listCtl.showPage\" ng-disabled=\"listCtl.isBusy\" md-limit=\"listCtl.queryData.limit\" md-limit-options=\"listCtl.mdLimitOptions\" md-page=\"listCtl.queryData.page\" md-on-paginate=\"listCtl.onPageChange\" md-total=\"{{listCtl.clientData.total}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-table-pagination>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<!--搜索表单-->");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/directives/action/tpls/list.jade" ));
	buf.push("<div fx-search-action do-search=\"listCtl.doSearchBind\" is-show=\"listCtl.actionModel.list.showSearchPanel\" key=\"{{listCtl.actionModel.list.searchActionKey}}\" title=\"listCtl.actionModel.title\" disabled=\"listCtl.isBusy\" ng-model=\"listCtl.filterData\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(layout=\"row\",flex,style=\"overflow:hidden;\")\n    md-content(layout=\"column\",flex)\n        //头部toolbar\n        md-toolbar.md-table-toolbar.md-default\n            div.md-toolbar-tools(fx-toolbar,layout=\"row\",items=\"listCtl.actionModel.list.toolbars\",ctls=\"listCtl\",ng-disabled=\"listCtl.isBusy\")\n        md-divider\n        //表格主题\n        md-table-container(flex)\n            table(md-table,flex,md-row-select,ng-model=\"listCtl.selected\",md-progress=\"listCtl.promise\")\n                thead(md-head,md-order=\"listCtl.queryData.order\",md-on-reorder=\"listCtl.onOrderChange\")\n                    tr(md-row)\n                        th(md-column,md-numeric=\"column.numeric\",md-order-by=\"{{column.name}}\",ng-repeat=\"column in listCtl.actionModel.list.columns\") {{column.title}}\n                        th(md-column,md-numeric,ng-if=\"listCtl.item.toolbar.length\")\n                tbody(md-body)\n                    tr(md-row,md-auto-select,ng-repeat=\"row in listCtl.clientData.rows\")\n                        td(md-cell,ng-repeat=\"column in listCtl.actionModel.list.columns\")\n                            section(dy-compile,item=\"row\",html=\"{{column.content}}\") {{column.content}}\n                        td(md-cell,layout=\"row\")\n                            span(flex)\n                            div(fx-toolbar,items=\"listCtl.actionModel.list.itemToolbars\",ctls=\"listCtl\",ng-model=\"row\",ng-disabled=\"listCtl.isBusy\")\n        md-table-pagination(ng-if=\"listCtl.actionModel.list.showPagination\",flex=\"none\",md-boundary-links=\"0==0\",md-page-select=\"listCtl.showPage\",ng-disabled=\"listCtl.isBusy\",md-limit=\"listCtl.queryData.limit\" ,md-limit-options=\"listCtl.mdLimitOptions\", md-page=\"listCtl.queryData.page\" md-on-paginate=\"listCtl.onPageChange\" md-total=\"{{listCtl.clientData.total}}\")\n    //搜索表单\n    div(fx-search-action,do-search=\"listCtl.doSearchBind\",is-show=\"listCtl.actionModel.list.showSearchPanel\",key=\"{{listCtl.actionModel.list.searchActionKey}}\",title=\"listCtl.actionModel.title\",disabled=\"listCtl.isBusy\",ng-model=\"listCtl.filterData\")");
	}
	}

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	        this.isBusy = true;
	        if (promise) {
	            promise.then(function (result) {
	                _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                if (_.isFunction(_this.submitCallBack)) {
	                    _this.submitCallBack();
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive(_dirName, Directive);
	};


/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive(_name, Directive);
	};


/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	        return index === 0 || this.$forms.hasOwnProperty(action.key) || index == this.selectedIndex || index == this.selectedIndex + 1;
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
	                            _this.submitCallBack();
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
	                    if (!action.form.dataSchema && action.type === action_model_1.ActionType.form) {
	                        action.form.dataSchema = actionModel.wizard.defaultSchema.dataSchema;
	                    }
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive("fxWizardAction", Directive);
	};


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive(_dirName, Directive);
	};


/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive(_name, Directive);
	};


/***/ },

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(146);
	var ngMaterialIcons = __webpack_require__(20);
	var _ = __webpack_require__(31);
	var router_1 = __webpack_require__(147);
	var material_service_1 = __webpack_require__(29);
	var svg_service_1 = __webpack_require__(156);
	var toolbar_1 = __webpack_require__(157);
	var sidemenu_1 = __webpack_require__(165);
	__webpack_require__(176);
	var action_model_1 = __webpack_require__(39);
	var module = angular.module("homeModule", [toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils) {
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
	                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg')
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
	exports.default = module.name;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }

})
//# sourceMappingURL=0.ccf0ec7e161a2dfaaf20.hot-update.js.map
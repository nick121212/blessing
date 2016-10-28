webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(35);
	__webpack_require__(37);
	var action_provider_1 = __webpack_require__(38);
	var utils_service_1 = __webpack_require__(45);
	var rest_service_1 = __webpack_require__(30);
	var login_value_1 = __webpack_require__(46);
	var modules_value_1 = __webpack_require__(47);
	var crawler_value_1 = __webpack_require__(48);
	var common_value_1 = __webpack_require__(49);
	var backup_value_1 = __webpack_require__(50);
	var salt_api_value_1 = __webpack_require__(51);
	var schema_value_1 = __webpack_require__(52);
	var form_directive_1 = __webpack_require__(53);
	var list_directive_1 = __webpack_require__(55);
	var dialog_form_directive_1 = __webpack_require__(57);
	var search_directive_1 = __webpack_require__(59);
	var wizard_directive_1 = __webpack_require__(61);
	var dialog_wizard_directive_1 = __webpack_require__(63);
	var builder_directive_1 = __webpack_require__(65);
	var autocomplete_provider_1 = __webpack_require__(67);
	var jsoneditor_provider_1 = __webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(73);
	__webpack_require__(74);
	var _name = "fxAction";
	var module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"]);
	utils_service_1.default(module);
	action_provider_1.default(module);
	form_directive_1.default(module);
	list_directive_1.default(module);
	modules_value_1.default(module);
	login_value_1.default(module);
	dialog_form_directive_1.default(module);
	search_directive_1.default(module);
	wizard_directive_1.default(module);
	dialog_wizard_directive_1.default(module);
	builder_directive_1.default(module);
	crawler_value_1.default(module);
	common_value_1.default(module);
	autocomplete_provider_1.default(module);
	jsoneditor_provider_1.default(module);
	salt_api_value_1.default(module);
	backup_value_1.default(module);
	schema_value_1.default(module);
	function sfLayout(args) {
	    var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	    if (layoutDiv && args.form.grid) {
	        Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	            layoutDiv.setAttribute(property, args.form.grid[property]);
	        });
	    }
	}
	;
	module
	    .config(["sfErrorMessageProvider", function (sfErrorMessageProvider) {
	        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
	        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
	        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
	        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
	        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
	        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
	        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
	    }])
	    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", function (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder) {
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'jeditor', "./decorators/jsoneditor.jade", sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder));
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'card', "./decorators/card.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]);
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfLayout, sfBuilderProvider.builders.condition, autoCompleteBuilder.builder, sfBuilderProvider.builders.transclusion]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(139)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(140)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(141)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(142)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

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
	                _.each(iInterface.jpp.del, function (val) {
	                    pointer.remove(clientData, val);
	                });
	            }
	        });
	        return clientData;
	    };
	    Provider.prototype.doAction = function (key, queryData, $form) {
	        var _this = this;
	        var queryDataCline;
	        if (!this.doFormCheck($form)) {
	            return;
	        }
	        return this.getModel(key).then(function (actionModel) {
	            var interfacesRest = {};
	            _.each(actionModel.interfaces, function (interfaceModel) {
	                var promise, restAngular = interfaceModel.isRestful
	                    ? _this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
	                    : _this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
	                queryDataCline = _.cloneDeep(queryData);
	                if (interfaceModel.jpp) {
	                    _.each(interfaceModel.jpp.del, function (val) {
	                        pointer.remove(queryDataCline, val);
	                    });
	                }
	                switch (interfaceModel.method) {
	                    case interface_model_1.MethodType.POST:
	                        promise = restAngular.post(queryDataCline, null);
	                        break;
	                    case interface_model_1.MethodType.GET:
	                        promise = restAngular.customGET(interfaceModel.params ? pointer.get(queryDataCline, interfaceModel.idFieldPath) : null, queryDataCline, null);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        promise = restAngular.customPUT(_.isObject(queryDataCline) ? queryDataCline : null, pointer.get(queryDataCline, interfaceModel.idFieldPath));
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        promise = restAngular.customDELETE(pointer.get(queryDataCline, interfaceModel.idFieldPath), null);
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

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(189);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.tty", {
	        url: "tty/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: index_controller_1.TtyController,
	                controllerAs: "ttyCtl",
	                template: __webpack_require__(238)()
	            }
	        }
	    });
	};


/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var io = __webpack_require__(190);
	var ip = "http://106.75.78.203:3000/crawler";
	var TtyController = (function () {
	    function TtyController($scope, $stateParams, toolbarUtils, materialUtils, fxAction) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.showLogs = true;
	        this.errorCount = 0;
	        this.crawlers = {};
	        this.logs = [];
	        this.toolbar_logs = [
	            this.toolbarUtils.labelBuilder('爬取日志-{{ttyCtl.errorCount/(this.logs.length||1)}}%').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("清空日志", "md-icon-button", false).iconBuilder("clear_all").btnClick(function ($event) {
	                _this.logs.length = 0;
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("{{ttyCtl.showLogs?'关闭日志':'打开日志'}}", "md-icon-button", false).iconBuilder("{{ttyCtl.showLogs?'window-open':'window-closed'}}").btnClick(function ($event) {
	                _this.showLogs = !_this.showLogs;
	            }).toValue()
	        ];
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', { fill: "black" }).toValue(),
	            this.toolbarUtils.labelBuilder('爬虫进程管理').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("{{ttyCtl.showLogs?'关闭日志':'打开日志'}}", "md-icon-button", false).iconBuilder("{{ttyCtl.showLogs?'window-open':'window-closed'}}", { fill: "black" }).btnClick(function ($event) {
	                _this.showLogs = !_this.showLogs;
	            }).toValue()
	        ];
	        this.itemToolbar = [
	            toolbarUtils.btnBuilder("执行操作", "", true, "top").btnClick(function ($event, crawler) {
	                _this.fxAction.getModel("crawlerSettingAckAction").then(function (actionModel) {
	                    _this.fxAction.doActionModel($event, actionModel, crawler, function () {
	                        _this.socket.emit('ack', crawler, function (result) {
	                            if (result.ret === 0) {
	                                if (result.showResult) {
	                                    return _this.fxAction.getModel("resultAction").then(function (actionModel) {
	                                        _this.fxAction.doActionModel($event, actionModel, result, function () {
	                                            _this.materialUtils.close();
	                                        });
	                                    });
	                                }
	                                _this.materialUtils.showMsg("操作成功！");
	                            }
	                            else {
	                                _this.materialUtils.showErrMsg(result.msg);
	                            }
	                        });
	                    });
	                });
	            }).toValue()
	        ];
	        this.$scope.$on("$destroy", function () {
	            _this.socket.disconnect();
	            _this.crawlers = {};
	        });
	        this.init();
	    }
	    TtyController.prototype.init = function () {
	        var _this = this;
	        var config = this.socket = io(ip);
	        this.socket.on('connect', function () {
	            var _this = this;
	            this.socket.emit("getCrawlers", {}, (function (crawlers) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    _this.crawlers = crawlers;
	                });
	            }).bind(this));
	        }.bind(this));
	        this.socket.on('disconnect', (function () {
	            _this.crawlers = {};
	            _this.materialUtils.showErrMsg("socket失去连接！！！");
	        }).bind(this));
	        this.socket.on("crawler:left", (function (socketId) {
	            if (_this.crawlers.hasOwnProperty(socketId)) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    delete _this.crawlers[socketId];
	                });
	            }
	        }).bind(this));
	        this.socket.on("crawler:update", (function (result) {
	            if (_this.crawlers.hasOwnProperty(result.socketId)) {
	                _this.materialUtils.safeApply(_this.$scope, function () {
	                    _.extend(_this.crawlers[result.socketId], result.data);
	                });
	            }
	        }).bind(this));
	        this.socket.on("crawler:log", (function (result) {
	            if (_this.logs.length > 100) {
	                _this.logs.pop();
	            }
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.logs.unshift(result.data);
	                _this.errorCount = _.filter(_this.logs, function (log) {
	                    return !!log.isError;
	                }).length;
	            });
	        }).bind(this));
	        this.socket.on('crawler:join', (function (data) {
	            if (!_this.crawlers) {
	                _this.crawlers = {};
	            }
	            _this.materialUtils.safeApply(_this.$scope, function () {
	                _this.crawlers[data.id] = data.data;
	            });
	        }).bind(this));
	    };
	    TtyController.$inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];
	    return TtyController;
	}());
	exports.TtyController = TtyController;


/***/ }

})
//# sourceMappingURL=0.a355e06e9335a014f2ee.hot-update.js.map
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
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
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
	                    address: "https://172.16.140.164",
	                    port: 8888,
	                    path: "logout",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
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
	            key: Logout.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有CLIENT",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "确定要退出登录吗!"
	            },
	            interfaces: [{
	                    key: "saltApiLogin",
	                    method: interface_model_1.MethodType.POST,
	                    address: "https://172.16.140.164",
	                    port: 8888,
	                    path: "logout",
	                    jpp: {
	                        set: {
	                            "/data": "/return"
	                        }
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Minions.key = "saltApiMinions";
	    return Minions;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login, Logout];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }

})
//# sourceMappingURL=0.b881def022b6fe5d7ee2.hot-update.js.map
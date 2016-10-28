webpackHotUpdate(0,{

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(31);
	var angular = __webpack_require__(1);
	var toolbar_service_1 = __webpack_require__(158);
	var _name = "fxToolbar";
	var Strategy = (function () {
	    function Strategy() {
	        this.tools = {};
	    }
	    Strategy.prototype.register = function (key, template) {
	        this.tools[key] = template;
	    };
	    Strategy.prototype.get = function (key) {
	        return this.tools[key] || "";
	    };
	    return Strategy;
	}());
	var strategy = new Strategy();
	strategy.register("icon", __webpack_require__(159)());
	strategy.register("btn", __webpack_require__(160)());
	strategy.register("layout", __webpack_require__(161)());
	strategy.register("label", __webpack_require__(162)());
	strategy.register("menu", __webpack_require__(163)());
	strategy.register("menuItem", __webpack_require__(164)());
	var Controller = (function () {
	    function Controller($scope, $rootScope, $compile, $interpolate, materialUtils) {
	        this.$scope = $scope;
	        this.$rootScope = $rootScope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.materialUtils = materialUtils;
	    }
	    Controller.prototype.openMenu = function ($mdOpenMenu, ev) {
	        $mdOpenMenu(ev);
	    };
	    Controller.prototype.dig = function (models, $ele, $scope) {
	        var _this = this;
	        _.each(models, function (model) {
	            var template = strategy.get(model['type']);
	            var $newScope = $scope.$new(true, $scope);
	            var tmp, $newEle;
	            if (!template) {
	                template = model.template;
	            }
	            if (!template) {
	                return console.error("没有模板或者找不到类型!");
	            }
	            model = _.cloneDeep(model);
	            model.disabled = "" + _this.ngDisabled;
	            model.materialUtils = _this.materialUtils;
	            model.ngModel = _this.ngModel;
	            if (model.conditionInfo && model.conditionInfo.condition) {
	                if (model.conditionInfo.prefix) {
	                    model.condition = model['type'] + "Ctl." + model.conditionInfo.condition;
	                }
	                else {
	                    model.condition = "" + model.conditionInfo.condition;
	                }
	            }
	            else {
	                model.condition = "true";
	            }
	            $newScope[(model['type'] + "Ctl")] = _.clone(model);
	            if (_this.ctls) {
	                $newScope[_this.ctls] = $scope.$parent[_this.ctls] || {};
	            }
	            tmp = _this.$interpolate(template)($newScope);
	            $newEle = angular.element(tmp);
	            _.each(model.attributes, function (attr, key) {
	                $newEle.attr(key, attr);
	            });
	            $newEle = _this.$compile($newEle)($newScope);
	            $ele.append($newEle);
	            if (_.isArray(model.tools)) {
	                _this.dig(model.tools, $newEle, $newScope);
	            }
	        });
	    };
	    Controller.$inject = ["$scope", "$rootScope", "$compile", "$interpolate", "materialUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        require: [_name],
	        scope: {},
	        bindToController: {
	            ctls: '@',
	            ngDisabled: '@',
	            items: "=",
	            ngModel: '='
	        },
	        controllerAs: 'toolbarCtl',
	        controller: Controller,
	        replace: false,
	        link: function ($scope, $ele, $attr, $ctl) {
	            $scope.$watchCollection(function () {
	                return $ctl[0].items;
	            }, function (newValue) {
	                var model = newValue;
	                if (!model)
	                    return;
	                if (!_.isObject(model) && !_.isArray(model)) {
	                    return console.error("items只能是对象或者数组!");
	                }
	                $ctl[0].dig(_.isArray(model) ? model : [model], $ele, $scope);
	            });
	        }
	    };
	}
	Directive.$inject = [];
	var module = angular.module(_name + "Module", []).directive(_name, Directive);
	toolbar_service_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var index_1 = __webpack_require__(157);
	var _ = __webpack_require__(31);
	__webpack_require__(33);
	var Service = (function () {
	    function Service() {
	    }
	    Service._name = "toolbarUtils";
	    Service.provider = [function () {
	            var Base = (function () {
	                function Base(data) {
	                    this.data = data;
	                }
	                Base.prototype.conditionBuilder = function (condition, prefix) {
	                    if (prefix === void 0) { prefix = true; }
	                    this.data = _.extend({}, this.data, {
	                        conditionInfo: {
	                            condition: condition,
	                            prefix: prefix
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.noOptions = function (tooltip, icon) {
	                    if (tooltip === void 0) { tooltip = false; }
	                    if (icon === void 0) { icon = false; }
	                    tooltip && delete this.data.tooltip;
	                    icon && delete this.data.icon;
	                    return this;
	                };
	                Base.prototype.tooltipBuilder = function (title, position) {
	                    if (title === void 0) { title = ""; }
	                    if (position === void 0) { position = "bottom"; }
	                    this.data = _.extend({}, this.data, {
	                        tooltip: {
	                            title: title,
	                            position: position
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.iconBuilder = function (icon, style, ricon, options) {
	                    this.data = _.extend({}, this.data, {
	                        icon: {
	                            icon: icon,
	                            ricon: ricon,
	                            style: style
	                        }
	                    });
	                    return this;
	                };
	                Base.prototype.attrBuilder = function (attributes) {
	                    this.data = _.extend({}, this.data, {
	                        attributes: attributes
	                    });
	                    return this;
	                };
	                Base.prototype.toolsBuilder = function (tools) {
	                    this.data = _.extend({}, this.data, {
	                        tools: tools || []
	                    });
	                    return this;
	                };
	                Base.prototype.btnClick = function (func) {
	                    if (func && _.isFunction(func)) {
	                        this.data = _.extend({}, this.data, {
	                            onClick: func
	                        });
	                    }
	                    return this;
	                };
	                Base.prototype.menuOptionsBuilder = function (width, items) {
	                    if (width === void 0) { width = 4; }
	                    if (items === void 0) { items = []; }
	                    this.data = _.extend({}, this.data, {
	                        width: width || 4,
	                        items: items || []
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
	                Service.prototype.btnBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = new Service({
	                        type: "btn",
	                        title: title,
	                        className: className,
	                        showTitle: showTitle
	                    });
	                    service.tooltipBuilder(title, tooltipPosition);
	                    return service;
	                };
	                Service.prototype.menuBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = this.btnBuilder(title, className, showTitle, tooltipPosition);
	                    service.data.type = "menu";
	                    return service;
	                };
	                Service.prototype.menuItemBuilder = function (title, className, showTitle, tooltipPosition) {
	                    if (showTitle === void 0) { showTitle = true; }
	                    if (tooltipPosition === void 0) { tooltipPosition = "bottom"; }
	                    var service = this.btnBuilder(title, className, showTitle, tooltipPosition);
	                    service.data.type = "menuItem";
	                    return service;
	                };
	                Service.prototype.labelBuilder = function (title) {
	                    return new Service({
	                        type: "label",
	                        title: title
	                    });
	                };
	                Service.prototype.layoutBuilder = function (flex, layout, layoutAlign) {
	                    if (flex === void 0) { flex = "none"; }
	                    if (layout === void 0) { layout = "none"; }
	                    if (layoutAlign === void 0) { layoutAlign = "none none"; }
	                    return new Service({
	                        type: "layout",
	                        flex: flex,
	                        layout: layout,
	                        layoutAlign: layoutAlign
	                    });
	                };
	                Service.prototype.noneBuilder = function (type) {
	                    return new Service({
	                        type: type
	                    });
	                };
	                return Service;
	            }(Base));
	            return new Service();
	        }];
	    return Service;
	}());
	index_1.module.service(Service._name, Service.provider);


/***/ }

})
//# sourceMappingURL=0.5ff848e21e196ca5d86b.hot-update.js.map
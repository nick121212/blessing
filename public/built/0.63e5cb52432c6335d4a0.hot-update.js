webpackHotUpdate(0,{

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

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(31);
	__webpack_require__(173);
	var _name = "fxSideMenu", _module = _name + "Module";
	var Controller = (function () {
	    function Controller($scope, $compile, $interpolate, mdSideMenuSections) {
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.options = {};
	        this.template = $compile($interpolate(__webpack_require__(175)())({
	            opts: mdSideMenuSections.options
	        }));
	        this.options = this.mdSideMenuSections.options;
	    }
	    Controller.prototype.doLinkPre = function ($event, node) {
	        if (_.isFunction(this.doLink)) {
	            this.doLink($event, node);
	        }
	        console.log(node);
	    };
	    Controller.prototype.showChildren = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        if (this.selectedNodes.hasOwnProperty(node[opts.key])) {
	            delete this.selectedNodes[node[opts.key]];
	        }
	        else {
	            if (node[opts.children] && node[opts.children].length) {
	                this.selectedNodes[node[opts.key]] = node;
	            }
	        }
	    };
	    Controller.prototype.isShowChildren = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return !!this.selectedNodes[node[opts.key]];
	    };
	    Controller.prototype.isLeaf = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return node.rgt - node.lft == 1 || !node[opts.children] || node[opts.children].length == 0;
	    };
	    Controller.prototype.isSelected = function (node) {
	        var opts = this.mdSideMenuSections.options;
	        return !!this.mdSideMenuSections.selectedNode && this.mdSideMenuSections.selectedNode[opts.key] == node[opts.key];
	    };
	    Controller.$inject = ["$scope", "$compile", "$interpolate", "mdSideMenuSections"];
	    return Controller;
	}());
	function Directive(mdSideMenuSections) {
	    return {
	        restrict: 'EA',
	        replace: false,
	        require: _name,
	        transclude: true,
	        controllerAs: "sideCtl",
	        scope: {
	            modules: '='
	        },
	        bindToController: {
	            selectedNodes: '=',
	            doLink: '=?ngClick'
	        },
	        controller: Controller,
	        compile: function ($ele, $attr, childTranscludeFn) {
	            return function ($scope, $element, attrs, $ctrl) {
	                $scope.$watch("modules", function updateNodeOnRootScope(newValue) {
	                    var opts = mdSideMenuSections.options;
	                    if (_.isArray(newValue)) {
	                        if (angular.isDefined($scope.node) && angular.equals($scope.node[opts.children], newValue)) {
	                            return;
	                        }
	                        $scope.node = {};
	                        $scope.node[opts.children] = newValue;
	                    }
	                    else {
	                        if (angular.equals($scope.node, newValue)) {
	                            return;
	                        }
	                        $scope.node = newValue;
	                    }
	                });
	                $ctrl.template($scope, function (clone) {
	                    $element.html('').append(clone);
	                });
	                $scope.$sideMenuTransclude = childTranscludeFn;
	            };
	        }
	    };
	}
	var module = angular.module(_module, ["ngAnimate", "ngMaterial"]).directive(_name, ["mdSideMenuSections", Directive]);
	exports.mdl = module;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ }

})
//# sourceMappingURL=0.63e5cb52432c6335d4a0.hot-update.js.map
webpackHotUpdate(0,{

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(148);
	var ngMaterialIcons = __webpack_require__(20);
	var _ = __webpack_require__(31);
	var router_1 = __webpack_require__(149);
	var material_service_1 = __webpack_require__(29);
	var svg_service_1 = __webpack_require__(158);
	var toolbar_1 = __webpack_require__(159);
	var sidemenu_1 = __webpack_require__(167);
	__webpack_require__(178);
	var action_model_1 = __webpack_require__(50);
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

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(177);


/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	function Provider() {
	    var _sections = [], _theme, _palettes;
	    this.initWithSections = function (value) {
	        _sections = value ? value : [];
	    };
	    this.initWithTheme = function (value) {
	        _theme = value.theme();
	        _palettes = value._PALETTES;
	    };
	    this.$get = [function () {
	            var MdSideMenuSections = function () {
	                this.sections = _sections;
	                this.selectedNode = null;
	                this.options = {};
	                this.theme = _theme;
	                this.palettes = _palettes;
	                this.searchStr = "";
	            };
	            return new MdSideMenuSections();
	        }];
	}
	index_1.module.provider('mdSideMenuSections', [Provider]);


/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	function Directive() {
	    return {
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $scope['$sideMenuTransclude']($scope, function (clone) {
	                $element.empty();
	                $element.append(clone);
	            });
	        }
	    };
	}
	index_1.module.directive('fxSideMenuContentTransclude', Directive);


/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	function Directive() {
	    return {
	        restrict: 'EA',
	        require: '^fxSideMenu',
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $ctrl['template']($scope, function (clone) {
	                $element.html('').append(clone);
	            });
	        }
	    };
	}
	index_1.module.directive('fxSideMenuChild', Directive);


/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	var _name = "mdStyleColor";
	function Directive(mdSideMenuSections) {
	    return {
	        restrict: 'A',
	        scope: {
	            mdStyleColor: '='
	        },
	        link: function ($scope, $element, $attrs) {
	            var themeColors, split, hueR, colorR, colorA, hueA, colorValue, _apply_color = function () {
	                for (var p in $scope[_name]) {
	                    if ($scope[_name].hasOwnProperty(p)) {
	                        themeColors = mdSideMenuSections.theme.colors,
	                            split = ($scope[_name][p] || '').split('.');
	                        if (split.length < 2) {
	                            split.unshift('primary');
	                        }
	                        hueR = split[1] || 'hue-1';
	                        colorR = split[0] || 'primary';
	                        colorA = themeColors[colorR] ? themeColors[colorR].name : colorR;
	                        hueA = themeColors[colorR] ? (themeColors[colorR].hues[hueR] || hueR) : hueR;
	                        colorValue = mdSideMenuSections.palettes[colorA][hueA] ? mdSideMenuSections.palettes[colorA][hueA].value : mdSideMenuSections.palettes[colorA]['500'].value;
	                        if (hueA !== '0') {
	                            $element.css(p, 'rgb(' + colorValue.join(',') + ')');
	                        }
	                        else {
	                            $element.css(p, 'transparent');
	                        }
	                    }
	                }
	            };
	            if (!mdSideMenuSections.theme || !mdSideMenuSections.palettes) {
	                return console.warn('you probably want to ssSideNavSectionsProvider.initWithTheme($mdThemingProvider)');
	            }
	            $scope.$watch(_name, function (oldVal, newVal) {
	                if ((oldVal && newVal) && oldVal !== newVal) {
	                    _apply_color();
	                }
	            }, true);
	        }
	    };
	}
	index_1.module.directive(_name, ["mdSideMenuSections", Directive]);


/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	function Directive(mdSideMenuSections, $timeout) {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(176),
	        controllerAs: "searchCtl",
	        link: function ($scope) {
	            $scope.searchText = "";
	            $scope.title = "搜索菜单";
	            $scope.$watch("searchText", function (newVal, oldVal) {
	                $timeout.cancel($scope.timeID);
	                $scope.timeID = $timeout(function () {
	                    mdSideMenuSections.options.filterExpression = newVal;
	                }, 1000);
	            });
	        }
	    };
	}
	index_1.module.directive('fxSideMenuSearch', ["mdSideMenuSections", "$timeout", Directive]);


/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(167);
	var _ = __webpack_require__(31);
	function Factory($rootScope, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections &&
	                _.forEach(sections, function (section) {
	                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                        return digest(section[mdSideMenuSections.options.children], section);
	                    }
	                    if (section.showed && toState.name == section.link && toParams.key == section.key) {
	                        mdSideMenuSections.selectedNode = section;
	                        return false;
	                    }
	                });
	            return false;
	        }
	        mdSideMenuSections.selectedNode = null;
	        setTimeout(function () {
	            digest(mdSideMenuSections.sections, null);
	        }, 10);
	    };
	    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);
	    return {
	        onStateChangeStart: onStateChangeStart
	    };
	}
	index_1.module.factory('fxSideMenuFactory', ["$rootScope", "mdSideMenuSections", Factory]);


/***/ }

})
//# sourceMappingURL=0.e9725993526b489efde6.hot-update.js.map
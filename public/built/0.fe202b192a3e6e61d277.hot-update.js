webpackHotUpdate(0,{

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(241);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(25);
	__webpack_require__(232);
	var _name = "fxSideMenu", _module = _name + "Module";
	var Controller = (function () {
	    function Controller($scope, $compile, $interpolate, mdSideMenuSections) {
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.options = {};
	        this.template = $compile($interpolate(__webpack_require__(234)())({
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
	exports.module = angular.module(_module, ["ngAnimate", "ngMaterial"]).directive(_name, ["mdSideMenuSections", Directive]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
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
	module_1.module.provider('mdSideMenuSections', [Provider]);


/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
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
	module_1.module.directive('fxSideMenuContentTransclude', Directive);


/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
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
	module_1.module.directive('fxSideMenuChild', Directive);


/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
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
	            _apply_color();
	        }
	    };
	}
	module_1.module.directive(_name, ["mdSideMenuSections", Directive]);


/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
	function Directive(mdSideMenuSections, $timeout) {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(240),
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
	module_1.module.directive('fxSideMenuSearch', ["mdSideMenuSections", "$timeout", Directive]);


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(231);
	var _ = __webpack_require__(25);
	function Factory($rootScope, $timeout, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections &&
	                _.forEach(sections, function (section) {
	                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                        digest(section[mdSideMenuSections.options.children], section);
	                    }
	                    if (section.showed && toState.name == section.link && toParams.key == section.key) {
	                        mdSideMenuSections.selectedNode = section;
	                        return false;
	                    }
	                });
	            return false;
	        }
	        mdSideMenuSections.selectedNode = null;
	        $timeout(function () {
	            digest(mdSideMenuSections.sections, null);
	        }, 10);
	    };
	    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);
	    return {
	        onStateChangeStart: onStateChangeStart
	    };
	}
	module_1.module.factory('fxSideMenuFactory', ["$rootScope", "$timeout", "mdSideMenuSections", Factory]);


/***/ }

})
//# sourceMappingURL=0.fe202b192a3e6e61d277.hot-update.js.map
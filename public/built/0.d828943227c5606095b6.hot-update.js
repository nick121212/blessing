webpackHotUpdate(0,{

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(33);
	var section_provider_1 = __webpack_require__(166);
	var content_directive_1 = __webpack_require__(167);
	var child_directive_1 = __webpack_require__(168);
	var mdcolor_directive_1 = __webpack_require__(169);
	var search_directive_1 = __webpack_require__(170);
	var status_factory_1 = __webpack_require__(172);
	__webpack_require__(173);
	var _name = "fxSideMenu", _module = _name + "Module";
	var Controller = (function () {
	    function Controller($scope, $compile, $interpolate, mdSideMenuSections) {
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.options = {};
	        console.log("----", arguments);
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
	section_provider_1.default(module);
	content_directive_1.default(module);
	child_directive_1.default(module);
	mdcolor_directive_1.default(module);
	search_directive_1.default(module);
	status_factory_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module.name;


/***/ },

/***/ 169:
/***/ function(module, exports) {

	"use strict";
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.directive(_name, ["mdSideMenuSections", Directive]);
	};


/***/ }

})
//# sourceMappingURL=0.d828943227c5606095b6.hot-update.js.map
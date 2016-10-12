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

/***/ 172:
/***/ function(module, exports) {

	"use strict";
	function Factory($rootScope, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections.forEach(function (section) {
	                if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                    return digest(section[mdSideMenuSections.options.children], section);
	                }
	                if (section.showed && toState == section.link) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    module.factory('fxSideMenuFactory', ["$rootScope", "mdSideMenuSections", Factory]);
	};


/***/ }

})
//# sourceMappingURL=0.86372bd11623c5891426.hot-update.js.map
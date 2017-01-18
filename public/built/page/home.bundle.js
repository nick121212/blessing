webpackJsonp([2],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	__webpack_require__(305);
	var _name = "fxSideMenu", _module = _name + "Module";
	var Controller = (function () {
	    function Controller($scope, $compile, $interpolate, mdSideMenuSections) {
	        this.$scope = $scope;
	        this.$compile = $compile;
	        this.$interpolate = $interpolate;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.options = {};
	        this.template = $compile($interpolate(__webpack_require__(267)())({
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
	    return Controller;
	}());
	Controller.$inject = ["$scope", "$compile", "$interpolate", "mdSideMenuSections"];
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
	                $ctrl["template"]($scope, function (clone) {
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

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
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
	strategy.register("icon", __webpack_require__(269)());
	strategy.register("btn", __webpack_require__(268)());
	strategy.register("layout", __webpack_require__(271)());
	strategy.register("label", __webpack_require__(270)());
	strategy.register("menu", __webpack_require__(274)());
	strategy.register("menuItem", __webpack_require__(273)());
	strategy.register("menuBar", __webpack_require__(275)());
	strategy.register("menuDivider", __webpack_require__(272)());
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
	            model.index = _this.index;
	            if (model.conditionInfo && model.conditionInfo.condition) {
	                if (model.conditionInfo.prefix) {
	                    model.condition = model['type'] + "Ctl." + model.conditionInfo.condition;
	                }
	                else {
	                    model.condition = "" + model.conditionInfo.condition;
	                }
	                if (model.conditionInfo.useDisabled) {
	                    model.disabled = model.condition;
	                    model.condition = "";
	                }
	            }
	            !model.condition && (model.condition = "true");
	            $newScope[model['type'] + "Ctl"] = _.clone(model);
	            if (_this.ctls) {
	                $newScope[_this.ctls] = $scope.$parent[_this.ctls] || {};
	            }
	            _this.$scope.$watch(function () {
	                return _this.index;
	            }, function (newValue, oldValue) {
	                if (newValue != oldValue) {
	                    $newScope[model['type'] + "Ctl"]["index"] = newValue;
	                }
	            });
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
	    return Controller;
	}());
	Controller.$inject = ["$scope", "$rootScope", "$compile", "$interpolate", "materialUtils"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        require: [_name],
	        scope: {},
	        bindToController: {
	            ctls: '@',
	            ngDisabled: '@',
	            items: "=",
	            ngModel: '=',
	            index: '=?'
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
	exports.module = angular.module(_name + "Module", []).directive(_name, Directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 174:
/***/ function(module, exports) {

	/* commonjs package manager support (eg componentjs) */
	if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	  module.exports = 'treeControl';
	}
	(function ( angular ) {
	    'use strict';
	
	    function createPath(startScope) {
	        return function path() {
	            var _path = [];
	            var scope = startScope;
	            var prevNode;
	            while (scope && scope.node !== startScope.synteticRoot) {
	                if (prevNode !== scope.node)
	                    _path.push(scope.node);
	                prevNode = scope.node;
	                scope = scope.$parent;
	            }
	            return _path;
	        }
	    }
	
	    function ensureDefault(obj, prop, value) {
	        if (!obj.hasOwnProperty(prop))
	            obj[prop] = value;
	    }
	
	    function defaultIsLeaf(node, $scope) {
	        return !node[$scope.options.nodeChildren] || node[$scope.options.nodeChildren].length === 0;
	    }
	
	    function shallowCopy(src, dst) {
	        if (angular.isArray(src)) {
	            dst = dst || [];
	
	            for (var i = 0; i < src.length; i++) {
	                dst[i] = src[i];
	            }
	        } else if (angular.isObject(src)) {
	            dst = dst || {};
	
	            for (var key in src) {
	                if (hasOwnProperty.call(src, key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
	                    dst[key] = src[key];
	                }
	            }
	        }
	
	        return dst || src;
	    }
	    function defaultEquality(a, b,$scope) {
	        if (!a || !b)
	            return false;
	        a = shallowCopy(a);
	        a[$scope.options.nodeChildren] = [];
	        b = shallowCopy(b);
	        b[$scope.options.nodeChildren] = [];
	        return angular.equals(a, b);
	    }
	
	    function defaultIsSelectable() {
	        return true;
	    }
	
	    function ensureAllDefaultOptions($scope) {
	        ensureDefault($scope.options, "multiSelection", false);
	        ensureDefault($scope.options, "nodeChildren", "children");
	        ensureDefault($scope.options, "dirSelectable", "true");
	        ensureDefault($scope.options, "injectClasses", {});
	        ensureDefault($scope.options.injectClasses, "ul", "");
	        ensureDefault($scope.options.injectClasses, "li", "");
	        ensureDefault($scope.options.injectClasses, "liSelected", "");
	        ensureDefault($scope.options.injectClasses, "iExpanded", "");
	        ensureDefault($scope.options.injectClasses, "iCollapsed", "");
	        ensureDefault($scope.options.injectClasses, "iLeaf", "");
	        ensureDefault($scope.options.injectClasses, "label", "");
	        ensureDefault($scope.options.injectClasses, "labelSelected", "");
	        ensureDefault($scope.options, "equality", defaultEquality);
	        ensureDefault($scope.options, "isLeaf", defaultIsLeaf);
	        ensureDefault($scope.options, "allowDeselect", true);
	        ensureDefault($scope.options, "isSelectable", defaultIsSelectable);
	    }
	    
	    angular.module( 'treeControl', [] )
	        .constant('treeConfig', {
	            templateUrl: null
	        })
	        .directive( 'treecontrol', ['$compile', function( $compile ) {
	            /**
	             * @param cssClass - the css class
	             * @param addClassProperty - should we wrap the class name with class=""
	             */
	            function classIfDefined(cssClass, addClassProperty) {
	                if (cssClass) {
	                    if (addClassProperty)
	                        return 'class="' + cssClass + '"';
	                    else
	                        return cssClass;
	                }
	                else
	                    return "";
	            }
	            
	            
	            
	            return {
	                restrict: 'EA',
	                require: "treecontrol",
	                transclude: true,
	                scope: {
	                    treeModel: "=",
	                    selectedNode: "=?",
	                    selectedNodes: "=?",
	                    expandedNodes: "=?",
	                    onSelection: "&",
	                    onNodeToggle: "&",
	                    options: "=?",
	                    orderBy: "=?",
	                    reverseOrder: "@",
	                    filterExpression: "=?",
	                    filterComparator: "=?"
	                },
	                controller: ['$scope', '$templateCache', '$interpolate', 'treeConfig', function ($scope, $templateCache, $interpolate, treeConfig) {
	                    
	                    $scope.options = $scope.options || {};
	                    
	                    ensureAllDefaultOptions($scope);
	                  
	                    $scope.selectedNodes = $scope.selectedNodes || [];
	                    $scope.expandedNodes = $scope.expandedNodes || [];
	                    $scope.expandedNodesMap = {};
	                    for (var i=0; i < $scope.expandedNodes.length; i++) {
	                        $scope.expandedNodesMap["a"+i] = $scope.expandedNodes[i];
	                    }
	                    $scope.parentScopeOfTree = $scope.$parent;
	
	
	                    function isSelectedNode(node) {
	                        if (!$scope.options.multiSelection && ($scope.options.equality(node, $scope.selectedNode , $scope)))
	                            return true;
	                        else if ($scope.options.multiSelection && $scope.selectedNodes) {
	                            for (var i = 0; (i < $scope.selectedNodes.length); i++) {
	                                if ($scope.options.equality(node, $scope.selectedNodes[i] , $scope)) {
	                                    return true;
	                                }
	                            }
	                            return false;
	                        }
	                    }
	
	                    $scope.headClass = function(node) {
	                        var liSelectionClass = classIfDefined($scope.options.injectClasses.liSelected, false);
	                        var injectSelectionClass = "";
	                        if (liSelectionClass && isSelectedNode(node))
	                            injectSelectionClass = " " + liSelectionClass;
	                        if ($scope.options.isLeaf(node, $scope))
	                            return "tree-leaf" + injectSelectionClass;
	                        if ($scope.expandedNodesMap[this.$id])
	                            return "tree-expanded" + injectSelectionClass;
	                        else
	                            return "tree-collapsed" + injectSelectionClass;
	                    };
	
	                    $scope.iBranchClass = function() {
	                        if ($scope.expandedNodesMap[this.$id])
	                            return classIfDefined($scope.options.injectClasses.iExpanded);
	                        else
	                            return classIfDefined($scope.options.injectClasses.iCollapsed);
	                    };
	
	                    $scope.nodeExpanded = function() {
	                        return !!$scope.expandedNodesMap[this.$id];
	                    };
	
	                    $scope.selectNodeHead = function() {
	                        var transcludedScope = this;
	                        var expanding = $scope.expandedNodesMap[transcludedScope.$id] === undefined;
	                        $scope.expandedNodesMap[transcludedScope.$id] = (expanding ? transcludedScope.node : undefined);
	                        if (expanding) {
	                            $scope.expandedNodes.push(transcludedScope.node);
	                        }
	                        else {
	                            var index;
	                            for (var i=0; (i < $scope.expandedNodes.length) && !index; i++) {
	                                if ($scope.options.equality($scope.expandedNodes[i], transcludedScope.node , $scope)) {
	                                    index = i;
	                                }
	                            }
	                            if (index !== undefined)
	                                $scope.expandedNodes.splice(index, 1);
	                        }
	                        if ($scope.onNodeToggle) {
	                            var parentNode = (transcludedScope.$parent.node === transcludedScope.synteticRoot)?null:transcludedScope.$parent.node;
	                            var path = createPath(transcludedScope);
	                            $scope.onNodeToggle({node: transcludedScope.node, $parentNode: parentNode, $path: path,
	                              $index: transcludedScope.$index, $first: transcludedScope.$first, $middle: transcludedScope.$middle,
	                              $last: transcludedScope.$last, $odd: transcludedScope.$odd, $even: transcludedScope.$even, expanded: expanding});
	
	                        }
	                    };
	
	                    $scope.selectNodeLabel = function( selectedNode){
	                        var transcludedScope = this;
	                        if(!$scope.options.isLeaf(selectedNode, $scope) && (!$scope.options.dirSelectable || !$scope.options.isSelectable(selectedNode))) {
	                            // Branch node is not selectable, expand
	                            this.selectNodeHead();
	                        }
	                        else if($scope.options.isLeaf(selectedNode, $scope) && (!$scope.options.isSelectable(selectedNode))) {
	                            // Leaf node is not selectable
	                            return;
	                        }
	                        else {
	                            var selected = false;
	                            if ($scope.options.multiSelection) {
	                                var pos = -1;
	                                for (var i=0; i < $scope.selectedNodes.length; i++) {
	                                    if($scope.options.equality(selectedNode, $scope.selectedNodes[i] , $scope)) {
	                                        pos = i;
	                                        break;
	                                    }
	                                }
	                                if (pos === -1) {
	                                    $scope.selectedNodes.push(selectedNode);
	                                    selected = true;
	                                } else {
	                                    $scope.selectedNodes.splice(pos, 1);
	                                }
	                            } else {
	                                if (!$scope.options.equality(selectedNode, $scope.selectedNode , $scope)) {
	                                    $scope.selectedNode = selectedNode;
	                                    selected = true;
	                                }
	                                else {
	                                    if ($scope.options.allowDeselect) {
	                                        $scope.selectedNode = undefined;
	                                    } else {
	                                        $scope.selectedNode = selectedNode;
	                                        selected = true;
	                                    }
	                                }
	                            }
	                            if ($scope.onSelection) {
	                                var parentNode = (transcludedScope.$parent.node === transcludedScope.synteticRoot)?null:transcludedScope.$parent.node;
	                                var path = createPath(transcludedScope)
	                                $scope.onSelection({node: selectedNode, selected: selected, $parentNode: parentNode, $path: path,
	                                  $index: transcludedScope.$index, $first: transcludedScope.$first, $middle: transcludedScope.$middle,
	                                  $last: transcludedScope.$last, $odd: transcludedScope.$odd, $even: transcludedScope.$even});
	                            }
	                        }
	                    };
	
	                    $scope.selectedClass = function() {
	                        var isThisNodeSelected = isSelectedNode(this.node);
	                        var labelSelectionClass = classIfDefined($scope.options.injectClasses.labelSelected, false);
	                        var injectSelectionClass = "";
	                        if (labelSelectionClass && isThisNodeSelected)
	                            injectSelectionClass = " " + labelSelectionClass;
	
	                        return isThisNodeSelected ? "tree-selected" + injectSelectionClass : "";
	                    };
	
	                    $scope.unselectableClass = function() {
	                        var isThisNodeUnselectable = !$scope.options.isSelectable(this.node);
	                        var labelUnselectableClass = classIfDefined($scope.options.injectClasses.labelUnselectable, false);
	                        return isThisNodeUnselectable ? "tree-unselectable " + labelUnselectableClass : "";
	                    };
	
	                    //tree template
	                    $scope.isReverse = function() {
	                      return !($scope.reverseOrder === 'false' || $scope.reverseOrder === 'False' || $scope.reverseOrder === '' || $scope.reverseOrder === false);
	                    };
	
	                    $scope.orderByFunc = function() {
	                      return $scope.orderBy;
	                    };
	//                    return "" + $scope.orderBy;
	
	                    var templateOptions = {
	                        orderBy: $scope.orderBy ? " | orderBy:orderByFunc():isReverse()" : '',
	                        ulClass: classIfDefined($scope.options.injectClasses.ul, true),
	                        nodeChildren:  $scope.options.nodeChildren,
	                        liClass: classIfDefined($scope.options.injectClasses.li, true),
	                        iLeafClass: classIfDefined($scope.options.injectClasses.iLeaf, false),
	                        labelClass: classIfDefined($scope.options.injectClasses.label, false)
	                    };
	
	                    var template;
	                    var templateUrl = $scope.options.templateUrl || treeConfig.templateUrl;
	
	                    if(templateUrl) {
	                        template = $templateCache.get(templateUrl);
	                    }
	
	                    if(!template) {
	                        template =
	                            '<ul {{options.ulClass}} >' +
	                            '<li ng-repeat="node in node.{{options.nodeChildren}} | filter:filterExpression:filterComparator {{options.orderBy}}" ng-class="headClass(node)" {{options.liClass}}' +
	                            'set-node-to-data>' +
	                            '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i>' +
	                            '<i class="tree-leaf-head {{options.iLeafClass}}"></i>' +
	                            '<div class="tree-label {{options.labelClass}}" ng-class="[selectedClass(), unselectableClass()]" ng-click="selectNodeLabel(node)" tree-transclude></div>' +
	                            '<treeitem ng-if="nodeExpanded()"></treeitem>' +
	                            '</li>' +
	                            '</ul>';
	                    }
	
	                    this.template = $compile($interpolate(template)({options: templateOptions}));
	                }],
	                compile: function(element, attrs, childTranscludeFn) {
	                    return function ( scope, element, attrs, treemodelCntr ) {
	
	                        scope.$watch("treeModel", function updateNodeOnRootScope(newValue) {
	                            if (angular.isArray(newValue)) {
	                                if (angular.isDefined(scope.node) && angular.equals(scope.node[scope.options.nodeChildren], newValue))
	                                    return;
	                                scope.node = {};
	                                scope.synteticRoot = scope.node;
	                                scope.node[scope.options.nodeChildren] = newValue;
	                            }
	                            else {
	                                if (angular.equals(scope.node, newValue))
	                                    return;
	                                scope.node = newValue;
	                            }
	                        });
	
	                        scope.$watchCollection('expandedNodes', function(newValue, oldValue) {
	                            var notFoundIds = 0;
	                            var newExpandedNodesMap = {};
	                            var $liElements = element.find('li');
	                            var existingScopes = [];
	                            // find all nodes visible on the tree and the scope $id of the scopes including them
	                            angular.forEach($liElements, function(liElement) {
	                                var $liElement = angular.element(liElement);
	                                var liScope = {
	                                    $id: $liElement.data('scope-id'),
	                                    node: $liElement.data('node')
	                                };
	                                existingScopes.push(liScope);
	                            });
	                            // iterate over the newValue, the new expanded nodes, and for each find it in the existingNodesAndScopes
	                            // if found, add the mapping $id -> node into newExpandedNodesMap
	                            // if not found, add the mapping num -> node into newExpandedNodesMap
	                            angular.forEach(newValue, function(newExNode) {
	                                var found = false;
	                                for (var i=0; (i < existingScopes.length) && !found; i++) {
	                                    var existingScope = existingScopes[i];
	                                    if (scope.options.equality(newExNode, existingScope.node , scope)) {
	                                        newExpandedNodesMap[existingScope.$id] = existingScope.node;
	                                        found = true;
	                                    }
	                                }
	                                if (!found)
	                                    newExpandedNodesMap['a' + notFoundIds++] = newExNode;
	                            });
	                            scope.expandedNodesMap = newExpandedNodesMap;
	                        });
	
	//                        scope.$watch('expandedNodesMap', function(newValue) {
	//
	//                        });
	
	                        //Rendering template for a root node
	                        treemodelCntr.template( scope, function(clone) {
	                            element.html('').append( clone );
	                        });
	                        // save the transclude function from compile (which is not bound to a scope as apposed to the one from link)
	                        // we can fix this to work with the link transclude function with angular 1.2.6. as for angular 1.2.0 we need
	                        // to keep using the compile function
	                        scope.$treeTransclude = childTranscludeFn;
	                    };
	                }
	            };
	        }])
	        .directive("setNodeToData", ['$parse', function($parse) {
	            return {
	                restrict: 'A',
	                link: function($scope, $element, $attrs) {
	                    $element.data('node', $scope.node);
	                    $element.data('scope-id', $scope.$id);
	                }
	            };
	        }])
	        .directive("treeitem", function() {
	            return {
	                restrict: 'E',
	                require: "^treecontrol",
	                link: function( scope, element, attrs, treemodelCntr) {
	                    // Rendering template for the current node
	                    treemodelCntr.template(scope, function(clone) {
	                        element.html('').append(clone);
	                    });
	                }
	            };
	        })
	        .directive("treeTransclude", function () {
	            return {
	                controller: ['$scope',function ($scope) {
	                    ensureAllDefaultOptions($scope);
	                }],
	
	                link: function(scope, element, attrs, controller) {
	                    if (!scope.options.isLeaf(scope.node, scope)) {
	                        angular.forEach(scope.expandedNodesMap, function (node, id) {
	                            if (scope.options.equality(node, scope.node , scope)) {
	                                scope.expandedNodesMap[scope.$id] = scope.node;
	                                scope.expandedNodesMap[id] = undefined;
	                            }
	                        });
	                    }
	                    if (!scope.options.multiSelection && scope.options.equality(scope.node, scope.selectedNode , scope)) {
	                        scope.selectedNode = scope.node;
	                    } else if (scope.options.multiSelection) {
	                        var newSelectedNodes = [];
	                        for (var i = 0; (i < scope.selectedNodes.length); i++) {
	                            if (scope.options.equality(scope.node, scope.selectedNodes[i] , scope)) {
	                                newSelectedNodes.push(scope.node);
	                            }
	                        }
	                        scope.selectedNodes = newSelectedNodes;
	                    }
	
	                    // create a scope for the transclusion, whos parent is the parent of the tree control
	                    scope.transcludeScope = scope.parentScopeOfTree.$new();
	                    scope.transcludeScope.node = scope.node;
	                    scope.transcludeScope.$path = createPath(scope);
	                    scope.transcludeScope.$parentNode = (scope.$parent.node === scope.synteticRoot)?null:scope.$parent.node;
	                    scope.transcludeScope.$index = scope.$index;
	                    scope.transcludeScope.$first = scope.$first;
	                    scope.transcludeScope.$middle = scope.$middle;
	                    scope.transcludeScope.$last = scope.$last;
	                    scope.transcludeScope.$odd = scope.$odd;
	                    scope.transcludeScope.$even = scope.$even;
	                    scope.$on('$destroy', function() {
	                        scope.transcludeScope.$destroy();
	                    });
	
	                    scope.$treeTransclude(scope.transcludeScope, function(clone) {
	                        element.empty();
	                        element.append(clone);
	                    });
	                }
	            };
	        });
	})( angular );


/***/ },

/***/ 175:
/***/ function(module, exports) {

	/**
	 * State-based routing for AngularJS
	 * @version v0.3.2
	 * @link http://angular-ui.github.com/
	 * @license MIT License, http://www.opensource.org/licenses/MIT
	 */
	
	/* commonjs package manager support (eg componentjs) */
	if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	  module.exports = 'ui.router';
	}
	
	(function (window, angular, undefined) {
	/*jshint globalstrict:true*/
	/*global angular:false*/
	'use strict';
	
	var isDefined = angular.isDefined,
	    isFunction = angular.isFunction,
	    isString = angular.isString,
	    isObject = angular.isObject,
	    isArray = angular.isArray,
	    forEach = angular.forEach,
	    extend = angular.extend,
	    copy = angular.copy,
	    toJson = angular.toJson;
	
	function inherit(parent, extra) {
	  return extend(new (extend(function() {}, { prototype: parent }))(), extra);
	}
	
	function merge(dst) {
	  forEach(arguments, function(obj) {
	    if (obj !== dst) {
	      forEach(obj, function(value, key) {
	        if (!dst.hasOwnProperty(key)) dst[key] = value;
	      });
	    }
	  });
	  return dst;
	}
	
	/**
	 * Finds the common ancestor path between two states.
	 *
	 * @param {Object} first The first state.
	 * @param {Object} second The second state.
	 * @return {Array} Returns an array of state names in descending order, not including the root.
	 */
	function ancestors(first, second) {
	  var path = [];
	
	  for (var n in first.path) {
	    if (first.path[n] !== second.path[n]) break;
	    path.push(first.path[n]);
	  }
	  return path;
	}
	
	/**
	 * IE8-safe wrapper for `Object.keys()`.
	 *
	 * @param {Object} object A JavaScript object.
	 * @return {Array} Returns the keys of the object as an array.
	 */
	function objectKeys(object) {
	  if (Object.keys) {
	    return Object.keys(object);
	  }
	  var result = [];
	
	  forEach(object, function(val, key) {
	    result.push(key);
	  });
	  return result;
	}
	
	/**
	 * IE8-safe wrapper for `Array.prototype.indexOf()`.
	 *
	 * @param {Array} array A JavaScript array.
	 * @param {*} value A value to search the array for.
	 * @return {Number} Returns the array index value of `value`, or `-1` if not present.
	 */
	function indexOf(array, value) {
	  if (Array.prototype.indexOf) {
	    return array.indexOf(value, Number(arguments[2]) || 0);
	  }
	  var len = array.length >>> 0, from = Number(arguments[2]) || 0;
	  from = (from < 0) ? Math.ceil(from) : Math.floor(from);
	
	  if (from < 0) from += len;
	
	  for (; from < len; from++) {
	    if (from in array && array[from] === value) return from;
	  }
	  return -1;
	}
	
	/**
	 * Merges a set of parameters with all parameters inherited between the common parents of the
	 * current state and a given destination state.
	 *
	 * @param {Object} currentParams The value of the current state parameters ($stateParams).
	 * @param {Object} newParams The set of parameters which will be composited with inherited params.
	 * @param {Object} $current Internal definition of object representing the current state.
	 * @param {Object} $to Internal definition of object representing state to transition to.
	 */
	function inheritParams(currentParams, newParams, $current, $to) {
	  var parents = ancestors($current, $to), parentParams, inherited = {}, inheritList = [];
	
	  for (var i in parents) {
	    if (!parents[i] || !parents[i].params) continue;
	    parentParams = objectKeys(parents[i].params);
	    if (!parentParams.length) continue;
	
	    for (var j in parentParams) {
	      if (indexOf(inheritList, parentParams[j]) >= 0) continue;
	      inheritList.push(parentParams[j]);
	      inherited[parentParams[j]] = currentParams[parentParams[j]];
	    }
	  }
	  return extend({}, inherited, newParams);
	}
	
	/**
	 * Performs a non-strict comparison of the subset of two objects, defined by a list of keys.
	 *
	 * @param {Object} a The first object.
	 * @param {Object} b The second object.
	 * @param {Array} keys The list of keys within each object to compare. If the list is empty or not specified,
	 *                     it defaults to the list of keys in `a`.
	 * @return {Boolean} Returns `true` if the keys match, otherwise `false`.
	 */
	function equalForKeys(a, b, keys) {
	  if (!keys) {
	    keys = [];
	    for (var n in a) keys.push(n); // Used instead of Object.keys() for IE8 compatibility
	  }
	
	  for (var i=0; i<keys.length; i++) {
	    var k = keys[i];
	    if (a[k] != b[k]) return false; // Not '===', values aren't necessarily normalized
	  }
	  return true;
	}
	
	/**
	 * Returns the subset of an object, based on a list of keys.
	 *
	 * @param {Array} keys
	 * @param {Object} values
	 * @return {Boolean} Returns a subset of `values`.
	 */
	function filterByKeys(keys, values) {
	  var filtered = {};
	
	  forEach(keys, function (name) {
	    filtered[name] = values[name];
	  });
	  return filtered;
	}
	
	// like _.indexBy
	// when you know that your index values will be unique, or you want last-one-in to win
	function indexBy(array, propName) {
	  var result = {};
	  forEach(array, function(item) {
	    result[item[propName]] = item;
	  });
	  return result;
	}
	
	// extracted from underscore.js
	// Return a copy of the object only containing the whitelisted properties.
	function pick(obj) {
	  var copy = {};
	  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
	  forEach(keys, function(key) {
	    if (key in obj) copy[key] = obj[key];
	  });
	  return copy;
	}
	
	// extracted from underscore.js
	// Return a copy of the object omitting the blacklisted properties.
	function omit(obj) {
	  var copy = {};
	  var keys = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
	  for (var key in obj) {
	    if (indexOf(keys, key) == -1) copy[key] = obj[key];
	  }
	  return copy;
	}
	
	function pluck(collection, key) {
	  var result = isArray(collection) ? [] : {};
	
	  forEach(collection, function(val, i) {
	    result[i] = isFunction(key) ? key(val) : val[key];
	  });
	  return result;
	}
	
	function filter(collection, callback) {
	  var array = isArray(collection);
	  var result = array ? [] : {};
	  forEach(collection, function(val, i) {
	    if (callback(val, i)) {
	      result[array ? result.length : i] = val;
	    }
	  });
	  return result;
	}
	
	function map(collection, callback) {
	  var result = isArray(collection) ? [] : {};
	
	  forEach(collection, function(val, i) {
	    result[i] = callback(val, i);
	  });
	  return result;
	}
	
	// issue #2676 #2889
	function silenceUncaughtInPromise (promise) {
	  return promise.then(undefined, function() {}) && promise;
	}
	
	/**
	 * @ngdoc overview
	 * @name ui.router.util
	 *
	 * @description
	 * # ui.router.util sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 *
	 */
	angular.module('ui.router.util', ['ng']);
	
	/**
	 * @ngdoc overview
	 * @name ui.router.router
	 * 
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.router sub-module
	 *
	 * This module is a dependency of other sub-modules. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 */
	angular.module('ui.router.router', ['ui.router.util']);
	
	/**
	 * @ngdoc overview
	 * @name ui.router.state
	 * 
	 * @requires ui.router.router
	 * @requires ui.router.util
	 *
	 * @description
	 * # ui.router.state sub-module
	 *
	 * This module is a dependency of the main ui.router module. Do not include this module as a dependency
	 * in your angular app (use {@link ui.router} module instead).
	 * 
	 */
	angular.module('ui.router.state', ['ui.router.router', 'ui.router.util']);
	
	/**
	 * @ngdoc overview
	 * @name ui.router
	 *
	 * @requires ui.router.state
	 *
	 * @description
	 * # ui.router
	 * 
	 * ## The main module for ui.router 
	 * There are several sub-modules included with the ui.router module, however only this module is needed
	 * as a dependency within your angular app. The other modules are for organization purposes. 
	 *
	 * The modules are:
	 * * ui.router - the main "umbrella" module
	 * * ui.router.router - 
	 * 
	 * *You'll need to include **only** this module as the dependency within your angular app.*
	 * 
	 * <pre>
	 * <!doctype html>
	 * <html ng-app="myApp">
	 * <head>
	 *   <script src="js/angular.js"></script>
	 *   <!-- Include the ui-router script -->
	 *   <script src="js/angular-ui-router.min.js"></script>
	 *   <script>
	 *     // ...and add 'ui.router' as a dependency
	 *     var myApp = angular.module('myApp', ['ui.router']);
	 *   </script>
	 * </head>
	 * <body>
	 * </body>
	 * </html>
	 * </pre>
	 */
	angular.module('ui.router', ['ui.router.state']);
	
	angular.module('ui.router.compat', ['ui.router']);
	
	/**
	 * @ngdoc object
	 * @name ui.router.util.$resolve
	 *
	 * @requires $q
	 * @requires $injector
	 *
	 * @description
	 * Manages resolution of (acyclic) graphs of promises.
	 */
	$Resolve.$inject = ['$q', '$injector'];
	function $Resolve(  $q,    $injector) {
	  
	  var VISIT_IN_PROGRESS = 1,
	      VISIT_DONE = 2,
	      NOTHING = {},
	      NO_DEPENDENCIES = [],
	      NO_LOCALS = NOTHING,
	      NO_PARENT = extend($q.when(NOTHING), { $$promises: NOTHING, $$values: NOTHING });
	  
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$resolve#study
	   * @methodOf ui.router.util.$resolve
	   *
	   * @description
	   * Studies a set of invocables that are likely to be used multiple times.
	   * <pre>
	   * $resolve.study(invocables)(locals, parent, self)
	   * </pre>
	   * is equivalent to
	   * <pre>
	   * $resolve.resolve(invocables, locals, parent, self)
	   * </pre>
	   * but the former is more efficient (in fact `resolve` just calls `study` 
	   * internally).
	   *
	   * @param {object} invocables Invocable objects
	   * @return {function} a function to pass in locals, parent and self
	   */
	  this.study = function (invocables) {
	    if (!isObject(invocables)) throw new Error("'invocables' must be an object");
	    var invocableKeys = objectKeys(invocables || {});
	    
	    // Perform a topological sort of invocables to build an ordered plan
	    var plan = [], cycle = [], visited = {};
	    function visit(value, key) {
	      if (visited[key] === VISIT_DONE) return;
	      
	      cycle.push(key);
	      if (visited[key] === VISIT_IN_PROGRESS) {
	        cycle.splice(0, indexOf(cycle, key));
	        throw new Error("Cyclic dependency: " + cycle.join(" -> "));
	      }
	      visited[key] = VISIT_IN_PROGRESS;
	      
	      if (isString(value)) {
	        plan.push(key, [ function() { return $injector.get(value); }], NO_DEPENDENCIES);
	      } else {
	        var params = $injector.annotate(value);
	        forEach(params, function (param) {
	          if (param !== key && invocables.hasOwnProperty(param)) visit(invocables[param], param);
	        });
	        plan.push(key, value, params);
	      }
	      
	      cycle.pop();
	      visited[key] = VISIT_DONE;
	    }
	    forEach(invocables, visit);
	    invocables = cycle = visited = null; // plan is all that's required
	    
	    function isResolve(value) {
	      return isObject(value) && value.then && value.$$promises;
	    }
	    
	    return function (locals, parent, self) {
	      if (isResolve(locals) && self === undefined) {
	        self = parent; parent = locals; locals = null;
	      }
	      if (!locals) locals = NO_LOCALS;
	      else if (!isObject(locals)) {
	        throw new Error("'locals' must be an object");
	      }       
	      if (!parent) parent = NO_PARENT;
	      else if (!isResolve(parent)) {
	        throw new Error("'parent' must be a promise returned by $resolve.resolve()");
	      }
	      
	      // To complete the overall resolution, we have to wait for the parent
	      // promise and for the promise for each invokable in our plan.
	      var resolution = $q.defer(),
	          result = resolution.promise,
	          promises = result.$$promises = {},
	          values = extend({}, locals),
	          wait = 1 + plan.length/3,
	          merged = false;
	          
	      function done() {
	        // Merge parent values we haven't got yet and publish our own $$values
	        if (!--wait) {
	          if (!merged) merge(values, parent.$$values); 
	          result.$$values = values;
	          result.$$promises = result.$$promises || true; // keep for isResolve()
	          delete result.$$inheritedValues;
	          resolution.resolve(values);
	        }
	      }
	      
	      function fail(reason) {
	        result.$$failure = reason;
	        resolution.reject(reason);
	      }
	
	      // Short-circuit if parent has already failed
	      if (isDefined(parent.$$failure)) {
	        fail(parent.$$failure);
	        return result;
	      }
	      
	      if (parent.$$inheritedValues) {
	        merge(values, omit(parent.$$inheritedValues, invocableKeys));
	      }
	
	      // Merge parent values if the parent has already resolved, or merge
	      // parent promises and wait if the parent resolve is still in progress.
	      extend(promises, parent.$$promises);
	      if (parent.$$values) {
	        merged = merge(values, omit(parent.$$values, invocableKeys));
	        result.$$inheritedValues = omit(parent.$$values, invocableKeys);
	        done();
	      } else {
	        if (parent.$$inheritedValues) {
	          result.$$inheritedValues = omit(parent.$$inheritedValues, invocableKeys);
	        }        
	        parent.then(done, fail);
	      }
	      
	      // Process each invocable in the plan, but ignore any where a local of the same name exists.
	      for (var i=0, ii=plan.length; i<ii; i+=3) {
	        if (locals.hasOwnProperty(plan[i])) done();
	        else invoke(plan[i], plan[i+1], plan[i+2]);
	      }
	      
	      function invoke(key, invocable, params) {
	        // Create a deferred for this invocation. Failures will propagate to the resolution as well.
	        var invocation = $q.defer(), waitParams = 0;
	        function onfailure(reason) {
	          invocation.reject(reason);
	          fail(reason);
	        }
	        // Wait for any parameter that we have a promise for (either from parent or from this
	        // resolve; in that case study() will have made sure it's ordered before us in the plan).
	        forEach(params, function (dep) {
	          if (promises.hasOwnProperty(dep) && !locals.hasOwnProperty(dep)) {
	            waitParams++;
	            promises[dep].then(function (result) {
	              values[dep] = result;
	              if (!(--waitParams)) proceed();
	            }, onfailure);
	          }
	        });
	        if (!waitParams) proceed();
	        function proceed() {
	          if (isDefined(result.$$failure)) return;
	          try {
	            invocation.resolve($injector.invoke(invocable, self, values));
	            invocation.promise.then(function (result) {
	              values[key] = result;
	              done();
	            }, onfailure);
	          } catch (e) {
	            onfailure(e);
	          }
	        }
	        // Publish promise synchronously; invocations further down in the plan may depend on it.
	        promises[key] = invocation.promise;
	      }
	      
	      return result;
	    };
	  };
	  
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$resolve#resolve
	   * @methodOf ui.router.util.$resolve
	   *
	   * @description
	   * Resolves a set of invocables. An invocable is a function to be invoked via 
	   * `$injector.invoke()`, and can have an arbitrary number of dependencies. 
	   * An invocable can either return a value directly,
	   * or a `$q` promise. If a promise is returned it will be resolved and the 
	   * resulting value will be used instead. Dependencies of invocables are resolved 
	   * (in this order of precedence)
	   *
	   * - from the specified `locals`
	   * - from another invocable that is part of this `$resolve` call
	   * - from an invocable that is inherited from a `parent` call to `$resolve` 
	   *   (or recursively
	   * - from any ancestor `$resolve` of that parent).
	   *
	   * The return value of `$resolve` is a promise for an object that contains 
	   * (in this order of precedence)
	   *
	   * - any `locals` (if specified)
	   * - the resolved return values of all injectables
	   * - any values inherited from a `parent` call to `$resolve` (if specified)
	   *
	   * The promise will resolve after the `parent` promise (if any) and all promises 
	   * returned by injectables have been resolved. If any invocable 
	   * (or `$injector.invoke`) throws an exception, or if a promise returned by an 
	   * invocable is rejected, the `$resolve` promise is immediately rejected with the 
	   * same error. A rejection of a `parent` promise (if specified) will likewise be 
	   * propagated immediately. Once the `$resolve` promise has been rejected, no 
	   * further invocables will be called.
	   * 
	   * Cyclic dependencies between invocables are not permitted and will cause `$resolve`
	   * to throw an error. As a special case, an injectable can depend on a parameter 
	   * with the same name as the injectable, which will be fulfilled from the `parent` 
	   * injectable of the same name. This allows inherited values to be decorated. 
	   * Note that in this case any other injectable in the same `$resolve` with the same
	   * dependency would see the decorated value, not the inherited value.
	   *
	   * Note that missing dependencies -- unlike cyclic dependencies -- will cause an 
	   * (asynchronous) rejection of the `$resolve` promise rather than a (synchronous) 
	   * exception.
	   *
	   * Invocables are invoked eagerly as soon as all dependencies are available. 
	   * This is true even for dependencies inherited from a `parent` call to `$resolve`.
	   *
	   * As a special case, an invocable can be a string, in which case it is taken to 
	   * be a service name to be passed to `$injector.get()`. This is supported primarily 
	   * for backwards-compatibility with the `resolve` property of `$routeProvider` 
	   * routes.
	   *
	   * @param {object} invocables functions to invoke or 
	   * `$injector` services to fetch.
	   * @param {object} locals  values to make available to the injectables
	   * @param {object} parent  a promise returned by another call to `$resolve`.
	   * @param {object} self  the `this` for the invoked methods
	   * @return {object} Promise for an object that contains the resolved return value
	   * of all invocables, as well as any inherited and local values.
	   */
	  this.resolve = function (invocables, locals, parent, self) {
	    return this.study(invocables)(locals, parent, self);
	  };
	}
	
	angular.module('ui.router.util').service('$resolve', $Resolve);
	
	
	/**
	 * @ngdoc object
	 * @name ui.router.util.$templateFactory
	 *
	 * @requires $http
	 * @requires $templateCache
	 * @requires $injector
	 *
	 * @description
	 * Service. Manages loading of templates.
	 */
	$TemplateFactory.$inject = ['$http', '$templateCache', '$injector'];
	function $TemplateFactory(  $http,   $templateCache,   $injector) {
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$templateFactory#fromConfig
	   * @methodOf ui.router.util.$templateFactory
	   *
	   * @description
	   * Creates a template from a configuration object. 
	   *
	   * @param {object} config Configuration object for which to load a template. 
	   * The following properties are search in the specified order, and the first one 
	   * that is defined is used to create the template:
	   *
	   * @param {string|object} config.template html string template or function to 
	   * load via {@link ui.router.util.$templateFactory#fromString fromString}.
	   * @param {string|object} config.templateUrl url to load or a function returning 
	   * the url to load via {@link ui.router.util.$templateFactory#fromUrl fromUrl}.
	   * @param {Function} config.templateProvider function to invoke via 
	   * {@link ui.router.util.$templateFactory#fromProvider fromProvider}.
	   * @param {object} params  Parameters to pass to the template function.
	   * @param {object} locals Locals to pass to `invoke` if the template is loaded 
	   * via a `templateProvider`. Defaults to `{ params: params }`.
	   *
	   * @return {string|object}  The template html as a string, or a promise for 
	   * that string,or `null` if no template is configured.
	   */
	  this.fromConfig = function (config, params, locals) {
	    return (
	      isDefined(config.template) ? this.fromString(config.template, params) :
	      isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl, params) :
	      isDefined(config.templateProvider) ? this.fromProvider(config.templateProvider, params, locals) :
	      null
	    );
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$templateFactory#fromString
	   * @methodOf ui.router.util.$templateFactory
	   *
	   * @description
	   * Creates a template from a string or a function returning a string.
	   *
	   * @param {string|object} template html template as a string or function that 
	   * returns an html template as a string.
	   * @param {object} params Parameters to pass to the template function.
	   *
	   * @return {string|object} The template html as a string, or a promise for that 
	   * string.
	   */
	  this.fromString = function (template, params) {
	    return isFunction(template) ? template(params) : template;
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$templateFactory#fromUrl
	   * @methodOf ui.router.util.$templateFactory
	   * 
	   * @description
	   * Loads a template from the a URL via `$http` and `$templateCache`.
	   *
	   * @param {string|Function} url url of the template to load, or a function 
	   * that returns a url.
	   * @param {Object} params Parameters to pass to the url function.
	   * @return {string|Promise.<string>} The template html as a string, or a promise 
	   * for that string.
	   */
	  this.fromUrl = function (url, params) {
	    if (isFunction(url)) url = url(params);
	    if (url == null) return null;
	    else return $http
	        .get(url, { cache: $templateCache, headers: { Accept: 'text/html' }})
	        .then(function(response) { return response.data; });
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$templateFactory#fromProvider
	   * @methodOf ui.router.util.$templateFactory
	   *
	   * @description
	   * Creates a template by invoking an injectable provider function.
	   *
	   * @param {Function} provider Function to invoke via `$injector.invoke`
	   * @param {Object} params Parameters for the template.
	   * @param {Object} locals Locals to pass to `invoke`. Defaults to 
	   * `{ params: params }`.
	   * @return {string|Promise.<string>} The template html as a string, or a promise 
	   * for that string.
	   */
	  this.fromProvider = function (provider, params, locals) {
	    return $injector.invoke(provider, null, locals || { params: params });
	  };
	}
	
	angular.module('ui.router.util').service('$templateFactory', $TemplateFactory);
	
	var $$UMFP; // reference to $UrlMatcherFactoryProvider
	
	/**
	 * @ngdoc object
	 * @name ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Matches URLs against patterns and extracts named parameters from the path or the search
	 * part of the URL. A URL pattern consists of a path pattern, optionally followed by '?' and a list
	 * of search parameters. Multiple search parameter names are separated by '&'. Search parameters
	 * do not influence whether or not a URL is matched, but their values are passed through into
	 * the matched parameters returned by {@link ui.router.util.type:UrlMatcher#methods_exec exec}.
	 *
	 * Path parameter placeholders can be specified using simple colon/catch-all syntax or curly brace
	 * syntax, which optionally allows a regular expression for the parameter to be specified:
	 *
	 * * `':'` name - colon placeholder
	 * * `'*'` name - catch-all placeholder
	 * * `'{' name '}'` - curly placeholder
	 * * `'{' name ':' regexp|type '}'` - curly placeholder with regexp or type name. Should the
	 *   regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
	 *
	 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
	 * must be unique within the pattern (across both path and search parameters). For colon
	 * placeholders or curly placeholders without an explicit regexp, a path parameter matches any
	 * number of characters other than '/'. For catch-all placeholders the path parameter matches
	 * any number of characters.
	 *
	 * Examples:
	 *
	 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
	 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
	 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
	 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
	 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
	 * * `'/user/{id:[^/]*}'` - Same as the previous example.
	 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
	 *   parameter consists of 1 to 8 hex digits.
	 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
	 *   path into the parameter 'path'.
	 * * `'/files/*path'` - ditto.
	 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
	 *   in the built-in  `date` Type matches `2014-11-12`) and provides a Date object in $stateParams.start
	 *
	 * @param {string} pattern  The pattern to compile into a matcher.
	 * @param {Object} config  A configuration object hash:
	 * @param {Object=} parentMatcher Used to concatenate the pattern/config onto
	 *   an existing UrlMatcher
	 *
	 * * `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
	 * * `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
	 *
	 * @property {string} prefix  A static prefix of this pattern. The matcher guarantees that any
	 *   URL matching this matcher (i.e. any string for which {@link ui.router.util.type:UrlMatcher#methods_exec exec()} returns
	 *   non-null) will start with this prefix.
	 *
	 * @property {string} source  The pattern that was passed into the constructor
	 *
	 * @property {string} sourcePath  The path portion of the source property
	 *
	 * @property {string} sourceSearch  The search portion of the source property
	 *
	 * @property {string} regex  The constructed regex that will be used to match against the url when
	 *   it is time to determine which url will match.
	 *
	 * @returns {Object}  New `UrlMatcher` object
	 */
	function UrlMatcher(pattern, config, parentMatcher) {
	  config = extend({ params: {} }, isObject(config) ? config : {});
	
	  // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
	  //   '*' name
	  //   ':' name
	  //   '{' name '}'
	  //   '{' name ':' regexp '}'
	  // The regular expression is somewhat complicated due to the need to allow curly braces
	  // inside the regular expression. The placeholder regexp breaks down as follows:
	  //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
	  //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
	  //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
	  //    [^{}\\]+                       - anything other than curly braces or backslash
	  //    \\.                            - a backslash escape
	  //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
	  var placeholder       = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
	      searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
	      compiled = '^', last = 0, m,
	      segments = this.segments = [],
	      parentParams = parentMatcher ? parentMatcher.params : {},
	      params = this.params = parentMatcher ? parentMatcher.params.$$new() : new $$UMFP.ParamSet(),
	      paramNames = [];
	
	  function addParameter(id, type, config, location) {
	    paramNames.push(id);
	    if (parentParams[id]) return parentParams[id];
	    if (!/^\w+([-.]+\w+)*(?:\[\])?$/.test(id)) throw new Error("Invalid parameter name '" + id + "' in pattern '" + pattern + "'");
	    if (params[id]) throw new Error("Duplicate parameter name '" + id + "' in pattern '" + pattern + "'");
	    params[id] = new $$UMFP.Param(id, type, config, location);
	    return params[id];
	  }
	
	  function quoteRegExp(string, pattern, squash, optional) {
	    var surroundPattern = ['',''], result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
	    if (!pattern) return result;
	    switch(squash) {
	      case false: surroundPattern = ['(', ')' + (optional ? "?" : "")]; break;
	      case true:
	        result = result.replace(/\/$/, '');
	        surroundPattern = ['(?:\/(', ')|\/)?'];
	      break;
	      default:    surroundPattern = ['(' + squash + "|", ')?']; break;
	    }
	    return result + surroundPattern[0] + pattern + surroundPattern[1];
	  }
	
	  this.source = pattern;
	
	  // Split into static segments separated by path parameter placeholders.
	  // The number of segments is always 1 more than the number of parameters.
	  function matchDetails(m, isSearch) {
	    var id, regexp, segment, type, cfg, arrayMode;
	    id          = m[2] || m[3]; // IE[78] returns '' for unmatched groups instead of null
	    cfg         = config.params[id];
	    segment     = pattern.substring(last, m.index);
	    regexp      = isSearch ? m[4] : m[4] || (m[1] == '*' ? '.*' : null);
	
	    if (regexp) {
	      type      = $$UMFP.type(regexp) || inherit($$UMFP.type("string"), { pattern: new RegExp(regexp, config.caseInsensitive ? 'i' : undefined) });
	    }
	
	    return {
	      id: id, regexp: regexp, segment: segment, type: type, cfg: cfg
	    };
	  }
	
	  var p, param, segment;
	  while ((m = placeholder.exec(pattern))) {
	    p = matchDetails(m, false);
	    if (p.segment.indexOf('?') >= 0) break; // we're into the search part
	
	    param = addParameter(p.id, p.type, p.cfg, "path");
	    compiled += quoteRegExp(p.segment, param.type.pattern.source, param.squash, param.isOptional);
	    segments.push(p.segment);
	    last = placeholder.lastIndex;
	  }
	  segment = pattern.substring(last);
	
	  // Find any search parameter names and remove them from the last segment
	  var i = segment.indexOf('?');
	
	  if (i >= 0) {
	    var search = this.sourceSearch = segment.substring(i);
	    segment = segment.substring(0, i);
	    this.sourcePath = pattern.substring(0, last + i);
	
	    if (search.length > 0) {
	      last = 0;
	      while ((m = searchPlaceholder.exec(search))) {
	        p = matchDetails(m, true);
	        param = addParameter(p.id, p.type, p.cfg, "search");
	        last = placeholder.lastIndex;
	        // check if ?&
	      }
	    }
	  } else {
	    this.sourcePath = pattern;
	    this.sourceSearch = '';
	  }
	
	  compiled += quoteRegExp(segment) + (config.strict === false ? '\/?' : '') + '$';
	  segments.push(segment);
	
	  this.regexp = new RegExp(compiled, config.caseInsensitive ? 'i' : undefined);
	  this.prefix = segments[0];
	  this.$$paramNames = paramNames;
	}
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:UrlMatcher#concat
	 * @methodOf ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Returns a new matcher for a pattern constructed by appending the path part and adding the
	 * search parameters of the specified pattern to this pattern. The current pattern is not
	 * modified. This can be understood as creating a pattern for URLs that are relative to (or
	 * suffixes of) the current pattern.
	 *
	 * @example
	 * The following two matchers are equivalent:
	 * <pre>
	 * new UrlMatcher('/user/{id}?q').concat('/details?date');
	 * new UrlMatcher('/user/{id}/details?q&date');
	 * </pre>
	 *
	 * @param {string} pattern  The pattern to append.
	 * @param {Object} config  An object hash of the configuration for the matcher.
	 * @returns {UrlMatcher}  A matcher for the concatenated pattern.
	 */
	UrlMatcher.prototype.concat = function (pattern, config) {
	  // Because order of search parameters is irrelevant, we can add our own search
	  // parameters to the end of the new pattern. Parse the new pattern by itself
	  // and then join the bits together, but it's much easier to do this on a string level.
	  var defaultConfig = {
	    caseInsensitive: $$UMFP.caseInsensitive(),
	    strict: $$UMFP.strictMode(),
	    squash: $$UMFP.defaultSquashPolicy()
	  };
	  return new UrlMatcher(this.sourcePath + pattern + this.sourceSearch, extend(defaultConfig, config), this);
	};
	
	UrlMatcher.prototype.toString = function () {
	  return this.source;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:UrlMatcher#exec
	 * @methodOf ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Tests the specified path against this matcher, and returns an object containing the captured
	 * parameter values, or null if the path does not match. The returned object contains the values
	 * of any search parameters that are mentioned in the pattern, but their value may be null if
	 * they are not present in `searchParams`. This means that search parameters are always treated
	 * as optional.
	 *
	 * @example
	 * <pre>
	 * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
	 *   x: '1', q: 'hello'
	 * });
	 * // returns { id: 'bob', q: 'hello', r: null }
	 * </pre>
	 *
	 * @param {string} path  The URL path to match, e.g. `$location.path()`.
	 * @param {Object} searchParams  URL search parameters, e.g. `$location.search()`.
	 * @returns {Object}  The captured parameter values.
	 */
	UrlMatcher.prototype.exec = function (path, searchParams) {
	  var m = this.regexp.exec(path);
	  if (!m) return null;
	  searchParams = searchParams || {};
	
	  var paramNames = this.parameters(), nTotal = paramNames.length,
	    nPath = this.segments.length - 1,
	    values = {}, i, j, cfg, paramName;
	
	  if (nPath !== m.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
	
	  function decodePathArray(string) {
	    function reverseString(str) { return str.split("").reverse().join(""); }
	    function unquoteDashes(str) { return str.replace(/\\-/g, "-"); }
	
	    var split = reverseString(string).split(/-(?!\\)/);
	    var allReversed = map(split, reverseString);
	    return map(allReversed, unquoteDashes).reverse();
	  }
	
	  var param, paramVal;
	  for (i = 0; i < nPath; i++) {
	    paramName = paramNames[i];
	    param = this.params[paramName];
	    paramVal = m[i+1];
	    // if the param value matches a pre-replace pair, replace the value before decoding.
	    for (j = 0; j < param.replace.length; j++) {
	      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
	    }
	    if (paramVal && param.array === true) paramVal = decodePathArray(paramVal);
	    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
	    values[paramName] = param.value(paramVal);
	  }
	  for (/**/; i < nTotal; i++) {
	    paramName = paramNames[i];
	    values[paramName] = this.params[paramName].value(searchParams[paramName]);
	    param = this.params[paramName];
	    paramVal = searchParams[paramName];
	    for (j = 0; j < param.replace.length; j++) {
	      if (param.replace[j].from === paramVal) paramVal = param.replace[j].to;
	    }
	    if (isDefined(paramVal)) paramVal = param.type.decode(paramVal);
	    values[paramName] = param.value(paramVal);
	  }
	
	  return values;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:UrlMatcher#parameters
	 * @methodOf ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Returns the names of all path and search parameters of this pattern in an unspecified order.
	 *
	 * @returns {Array.<string>}  An array of parameter names. Must be treated as read-only. If the
	 *    pattern has no parameters, an empty array is returned.
	 */
	UrlMatcher.prototype.parameters = function (param) {
	  if (!isDefined(param)) return this.$$paramNames;
	  return this.params[param] || null;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:UrlMatcher#validates
	 * @methodOf ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Checks an object hash of parameters to validate their correctness according to the parameter
	 * types of this `UrlMatcher`.
	 *
	 * @param {Object} params The object hash of parameters to validate.
	 * @returns {boolean} Returns `true` if `params` validates, otherwise `false`.
	 */
	UrlMatcher.prototype.validates = function (params) {
	  return this.params.$$validates(params);
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:UrlMatcher#format
	 * @methodOf ui.router.util.type:UrlMatcher
	 *
	 * @description
	 * Creates a URL that matches this pattern by substituting the specified values
	 * for the path and search parameters. Null values for path parameters are
	 * treated as empty strings.
	 *
	 * @example
	 * <pre>
	 * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
	 * // returns '/user/bob?q=yes'
	 * </pre>
	 *
	 * @param {Object} values  the values to substitute for the parameters in this pattern.
	 * @returns {string}  the formatted URL (path and optionally search part).
	 */
	UrlMatcher.prototype.format = function (values) {
	  values = values || {};
	  var segments = this.segments, params = this.parameters(), paramset = this.params;
	  if (!this.validates(values)) return null;
	
	  var i, search = false, nPath = segments.length - 1, nTotal = params.length, result = segments[0];
	
	  function encodeDashes(str) { // Replace dashes with encoded "\-"
	    return encodeURIComponent(str).replace(/-/g, function(c) { return '%5C%' + c.charCodeAt(0).toString(16).toUpperCase(); });
	  }
	
	  for (i = 0; i < nTotal; i++) {
	    var isPathParam = i < nPath;
	    var name = params[i], param = paramset[name], value = param.value(values[name]);
	    var isDefaultValue = param.isOptional && param.type.equals(param.value(), value);
	    var squash = isDefaultValue ? param.squash : false;
	    var encoded = param.type.encode(value);
	
	    if (isPathParam) {
	      var nextSegment = segments[i + 1];
	      var isFinalPathParam = i + 1 === nPath;
	
	      if (squash === false) {
	        if (encoded != null) {
	          if (isArray(encoded)) {
	            result += map(encoded, encodeDashes).join("-");
	          } else {
	            result += encodeURIComponent(encoded);
	          }
	        }
	        result += nextSegment;
	      } else if (squash === true) {
	        var capture = result.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
	        result += nextSegment.match(capture)[1];
	      } else if (isString(squash)) {
	        result += squash + nextSegment;
	      }
	
	      if (isFinalPathParam && param.squash === true && result.slice(-1) === '/') result = result.slice(0, -1);
	    } else {
	      if (encoded == null || (isDefaultValue && squash !== false)) continue;
	      if (!isArray(encoded)) encoded = [ encoded ];
	      if (encoded.length === 0) continue;
	      encoded = map(encoded, encodeURIComponent).join('&' + name + '=');
	      result += (search ? '&' : '?') + (name + '=' + encoded);
	      search = true;
	    }
	  }
	
	  return result;
	};
	
	/**
	 * @ngdoc object
	 * @name ui.router.util.type:Type
	 *
	 * @description
	 * Implements an interface to define custom parameter types that can be decoded from and encoded to
	 * string parameters matched in a URL. Used by {@link ui.router.util.type:UrlMatcher `UrlMatcher`}
	 * objects when matching or formatting URLs, or comparing or validating parameter values.
	 *
	 * See {@link ui.router.util.$urlMatcherFactory#methods_type `$urlMatcherFactory#type()`} for more
	 * information on registering custom types.
	 *
	 * @param {Object} config  A configuration object which contains the custom type definition.  The object's
	 *        properties will override the default methods and/or pattern in `Type`'s public interface.
	 * @example
	 * <pre>
	 * {
	 *   decode: function(val) { return parseInt(val, 10); },
	 *   encode: function(val) { return val && val.toString(); },
	 *   equals: function(a, b) { return this.is(a) && a === b; },
	 *   is: function(val) { return angular.isNumber(val) isFinite(val) && val % 1 === 0; },
	 *   pattern: /\d+/
	 * }
	 * </pre>
	 *
	 * @property {RegExp} pattern The regular expression pattern used to match values of this type when
	 *           coming from a substring of a URL.
	 *
	 * @returns {Object}  Returns a new `Type` object.
	 */
	function Type(config) {
	  extend(this, config);
	}
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:Type#is
	 * @methodOf ui.router.util.type:Type
	 *
	 * @description
	 * Detects whether a value is of a particular type. Accepts a native (decoded) value
	 * and determines whether it matches the current `Type` object.
	 *
	 * @param {*} val  The value to check.
	 * @param {string} key  Optional. If the type check is happening in the context of a specific
	 *        {@link ui.router.util.type:UrlMatcher `UrlMatcher`} object, this is the name of the
	 *        parameter in which `val` is stored. Can be used for meta-programming of `Type` objects.
	 * @returns {Boolean}  Returns `true` if the value matches the type, otherwise `false`.
	 */
	Type.prototype.is = function(val, key) {
	  return true;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:Type#encode
	 * @methodOf ui.router.util.type:Type
	 *
	 * @description
	 * Encodes a custom/native type value to a string that can be embedded in a URL. Note that the
	 * return value does *not* need to be URL-safe (i.e. passed through `encodeURIComponent()`), it
	 * only needs to be a representation of `val` that has been coerced to a string.
	 *
	 * @param {*} val  The value to encode.
	 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
	 *        meta-programming of `Type` objects.
	 * @returns {string}  Returns a string representation of `val` that can be encoded in a URL.
	 */
	Type.prototype.encode = function(val, key) {
	  return val;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:Type#decode
	 * @methodOf ui.router.util.type:Type
	 *
	 * @description
	 * Converts a parameter value (from URL string or transition param) to a custom/native value.
	 *
	 * @param {string} val  The URL parameter value to decode.
	 * @param {string} key  The name of the parameter in which `val` is stored. Can be used for
	 *        meta-programming of `Type` objects.
	 * @returns {*}  Returns a custom representation of the URL parameter value.
	 */
	Type.prototype.decode = function(val, key) {
	  return val;
	};
	
	/**
	 * @ngdoc function
	 * @name ui.router.util.type:Type#equals
	 * @methodOf ui.router.util.type:Type
	 *
	 * @description
	 * Determines whether two decoded values are equivalent.
	 *
	 * @param {*} a  A value to compare against.
	 * @param {*} b  A value to compare against.
	 * @returns {Boolean}  Returns `true` if the values are equivalent/equal, otherwise `false`.
	 */
	Type.prototype.equals = function(a, b) {
	  return a == b;
	};
	
	Type.prototype.$subPattern = function() {
	  var sub = this.pattern.toString();
	  return sub.substr(1, sub.length - 2);
	};
	
	Type.prototype.pattern = /.*/;
	
	Type.prototype.toString = function() { return "{Type:" + this.name + "}"; };
	
	/** Given an encoded string, or a decoded object, returns a decoded object */
	Type.prototype.$normalize = function(val) {
	  return this.is(val) ? val : this.decode(val);
	};
	
	/*
	 * Wraps an existing custom Type as an array of Type, depending on 'mode'.
	 * e.g.:
	 * - urlmatcher pattern "/path?{queryParam[]:int}"
	 * - url: "/path?queryParam=1&queryParam=2
	 * - $stateParams.queryParam will be [1, 2]
	 * if `mode` is "auto", then
	 * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
	 * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
	 */
	Type.prototype.$asArray = function(mode, isSearch) {
	  if (!mode) return this;
	  if (mode === "auto" && !isSearch) throw new Error("'auto' array mode is for query parameters only");
	
	  function ArrayType(type, mode) {
	    function bindTo(type, callbackName) {
	      return function() {
	        return type[callbackName].apply(type, arguments);
	      };
	    }
	
	    // Wrap non-array value as array
	    function arrayWrap(val) { return isArray(val) ? val : (isDefined(val) ? [ val ] : []); }
	    // Unwrap array value for "auto" mode. Return undefined for empty array.
	    function arrayUnwrap(val) {
	      switch(val.length) {
	        case 0: return undefined;
	        case 1: return mode === "auto" ? val[0] : val;
	        default: return val;
	      }
	    }
	    function falsey(val) { return !val; }
	
	    // Wraps type (.is/.encode/.decode) functions to operate on each value of an array
	    function arrayHandler(callback, allTruthyMode) {
	      return function handleArray(val) {
	        if (isArray(val) && val.length === 0) return val;
	        val = arrayWrap(val);
	        var result = map(val, callback);
	        if (allTruthyMode === true)
	          return filter(result, falsey).length === 0;
	        return arrayUnwrap(result);
	      };
	    }
	
	    // Wraps type (.equals) functions to operate on each value of an array
	    function arrayEqualsHandler(callback) {
	      return function handleArray(val1, val2) {
	        var left = arrayWrap(val1), right = arrayWrap(val2);
	        if (left.length !== right.length) return false;
	        for (var i = 0; i < left.length; i++) {
	          if (!callback(left[i], right[i])) return false;
	        }
	        return true;
	      };
	    }
	
	    this.encode = arrayHandler(bindTo(type, 'encode'));
	    this.decode = arrayHandler(bindTo(type, 'decode'));
	    this.is     = arrayHandler(bindTo(type, 'is'), true);
	    this.equals = arrayEqualsHandler(bindTo(type, 'equals'));
	    this.pattern = type.pattern;
	    this.$normalize = arrayHandler(bindTo(type, '$normalize'));
	    this.name = type.name;
	    this.$arrayMode = mode;
	  }
	
	  return new ArrayType(this, mode);
	};
	
	
	
	/**
	 * @ngdoc object
	 * @name ui.router.util.$urlMatcherFactory
	 *
	 * @description
	 * Factory for {@link ui.router.util.type:UrlMatcher `UrlMatcher`} instances. The factory
	 * is also available to providers under the name `$urlMatcherFactoryProvider`.
	 */
	function $UrlMatcherFactory() {
	  $$UMFP = this;
	
	  var isCaseInsensitive = false, isStrictMode = true, defaultSquashPolicy = false;
	
	  // Use tildes to pre-encode slashes.
	  // If the slashes are simply URLEncoded, the browser can choose to pre-decode them,
	  // and bidirectional encoding/decoding fails.
	  // Tilde was chosen because it's not a RFC 3986 section 2.2 Reserved Character
	  function valToString(val) { return val != null ? val.toString().replace(/(~|\/)/g, function (m) { return {'~':'~~', '/':'~2F'}[m]; }) : val; }
	  function valFromString(val) { return val != null ? val.toString().replace(/(~~|~2F)/g, function (m) { return {'~~':'~', '~2F':'/'}[m]; }) : val; }
	
	  var $types = {}, enqueue = true, typeQueue = [], injector, defaultTypes = {
	    "string": {
	      encode: valToString,
	      decode: valFromString,
	      // TODO: in 1.0, make string .is() return false if value is undefined/null by default.
	      // In 0.2.x, string params are optional by default for backwards compat
	      is: function(val) { return val == null || !isDefined(val) || typeof val === "string"; },
	      pattern: /[^/]*/
	    },
	    "int": {
	      encode: valToString,
	      decode: function(val) { return parseInt(val, 10); },
	      is: function(val) { return isDefined(val) && this.decode(val.toString()) === val; },
	      pattern: /\d+/
	    },
	    "bool": {
	      encode: function(val) { return val ? 1 : 0; },
	      decode: function(val) { return parseInt(val, 10) !== 0; },
	      is: function(val) { return val === true || val === false; },
	      pattern: /0|1/
	    },
	    "date": {
	      encode: function (val) {
	        if (!this.is(val))
	          return undefined;
	        return [ val.getFullYear(),
	          ('0' + (val.getMonth() + 1)).slice(-2),
	          ('0' + val.getDate()).slice(-2)
	        ].join("-");
	      },
	      decode: function (val) {
	        if (this.is(val)) return val;
	        var match = this.capture.exec(val);
	        return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
	      },
	      is: function(val) { return val instanceof Date && !isNaN(val.valueOf()); },
	      equals: function (a, b) { return this.is(a) && this.is(b) && a.toISOString() === b.toISOString(); },
	      pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
	      capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
	    },
	    "json": {
	      encode: angular.toJson,
	      decode: angular.fromJson,
	      is: angular.isObject,
	      equals: angular.equals,
	      pattern: /[^/]*/
	    },
	    "any": { // does not encode/decode
	      encode: angular.identity,
	      decode: angular.identity,
	      equals: angular.equals,
	      pattern: /.*/
	    }
	  };
	
	  function getDefaultConfig() {
	    return {
	      strict: isStrictMode,
	      caseInsensitive: isCaseInsensitive
	    };
	  }
	
	  function isInjectable(value) {
	    return (isFunction(value) || (isArray(value) && isFunction(value[value.length - 1])));
	  }
	
	  /**
	   * [Internal] Get the default value of a parameter, which may be an injectable function.
	   */
	  $UrlMatcherFactory.$$getDefaultValue = function(config) {
	    if (!isInjectable(config.value)) return config.value;
	    if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
	    return injector.invoke(config.value);
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#caseInsensitive
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Defines whether URL matching should be case sensitive (the default behavior), or not.
	   *
	   * @param {boolean} value `false` to match URL in a case sensitive manner; otherwise `true`;
	   * @returns {boolean} the current value of caseInsensitive
	   */
	  this.caseInsensitive = function(value) {
	    if (isDefined(value))
	      isCaseInsensitive = value;
	    return isCaseInsensitive;
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#strictMode
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Defines whether URLs should match trailing slashes, or not (the default behavior).
	   *
	   * @param {boolean=} value `false` to match trailing slashes in URLs, otherwise `true`.
	   * @returns {boolean} the current value of strictMode
	   */
	  this.strictMode = function(value) {
	    if (isDefined(value))
	      isStrictMode = value;
	    return isStrictMode;
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#defaultSquashPolicy
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Sets the default behavior when generating or matching URLs with default parameter values.
	   *
	   * @param {string} value A string that defines the default parameter URL squashing behavior.
	   *    `nosquash`: When generating an href with a default parameter value, do not squash the parameter value from the URL
	   *    `slash`: When generating an href with a default parameter value, squash (remove) the parameter value, and, if the
	   *             parameter is surrounded by slashes, squash (remove) one slash from the URL
	   *    any other string, e.g. "~": When generating an href with a default parameter value, squash (remove)
	   *             the parameter value from the URL and replace it with this string.
	   */
	  this.defaultSquashPolicy = function(value) {
	    if (!isDefined(value)) return defaultSquashPolicy;
	    if (value !== true && value !== false && !isString(value))
	      throw new Error("Invalid squash policy: " + value + ". Valid policies: false, true, arbitrary-string");
	    defaultSquashPolicy = value;
	    return value;
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#compile
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Creates a {@link ui.router.util.type:UrlMatcher `UrlMatcher`} for the specified pattern.
	   *
	   * @param {string} pattern  The URL pattern.
	   * @param {Object} config  The config object hash.
	   * @returns {UrlMatcher}  The UrlMatcher.
	   */
	  this.compile = function (pattern, config) {
	    return new UrlMatcher(pattern, extend(getDefaultConfig(), config));
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#isMatcher
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Returns true if the specified object is a `UrlMatcher`, or false otherwise.
	   *
	   * @param {Object} object  The object to perform the type check against.
	   * @returns {Boolean}  Returns `true` if the object matches the `UrlMatcher` interface, by
	   *          implementing all the same methods.
	   */
	  this.isMatcher = function (o) {
	    if (!isObject(o)) return false;
	    var result = true;
	
	    forEach(UrlMatcher.prototype, function(val, name) {
	      if (isFunction(val)) {
	        result = result && (isDefined(o[name]) && isFunction(o[name]));
	      }
	    });
	    return result;
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.util.$urlMatcherFactory#type
	   * @methodOf ui.router.util.$urlMatcherFactory
	   *
	   * @description
	   * Registers a custom {@link ui.router.util.type:Type `Type`} object that can be used to
	   * generate URLs with typed parameters.
	   *
	   * @param {string} name  The type name.
	   * @param {Object|Function} definition   The type definition. See
	   *        {@link ui.router.util.type:Type `Type`} for information on the values accepted.
	   * @param {Object|Function} definitionFn (optional) A function that is injected before the app
	   *        runtime starts.  The result of this function is merged into the existing `definition`.
	   *        See {@link ui.router.util.type:Type `Type`} for information on the values accepted.
	   *
	   * @returns {Object}  Returns `$urlMatcherFactoryProvider`.
	   *
	   * @example
	   * This is a simple example of a custom type that encodes and decodes items from an
	   * array, using the array index as the URL-encoded value:
	   *
	   * <pre>
	   * var list = ['John', 'Paul', 'George', 'Ringo'];
	   *
	   * $urlMatcherFactoryProvider.type('listItem', {
	   *   encode: function(item) {
	   *     // Represent the list item in the URL using its corresponding index
	   *     return list.indexOf(item);
	   *   },
	   *   decode: function(item) {
	   *     // Look up the list item by index
	   *     return list[parseInt(item, 10)];
	   *   },
	   *   is: function(item) {
	   *     // Ensure the item is valid by checking to see that it appears
	   *     // in the list
	   *     return list.indexOf(item) > -1;
	   *   }
	   * });
	   *
	   * $stateProvider.state('list', {
	   *   url: "/list/{item:listItem}",
	   *   controller: function($scope, $stateParams) {
	   *     console.log($stateParams.item);
	   *   }
	   * });
	   *
	   * // ...
	   *
	   * // Changes URL to '/list/3', logs "Ringo" to the console
	   * $state.go('list', { item: "Ringo" });
	   * </pre>
	   *
	   * This is a more complex example of a type that relies on dependency injection to
	   * interact with services, and uses the parameter name from the URL to infer how to
	   * handle encoding and decoding parameter values:
	   *
	   * <pre>
	   * // Defines a custom type that gets a value from a service,
	   * // where each service gets different types of values from
	   * // a backend API:
	   * $urlMatcherFactoryProvider.type('dbObject', {}, function(Users, Posts) {
	   *
	   *   // Matches up services to URL parameter names
	   *   var services = {
	   *     user: Users,
	   *     post: Posts
	   *   };
	   *
	   *   return {
	   *     encode: function(object) {
	   *       // Represent the object in the URL using its unique ID
	   *       return object.id;
	   *     },
	   *     decode: function(value, key) {
	   *       // Look up the object by ID, using the parameter
	   *       // name (key) to call the correct service
	   *       return services[key].findById(value);
	   *     },
	   *     is: function(object, key) {
	   *       // Check that object is a valid dbObject
	   *       return angular.isObject(object) && object.id && services[key];
	   *     }
	   *     equals: function(a, b) {
	   *       // Check the equality of decoded objects by comparing
	   *       // their unique IDs
	   *       return a.id === b.id;
	   *     }
	   *   };
	   * });
	   *
	   * // In a config() block, you can then attach URLs with
	   * // type-annotated parameters:
	   * $stateProvider.state('users', {
	   *   url: "/users",
	   *   // ...
	   * }).state('users.item', {
	   *   url: "/{user:dbObject}",
	   *   controller: function($scope, $stateParams) {
	   *     // $stateParams.user will now be an object returned from
	   *     // the Users service
	   *   },
	   *   // ...
	   * });
	   * </pre>
	   */
	  this.type = function (name, definition, definitionFn) {
	    if (!isDefined(definition)) return $types[name];
	    if ($types.hasOwnProperty(name)) throw new Error("A type named '" + name + "' has already been defined.");
	
	    $types[name] = new Type(extend({ name: name }, definition));
	    if (definitionFn) {
	      typeQueue.push({ name: name, def: definitionFn });
	      if (!enqueue) flushTypeQueue();
	    }
	    return this;
	  };
	
	  // `flushTypeQueue()` waits until `$urlMatcherFactory` is injected before invoking the queued `definitionFn`s
	  function flushTypeQueue() {
	    while(typeQueue.length) {
	      var type = typeQueue.shift();
	      if (type.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
	      angular.extend($types[type.name], injector.invoke(type.def));
	    }
	  }
	
	  // Register default types. Store them in the prototype of $types.
	  forEach(defaultTypes, function(type, name) { $types[name] = new Type(extend({name: name}, type)); });
	  $types = inherit($types, {});
	
	  /* No need to document $get, since it returns this */
	  this.$get = ['$injector', function ($injector) {
	    injector = $injector;
	    enqueue = false;
	    flushTypeQueue();
	
	    forEach(defaultTypes, function(type, name) {
	      if (!$types[name]) $types[name] = new Type(type);
	    });
	    return this;
	  }];
	
	  this.Param = function Param(id, type, config, location) {
	    var self = this;
	    config = unwrapShorthand(config);
	    type = getType(config, type, location);
	    var arrayMode = getArrayMode();
	    type = arrayMode ? type.$asArray(arrayMode, location === "search") : type;
	    if (type.name === "string" && !arrayMode && location === "path" && config.value === undefined)
	      config.value = ""; // for 0.2.x; in 0.3.0+ do not automatically default to ""
	    var isOptional = config.value !== undefined;
	    var squash = getSquashPolicy(config, isOptional);
	    var replace = getReplace(config, arrayMode, isOptional, squash);
	
	    function unwrapShorthand(config) {
	      var keys = isObject(config) ? objectKeys(config) : [];
	      var isShorthand = indexOf(keys, "value") === -1 && indexOf(keys, "type") === -1 &&
	                        indexOf(keys, "squash") === -1 && indexOf(keys, "array") === -1;
	      if (isShorthand) config = { value: config };
	      config.$$fn = isInjectable(config.value) ? config.value : function () { return config.value; };
	      return config;
	    }
	
	    function getType(config, urlType, location) {
	      if (config.type && urlType) throw new Error("Param '"+id+"' has two type configurations.");
	      if (urlType) return urlType;
	      if (!config.type) return (location === "config" ? $types.any : $types.string);
	
	      if (angular.isString(config.type))
	        return $types[config.type];
	      if (config.type instanceof Type)
	        return config.type;
	      return new Type(config.type);
	    }
	
	    // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
	    function getArrayMode() {
	      var arrayDefaults = { array: (location === "search" ? "auto" : false) };
	      var arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
	      return extend(arrayDefaults, arrayParamNomenclature, config).array;
	    }
	
	    /**
	     * returns false, true, or the squash value to indicate the "default parameter url squash policy".
	     */
	    function getSquashPolicy(config, isOptional) {
	      var squash = config.squash;
	      if (!isOptional || squash === false) return false;
	      if (!isDefined(squash) || squash == null) return defaultSquashPolicy;
	      if (squash === true || isString(squash)) return squash;
	      throw new Error("Invalid squash policy: '" + squash + "'. Valid policies: false, true, or arbitrary string");
	    }
	
	    function getReplace(config, arrayMode, isOptional, squash) {
	      var replace, configuredKeys, defaultPolicy = [
	        { from: "",   to: (isOptional || arrayMode ? undefined : "") },
	        { from: null, to: (isOptional || arrayMode ? undefined : "") }
	      ];
	      replace = isArray(config.replace) ? config.replace : [];
	      if (isString(squash))
	        replace.push({ from: squash, to: undefined });
	      configuredKeys = map(replace, function(item) { return item.from; } );
	      return filter(defaultPolicy, function(item) { return indexOf(configuredKeys, item.from) === -1; }).concat(replace);
	    }
	
	    /**
	     * [Internal] Get the default value of a parameter, which may be an injectable function.
	     */
	    function $$getDefaultValue() {
	      if (!injector) throw new Error("Injectable functions cannot be called at configuration time");
	      var defaultValue = injector.invoke(config.$$fn);
	      if (defaultValue !== null && defaultValue !== undefined && !self.type.is(defaultValue))
	        throw new Error("Default value (" + defaultValue + ") for parameter '" + self.id + "' is not an instance of Type (" + self.type.name + ")");
	      return defaultValue;
	    }
	
	    /**
	     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
	     * default value, which may be the result of an injectable function.
	     */
	    function $value(value) {
	      function hasReplaceVal(val) { return function(obj) { return obj.from === val; }; }
	      function $replace(value) {
	        var replacement = map(filter(self.replace, hasReplaceVal(value)), function(obj) { return obj.to; });
	        return replacement.length ? replacement[0] : value;
	      }
	      value = $replace(value);
	      return !isDefined(value) ? $$getDefaultValue() : self.type.$normalize(value);
	    }
	
	    function toString() { return "{Param:" + id + " " + type + " squash: '" + squash + "' optional: " + isOptional + "}"; }
	
	    extend(this, {
	      id: id,
	      type: type,
	      location: location,
	      array: arrayMode,
	      squash: squash,
	      replace: replace,
	      isOptional: isOptional,
	      value: $value,
	      dynamic: undefined,
	      config: config,
	      toString: toString
	    });
	  };
	
	  function ParamSet(params) {
	    extend(this, params || {});
	  }
	
	  ParamSet.prototype = {
	    $$new: function() {
	      return inherit(this, extend(new ParamSet(), { $$parent: this}));
	    },
	    $$keys: function () {
	      var keys = [], chain = [], parent = this,
	        ignore = objectKeys(ParamSet.prototype);
	      while (parent) { chain.push(parent); parent = parent.$$parent; }
	      chain.reverse();
	      forEach(chain, function(paramset) {
	        forEach(objectKeys(paramset), function(key) {
	            if (indexOf(keys, key) === -1 && indexOf(ignore, key) === -1) keys.push(key);
	        });
	      });
	      return keys;
	    },
	    $$values: function(paramValues) {
	      var values = {}, self = this;
	      forEach(self.$$keys(), function(key) {
	        values[key] = self[key].value(paramValues && paramValues[key]);
	      });
	      return values;
	    },
	    $$equals: function(paramValues1, paramValues2) {
	      var equal = true, self = this;
	      forEach(self.$$keys(), function(key) {
	        var left = paramValues1 && paramValues1[key], right = paramValues2 && paramValues2[key];
	        if (!self[key].type.equals(left, right)) equal = false;
	      });
	      return equal;
	    },
	    $$validates: function $$validate(paramValues) {
	      var keys = this.$$keys(), i, param, rawVal, normalized, encoded;
	      for (i = 0; i < keys.length; i++) {
	        param = this[keys[i]];
	        rawVal = paramValues[keys[i]];
	        if ((rawVal === undefined || rawVal === null) && param.isOptional)
	          break; // There was no parameter value, but the param is optional
	        normalized = param.type.$normalize(rawVal);
	        if (!param.type.is(normalized))
	          return false; // The value was not of the correct Type, and could not be decoded to the correct Type
	        encoded = param.type.encode(normalized);
	        if (angular.isString(encoded) && !param.type.pattern.exec(encoded))
	          return false; // The value was of the correct type, but when encoded, did not match the Type's regexp
	      }
	      return true;
	    },
	    $$parent: undefined
	  };
	
	  this.ParamSet = ParamSet;
	}
	
	// Register as a provider so it's available to other providers
	angular.module('ui.router.util').provider('$urlMatcherFactory', $UrlMatcherFactory);
	angular.module('ui.router.util').run(['$urlMatcherFactory', function($urlMatcherFactory) { }]);
	
	/**
	 * @ngdoc object
	 * @name ui.router.router.$urlRouterProvider
	 *
	 * @requires ui.router.util.$urlMatcherFactoryProvider
	 * @requires $locationProvider
	 *
	 * @description
	 * `$urlRouterProvider` has the responsibility of watching `$location`. 
	 * When `$location` changes it runs through a list of rules one by one until a 
	 * match is found. `$urlRouterProvider` is used behind the scenes anytime you specify 
	 * a url in a state configuration. All urls are compiled into a UrlMatcher object.
	 *
	 * There are several methods on `$urlRouterProvider` that make it useful to use directly
	 * in your module config.
	 */
	$UrlRouterProvider.$inject = ['$locationProvider', '$urlMatcherFactoryProvider'];
	function $UrlRouterProvider(   $locationProvider,   $urlMatcherFactory) {
	  var rules = [], otherwise = null, interceptDeferred = false, listener;
	
	  // Returns a string that is a prefix of all strings matching the RegExp
	  function regExpPrefix(re) {
	    var prefix = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);
	    return (prefix != null) ? prefix[1].replace(/\\(.)/g, "$1") : '';
	  }
	
	  // Interpolates matched values into a String.replace()-style pattern
	  function interpolate(pattern, match) {
	    return pattern.replace(/\$(\$|\d{1,2})/, function (m, what) {
	      return match[what === '$' ? 0 : Number(what)];
	    });
	  }
	
	  /**
	   * @ngdoc function
	   * @name ui.router.router.$urlRouterProvider#rule
	   * @methodOf ui.router.router.$urlRouterProvider
	   *
	   * @description
	   * Defines rules that are used by `$urlRouterProvider` to find matches for
	   * specific URLs.
	   *
	   * @example
	   * <pre>
	   * var app = angular.module('app', ['ui.router.router']);
	   *
	   * app.config(function ($urlRouterProvider) {
	   *   // Here's an example of how you might allow case insensitive urls
	   *   $urlRouterProvider.rule(function ($injector, $location) {
	   *     var path = $location.path(),
	   *         normalized = path.toLowerCase();
	   *
	   *     if (path !== normalized) {
	   *       return normalized;
	   *     }
	   *   });
	   * });
	   * </pre>
	   *
	   * @param {function} rule Handler function that takes `$injector` and `$location`
	   * services as arguments. You can use them to return a valid path as a string.
	   *
	   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	   */
	  this.rule = function (rule) {
	    if (!isFunction(rule)) throw new Error("'rule' must be a function");
	    rules.push(rule);
	    return this;
	  };
	
	  /**
	   * @ngdoc object
	   * @name ui.router.router.$urlRouterProvider#otherwise
	   * @methodOf ui.router.router.$urlRouterProvider
	   *
	   * @description
	   * Defines a path that is used when an invalid route is requested.
	   *
	   * @example
	   * <pre>
	   * var app = angular.module('app', ['ui.router.router']);
	   *
	   * app.config(function ($urlRouterProvider) {
	   *   // if the path doesn't match any of the urls you configured
	   *   // otherwise will take care of routing the user to the
	   *   // specified url
	   *   $urlRouterProvider.otherwise('/index');
	   *
	   *   // Example of using function rule as param
	   *   $urlRouterProvider.otherwise(function ($injector, $location) {
	   *     return '/a/valid/url';
	   *   });
	   * });
	   * </pre>
	   *
	   * @param {string|function} rule The url path you want to redirect to or a function 
	   * rule that returns the url path. The function version is passed two params: 
	   * `$injector` and `$location` services, and must return a url string.
	   *
	   * @return {object} `$urlRouterProvider` - `$urlRouterProvider` instance
	   */
	  this.otherwise = function (rule) {
	    if (isString(rule)) {
	      var redirect = rule;
	      rule = function () { return redirect; };
	    }
	    else if (!isFunction(rule)) throw new Error("'rule' must be a function");
	    otherwise = rule;
	    return this;
	  };
	
	
	  function handleIfMatch($injector, handler, match) {
	    if (!match) return false;
	    var result = $injector.invoke(handler, handler, { $match: match });
	    return isDefined(result) ? result : true;
	  }
	
	  /**
	   * @ngdoc function
	   * @name ui.router.router.$urlRouterProvider#when
	   * @methodOf ui.router.router.$urlRouterProvider
	   *
	   * @description
	   * Registers a handler for a given url matching. 
	   * 
	   * If the handler is a string, it is
	   * treated as a redirect, and is interpolated according to the syntax of match
	   * (i.e. like `String.replace()` for `RegExp`, or like a `UrlMatcher` pattern otherwise).
	   *
	   * If the handler is a function, it is injectable. It gets invoked if `$location`
	   * matches. You have the option of inject the match object as `$match`.
	   *
	   * The handler can return
	   *
	   * - **falsy** to indicate that the rule didn't match after all, then `$urlRouter`
	   *   will continue trying to find another one that matches.
	   * - **string** which is treated as a redirect and passed to `$location.url()`
	   * - **void** or any **truthy** value tells `$urlRouter` that the url was handled.
	   *
	   * @example
	   * <pre>
	   * var app = angular.module('app', ['ui.router.router']);
	   *
	   * app.config(function ($urlRouterProvider) {
	   *   $urlRouterProvider.when($state.url, function ($match, $stateParams) {
	   *     if ($state.$current.navigable !== state ||
	   *         !equalForKeys($match, $stateParams) {
	   *      $state.transitionTo(state, $match, false);
	   *     }
	   *   });
	   * });
	   * </pre>
	   *
	   * @param {string|object} what The incoming path that you want to redirect.
	   * @param {string|function} handler The path you want to redirect your user to.
	   */
	  this.when = function (what, handler) {
	    var redirect, handlerIsString = isString(handler);
	    if (isString(what)) what = $urlMatcherFactory.compile(what);
	
	    if (!handlerIsString && !isFunction(handler) && !isArray(handler))
	      throw new Error("invalid 'handler' in when()");
	
	    var strategies = {
	      matcher: function (what, handler) {
	        if (handlerIsString) {
	          redirect = $urlMatcherFactory.compile(handler);
	          handler = ['$match', function ($match) { return redirect.format($match); }];
	        }
	        return extend(function ($injector, $location) {
	          return handleIfMatch($injector, handler, what.exec($location.path(), $location.search()));
	        }, {
	          prefix: isString(what.prefix) ? what.prefix : ''
	        });
	      },
	      regex: function (what, handler) {
	        if (what.global || what.sticky) throw new Error("when() RegExp must not be global or sticky");
	
	        if (handlerIsString) {
	          redirect = handler;
	          handler = ['$match', function ($match) { return interpolate(redirect, $match); }];
	        }
	        return extend(function ($injector, $location) {
	          return handleIfMatch($injector, handler, what.exec($location.path()));
	        }, {
	          prefix: regExpPrefix(what)
	        });
	      }
	    };
	
	    var check = { matcher: $urlMatcherFactory.isMatcher(what), regex: what instanceof RegExp };
	
	    for (var n in check) {
	      if (check[n]) return this.rule(strategies[n](what, handler));
	    }
	
	    throw new Error("invalid 'what' in when()");
	  };
	
	  /**
	   * @ngdoc function
	   * @name ui.router.router.$urlRouterProvider#deferIntercept
	   * @methodOf ui.router.router.$urlRouterProvider
	   *
	   * @description
	   * Disables (or enables) deferring location change interception.
	   *
	   * If you wish to customize the behavior of syncing the URL (for example, if you wish to
	   * defer a transition but maintain the current URL), call this method at configuration time.
	   * Then, at run time, call `$urlRouter.listen()` after you have configured your own
	   * `$locationChangeSuccess` event handler.
	   *
	   * @example
	   * <pre>
	   * var app = angular.module('app', ['ui.router.router']);
	   *
	   * app.config(function ($urlRouterProvider) {
	   *
	   *   // Prevent $urlRouter from automatically intercepting URL changes;
	   *   // this allows you to configure custom behavior in between
	   *   // location changes and route synchronization:
	   *   $urlRouterProvider.deferIntercept();
	   *
	   * }).run(function ($rootScope, $urlRouter, UserService) {
	   *
	   *   $rootScope.$on('$locationChangeSuccess', function(e) {
	   *     // UserService is an example service for managing user state
	   *     if (UserService.isLoggedIn()) return;
	   *
	   *     // Prevent $urlRouter's default handler from firing
	   *     e.preventDefault();
	   *
	   *     UserService.handleLogin().then(function() {
	   *       // Once the user has logged in, sync the current URL
	   *       // to the router:
	   *       $urlRouter.sync();
	   *     });
	   *   });
	   *
	   *   // Configures $urlRouter's listener *after* your custom listener
	   *   $urlRouter.listen();
	   * });
	   * </pre>
	   *
	   * @param {boolean} defer Indicates whether to defer location change interception. Passing
	            no parameter is equivalent to `true`.
	   */
	  this.deferIntercept = function (defer) {
	    if (defer === undefined) defer = true;
	    interceptDeferred = defer;
	  };
	
	  /**
	   * @ngdoc object
	   * @name ui.router.router.$urlRouter
	   *
	   * @requires $location
	   * @requires $rootScope
	   * @requires $injector
	   * @requires $browser
	   *
	   * @description
	   *
	   */
	  this.$get = $get;
	  $get.$inject = ['$location', '$rootScope', '$injector', '$browser', '$sniffer'];
	  function $get(   $location,   $rootScope,   $injector,   $browser,   $sniffer) {
	
	    var baseHref = $browser.baseHref(), location = $location.url(), lastPushedUrl;
	
	    function appendBasePath(url, isHtml5, absolute) {
	      if (baseHref === '/') return url;
	      if (isHtml5) return baseHref.slice(0, -1) + url;
	      if (absolute) return baseHref.slice(1) + url;
	      return url;
	    }
	
	    // TODO: Optimize groups of rules with non-empty prefix into some sort of decision tree
	    function update(evt) {
	      if (evt && evt.defaultPrevented) return;
	      var ignoreUpdate = lastPushedUrl && $location.url() === lastPushedUrl;
	      lastPushedUrl = undefined;
	      // TODO: Re-implement this in 1.0 for https://github.com/angular-ui/ui-router/issues/1573
	      //if (ignoreUpdate) return true;
	
	      function check(rule) {
	        var handled = rule($injector, $location);
	
	        if (!handled) return false;
	        if (isString(handled)) $location.replace().url(handled);
	        return true;
	      }
	      var n = rules.length, i;
	
	      for (i = 0; i < n; i++) {
	        if (check(rules[i])) return;
	      }
	      // always check otherwise last to allow dynamic updates to the set of rules
	      if (otherwise) check(otherwise);
	    }
	
	    function listen() {
	      listener = listener || $rootScope.$on('$locationChangeSuccess', update);
	      return listener;
	    }
	
	    if (!interceptDeferred) listen();
	
	    return {
	      /**
	       * @ngdoc function
	       * @name ui.router.router.$urlRouter#sync
	       * @methodOf ui.router.router.$urlRouter
	       *
	       * @description
	       * Triggers an update; the same update that happens when the address bar url changes, aka `$locationChangeSuccess`.
	       * This method is useful when you need to use `preventDefault()` on the `$locationChangeSuccess` event,
	       * perform some custom logic (route protection, auth, config, redirection, etc) and then finally proceed
	       * with the transition by calling `$urlRouter.sync()`.
	       *
	       * @example
	       * <pre>
	       * angular.module('app', ['ui.router'])
	       *   .run(function($rootScope, $urlRouter) {
	       *     $rootScope.$on('$locationChangeSuccess', function(evt) {
	       *       // Halt state change from even starting
	       *       evt.preventDefault();
	       *       // Perform custom logic
	       *       var meetsRequirement = ...
	       *       // Continue with the update and state transition if logic allows
	       *       if (meetsRequirement) $urlRouter.sync();
	       *     });
	       * });
	       * </pre>
	       */
	      sync: function() {
	        update();
	      },
	
	      listen: function() {
	        return listen();
	      },
	
	      update: function(read) {
	        if (read) {
	          location = $location.url();
	          return;
	        }
	        if ($location.url() === location) return;
	
	        $location.url(location);
	        $location.replace();
	      },
	
	      push: function(urlMatcher, params, options) {
	         var url = urlMatcher.format(params || {});
	
	        // Handle the special hash param, if needed
	        if (url !== null && params && params['#']) {
	            url += '#' + params['#'];
	        }
	
	        $location.url(url);
	        lastPushedUrl = options && options.$$avoidResync ? $location.url() : undefined;
	        if (options && options.replace) $location.replace();
	      },
	
	      /**
	       * @ngdoc function
	       * @name ui.router.router.$urlRouter#href
	       * @methodOf ui.router.router.$urlRouter
	       *
	       * @description
	       * A URL generation method that returns the compiled URL for a given
	       * {@link ui.router.util.type:UrlMatcher `UrlMatcher`}, populated with the provided parameters.
	       *
	       * @example
	       * <pre>
	       * $bob = $urlRouter.href(new UrlMatcher("/about/:person"), {
	       *   person: "bob"
	       * });
	       * // $bob == "/about/bob";
	       * </pre>
	       *
	       * @param {UrlMatcher} urlMatcher The `UrlMatcher` object which is used as the template of the URL to generate.
	       * @param {object=} params An object of parameter values to fill the matcher's required parameters.
	       * @param {object=} options Options object. The options are:
	       *
	       * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	       *
	       * @returns {string} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
	       */
	      href: function(urlMatcher, params, options) {
	        if (!urlMatcher.validates(params)) return null;
	
	        var isHtml5 = $locationProvider.html5Mode();
	        if (angular.isObject(isHtml5)) {
	          isHtml5 = isHtml5.enabled;
	        }
	
	        isHtml5 = isHtml5 && $sniffer.history;
	        
	        var url = urlMatcher.format(params);
	        options = options || {};
	
	        if (!isHtml5 && url !== null) {
	          url = "#" + $locationProvider.hashPrefix() + url;
	        }
	
	        // Handle special hash param, if needed
	        if (url !== null && params && params['#']) {
	          url += '#' + params['#'];
	        }
	
	        url = appendBasePath(url, isHtml5, options.absolute);
	
	        if (!options.absolute || !url) {
	          return url;
	        }
	
	        var slash = (!isHtml5 && url ? '/' : ''), port = $location.port();
	        port = (port === 80 || port === 443 ? '' : ':' + port);
	
	        return [$location.protocol(), '://', $location.host(), port, slash, url].join('');
	      }
	    };
	  }
	}
	
	angular.module('ui.router.router').provider('$urlRouter', $UrlRouterProvider);
	
	/**
	 * @ngdoc object
	 * @name ui.router.state.$stateProvider
	 *
	 * @requires ui.router.router.$urlRouterProvider
	 * @requires ui.router.util.$urlMatcherFactoryProvider
	 *
	 * @description
	 * The new `$stateProvider` works similar to Angular's v1 router, but it focuses purely
	 * on state.
	 *
	 * A state corresponds to a "place" in the application in terms of the overall UI and
	 * navigation. A state describes (via the controller / template / view properties) what
	 * the UI looks like and does at that place.
	 *
	 * States often have things in common, and the primary way of factoring out these
	 * commonalities in this model is via the state hierarchy, i.e. parent/child states aka
	 * nested states.
	 *
	 * The `$stateProvider` provides interfaces to declare these states for your app.
	 */
	$StateProvider.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider'];
	function $StateProvider(   $urlRouterProvider,   $urlMatcherFactory) {
	
	  var root, states = {}, $state, queue = {}, abstractKey = 'abstract';
	
	  // Builds state properties from definition passed to registerState()
	  var stateBuilder = {
	
	    // Derive parent state from a hierarchical name only if 'parent' is not explicitly defined.
	    // state.children = [];
	    // if (parent) parent.children.push(state);
	    parent: function(state) {
	      if (isDefined(state.parent) && state.parent) return findState(state.parent);
	      // regex matches any valid composite state name
	      // would match "contact.list" but not "contacts"
	      var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
	      return compositeName ? findState(compositeName[1]) : root;
	    },
	
	    // inherit 'data' from parent and override by own values (if any)
	    data: function(state) {
	      if (state.parent && state.parent.data) {
	        state.data = state.self.data = inherit(state.parent.data, state.data);
	      }
	      return state.data;
	    },
	
	    // Build a URLMatcher if necessary, either via a relative or absolute URL
	    url: function(state) {
	      var url = state.url, config = { params: state.params || {} };
	
	      if (isString(url)) {
	        if (url.charAt(0) == '^') return $urlMatcherFactory.compile(url.substring(1), config);
	        return (state.parent.navigable || root).url.concat(url, config);
	      }
	
	      if (!url || $urlMatcherFactory.isMatcher(url)) return url;
	      throw new Error("Invalid url '" + url + "' in state '" + state + "'");
	    },
	
	    // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
	    navigable: function(state) {
	      return state.url ? state : (state.parent ? state.parent.navigable : null);
	    },
	
	    // Own parameters for this state. state.url.params is already built at this point. Create and add non-url params
	    ownParams: function(state) {
	      var params = state.url && state.url.params || new $$UMFP.ParamSet();
	      forEach(state.params || {}, function(config, id) {
	        if (!params[id]) params[id] = new $$UMFP.Param(id, null, config, "config");
	      });
	      return params;
	    },
	
	    // Derive parameters for this state and ensure they're a super-set of parent's parameters
	    params: function(state) {
	      var ownParams = pick(state.ownParams, state.ownParams.$$keys());
	      return state.parent && state.parent.params ? extend(state.parent.params.$$new(), ownParams) : new $$UMFP.ParamSet();
	    },
	
	    // If there is no explicit multi-view configuration, make one up so we don't have
	    // to handle both cases in the view directive later. Note that having an explicit
	    // 'views' property will mean the default unnamed view properties are ignored. This
	    // is also a good time to resolve view names to absolute names, so everything is a
	    // straight lookup at link time.
	    views: function(state) {
	      var views = {};
	
	      forEach(isDefined(state.views) ? state.views : { '': state }, function (view, name) {
	        if (name.indexOf('@') < 0) name += '@' + state.parent.name;
	        view.resolveAs = view.resolveAs || state.resolveAs || '$resolve';
	        views[name] = view;
	      });
	      return views;
	    },
	
	    // Keep a full path from the root down to this state as this is needed for state activation.
	    path: function(state) {
	      return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
	    },
	
	    // Speed up $state.contains() as it's used a lot
	    includes: function(state) {
	      var includes = state.parent ? extend({}, state.parent.includes) : {};
	      includes[state.name] = true;
	      return includes;
	    },
	
	    $delegates: {}
	  };
	
	  function isRelative(stateName) {
	    return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
	  }
	
	  function findState(stateOrName, base) {
	    if (!stateOrName) return undefined;
	
	    var isStr = isString(stateOrName),
	        name  = isStr ? stateOrName : stateOrName.name,
	        path  = isRelative(name);
	
	    if (path) {
	      if (!base) throw new Error("No reference point given for path '"  + name + "'");
	      base = findState(base);
	      
	      var rel = name.split("."), i = 0, pathLength = rel.length, current = base;
	
	      for (; i < pathLength; i++) {
	        if (rel[i] === "" && i === 0) {
	          current = base;
	          continue;
	        }
	        if (rel[i] === "^") {
	          if (!current.parent) throw new Error("Path '" + name + "' not valid for state '" + base.name + "'");
	          current = current.parent;
	          continue;
	        }
	        break;
	      }
	      rel = rel.slice(i).join(".");
	      name = current.name + (current.name && rel ? "." : "") + rel;
	    }
	    var state = states[name];
	
	    if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
	      return state;
	    }
	    return undefined;
	  }
	
	  function queueState(parentName, state) {
	    if (!queue[parentName]) {
	      queue[parentName] = [];
	    }
	    queue[parentName].push(state);
	  }
	
	  function flushQueuedChildren(parentName) {
	    var queued = queue[parentName] || [];
	    while(queued.length) {
	      registerState(queued.shift());
	    }
	  }
	
	  function registerState(state) {
	    // Wrap a new object around the state so we can store our private details easily.
	    state = inherit(state, {
	      self: state,
	      resolve: state.resolve || {},
	      toString: function() { return this.name; }
	    });
	
	    var name = state.name;
	    if (!isString(name) || name.indexOf('@') >= 0) throw new Error("State must have a valid name");
	    if (states.hasOwnProperty(name)) throw new Error("State '" + name + "' is already defined");
	
	    // Get parent name
	    var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
	        : (isString(state.parent)) ? state.parent
	        : (isObject(state.parent) && isString(state.parent.name)) ? state.parent.name
	        : '';
	
	    // If parent is not registered yet, add state to queue and register later
	    if (parentName && !states[parentName]) {
	      return queueState(parentName, state.self);
	    }
	
	    for (var key in stateBuilder) {
	      if (isFunction(stateBuilder[key])) state[key] = stateBuilder[key](state, stateBuilder.$delegates[key]);
	    }
	    states[name] = state;
	
	    // Register the state in the global state list and with $urlRouter if necessary.
	    if (!state[abstractKey] && state.url) {
	      $urlRouterProvider.when(state.url, ['$match', '$stateParams', function ($match, $stateParams) {
	        if ($state.$current.navigable != state || !equalForKeys($match, $stateParams)) {
	          $state.transitionTo(state, $match, { inherit: true, location: false });
	        }
	      }]);
	    }
	
	    // Register any queued children
	    flushQueuedChildren(name);
	
	    return state;
	  }
	
	  // Checks text to see if it looks like a glob.
	  function isGlob (text) {
	    return text.indexOf('*') > -1;
	  }
	
	  // Returns true if glob matches current $state name.
	  function doesStateMatchGlob (glob) {
	    var globSegments = glob.split('.'),
	        segments = $state.$current.name.split('.');
	
	    //match single stars
	    for (var i = 0, l = globSegments.length; i < l; i++) {
	      if (globSegments[i] === '*') {
	        segments[i] = '*';
	      }
	    }
	
	    //match greedy starts
	    if (globSegments[0] === '**') {
	       segments = segments.slice(indexOf(segments, globSegments[1]));
	       segments.unshift('**');
	    }
	    //match greedy ends
	    if (globSegments[globSegments.length - 1] === '**') {
	       segments.splice(indexOf(segments, globSegments[globSegments.length - 2]) + 1, Number.MAX_VALUE);
	       segments.push('**');
	    }
	
	    if (globSegments.length != segments.length) {
	      return false;
	    }
	
	    return segments.join('') === globSegments.join('');
	  }
	
	
	  // Implicit root state that is always active
	  root = registerState({
	    name: '',
	    url: '^',
	    views: null,
	    'abstract': true
	  });
	  root.navigable = null;
	
	
	  /**
	   * @ngdoc function
	   * @name ui.router.state.$stateProvider#decorator
	   * @methodOf ui.router.state.$stateProvider
	   *
	   * @description
	   * Allows you to extend (carefully) or override (at your own peril) the 
	   * `stateBuilder` object used internally by `$stateProvider`. This can be used 
	   * to add custom functionality to ui-router, for example inferring templateUrl 
	   * based on the state name.
	   *
	   * When passing only a name, it returns the current (original or decorated) builder
	   * function that matches `name`.
	   *
	   * The builder functions that can be decorated are listed below. Though not all
	   * necessarily have a good use case for decoration, that is up to you to decide.
	   *
	   * In addition, users can attach custom decorators, which will generate new 
	   * properties within the state's internal definition. There is currently no clear 
	   * use-case for this beyond accessing internal states (i.e. $state.$current), 
	   * however, expect this to become increasingly relevant as we introduce additional 
	   * meta-programming features.
	   *
	   * **Warning**: Decorators should not be interdependent because the order of 
	   * execution of the builder functions in non-deterministic. Builder functions 
	   * should only be dependent on the state definition object and super function.
	   *
	   *
	   * Existing builder functions and current return values:
	   *
	   * - **parent** `{object}` - returns the parent state object.
	   * - **data** `{object}` - returns state data, including any inherited data that is not
	   *   overridden by own values (if any).
	   * - **url** `{object}` - returns a {@link ui.router.util.type:UrlMatcher UrlMatcher}
	   *   or `null`.
	   * - **navigable** `{object}` - returns closest ancestor state that has a URL (aka is 
	   *   navigable).
	   * - **params** `{object}` - returns an array of state params that are ensured to 
	   *   be a super-set of parent's params.
	   * - **views** `{object}` - returns a views object where each key is an absolute view 
	   *   name (i.e. "viewName@stateName") and each value is the config object 
	   *   (template, controller) for the view. Even when you don't use the views object 
	   *   explicitly on a state config, one is still created for you internally.
	   *   So by decorating this builder function you have access to decorating template 
	   *   and controller properties.
	   * - **ownParams** `{object}` - returns an array of params that belong to the state, 
	   *   not including any params defined by ancestor states.
	   * - **path** `{string}` - returns the full path from the root down to this state. 
	   *   Needed for state activation.
	   * - **includes** `{object}` - returns an object that includes every state that 
	   *   would pass a `$state.includes()` test.
	   *
	   * @example
	   * <pre>
	   * // Override the internal 'views' builder with a function that takes the state
	   * // definition, and a reference to the internal function being overridden:
	   * $stateProvider.decorator('views', function (state, parent) {
	   *   var result = {},
	   *       views = parent(state);
	   *
	   *   angular.forEach(views, function (config, name) {
	   *     var autoName = (state.name + '.' + name).replace('.', '/');
	   *     config.templateUrl = config.templateUrl || '/partials/' + autoName + '.html';
	   *     result[name] = config;
	   *   });
	   *   return result;
	   * });
	   *
	   * $stateProvider.state('home', {
	   *   views: {
	   *     'contact.list': { controller: 'ListController' },
	   *     'contact.item': { controller: 'ItemController' }
	   *   }
	   * });
	   *
	   * // ...
	   *
	   * $state.go('home');
	   * // Auto-populates list and item views with /partials/home/contact/list.html,
	   * // and /partials/home/contact/item.html, respectively.
	   * </pre>
	   *
	   * @param {string} name The name of the builder function to decorate. 
	   * @param {object} func A function that is responsible for decorating the original 
	   * builder function. The function receives two parameters:
	   *
	   *   - `{object}` - state - The state config object.
	   *   - `{object}` - super - The original builder function.
	   *
	   * @return {object} $stateProvider - $stateProvider instance
	   */
	  this.decorator = decorator;
	  function decorator(name, func) {
	    /*jshint validthis: true */
	    if (isString(name) && !isDefined(func)) {
	      return stateBuilder[name];
	    }
	    if (!isFunction(func) || !isString(name)) {
	      return this;
	    }
	    if (stateBuilder[name] && !stateBuilder.$delegates[name]) {
	      stateBuilder.$delegates[name] = stateBuilder[name];
	    }
	    stateBuilder[name] = func;
	    return this;
	  }
	
	  /**
	   * @ngdoc function
	   * @name ui.router.state.$stateProvider#state
	   * @methodOf ui.router.state.$stateProvider
	   *
	   * @description
	   * Registers a state configuration under a given state name. The stateConfig object
	   * has the following acceptable properties.
	   *
	   * @param {string} name A unique state name, e.g. "home", "about", "contacts".
	   * To create a parent/child state use a dot, e.g. "about.sales", "home.newest".
	   * @param {object} stateConfig State configuration object.
	   * @param {string|function=} stateConfig.template
	   * <a id='template'></a>
	   *   html template as a string or a function that returns
	   *   an html template as a string which should be used by the uiView directives. This property 
	   *   takes precedence over templateUrl.
	   *   
	   *   If `template` is a function, it will be called with the following parameters:
	   *
	   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by
	   *     applying the current state
	   *
	   * <pre>template:
	   *   "<h1>inline template definition</h1>" +
	   *   "<div ui-view></div>"</pre>
	   * <pre>template: function(params) {
	   *       return "<h1>generated template</h1>"; }</pre>
	   * </div>
	   *
	   * @param {string|function=} stateConfig.templateUrl
	   * <a id='templateUrl'></a>
	   *
	   *   path or function that returns a path to an html
	   *   template that should be used by uiView.
	   *   
	   *   If `templateUrl` is a function, it will be called with the following parameters:
	   *
	   *   - {array.&lt;object&gt;} - state parameters extracted from the current $location.path() by 
	   *     applying the current state
	   *
	   * <pre>templateUrl: "home.html"</pre>
	   * <pre>templateUrl: function(params) {
	   *     return myTemplates[params.pageId]; }</pre>
	   *
	   * @param {function=} stateConfig.templateProvider
	   * <a id='templateProvider'></a>
	   *    Provider function that returns HTML content string.
	   * <pre> templateProvider:
	   *       function(MyTemplateService, params) {
	   *         return MyTemplateService.getTemplate(params.pageId);
	   *       }</pre>
	   *
	   * @param {string|function=} stateConfig.controller
	   * <a id='controller'></a>
	   *
	   *  Controller fn that should be associated with newly
	   *   related scope or the name of a registered controller if passed as a string.
	   *   Optionally, the ControllerAs may be declared here.
	   * <pre>controller: "MyRegisteredController"</pre>
	   * <pre>controller:
	   *     "MyRegisteredController as fooCtrl"}</pre>
	   * <pre>controller: function($scope, MyService) {
	   *     $scope.data = MyService.getData(); }</pre>
	   *
	   * @param {function=} stateConfig.controllerProvider
	   * <a id='controllerProvider'></a>
	   *
	   * Injectable provider function that returns the actual controller or string.
	   * <pre>controllerProvider:
	   *   function(MyResolveData) {
	   *     if (MyResolveData.foo)
	   *       return "FooCtrl"
	   *     else if (MyResolveData.bar)
	   *       return "BarCtrl";
	   *     else return function($scope) {
	   *       $scope.baz = "Qux";
	   *     }
	   *   }</pre>
	   *
	   * @param {string=} stateConfig.controllerAs
	   * <a id='controllerAs'></a>
	   * 
	   * A controller alias name. If present the controller will be
	   *   published to scope under the controllerAs name.
	   * <pre>controllerAs: "myCtrl"</pre>
	   *
	   * @param {string|object=} stateConfig.parent
	   * <a id='parent'></a>
	   * Optionally specifies the parent state of this state.
	   *
	   * <pre>parent: 'parentState'</pre>
	   * <pre>parent: parentState // JS variable</pre>
	   *
	   * @param {object=} stateConfig.resolve
	   * <a id='resolve'></a>
	   *
	   * An optional map&lt;string, function&gt; of dependencies which
	   *   should be injected into the controller. If any of these dependencies are promises, 
	   *   the router will wait for them all to be resolved before the controller is instantiated.
	   *   If all the promises are resolved successfully, the $stateChangeSuccess event is fired
	   *   and the values of the resolved promises are injected into any controllers that reference them.
	   *   If any  of the promises are rejected the $stateChangeError event is fired.
	   *
	   *   The map object is:
	   *   
	   *   - key - {string}: name of dependency to be injected into controller
	   *   - factory - {string|function}: If string then it is alias for service. Otherwise if function, 
	   *     it is injected and return value it treated as dependency. If result is a promise, it is 
	   *     resolved before its value is injected into controller.
	   *
	   * <pre>resolve: {
	   *     myResolve1:
	   *       function($http, $stateParams) {
	   *         return $http.get("/api/foos/"+stateParams.fooID);
	   *       }
	   *     }</pre>
	   *
	   * @param {string=} stateConfig.url
	   * <a id='url'></a>
	   *
	   *   A url fragment with optional parameters. When a state is navigated or
	   *   transitioned to, the `$stateParams` service will be populated with any 
	   *   parameters that were passed.
	   *
	   *   (See {@link ui.router.util.type:UrlMatcher UrlMatcher} `UrlMatcher`} for
	   *   more details on acceptable patterns )
	   *
	   * examples:
	   * <pre>url: "/home"
	   * url: "/users/:userid"
	   * url: "/books/{bookid:[a-zA-Z_-]}"
	   * url: "/books/{categoryid:int}"
	   * url: "/books/{publishername:string}/{categoryid:int}"
	   * url: "/messages?before&after"
	   * url: "/messages?{before:date}&{after:date}"
	   * url: "/messages/:mailboxid?{before:date}&{after:date}"
	   * </pre>
	   *
	   * @param {object=} stateConfig.views
	   * <a id='views'></a>
	   * an optional map&lt;string, object&gt; which defined multiple views, or targets views
	   * manually/explicitly.
	   *
	   * Examples:
	   *
	   * Targets three named `ui-view`s in the parent state's template
	   * <pre>views: {
	   *     header: {
	   *       controller: "headerCtrl",
	   *       templateUrl: "header.html"
	   *     }, body: {
	   *       controller: "bodyCtrl",
	   *       templateUrl: "body.html"
	   *     }, footer: {
	   *       controller: "footCtrl",
	   *       templateUrl: "footer.html"
	   *     }
	   *   }</pre>
	   *
	   * Targets named `ui-view="header"` from grandparent state 'top''s template, and named `ui-view="body" from parent state's template.
	   * <pre>views: {
	   *     'header@top': {
	   *       controller: "msgHeaderCtrl",
	   *       templateUrl: "msgHeader.html"
	   *     }, 'body': {
	   *       controller: "messagesCtrl",
	   *       templateUrl: "messages.html"
	   *     }
	   *   }</pre>
	   *
	   * @param {boolean=} [stateConfig.abstract=false]
	   * <a id='abstract'></a>
	   * An abstract state will never be directly activated,
	   *   but can provide inherited properties to its common children states.
	   * <pre>abstract: true</pre>
	   *
	   * @param {function=} stateConfig.onEnter
	   * <a id='onEnter'></a>
	   *
	   * Callback function for when a state is entered. Good way
	   *   to trigger an action or dispatch an event, such as opening a dialog.
	   * If minifying your scripts, make sure to explicitly annotate this function,
	   * because it won't be automatically annotated by your build tools.
	   *
	   * <pre>onEnter: function(MyService, $stateParams) {
	   *     MyService.foo($stateParams.myParam);
	   * }</pre>
	   *
	   * @param {function=} stateConfig.onExit
	   * <a id='onExit'></a>
	   *
	   * Callback function for when a state is exited. Good way to
	   *   trigger an action or dispatch an event, such as opening a dialog.
	   * If minifying your scripts, make sure to explicitly annotate this function,
	   * because it won't be automatically annotated by your build tools.
	   *
	   * <pre>onExit: function(MyService, $stateParams) {
	   *     MyService.cleanup($stateParams.myParam);
	   * }</pre>
	   *
	   * @param {boolean=} [stateConfig.reloadOnSearch=true]
	   * <a id='reloadOnSearch'></a>
	   *
	   * If `false`, will not retrigger the same state
	   *   just because a search/query parameter has changed (via $location.search() or $location.hash()). 
	   *   Useful for when you'd like to modify $location.search() without triggering a reload.
	   * <pre>reloadOnSearch: false</pre>
	   *
	   * @param {object=} stateConfig.data
	   * <a id='data'></a>
	   *
	   * Arbitrary data object, useful for custom configuration.  The parent state's `data` is
	   *   prototypally inherited.  In other words, adding a data property to a state adds it to
	   *   the entire subtree via prototypal inheritance.
	   *
	   * <pre>data: {
	   *     requiredRole: 'foo'
	   * } </pre>
	   *
	   * @param {object=} stateConfig.params
	   * <a id='params'></a>
	   *
	   * A map which optionally configures parameters declared in the `url`, or
	   *   defines additional non-url parameters.  For each parameter being
	   *   configured, add a configuration object keyed to the name of the parameter.
	   *
	   *   Each parameter configuration object may contain the following properties:
	   *
	   *   - ** value ** - {object|function=}: specifies the default value for this
	   *     parameter.  This implicitly sets this parameter as optional.
	   *
	   *     When UI-Router routes to a state and no value is
	   *     specified for this parameter in the URL or transition, the
	   *     default value will be used instead.  If `value` is a function,
	   *     it will be injected and invoked, and the return value used.
	   *
	   *     *Note*: `undefined` is treated as "no default value" while `null`
	   *     is treated as "the default value is `null`".
	   *
	   *     *Shorthand*: If you only need to configure the default value of the
	   *     parameter, you may use a shorthand syntax.   In the **`params`**
	   *     map, instead mapping the param name to a full parameter configuration
	   *     object, simply set map it to the default parameter value, e.g.:
	   *
	   * <pre>// define a parameter's default value
	   * params: {
	   *     param1: { value: "defaultValue" }
	   * }
	   * // shorthand default values
	   * params: {
	   *     param1: "defaultValue",
	   *     param2: "param2Default"
	   * }</pre>
	   *
	   *   - ** array ** - {boolean=}: *(default: false)* If true, the param value will be
	   *     treated as an array of values.  If you specified a Type, the value will be
	   *     treated as an array of the specified Type.  Note: query parameter values
	   *     default to a special `"auto"` mode.
	   *
	   *     For query parameters in `"auto"` mode, if multiple  values for a single parameter
	   *     are present in the URL (e.g.: `/foo?bar=1&bar=2&bar=3`) then the values
	   *     are mapped to an array (e.g.: `{ foo: [ '1', '2', '3' ] }`).  However, if
	   *     only one value is present (e.g.: `/foo?bar=1`) then the value is treated as single
	   *     value (e.g.: `{ foo: '1' }`).
	   *
	   * <pre>params: {
	   *     param1: { array: true }
	   * }</pre>
	   *
	   *   - ** squash ** - {bool|string=}: `squash` configures how a default parameter value is represented in the URL when
	   *     the current parameter value is the same as the default value. If `squash` is not set, it uses the
	   *     configured default squash policy.
	   *     (See {@link ui.router.util.$urlMatcherFactory#methods_defaultSquashPolicy `defaultSquashPolicy()`})
	   *
	   *   There are three squash settings:
	   *
	   *     - false: The parameter's default value is not squashed.  It is encoded and included in the URL
	   *     - true: The parameter's default value is omitted from the URL.  If the parameter is preceeded and followed
	   *       by slashes in the state's `url` declaration, then one of those slashes are omitted.
	   *       This can allow for cleaner looking URLs.
	   *     - `"<arbitrary string>"`: The parameter's default value is replaced with an arbitrary placeholder of  your choice.
	   *
	   * <pre>params: {
	   *     param1: {
	   *       value: "defaultId",
	   *       squash: true
	   * } }
	   * // squash "defaultValue" to "~"
	   * params: {
	   *     param1: {
	   *       value: "defaultValue",
	   *       squash: "~"
	   * } }
	   * </pre>
	   *
	   *
	   * @example
	   * <pre>
	   * // Some state name examples
	   *
	   * // stateName can be a single top-level name (must be unique).
	   * $stateProvider.state("home", {});
	   *
	   * // Or it can be a nested state name. This state is a child of the
	   * // above "home" state.
	   * $stateProvider.state("home.newest", {});
	   *
	   * // Nest states as deeply as needed.
	   * $stateProvider.state("home.newest.abc.xyz.inception", {});
	   *
	   * // state() returns $stateProvider, so you can chain state declarations.
	   * $stateProvider
	   *   .state("home", {})
	   *   .state("about", {})
	   *   .state("contacts", {});
	   * </pre>
	   *
	   */
	  this.state = state;
	  function state(name, definition) {
	    /*jshint validthis: true */
	    if (isObject(name)) definition = name;
	    else definition.name = name;
	    registerState(definition);
	    return this;
	  }
	
	  /**
	   * @ngdoc object
	   * @name ui.router.state.$state
	   *
	   * @requires $rootScope
	   * @requires $q
	   * @requires ui.router.state.$view
	   * @requires $injector
	   * @requires ui.router.util.$resolve
	   * @requires ui.router.state.$stateParams
	   * @requires ui.router.router.$urlRouter
	   *
	   * @property {object} params A param object, e.g. {sectionId: section.id)}, that 
	   * you'd like to test against the current active state.
	   * @property {object} current A reference to the state's config object. However 
	   * you passed it in. Useful for accessing custom data.
	   * @property {object} transition Currently pending transition. A promise that'll 
	   * resolve or reject.
	   *
	   * @description
	   * `$state` service is responsible for representing states as well as transitioning
	   * between them. It also provides interfaces to ask for current state or even states
	   * you're coming from.
	   */
	  this.$get = $get;
	  $get.$inject = ['$rootScope', '$q', '$view', '$injector', '$resolve', '$stateParams', '$urlRouter', '$location', '$urlMatcherFactory'];
	  function $get(   $rootScope,   $q,   $view,   $injector,   $resolve,   $stateParams,   $urlRouter,   $location,   $urlMatcherFactory) {
	
	    var TransitionSupersededError = new Error('transition superseded');
	
	    var TransitionSuperseded = silenceUncaughtInPromise($q.reject(TransitionSupersededError));
	    var TransitionPrevented = silenceUncaughtInPromise($q.reject(new Error('transition prevented')));
	    var TransitionAborted = silenceUncaughtInPromise($q.reject(new Error('transition aborted')));
	    var TransitionFailed = silenceUncaughtInPromise($q.reject(new Error('transition failed')));
	
	    // Handles the case where a state which is the target of a transition is not found, and the user
	    // can optionally retry or defer the transition
	    function handleRedirect(redirect, state, params, options) {
	      /**
	       * @ngdoc event
	       * @name ui.router.state.$state#$stateNotFound
	       * @eventOf ui.router.state.$state
	       * @eventType broadcast on root scope
	       * @description
	       * Fired when a requested state **cannot be found** using the provided state name during transition.
	       * The event is broadcast allowing any handlers a single chance to deal with the error (usually by
	       * lazy-loading the unfound state). A special `unfoundState` object is passed to the listener handler,
	       * you can see its three properties in the example. You can use `event.preventDefault()` to abort the
	       * transition and the promise returned from `go` will be rejected with a `'transition aborted'` value.
	       *
	       * @param {Object} event Event object.
	       * @param {Object} unfoundState Unfound State information. Contains: `to, toParams, options` properties.
	       * @param {State} fromState Current state object.
	       * @param {Object} fromParams Current state params.
	       *
	       * @example
	       *
	       * <pre>
	       * // somewhere, assume lazy.state has not been defined
	       * $state.go("lazy.state", {a:1, b:2}, {inherit:false});
	       *
	       * // somewhere else
	       * $scope.$on('$stateNotFound',
	       * function(event, unfoundState, fromState, fromParams){
	       *     console.log(unfoundState.to); // "lazy.state"
	       *     console.log(unfoundState.toParams); // {a:1, b:2}
	       *     console.log(unfoundState.options); // {inherit:false} + default options
	       * })
	       * </pre>
	       */
	      var evt = $rootScope.$broadcast('$stateNotFound', redirect, state, params);
	
	      if (evt.defaultPrevented) {
	        $urlRouter.update();
	        return TransitionAborted;
	      }
	
	      if (!evt.retry) {
	        return null;
	      }
	
	      // Allow the handler to return a promise to defer state lookup retry
	      if (options.$retry) {
	        $urlRouter.update();
	        return TransitionFailed;
	      }
	      var retryTransition = $state.transition = $q.when(evt.retry);
	
	      retryTransition.then(function() {
	        if (retryTransition !== $state.transition) {
	          $rootScope.$broadcast('$stateChangeCancel', redirect.to, redirect.toParams, state, params);
	          return TransitionSuperseded;
	        }
	        redirect.options.$retry = true;
	        return $state.transitionTo(redirect.to, redirect.toParams, redirect.options);
	      }, function() {
	        return TransitionAborted;
	      });
	      $urlRouter.update();
	
	      return retryTransition;
	    }
	
	    root.locals = { resolve: null, globals: { $stateParams: {} } };
	
	    $state = {
	      params: {},
	      current: root.self,
	      $current: root,
	      transition: null
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#reload
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method that force reloads the current state. All resolves are re-resolved,
	     * controllers reinstantiated, and events re-fired.
	     *
	     * @example
	     * <pre>
	     * var app angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.reload = function(){
	     *     $state.reload();
	     *   }
	     * });
	     * </pre>
	     *
	     * `reload()` is just an alias for:
	     * <pre>
	     * $state.transitionTo($state.current, $stateParams, { 
	     *   reload: true, inherit: false, notify: true
	     * });
	     * </pre>
	     *
	     * @param {string=|object=} state - A state name or a state object, which is the root of the resolves to be re-resolved.
	     * @example
	     * <pre>
	     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item' 
	     * //and current state is 'contacts.detail.item'
	     * var app angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.reload = function(){
	     *     //will reload 'contact.detail' and 'contact.detail.item' states
	     *     $state.reload('contact.detail');
	     *   }
	     * });
	     * </pre>
	     *
	     * `reload()` is just an alias for:
	     * <pre>
	     * $state.transitionTo($state.current, $stateParams, { 
	     *   reload: true, inherit: false, notify: true
	     * });
	     * </pre>
	
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    $state.reload = function reload(state) {
	      return $state.transitionTo($state.current, $stateParams, { reload: state || true, inherit: false, notify: true});
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#go
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Convenience method for transitioning to a new state. `$state.go` calls 
	     * `$state.transitionTo` internally but automatically sets options to 
	     * `{ location: true, inherit: true, relative: $state.$current, notify: true }`. 
	     * This allows you to easily use an absolute or relative to path and specify 
	     * only the parameters you'd like to update (while letting unspecified parameters 
	     * inherit from the currently active ancestor states).
	     *
	     * @example
	     * <pre>
	     * var app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.go('contact.detail');
	     *   };
	     * });
	     * </pre>
	     * <img src='../ngdoc_assets/StateGoExamples.png'/>
	     *
	     * @param {string} to Absolute state name or relative state path. Some examples:
	     *
	     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
	     * - `$state.go('^')` - will go to a parent state
	     * - `$state.go('^.sibling')` - will go to a sibling state
	     * - `$state.go('.child.grandchild')` - will go to grandchild state
	     *
	     * @param {object=} params A map of the parameters that will be sent to the state, 
	     * will populate $stateParams. Any parameters that are not specified will be inherited from currently 
	     * defined parameters. Only parameters specified in the state definition can be overridden, new 
	     * parameters will be ignored. This allows, for example, going to a sibling state that shares parameters
	     * specified in a parent state. Parameter inheritance only works between common ancestor states, I.e.
	     * transitioning to a sibling will get you the parameters for all parents, transitioning to a child
	     * will get you all current parameters, etc.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false|string|object}, If `true` will force transition even if no state or params
	     *    have changed.  It will reload the resolves and views of the current state and parent states.
	     *    If `reload` is a string (or state object), the state object is fetched (by name, or object reference); and \
	     *    the transition reloads the resolves and views for that matched state, and all its children states.
	     *
	     * @returns {promise} A promise representing the state of the new transition.
	     *
	     * Possible success values:
	     *
	     * - $state.current
	     *
	     * <br/>Possible rejection values:
	     *
	     * - 'transition superseded' - when a newer transition has been started after this one
	     * - 'transition prevented' - when `event.preventDefault()` has been called in a `$stateChangeStart` listener
	     * - 'transition aborted' - when `event.preventDefault()` has been called in a `$stateNotFound` listener or
	     *   when a `$stateNotFound` `event.retry` promise errors.
	     * - 'transition failed' - when a state has been unsuccessfully found after 2 tries.
	     * - *resolve error* - when an error has occurred with a `resolve`
	     *
	     */
	    $state.go = function go(to, params, options) {
	      return $state.transitionTo(to, params, extend({ inherit: true, relative: $state.$current }, options));
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#transitionTo
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Low-level method for transitioning to a new state. {@link ui.router.state.$state#methods_go $state.go}
	     * uses `transitionTo` internally. `$state.go` is recommended in most situations.
	     *
	     * @example
	     * <pre>
	     * var app = angular.module('app', ['ui.router']);
	     *
	     * app.controller('ctrl', function ($scope, $state) {
	     *   $scope.changeState = function () {
	     *     $state.transitionTo('contact.detail');
	     *   };
	     * });
	     * </pre>
	     *
	     * @param {string} to State name.
	     * @param {object=} toParams A map of the parameters that will be sent to the state,
	     * will populate $stateParams.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`location`** - {boolean=true|string=} - If `true` will update the url in the location bar, if `false`
	     *    will not. If string, must be `"replace"`, which will update url and also replace last history record.
	     * - **`inherit`** - {boolean=false}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=}, When transitioning with relative path (e.g '^'), 
	     *    defines which state to be relative from.
	     * - **`notify`** - {boolean=true}, If `true` will broadcast $stateChangeStart and $stateChangeSuccess events.
	     * - **`reload`** (v0.2.5) - {boolean=false|string=|object=}, If `true` will force transition even if the state or params 
	     *    have not changed, aka a reload of the same state. It differs from reloadOnSearch because you'd
	     *    use this when you want to force a reload when *everything* is the same, including search params.
	     *    if String, then will reload the state with the name given in reload, and any children.
	     *    if Object, then a stateObj is expected, will reload the state found in stateObj, and any children.
	     *
	     * @returns {promise} A promise representing the state of the new transition. See
	     * {@link ui.router.state.$state#methods_go $state.go}.
	     */
	    $state.transitionTo = function transitionTo(to, toParams, options) {
	      toParams = toParams || {};
	      options = extend({
	        location: true, inherit: false, relative: null, notify: true, reload: false, $retry: false
	      }, options || {});
	
	      var from = $state.$current, fromParams = $state.params, fromPath = from.path;
	      var evt, toState = findState(to, options.relative);
	
	      // Store the hash param for later (since it will be stripped out by various methods)
	      var hash = toParams['#'];
	
	      if (!isDefined(toState)) {
	        var redirect = { to: to, toParams: toParams, options: options };
	        var redirectResult = handleRedirect(redirect, from.self, fromParams, options);
	
	        if (redirectResult) {
	          return redirectResult;
	        }
	
	        // Always retry once if the $stateNotFound was not prevented
	        // (handles either redirect changed or state lazy-definition)
	        to = redirect.to;
	        toParams = redirect.toParams;
	        options = redirect.options;
	        toState = findState(to, options.relative);
	
	        if (!isDefined(toState)) {
	          if (!options.relative) throw new Error("No such state '" + to + "'");
	          throw new Error("Could not resolve '" + to + "' from state '" + options.relative + "'");
	        }
	      }
	      if (toState[abstractKey]) throw new Error("Cannot transition to abstract state '" + to + "'");
	      if (options.inherit) toParams = inheritParams($stateParams, toParams || {}, $state.$current, toState);
	      if (!toState.params.$$validates(toParams)) return TransitionFailed;
	
	      toParams = toState.params.$$values(toParams);
	      to = toState;
	
	      var toPath = to.path;
	
	      // Starting from the root of the path, keep all levels that haven't changed
	      var keep = 0, state = toPath[keep], locals = root.locals, toLocals = [];
	
	      if (!options.reload) {
	        while (state && state === fromPath[keep] && state.ownParams.$$equals(toParams, fromParams)) {
	          locals = toLocals[keep] = state.locals;
	          keep++;
	          state = toPath[keep];
	        }
	      } else if (isString(options.reload) || isObject(options.reload)) {
	        if (isObject(options.reload) && !options.reload.name) {
	          throw new Error('Invalid reload state object');
	        }
	        
	        var reloadState = options.reload === true ? fromPath[0] : findState(options.reload);
	        if (options.reload && !reloadState) {
	          throw new Error("No such reload state '" + (isString(options.reload) ? options.reload : options.reload.name) + "'");
	        }
	
	        while (state && state === fromPath[keep] && state !== reloadState) {
	          locals = toLocals[keep] = state.locals;
	          keep++;
	          state = toPath[keep];
	        }
	      }
	
	      // If we're going to the same state and all locals are kept, we've got nothing to do.
	      // But clear 'transition', as we still want to cancel any other pending transitions.
	      // TODO: We may not want to bump 'transition' if we're called from a location change
	      // that we've initiated ourselves, because we might accidentally abort a legitimate
	      // transition initiated from code?
	      if (shouldSkipReload(to, toParams, from, fromParams, locals, options)) {
	        if (hash) toParams['#'] = hash;
	        $state.params = toParams;
	        copy($state.params, $stateParams);
	        copy(filterByKeys(to.params.$$keys(), $stateParams), to.locals.globals.$stateParams);
	        if (options.location && to.navigable && to.navigable.url) {
	          $urlRouter.push(to.navigable.url, toParams, {
	            $$avoidResync: true, replace: options.location === 'replace'
	          });
	          $urlRouter.update(true);
	        }
	        $state.transition = null;
	        return $q.when($state.current);
	      }
	
	      // Filter parameters before we pass them to event handlers etc.
	      toParams = filterByKeys(to.params.$$keys(), toParams || {});
	      
	      // Re-add the saved hash before we start returning things or broadcasting $stateChangeStart
	      if (hash) toParams['#'] = hash;
	      
	      // Broadcast start event and cancel the transition if requested
	      if (options.notify) {
	        /**
	         * @ngdoc event
	         * @name ui.router.state.$state#$stateChangeStart
	         * @eventOf ui.router.state.$state
	         * @eventType broadcast on root scope
	         * @description
	         * Fired when the state transition **begins**. You can use `event.preventDefault()`
	         * to prevent the transition from happening and then the transition promise will be
	         * rejected with a `'transition prevented'` value.
	         *
	         * @param {Object} event Event object.
	         * @param {State} toState The state being transitioned to.
	         * @param {Object} toParams The params supplied to the `toState`.
	         * @param {State} fromState The current state, pre-transition.
	         * @param {Object} fromParams The params supplied to the `fromState`.
	         *
	         * @example
	         *
	         * <pre>
	         * $rootScope.$on('$stateChangeStart',
	         * function(event, toState, toParams, fromState, fromParams){
	         *     event.preventDefault();
	         *     // transitionTo() promise will be rejected with
	         *     // a 'transition prevented' error
	         * })
	         * </pre>
	         */
	        if ($rootScope.$broadcast('$stateChangeStart', to.self, toParams, from.self, fromParams, options).defaultPrevented) {
	          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
	          //Don't update and resync url if there's been a new transition started. see issue #2238, #600
	          if ($state.transition == null) $urlRouter.update();
	          return TransitionPrevented;
	        }
	      }
	
	      // Resolve locals for the remaining states, but don't update any global state just
	      // yet -- if anything fails to resolve the current state needs to remain untouched.
	      // We also set up an inheritance chain for the locals here. This allows the view directive
	      // to quickly look up the correct definition for each view in the current state. Even
	      // though we create the locals object itself outside resolveState(), it is initially
	      // empty and gets filled asynchronously. We need to keep track of the promise for the
	      // (fully resolved) current locals, and pass this down the chain.
	      var resolved = $q.when(locals);
	
	      for (var l = keep; l < toPath.length; l++, state = toPath[l]) {
	        locals = toLocals[l] = inherit(locals);
	        resolved = resolveState(state, toParams, state === to, resolved, locals, options);
	      }
	
	      // Once everything is resolved, we are ready to perform the actual transition
	      // and return a promise for the new state. We also keep track of what the
	      // current promise is, so that we can detect overlapping transitions and
	      // keep only the outcome of the last transition.
	      var transition = $state.transition = resolved.then(function () {
	        var l, entering, exiting;
	
	        if ($state.transition !== transition) {
	          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
	          return TransitionSuperseded;
	        }
	
	        // Exit 'from' states not kept
	        for (l = fromPath.length - 1; l >= keep; l--) {
	          exiting = fromPath[l];
	          if (exiting.self.onExit) {
	            $injector.invoke(exiting.self.onExit, exiting.self, exiting.locals.globals);
	          }
	          exiting.locals = null;
	        }
	
	        // Enter 'to' states not kept
	        for (l = keep; l < toPath.length; l++) {
	          entering = toPath[l];
	          entering.locals = toLocals[l];
	          if (entering.self.onEnter) {
	            $injector.invoke(entering.self.onEnter, entering.self, entering.locals.globals);
	          }
	        }
	
	        // Run it again, to catch any transitions in callbacks
	        if ($state.transition !== transition) {
	          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
	          return TransitionSuperseded;
	        }
	
	        // Update globals in $state
	        $state.$current = to;
	        $state.current = to.self;
	        $state.params = toParams;
	        copy($state.params, $stateParams);
	        $state.transition = null;
	
	        if (options.location && to.navigable) {
	          $urlRouter.push(to.navigable.url, to.navigable.locals.globals.$stateParams, {
	            $$avoidResync: true, replace: options.location === 'replace'
	          });
	        }
	
	        if (options.notify) {
	        /**
	         * @ngdoc event
	         * @name ui.router.state.$state#$stateChangeSuccess
	         * @eventOf ui.router.state.$state
	         * @eventType broadcast on root scope
	         * @description
	         * Fired once the state transition is **complete**.
	         *
	         * @param {Object} event Event object.
	         * @param {State} toState The state being transitioned to.
	         * @param {Object} toParams The params supplied to the `toState`.
	         * @param {State} fromState The current state, pre-transition.
	         * @param {Object} fromParams The params supplied to the `fromState`.
	         */
	          $rootScope.$broadcast('$stateChangeSuccess', to.self, toParams, from.self, fromParams);
	        }
	        $urlRouter.update(true);
	
	        return $state.current;
	      }).then(null, function (error) {
	        // propagate TransitionSuperseded error without emitting $stateChangeCancel
	        // as it was already emitted in the success handler above
	        if (error === TransitionSupersededError) return TransitionSuperseded;
	
	        if ($state.transition !== transition) {
	          $rootScope.$broadcast('$stateChangeCancel', to.self, toParams, from.self, fromParams);
	          return TransitionSuperseded;
	        }
	
	        $state.transition = null;
	        /**
	         * @ngdoc event
	         * @name ui.router.state.$state#$stateChangeError
	         * @eventOf ui.router.state.$state
	         * @eventType broadcast on root scope
	         * @description
	         * Fired when an **error occurs** during transition. It's important to note that if you
	         * have any errors in your resolve functions (javascript errors, non-existent services, etc)
	         * they will not throw traditionally. You must listen for this $stateChangeError event to
	         * catch **ALL** errors.
	         *
	         * @param {Object} event Event object.
	         * @param {State} toState The state being transitioned to.
	         * @param {Object} toParams The params supplied to the `toState`.
	         * @param {State} fromState The current state, pre-transition.
	         * @param {Object} fromParams The params supplied to the `fromState`.
	         * @param {Error} error The resolve error object.
	         */
	        evt = $rootScope.$broadcast('$stateChangeError', to.self, toParams, from.self, fromParams, error);
	
	        if (!evt.defaultPrevented) {
	          $urlRouter.update();
	        }
	
	        return $q.reject(error);
	      });
	
	      return transition;
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#is
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Similar to {@link ui.router.state.$state#methods_includes $state.includes},
	     * but only checks for the full state name. If params is supplied then it will be
	     * tested for strict equality against the current active params object, so all params
	     * must match with none missing and no extras.
	     *
	     * @example
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // absolute name
	     * $state.is('contact.details.item'); // returns true
	     * $state.is(contactDetailItemStateObject); // returns true
	     *
	     * // relative name (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name (absolute or relative) or state object you'd like to check.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
	     * to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object} -  If `stateOrName` is a relative state name and `options.relative` is set, .is will
	     * test relative to `options.relative` state (or name).
	     *
	     * @returns {boolean} Returns true if it is the state.
	     */
	    $state.is = function is(stateOrName, params, options) {
	      options = extend({ relative: $state.$current }, options || {});
	      var state = findState(stateOrName, options.relative);
	
	      if (!isDefined(state)) { return undefined; }
	      if ($state.$current !== state) { return false; }
	      return params ? equalForKeys(state.params.$$values(params), $stateParams) : true;
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#includes
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A method to determine if the current active state is equal to or is the child of the
	     * state stateName. If any params are passed then they will be tested for a match as well.
	     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
	     *
	     * @example
	     * Partial and relative names
	     * <pre>
	     * $state.$current.name = 'contacts.details.item';
	     *
	     * // Using partial names
	     * $state.includes("contacts"); // returns true
	     * $state.includes("contacts.details"); // returns true
	     * $state.includes("contacts.details.item"); // returns true
	     * $state.includes("contacts.list"); // returns false
	     * $state.includes("about"); // returns false
	     *
	     * // Using relative names (. and ^), typically from a template
	     * // E.g. from the 'contacts.details' template
	     * <div ng-class="{highlighted: $state.includes('.item')}">Item</div>
	     * </pre>
	     *
	     * Basic globbing patterns
	     * <pre>
	     * $state.$current.name = 'contacts.details.item.url';
	     *
	     * $state.includes("*.details.*.*"); // returns true
	     * $state.includes("*.details.**"); // returns true
	     * $state.includes("**.item.**"); // returns true
	     * $state.includes("*.details.item.url"); // returns true
	     * $state.includes("*.details.*.url"); // returns true
	     * $state.includes("*.details.*"); // returns false
	     * $state.includes("item.**"); // returns false
	     * </pre>
	     *
	     * @param {string} stateOrName A partial name, relative name, or glob pattern
	     * to be searched for within the current state name.
	     * @param {object=} params A param object, e.g. `{sectionId: section.id}`,
	     * that you'd like to test against the current active state.
	     * @param {object=} options An options object.  The options are:
	     *
	     * - **`relative`** - {string|object=} -  If `stateOrName` is a relative state reference and `options.relative` is set,
	     * .includes will test relative to `options.relative` state (or name).
	     *
	     * @returns {boolean} Returns true if it does include the state
	     */
	    $state.includes = function includes(stateOrName, params, options) {
	      options = extend({ relative: $state.$current }, options || {});
	      if (isString(stateOrName) && isGlob(stateOrName)) {
	        if (!doesStateMatchGlob(stateOrName)) {
	          return false;
	        }
	        stateOrName = $state.$current.name;
	      }
	
	      var state = findState(stateOrName, options.relative);
	      if (!isDefined(state)) { return undefined; }
	      if (!isDefined($state.$current.includes[state.name])) { return false; }
	      if (!params) { return true; }
	
	      var keys = objectKeys(params);
	      for (var i = 0; i < keys.length; i++) {
	        var key = keys[i], paramDef = state.params[key];
	        if (paramDef && !paramDef.type.equals($stateParams[key], params[key])) {
	          return false;
	        }
	      }
	
	      return true;
	    };
	
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#href
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * A url generation method that returns the compiled url for the given state populated with the given params.
	     *
	     * @example
	     * <pre>
	     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
	     * </pre>
	     *
	     * @param {string|object} stateOrName The state name or state object you'd like to generate a url from.
	     * @param {object=} params An object of parameter values to fill the state's required parameters.
	     * @param {object=} options Options object. The options are:
	     *
	     * - **`lossy`** - {boolean=true} -  If true, and if there is no url associated with the state provided in the
	     *    first parameter, then the constructed href url will be built from the first navigable ancestor (aka
	     *    ancestor with a valid url).
	     * - **`inherit`** - {boolean=true}, If `true` will inherit url parameters from current url.
	     * - **`relative`** - {object=$state.$current}, When transitioning with relative path (e.g '^'), 
	     *    defines which state to be relative from.
	     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
	     * 
	     * @returns {string} compiled state url
	     */
	    $state.href = function href(stateOrName, params, options) {
	      options = extend({
	        lossy:    true,
	        inherit:  true,
	        absolute: false,
	        relative: $state.$current
	      }, options || {});
	
	      var state = findState(stateOrName, options.relative);
	
	      if (!isDefined(state)) return null;
	      if (options.inherit) params = inheritParams($stateParams, params || {}, $state.$current, state);
	      
	      var nav = (state && options.lossy) ? state.navigable : state;
	
	      if (!nav || nav.url === undefined || nav.url === null) {
	        return null;
	      }
	      return $urlRouter.href(nav.url, filterByKeys(state.params.$$keys().concat('#'), params || {}), {
	        absolute: options.absolute
	      });
	    };
	
	    /**
	     * @ngdoc function
	     * @name ui.router.state.$state#get
	     * @methodOf ui.router.state.$state
	     *
	     * @description
	     * Returns the state configuration object for any specific state or all states.
	     *
	     * @param {string|object=} stateOrName (absolute or relative) If provided, will only get the config for
	     * the requested state. If not provided, returns an array of ALL state configs.
	     * @param {string|object=} context When stateOrName is a relative state reference, the state will be retrieved relative to context.
	     * @returns {Object|Array} State configuration object or array of all objects.
	     */
	    $state.get = function (stateOrName, context) {
	      if (arguments.length === 0) return map(objectKeys(states), function(name) { return states[name].self; });
	      var state = findState(stateOrName, context || $state.$current);
	      return (state && state.self) ? state.self : null;
	    };
	
	    function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
	      // Make a restricted $stateParams with only the parameters that apply to this state if
	      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
	      // we also need $stateParams to be available for any $injector calls we make during the
	      // dependency resolution process.
	      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
	      var locals = { $stateParams: $stateParams };
	
	      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
	      // We're also including $stateParams in this; that way the parameters are restricted
	      // to the set that should be visible to the state, and are independent of when we update
	      // the global $state and $stateParams values.
	      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
	      var promises = [dst.resolve.then(function (globals) {
	        dst.globals = globals;
	      })];
	      if (inherited) promises.push(inherited);
	
	      function resolveViews() {
	        var viewsPromises = [];
	
	        // Resolve template and dependencies for all views.
	        forEach(state.views, function (view, name) {
	          var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
	          injectables.$template = [ function () {
	            return $view.load(name, { view: view, locals: dst.globals, params: $stateParams, notify: options.notify }) || '';
	          }];
	
	          viewsPromises.push($resolve.resolve(injectables, dst.globals, dst.resolve, state).then(function (result) {
	            // References to the controller (only instantiated at link time)
	            if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
	              var injectLocals = angular.extend({}, injectables, dst.globals);
	              result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
	            } else {
	              result.$$controller = view.controller;
	            }
	            // Provide access to the state itself for internal use
	            result.$$state = state;
	            result.$$controllerAs = view.controllerAs;
	            result.$$resolveAs = view.resolveAs;
	            dst[name] = result;
	          }));
	        });
	
	        return $q.all(viewsPromises).then(function(){
	          return dst.globals;
	        });
	      }
	
	      // Wait for all the promises and then return the activation object
	      return $q.all(promises).then(resolveViews).then(function (values) {
	        return dst;
	      });
	    }
	
	    return $state;
	  }
	
	  function shouldSkipReload(to, toParams, from, fromParams, locals, options) {
	    // Return true if there are no differences in non-search (path/object) params, false if there are differences
	    function nonSearchParamsEqual(fromAndToState, fromParams, toParams) {
	      // Identify whether all the parameters that differ between `fromParams` and `toParams` were search params.
	      function notSearchParam(key) {
	        return fromAndToState.params[key].location != "search";
	      }
	      var nonQueryParamKeys = fromAndToState.params.$$keys().filter(notSearchParam);
	      var nonQueryParams = pick.apply({}, [fromAndToState.params].concat(nonQueryParamKeys));
	      var nonQueryParamSet = new $$UMFP.ParamSet(nonQueryParams);
	      return nonQueryParamSet.$$equals(fromParams, toParams);
	    }
	
	    // If reload was not explicitly requested
	    // and we're transitioning to the same state we're already in
	    // and    the locals didn't change
	    //     or they changed in a way that doesn't merit reloading
	    //        (reloadOnParams:false, or reloadOnSearch.false and only search params changed)
	    // Then return true.
	    if (!options.reload && to === from &&
	      (locals === from.locals || (to.self.reloadOnSearch === false && nonSearchParamsEqual(from, fromParams, toParams)))) {
	      return true;
	    }
	  }
	}
	
	angular.module('ui.router.state')
	  .factory('$stateParams', function () { return {}; })
	  .constant("$state.runtime", { autoinject: true })
	  .provider('$state', $StateProvider)
	  // Inject $state to initialize when entering runtime. #2574
	  .run(['$injector', function ($injector) {
	    // Allow tests (stateSpec.js) to turn this off by defining this constant
	    if ($injector.get("$state.runtime").autoinject) {
	      $injector.get('$state');
	    }
	  }]);
	
	
	$ViewProvider.$inject = [];
	function $ViewProvider() {
	
	  this.$get = $get;
	  /**
	   * @ngdoc object
	   * @name ui.router.state.$view
	   *
	   * @requires ui.router.util.$templateFactory
	   * @requires $rootScope
	   *
	   * @description
	   *
	   */
	  $get.$inject = ['$rootScope', '$templateFactory'];
	  function $get(   $rootScope,   $templateFactory) {
	    return {
	      // $view.load('full.viewName', { template: ..., controller: ..., resolve: ..., async: false, params: ... })
	      /**
	       * @ngdoc function
	       * @name ui.router.state.$view#load
	       * @methodOf ui.router.state.$view
	       *
	       * @description
	       *
	       * @param {string} name name
	       * @param {object} options option object.
	       */
	      load: function load(name, options) {
	        var result, defaults = {
	          template: null, controller: null, view: null, locals: null, notify: true, async: true, params: {}
	        };
	        options = extend(defaults, options);
	
	        if (options.view) {
	          result = $templateFactory.fromConfig(options.view, options.params, options.locals);
	        }
	        return result;
	      }
	    };
	  }
	}
	
	angular.module('ui.router.state').provider('$view', $ViewProvider);
	
	/**
	 * @ngdoc object
	 * @name ui.router.state.$uiViewScrollProvider
	 *
	 * @description
	 * Provider that returns the {@link ui.router.state.$uiViewScroll} service function.
	 */
	function $ViewScrollProvider() {
	
	  var useAnchorScroll = false;
	
	  /**
	   * @ngdoc function
	   * @name ui.router.state.$uiViewScrollProvider#useAnchorScroll
	   * @methodOf ui.router.state.$uiViewScrollProvider
	   *
	   * @description
	   * Reverts back to using the core [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll) service for
	   * scrolling based on the url anchor.
	   */
	  this.useAnchorScroll = function () {
	    useAnchorScroll = true;
	  };
	
	  /**
	   * @ngdoc object
	   * @name ui.router.state.$uiViewScroll
	   *
	   * @requires $anchorScroll
	   * @requires $timeout
	   *
	   * @description
	   * When called with a jqLite element, it scrolls the element into view (after a
	   * `$timeout` so the DOM has time to refresh).
	   *
	   * If you prefer to rely on `$anchorScroll` to scroll the view to the anchor,
	   * this can be enabled by calling {@link ui.router.state.$uiViewScrollProvider#methods_useAnchorScroll `$uiViewScrollProvider.useAnchorScroll()`}.
	   */
	  this.$get = ['$anchorScroll', '$timeout', function ($anchorScroll, $timeout) {
	    if (useAnchorScroll) {
	      return $anchorScroll;
	    }
	
	    return function ($element) {
	      return $timeout(function () {
	        $element[0].scrollIntoView();
	      }, 0, false);
	    };
	  }];
	}
	
	angular.module('ui.router.state').provider('$uiViewScroll', $ViewScrollProvider);
	
	/**
	 * @ngdoc directive
	 * @name ui.router.state.directive:ui-view
	 *
	 * @requires ui.router.state.$state
	 * @requires $compile
	 * @requires $controller
	 * @requires $injector
	 * @requires ui.router.state.$uiViewScroll
	 * @requires $document
	 *
	 * @restrict ECA
	 *
	 * @description
	 * The ui-view directive tells $state where to place your templates.
	 *
	 * @param {string=} name A view name. The name should be unique amongst the other views in the
	 * same state. You can have views of the same name that live in different states.
	 *
	 * @param {string=} autoscroll It allows you to set the scroll behavior of the browser window
	 * when a view is populated. By default, $anchorScroll is overridden by ui-router's custom scroll
	 * service, {@link ui.router.state.$uiViewScroll}. This custom service let's you
	 * scroll ui-view elements into view when they are populated during a state activation.
	 *
	 * *Note: To revert back to old [`$anchorScroll`](http://docs.angularjs.org/api/ng.$anchorScroll)
	 * functionality, call `$uiViewScrollProvider.useAnchorScroll()`.*
	 *
	 * @param {string=} onload Expression to evaluate whenever the view updates.
	 *
	 * @example
	 * A view can be unnamed or named.
	 * <pre>
	 * <!-- Unnamed -->
	 * <div ui-view></div>
	 *
	 * <!-- Named -->
	 * <div ui-view="viewName"></div>
	 * </pre>
	 *
	 * You can only have one unnamed view within any template (or root html). If you are only using a
	 * single view and it is unnamed then you can populate it like so:
	 * <pre>
	 * <div ui-view></div>
	 * $stateProvider.state("home", {
	 *   template: "<h1>HELLO!</h1>"
	 * })
	 * </pre>
	 *
	 * The above is a convenient shortcut equivalent to specifying your view explicitly with the {@link ui.router.state.$stateProvider#methods_state `views`}
	 * config property, by name, in this case an empty name:
	 * <pre>
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }    
	 * })
	 * </pre>
	 *
	 * But typically you'll only use the views property if you name your view or have more than one view
	 * in the same template. There's not really a compelling reason to name a view if its the only one,
	 * but you could if you wanted, like so:
	 * <pre>
	 * <div ui-view="main"></div>
	 * </pre>
	 * <pre>
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "main": {
	 *       template: "<h1>HELLO!</h1>"
	 *     }
	 *   }    
	 * })
	 * </pre>
	 *
	 * Really though, you'll use views to set up multiple views:
	 * <pre>
	 * <div ui-view></div>
	 * <div ui-view="chart"></div>
	 * <div ui-view="data"></div>
	 * </pre>
	 *
	 * <pre>
	 * $stateProvider.state("home", {
	 *   views: {
	 *     "": {
	 *       template: "<h1>HELLO!</h1>"
	 *     },
	 *     "chart": {
	 *       template: "<chart_thing/>"
	 *     },
	 *     "data": {
	 *       template: "<data_thing/>"
	 *     }
	 *   }    
	 * })
	 * </pre>
	 *
	 * Examples for `autoscroll`:
	 *
	 * <pre>
	 * <!-- If autoscroll present with no expression,
	 *      then scroll ui-view into view -->
	 * <ui-view autoscroll/>
	 *
	 * <!-- If autoscroll present with valid expression,
	 *      then scroll ui-view into view if expression evaluates to true -->
	 * <ui-view autoscroll='true'/>
	 * <ui-view autoscroll='false'/>
	 * <ui-view autoscroll='scopeVariable'/>
	 * </pre>
	 *
	 * Resolve data:
	 *
	 * The resolved data from the state's `resolve` block is placed on the scope as `$resolve` (this
	 * can be customized using [[ViewDeclaration.resolveAs]]).  This can be then accessed from the template.
	 *
	 * Note that when `controllerAs` is being used, `$resolve` is set on the controller instance *after* the
	 * controller is instantiated.  The `$onInit()` hook can be used to perform initialization code which
	 * depends on `$resolve` data.
	 *
	 * Example usage of $resolve in a view template
	 * <pre>
	 * $stateProvider.state('home', {
	 *   template: '<my-component user="$resolve.user"></my-component>',
	 *   resolve: {
	 *     user: function(UserService) { return UserService.fetchUser(); }
	 *   }
	 * });
	 * </pre>
	 */
	$ViewDirective.$inject = ['$state', '$injector', '$uiViewScroll', '$interpolate', '$q'];
	function $ViewDirective(   $state,   $injector,   $uiViewScroll,   $interpolate,   $q) {
	
	  function getService() {
	    return ($injector.has) ? function(service) {
	      return $injector.has(service) ? $injector.get(service) : null;
	    } : function(service) {
	      try {
	        return $injector.get(service);
	      } catch (e) {
	        return null;
	      }
	    };
	  }
	
	  var service = getService(),
	      $animator = service('$animator'),
	      $animate = service('$animate');
	
	  // Returns a set of DOM manipulation functions based on which Angular version
	  // it should use
	  function getRenderer(attrs, scope) {
	    var statics = function() {
	      return {
	        enter: function (element, target, cb) { target.after(element); cb(); },
	        leave: function (element, cb) { element.remove(); cb(); }
	      };
	    };
	
	    if ($animate) {
	      return {
	        enter: function(element, target, cb) {
	          if (angular.version.minor > 2) {
	            $animate.enter(element, null, target).then(cb);
	          } else {
	            $animate.enter(element, null, target, cb);
	          }
	        },
	        leave: function(element, cb) {
	          if (angular.version.minor > 2) {
	            $animate.leave(element).then(cb);
	          } else {
	            $animate.leave(element, cb);
	          }
	        }
	      };
	    }
	
	    if ($animator) {
	      var animate = $animator && $animator(scope, attrs);
	
	      return {
	        enter: function(element, target, cb) {animate.enter(element, null, target); cb(); },
	        leave: function(element, cb) { animate.leave(element); cb(); }
	      };
	    }
	
	    return statics();
	  }
	
	  var directive = {
	    restrict: 'ECA',
	    terminal: true,
	    priority: 400,
	    transclude: 'element',
	    compile: function (tElement, tAttrs, $transclude) {
	      return function (scope, $element, attrs) {
	        var previousEl, currentEl, currentScope, latestLocals,
	            onloadExp     = attrs.onload || '',
	            autoScrollExp = attrs.autoscroll,
	            renderer      = getRenderer(attrs, scope),
	            inherited     = $element.inheritedData('$uiView');
	
	        scope.$on('$stateChangeSuccess', function() {
	          updateView(false);
	        });
	
	        updateView(true);
	
	        function cleanupLastView() {
	          if (previousEl) {
	            previousEl.remove();
	            previousEl = null;
	          }
	
	          if (currentScope) {
	            currentScope.$destroy();
	            currentScope = null;
	          }
	
	          if (currentEl) {
	            var $uiViewData = currentEl.data('$uiViewAnim');
	            renderer.leave(currentEl, function() {
	              $uiViewData.$$animLeave.resolve();
	              previousEl = null;
	            });
	
	            previousEl = currentEl;
	            currentEl = null;
	          }
	        }
	
	        function updateView(firstTime) {
	          var newScope,
	              name            = getUiViewName(scope, attrs, $element, $interpolate),
	              previousLocals  = name && $state.$current && $state.$current.locals[name];
	
	          if (!firstTime && previousLocals === latestLocals) return; // nothing to do
	          newScope = scope.$new();
	          latestLocals = $state.$current.locals[name];
	
	          /**
	           * @ngdoc event
	           * @name ui.router.state.directive:ui-view#$viewContentLoading
	           * @eventOf ui.router.state.directive:ui-view
	           * @eventType emits on ui-view directive scope
	           * @description
	           *
	           * Fired once the view **begins loading**, *before* the DOM is rendered.
	           *
	           * @param {Object} event Event object.
	           * @param {string} viewName Name of the view.
	           */
	          newScope.$emit('$viewContentLoading', name);
	
	          var clone = $transclude(newScope, function(clone) {
	            var animEnter = $q.defer(), animLeave = $q.defer();
	            var viewAnimData = {
	              $animEnter: animEnter.promise,
	              $animLeave: animLeave.promise,
	              $$animLeave: animLeave
	            };
	
	            clone.data('$uiViewAnim', viewAnimData);
	            renderer.enter(clone, $element, function onUiViewEnter() {
	              animEnter.resolve();
	              if(currentScope) {
	                currentScope.$emit('$viewContentAnimationEnded');
	              }
	
	              if (angular.isDefined(autoScrollExp) && !autoScrollExp || scope.$eval(autoScrollExp)) {
	                $uiViewScroll(clone);
	              }
	            });
	            cleanupLastView();
	          });
	
	          currentEl = clone;
	          currentScope = newScope;
	          /**
	           * @ngdoc event
	           * @name ui.router.state.directive:ui-view#$viewContentLoaded
	           * @eventOf ui.router.state.directive:ui-view
	           * @eventType emits on ui-view directive scope
	           * @description
	           * Fired once the view is **loaded**, *after* the DOM is rendered.
	           *
	           * @param {Object} event Event object.
	           * @param {string} viewName Name of the view.
	           */
	          currentScope.$emit('$viewContentLoaded', name);
	          currentScope.$eval(onloadExp);
	        }
	      };
	    }
	  };
	
	  return directive;
	}
	
	$ViewDirectiveFill.$inject = ['$compile', '$controller', '$state', '$interpolate'];
	function $ViewDirectiveFill (  $compile,   $controller,   $state,   $interpolate) {
	  return {
	    restrict: 'ECA',
	    priority: -400,
	    compile: function (tElement) {
	      var initial = tElement.html();
	      return function (scope, $element, attrs) {
	        var current = $state.$current,
	            name = getUiViewName(scope, attrs, $element, $interpolate),
	            locals  = current && current.locals[name];
	
	        if (! locals) {
	          return;
	        }
	
	        $element.data('$uiView', { name: name, state: locals.$$state });
	        $element.html(locals.$template ? locals.$template : initial);
	
	        var resolveData = angular.extend({}, locals);
	        scope[locals.$$resolveAs] = resolveData;
	
	        var link = $compile($element.contents());
	
	        if (locals.$$controller) {
	          locals.$scope = scope;
	          locals.$element = $element;
	          var controller = $controller(locals.$$controller, locals);
	          if (locals.$$controllerAs) {
	            scope[locals.$$controllerAs] = controller;
	            scope[locals.$$controllerAs][locals.$$resolveAs] = resolveData;
	          }
	          if (isFunction(controller.$onInit)) controller.$onInit();
	          $element.data('$ngControllerController', controller);
	          $element.children().data('$ngControllerController', controller);
	        }
	
	        link(scope);
	      };
	    }
	  };
	}
	
	/**
	 * Shared ui-view code for both directives:
	 * Given scope, element, and its attributes, return the view's name
	 */
	function getUiViewName(scope, attrs, element, $interpolate) {
	  var name = $interpolate(attrs.uiView || attrs.name || '')(scope);
	  var uiViewCreatedBy = element.inheritedData('$uiView');
	  return name.indexOf('@') >= 0 ?  name :  (name + '@' + (uiViewCreatedBy ? uiViewCreatedBy.state.name : ''));
	}
	
	angular.module('ui.router.state').directive('uiView', $ViewDirective);
	angular.module('ui.router.state').directive('uiView', $ViewDirectiveFill);
	
	function parseStateRef(ref, current) {
	  var preparsed = ref.match(/^\s*({[^}]*})\s*$/), parsed;
	  if (preparsed) ref = current + '(' + preparsed[1] + ')';
	  parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
	  if (!parsed || parsed.length !== 4) throw new Error("Invalid state ref '" + ref + "'");
	  return { state: parsed[1], paramExpr: parsed[3] || null };
	}
	
	function stateContext(el) {
	  var stateData = el.parent().inheritedData('$uiView');
	
	  if (stateData && stateData.state && stateData.state.name) {
	    return stateData.state;
	  }
	}
	
	function getTypeInfo(el) {
	  // SVGAElement does not use the href attribute, but rather the 'xlinkHref' attribute.
	  var isSvg = Object.prototype.toString.call(el.prop('href')) === '[object SVGAnimatedString]';
	  var isForm = el[0].nodeName === "FORM";
	
	  return {
	    attr: isForm ? "action" : (isSvg ? 'xlink:href' : 'href'),
	    isAnchor: el.prop("tagName").toUpperCase() === "A",
	    clickable: !isForm
	  };
	}
	
	function clickHook(el, $state, $timeout, type, current) {
	  return function(e) {
	    var button = e.which || e.button, target = current();
	
	    if (!(button > 1 || e.ctrlKey || e.metaKey || e.shiftKey || el.attr('target'))) {
	      // HACK: This is to allow ng-clicks to be processed before the transition is initiated:
	      var transition = $timeout(function() {
	        $state.go(target.state, target.params, target.options);
	      });
	      e.preventDefault();
	
	      // if the state has no URL, ignore one preventDefault from the <a> directive.
	      var ignorePreventDefaultCount = type.isAnchor && !target.href ? 1: 0;
	
	      e.preventDefault = function() {
	        if (ignorePreventDefaultCount-- <= 0) $timeout.cancel(transition);
	      };
	    }
	  };
	}
	
	function defaultOpts(el, $state) {
	  return { relative: stateContext(el) || $state.$current, inherit: true };
	}
	
	/**
	 * @ngdoc directive
	 * @name ui.router.state.directive:ui-sref
	 *
	 * @requires ui.router.state.$state
	 * @requires $timeout
	 *
	 * @restrict A
	 *
	 * @description
	 * A directive that binds a link (`<a>` tag) to a state. If the state has an associated
	 * URL, the directive will automatically generate & update the `href` attribute via
	 * the {@link ui.router.state.$state#methods_href $state.href()} method. Clicking
	 * the link will trigger a state transition with optional parameters.
	 *
	 * Also middle-clicking, right-clicking, and ctrl-clicking on the link will be
	 * handled natively by the browser.
	 *
	 * You can also use relative state paths within ui-sref, just like the relative
	 * paths passed to `$state.go()`. You just need to be aware that the path is relative
	 * to the state that the link lives in, in other words the state that loaded the
	 * template containing the link.
	 *
	 * You can specify options to pass to {@link ui.router.state.$state#methods_go $state.go()}
	 * using the `ui-sref-opts` attribute. Options are restricted to `location`, `inherit`,
	 * and `reload`.
	 *
	 * @example
	 * Here's an example of how you'd use ui-sref and how it would compile. If you have the
	 * following template:
	 * <pre>
	 * <a ui-sref="home">Home</a> | <a ui-sref="about">About</a> | <a ui-sref="{page: 2}">Next page</a>
	 *
	 * <ul>
	 *     <li ng-repeat="contact in contacts">
	 *         <a ui-sref="contacts.detail({ id: contact.id })">{{ contact.name }}</a>
	 *     </li>
	 * </ul>
	 * </pre>
	 *
	 * Then the compiled html would be (assuming Html5Mode is off and current state is contacts):
	 * <pre>
	 * <a href="#/home" ui-sref="home">Home</a> | <a href="#/about" ui-sref="about">About</a> | <a href="#/contacts?page=2" ui-sref="{page: 2}">Next page</a>
	 *
	 * <ul>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/1" ui-sref="contacts.detail({ id: contact.id })">Joe</a>
	 *     </li>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/2" ui-sref="contacts.detail({ id: contact.id })">Alice</a>
	 *     </li>
	 *     <li ng-repeat="contact in contacts">
	 *         <a href="#/contacts/3" ui-sref="contacts.detail({ id: contact.id })">Bob</a>
	 *     </li>
	 * </ul>
	 *
	 * <a ui-sref="home" ui-sref-opts="{reload: true}">Home</a>
	 * </pre>
	 *
	 * @param {string} ui-sref 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-sref-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
	 */
	$StateRefDirective.$inject = ['$state', '$timeout'];
	function $StateRefDirective($state, $timeout) {
	  return {
	    restrict: 'A',
	    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	    link: function(scope, element, attrs, uiSrefActive) {
	      var ref    = parseStateRef(attrs.uiSref, $state.current.name);
	      var def    = { state: ref.state, href: null, params: null };
	      var type   = getTypeInfo(element);
	      var active = uiSrefActive[1] || uiSrefActive[0];
	      var unlinkInfoFn = null;
	      var hookFn;
	
	      def.options = extend(defaultOpts(element, $state), attrs.uiSrefOpts ? scope.$eval(attrs.uiSrefOpts) : {});
	
	      var update = function(val) {
	        if (val) def.params = angular.copy(val);
	        def.href = $state.href(ref.state, def.params, def.options);
	
	        if (unlinkInfoFn) unlinkInfoFn();
	        if (active) unlinkInfoFn = active.$$addStateInfo(ref.state, def.params);
	        if (def.href !== null) attrs.$set(type.attr, def.href);
	      };
	
	      if (ref.paramExpr) {
	        scope.$watch(ref.paramExpr, function(val) { if (val !== def.params) update(val); }, true);
	        def.params = angular.copy(scope.$eval(ref.paramExpr));
	      }
	      update();
	
	      if (!type.clickable) return;
	      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
	      element[element.on ? 'on' : 'bind']("click", hookFn);
	      scope.$on('$destroy', function() {
	        element[element.off ? 'off' : 'unbind']("click", hookFn);
	      });
	    }
	  };
	}
	
	/**
	 * @ngdoc directive
	 * @name ui.router.state.directive:ui-state
	 *
	 * @requires ui.router.state.uiSref
	 *
	 * @restrict A
	 *
	 * @description
	 * Much like ui-sref, but will accept named $scope properties to evaluate for a state definition,
	 * params and override options.
	 *
	 * @param {string} ui-state 'stateName' can be any valid absolute or relative state
	 * @param {Object} ui-state-params params to pass to {@link ui.router.state.$state#methods_href $state.href()}
	 * @param {Object} ui-state-opts options to pass to {@link ui.router.state.$state#methods_go $state.go()}
	 */
	$StateRefDynamicDirective.$inject = ['$state', '$timeout'];
	function $StateRefDynamicDirective($state, $timeout) {
	  return {
	    restrict: 'A',
	    require: ['?^uiSrefActive', '?^uiSrefActiveEq'],
	    link: function(scope, element, attrs, uiSrefActive) {
	      var type   = getTypeInfo(element);
	      var active = uiSrefActive[1] || uiSrefActive[0];
	      var group  = [attrs.uiState, attrs.uiStateParams || null, attrs.uiStateOpts || null];
	      var watch  = '[' + group.map(function(val) { return val || 'null'; }).join(', ') + ']';
	      var def    = { state: null, params: null, options: null, href: null };
	      var unlinkInfoFn = null;
	      var hookFn;
	
	      function runStateRefLink (group) {
	        def.state = group[0]; def.params = group[1]; def.options = group[2];
	        def.href = $state.href(def.state, def.params, def.options);
	
	        if (unlinkInfoFn) unlinkInfoFn();
	        if (active) unlinkInfoFn = active.$$addStateInfo(def.state, def.params);
	        if (def.href) attrs.$set(type.attr, def.href);
	      }
	
	      scope.$watch(watch, runStateRefLink, true);
	      runStateRefLink(scope.$eval(watch));
	
	      if (!type.clickable) return;
	      hookFn = clickHook(element, $state, $timeout, type, function() { return def; });
	      element[element.on ? 'on' : 'bind']("click", hookFn);
	      scope.$on('$destroy', function() {
	        element[element.off ? 'off' : 'unbind']("click", hookFn);
	      });
	    }
	  };
	}
	
	
	/**
	 * @ngdoc directive
	 * @name ui.router.state.directive:ui-sref-active
	 *
	 * @requires ui.router.state.$state
	 * @requires ui.router.state.$stateParams
	 * @requires $interpolate
	 *
	 * @restrict A
	 *
	 * @description
	 * A directive working alongside ui-sref to add classes to an element when the
	 * related ui-sref directive's state is active, and removing them when it is inactive.
	 * The primary use-case is to simplify the special appearance of navigation menus
	 * relying on `ui-sref`, by having the "active" state's menu button appear different,
	 * distinguishing it from the inactive menu items.
	 *
	 * ui-sref-active can live on the same element as ui-sref or on a parent element. The first
	 * ui-sref-active found at the same level or above the ui-sref will be used.
	 *
	 * Will activate when the ui-sref's target state or any child state is active. If you
	 * need to activate only when the ui-sref target state is active and *not* any of
	 * it's children, then you will use
	 * {@link ui.router.state.directive:ui-sref-active-eq ui-sref-active-eq}
	 *
	 * @example
	 * Given the following template:
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item">
	 *     <a href ui-sref="app.user({user: 'bilbobaggins'})">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 *
	 *
	 * When the app state is "app.user" (or any children states), and contains the state parameter "user" with value "bilbobaggins",
	 * the resulting HTML will appear as (note the 'active' class):
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active="active" class="item active">
	 *     <a ui-sref="app.user({user: 'bilbobaggins'})" href="/users/bilbobaggins">@bilbobaggins</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 *
	 * The class name is interpolated **once** during the directives link time (any further changes to the
	 * interpolated value are ignored).
	 *
	 * Multiple classes may be specified in a space-separated format:
	 * <pre>
	 * <ul>
	 *   <li ui-sref-active='class1 class2 class3'>
	 *     <a ui-sref="app.user">link</a>
	 *   </li>
	 * </ul>
	 * </pre>
	 *
	 * It is also possible to pass ui-sref-active an expression that evaluates
	 * to an object hash, whose keys represent active class names and whose
	 * values represent the respective state names/globs.
	 * ui-sref-active will match if the current active state **includes** any of
	 * the specified state names/globs, even the abstract ones.
	 *
	 * @Example
	 * Given the following template, with "admin" being an abstract state:
	 * <pre>
	 * <div ui-sref-active="{'active': 'admin.*'}">
	 *   <a ui-sref-active="active" ui-sref="admin.roles">Roles</a>
	 * </div>
	 * </pre>
	 *
	 * When the current state is "admin.roles" the "active" class will be applied
	 * to both the <div> and <a> elements. It is important to note that the state
	 * names/globs passed to ui-sref-active shadow the state provided by ui-sref.
	 */
	
	/**
	 * @ngdoc directive
	 * @name ui.router.state.directive:ui-sref-active-eq
	 *
	 * @requires ui.router.state.$state
	 * @requires ui.router.state.$stateParams
	 * @requires $interpolate
	 *
	 * @restrict A
	 *
	 * @description
	 * The same as {@link ui.router.state.directive:ui-sref-active ui-sref-active} but will only activate
	 * when the exact target state used in the `ui-sref` is active; no child states.
	 *
	 */
	$StateRefActiveDirective.$inject = ['$state', '$stateParams', '$interpolate'];
	function $StateRefActiveDirective($state, $stateParams, $interpolate) {
	  return  {
	    restrict: "A",
	    controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
	      var states = [], activeClasses = {}, activeEqClass, uiSrefActive;
	
	      // There probably isn't much point in $observing this
	      // uiSrefActive and uiSrefActiveEq share the same directive object with some
	      // slight difference in logic routing
	      activeEqClass = $interpolate($attrs.uiSrefActiveEq || '', false)($scope);
	
	      try {
	        uiSrefActive = $scope.$eval($attrs.uiSrefActive);
	      } catch (e) {
	        // Do nothing. uiSrefActive is not a valid expression.
	        // Fall back to using $interpolate below
	      }
	      uiSrefActive = uiSrefActive || $interpolate($attrs.uiSrefActive || '', false)($scope);
	      if (isObject(uiSrefActive)) {
	        forEach(uiSrefActive, function(stateOrName, activeClass) {
	          if (isString(stateOrName)) {
	            var ref = parseStateRef(stateOrName, $state.current.name);
	            addState(ref.state, $scope.$eval(ref.paramExpr), activeClass);
	          }
	        });
	      }
	
	      // Allow uiSref to communicate with uiSrefActive[Equals]
	      this.$$addStateInfo = function (newState, newParams) {
	        // we already got an explicit state provided by ui-sref-active, so we
	        // shadow the one that comes from ui-sref
	        if (isObject(uiSrefActive) && states.length > 0) {
	          return;
	        }
	        var deregister = addState(newState, newParams, uiSrefActive);
	        update();
	        return deregister;
	      };
	
	      $scope.$on('$stateChangeSuccess', update);
	
	      function addState(stateName, stateParams, activeClass) {
	        var state = $state.get(stateName, stateContext($element));
	        var stateHash = createStateHash(stateName, stateParams);
	
	        var stateInfo = {
	          state: state || { name: stateName },
	          params: stateParams,
	          hash: stateHash
	        };
	
	        states.push(stateInfo);
	        activeClasses[stateHash] = activeClass;
	
	        return function removeState() {
	          var idx = states.indexOf(stateInfo);
	          if (idx !== -1) states.splice(idx, 1);
	        };
	      }
	
	      /**
	       * @param {string} state
	       * @param {Object|string} [params]
	       * @return {string}
	       */
	      function createStateHash(state, params) {
	        if (!isString(state)) {
	          throw new Error('state should be a string');
	        }
	        if (isObject(params)) {
	          return state + toJson(params);
	        }
	        params = $scope.$eval(params);
	        if (isObject(params)) {
	          return state + toJson(params);
	        }
	        return state;
	      }
	
	      // Update route state
	      function update() {
	        for (var i = 0; i < states.length; i++) {
	          if (anyMatch(states[i].state, states[i].params)) {
	            addClass($element, activeClasses[states[i].hash]);
	          } else {
	            removeClass($element, activeClasses[states[i].hash]);
	          }
	
	          if (exactMatch(states[i].state, states[i].params)) {
	            addClass($element, activeEqClass);
	          } else {
	            removeClass($element, activeEqClass);
	          }
	        }
	      }
	
	      function addClass(el, className) { $timeout(function () { el.addClass(className); }); }
	      function removeClass(el, className) { el.removeClass(className); }
	      function anyMatch(state, params) { return $state.includes(state.name, params); }
	      function exactMatch(state, params) { return $state.is(state.name, params); }
	
	      update();
	    }]
	  };
	}
	
	angular.module('ui.router.state')
	  .directive('uiSref', $StateRefDirective)
	  .directive('uiSrefActive', $StateRefActiveDirective)
	  .directive('uiSrefActiveEq', $StateRefActiveDirective)
	  .directive('uiState', $StateRefDynamicDirective);
	
	/**
	 * @ngdoc filter
	 * @name ui.router.state.filter:isState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_is $state.is("stateName")}.
	 */
	$IsStateFilter.$inject = ['$state'];
	function $IsStateFilter($state) {
	  var isFilter = function (state, params) {
	    return $state.is(state, params);
	  };
	  isFilter.$stateful = true;
	  return isFilter;
	}
	
	/**
	 * @ngdoc filter
	 * @name ui.router.state.filter:includedByState
	 *
	 * @requires ui.router.state.$state
	 *
	 * @description
	 * Translates to {@link ui.router.state.$state#methods_includes $state.includes('fullOrPartialStateName')}.
	 */
	$IncludedByStateFilter.$inject = ['$state'];
	function $IncludedByStateFilter($state) {
	  var includesFilter = function (state, params, options) {
	    return $state.includes(state, params, options);
	  };
	  includesFilter.$stateful = true;
	  return  includesFilter;
	}
	
	angular.module('ui.router.state')
	  .filter('isState', $IsStateFilter)
	  .filter('includedByState', $IncludedByStateFilter);
	})(window, window.angular);

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["SVGMorpheus"] = __webpack_require__(239);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(227);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
	__webpack_require__(334);
	__webpack_require__(331);
	__webpack_require__(330);
	__webpack_require__(332);
	__webpack_require__(333);
	__webpack_require__(335);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(156);
	__webpack_require__(336);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(338);
	var sidenavl_controller_1 = __webpack_require__(339);
	var content_controller_1 = __webpack_require__(337);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $urlRouterProvider.otherwise(function ($injector) {
	        var $state = $injector.get("$state");
	        $state.go("home");
	    });
	    $stateProvider.state("home", {
	        url: "/",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "": {
	                controller: home_controller_1.HomeController,
	                controllerAs: "homeCtl",
	                template: __webpack_require__(277)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(278)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(276)(),
	            }
	        }
	    });
	};


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var ngMaterialIcons = __webpack_require__(19);
	var ngMaterial = __webpack_require__(7);
	var Service = (function () {
	    function Service() {
	    }
	    return Service;
	}());
	Service._name = "svgUtils";
	Service.provider = ["$q", "$templateRequest", "$templateCache", "ngMdIconService", function ($q, $templateRequest, $templateCache, ngMdIconService) {
	        var Service = (function () {
	            function Service() {
	            }
	            Service.prototype.getAllIcons = function () {
	                return ngMdIconService.getShapes();
	            };
	            Service.prototype.loadSvgUrl = function (url) {
	                var defer = $q.defer();
	                var viewBox;
	                if ($templateCache.get(url)) {
	                    defer.resolve();
	                }
	                else {
	                    $templateRequest(url, true).then(function (response) {
	                        var svg = angular.element('<div>').append(response).find('svg')[0];
	                        viewBox = svg.attributes["viewBox"];
	                        _.each(svg.querySelectorAll("[id]"), function (g) {
	                            ngMdIconService.addShape(g.id, g.innerHTML);
	                            if (viewBox && viewBox.value) {
	                                ngMdIconService.addViewBox(g.id, viewBox.value);
	                            }
	                        });
	                        defer.resolve();
	                    }, defer.resolve);
	                }
	                return defer.promise;
	            };
	            return Service;
	        }());
	        return new Service();
	    }];
	var module = angular.module("mdSvgModule", [ngMaterialIcons, ngMaterial]);
	module.service(Service._name, Service.provider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".side-menu ul, .side-menu li {\n  padding: 0;\n  margin: 0; }\n\n.side-menu ul li button {\n  text-align: left; }\n\n.side-menu button, .side-menu a {\n  padding: 0;\n  margin: 0; }\n  .side-menu button > md-content, .side-menu a > md-content {\n    padding-left: 5px; }\n\n.side-menu .side-menu-child {\n  position: relative;\n  display: block; }\n  .side-menu .side-menu-child button, .side-menu .side-menu-child a {\n    border-radius: 0;\n    background: transparent; }\n    .side-menu .side-menu-child button:hover > md-content:before, .side-menu .side-menu-child a:hover > md-content:before {\n      display: block; }\n  .side-menu .side-menu-child > ul li button, .side-menu .side-menu-child > ul li a {\n    padding-left: 25px; }\n    .side-menu .side-menu-child > ul li button:before, .side-menu .side-menu-child > ul li a:before {\n      display: none;\n      background-color: transparent;\n      padding-left: 20px;\n      content: '';\n      position: absolute;\n      z-index: 1;\n      left: 0px;\n      top: 0;\n      bottom: 0px;\n      border-left: 3px solid #e2e2e2; }\n  .side-menu .side-menu-child .side-menu-child ul li button, .side-menu .side-menu-child .side-menu-child ul li a {\n    padding-left: 50px; }\n", ""]);
	
	// exports


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".logo {\n  height: 64px;\n  min-height: 64px !important;\n  line-height: 64px;\n  margin: 5px;\n  padding-left: 64px;\n  background: transparent url(" + __webpack_require__(353) + ") no-repeat top left;\n  background-size: contain; }\n  .logo.center {\n    background-position: top center;\n    height: 150px; }\n\n.gridster .gridster-item {\n  overflow: hidden; }\n\n.md-no-padding {\n  padding: 0; }\n", ""]);
	
	// exports


/***/ },

/***/ 239:
/***/ function(module, exports) {

	/*!
	 * SVG Morpheus v0.3.0
	 * https://github.com/alexk111/SVG-Morpheus
	 *
	 * Copyright (c) 2016 Alex Kaul
	 * License: MIT
	 *
	 * Generated at Saturday, May 7th, 2016, 4:52:57 PM
	 */
	var SVGMorpheus=(function() {
	'use strict';
	
	/*
	 * Easing functions
	 */
	
	var easings={};
	easings['circ-in']=function (t) {
	  return -1 * (Math.sqrt(1 - t*t) - 1);
	};
	easings['circ-out']=function (t) {
	  return Math.sqrt(1 - (t=t-1)*t);
	};
	easings['circ-in-out']=function (t) {
	  if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
	  return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
	};
	easings['cubic-in']=function (t) { return t*t*t };
	easings['cubic-out']=function (t) { return (--t)*t*t+1 };
	easings['cubic-in-out']=function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
	easings['elastic-in']=function (t) {
	  var s=1.70158;var p=0;var a=1;
	  if (t==0) return 0;  if (t==1) return 1;  if (!p) p=.3;
	  if (a < Math.abs(1)) { a=1; var s=p/4; }
	  else var s = p/(2*Math.PI) * Math.asin (1/a);
	  return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t-s)*(2*Math.PI)/p ));
	};
	easings['elastic-out']=function (t) {
	  var s=1.70158;var p=0;var a=1;
	  if (t==0) return 0;  if (t==1) return 1;  if (!p) p=.3;
	  if (a < Math.abs(1)) { a=1; var s=p/4; }
	  else var s = p/(2*Math.PI) * Math.asin (1/a);
	  return a*Math.pow(2,-10*t) * Math.sin( (t-s)*(2*Math.PI)/p ) + 1;
	};
	easings['elastic-in-out']=function (t) {
	  var s=1.70158;var p=0;var a=1;
	  if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
	  if (a < Math.abs(1)) { a=1; var s=p/4; }
	  else var s = p/(2*Math.PI) * Math.asin (1/a);
	  if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t-s)*(2*Math.PI)/p ));
	  return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t-s)*(2*Math.PI)/p )*.5 + 1;
	};
	easings['expo-in']=function (t) {
	  return (t==0) ? 0 : Math.pow(2, 10 * (t - 1));
	};
	easings['expo-out']=function (t) {
	  return (t==1) ? 1 : 1-Math.pow(2, -10 * t);
	};
	easings['expo-in-out']=function (t) {
	  if (t==0) return 0;
	  if (t==1) return 1;
	  if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
	  return 1/2 * (-Math.pow(2, -10 * --t) + 2);
	};
	easings['linear']=function (t) { return t };
	easings['quad-in']=function (t) { return t*t };
	easings['quad-out']=function (t) { return t*(2-t) };
	easings['quad-in-out']=function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };
	easings['quart-in']=function (t) { return t*t*t*t };
	easings['quart-out']=function (t) { return 1-(--t)*t*t*t };
	easings['quart-in-out']=function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t };
	easings['quint-in']=function (t) { return t*t*t*t*t };
	easings['quint-out']=function (t) { return 1+(--t)*t*t*t*t };
	easings['quint-in-out']=function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t };
	easings['sine-in']=function (t) {
	  return 1-Math.cos(t * (Math.PI/2));
	};
	easings['sine-out']=function (t) {
	  return Math.sin(t * (Math.PI/2));
	};
	easings['sine-in-out']=function (t) {
	  return 1/2 * (1-Math.cos(Math.PI*t));
	};
	
	
	/*
	 * Helper functions
	 */
	
	var _reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
	var _cancelAnimFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame;
	
	// Calculate style
	function styleNormCalc(styleNormFrom, styleNormTo, progress) {
	  var i, len, styleNorm={};
	  for(i in styleNormFrom) {
	    switch (i) {
	      case 'fill':
	      case 'stroke':
	        styleNorm[i]=clone(styleNormFrom[i]);
	        styleNorm[i].r=styleNormFrom[i].r+(styleNormTo[i].r-styleNormFrom[i].r)*progress;
	        styleNorm[i].g=styleNormFrom[i].g+(styleNormTo[i].g-styleNormFrom[i].g)*progress;
	        styleNorm[i].b=styleNormFrom[i].b+(styleNormTo[i].b-styleNormFrom[i].b)*progress;
	        styleNorm[i].opacity=styleNormFrom[i].opacity+(styleNormTo[i].opacity-styleNormFrom[i].opacity)*progress;
	        break;
	      case 'opacity':
	      case 'fill-opacity':
	      case 'stroke-opacity':
	      case 'stroke-width':
	        styleNorm[i]=styleNormFrom[i]+(styleNormTo[i]-styleNormFrom[i])*progress;
	        break;
	    }
	  }
	  return styleNorm;
	}
	
	function styleNormToString(styleNorm) {
	  var i;
	  var style={};
	  for(i in styleNorm) {
	    switch (i) {
	      case 'fill':
	      case 'stroke':
	        style[i]=rgbToString(styleNorm[i]);
	        break;
	      case 'opacity':
	      case 'fill-opacity':
	      case 'stroke-opacity':
	      case 'stroke-width':
	        style[i]=styleNorm[i];
	        break;
	    }
	  }
	  return style;
	}
	
	function styleToNorm(styleFrom, styleTo) {
	  var styleNorm=[{},{}];
	  var i;
	  for(i in styleFrom) {
	    switch(i) {
	      case 'fill':
	      case 'stroke':
	        styleNorm[0][i]=getRGB(styleFrom[i]);
	        if(styleTo[i]===undefined) {
	          styleNorm[1][i]=getRGB(styleFrom[i]);
	          styleNorm[1][i].opacity=0;
	        }
	        break;
	      case 'opacity':
	      case 'fill-opacity':
	      case 'stroke-opacity':
	      case 'stroke-width':
	        styleNorm[0][i]=styleFrom[i];
	        if(styleTo[i]===undefined) {
	          styleNorm[1][i]=1;
	        }
	        break;
	    }
	  }
	  for(i in styleTo) {
	    switch(i) {
	      case 'fill':
	      case 'stroke':
	        styleNorm[1][i]=getRGB(styleTo[i]);
	        if(styleFrom[i]===undefined) {
	          styleNorm[0][i]=getRGB(styleTo[i]);
	          styleNorm[0][i].opacity=0;
	        }
	        break;
	      case 'opacity':
	      case 'fill-opacity':
	      case 'stroke-opacity':
	      case 'stroke-width':
	        styleNorm[1][i]=styleTo[i];
	        if(styleFrom[i]===undefined) {
	          styleNorm[0][i]=1;
	        }
	        break;
	    }
	  }
	  return styleNorm;
	}
	
	// Calculate transform progress
	function transCalc(transFrom, transTo, progress) {
	  var res={};
	  for(var i in transFrom) {
	    switch(i) {
	      case 'rotate':
	        res[i]=[0,0,0];
	        for(var j=0;j<3;j++) {
	          res[i][j]=transFrom[i][j]+(transTo[i][j]-transFrom[i][j])*progress;
	        }
	        break;
	    }
	  }
	  return res;
	}
	
	function trans2string(trans) {
	  var res='';
	  if(!!trans.rotate) {
	    res+='rotate('+trans.rotate.join(' ')+')';
	  }
	  return res;
	}
	
	// Calculate curve progress
	function curveCalc(curveFrom, curveTo, progress) {
	  var curve=[];
	  for(var i=0,len1=curveFrom.length;i<len1;i++) {
	    curve.push([curveFrom[i][0]]);
	    for(var j=1,len2=curveFrom[i].length;j<len2;j++) {
	      curve[i].push(curveFrom[i][j]+(curveTo[i][j]-curveFrom[i][j])*progress);
	    }
	  }
	  return curve;
	}
	
	function clone(obj) {
	  var copy;
	
	  // Handle Array
	  if (obj instanceof Array) {
	    copy = [];
	    for (var i = 0, len = obj.length; i < len; i++) {
	      copy[i] = clone(obj[i]);
	    }
	    return copy;
	  }
	
	  // Handle Object
	  if (obj instanceof Object) {
	    copy = {};
	    for (var attr in obj) {
	      if (obj.hasOwnProperty(attr)) {
	        copy[attr] = clone(obj[attr]);
	      }
	    }
	    return copy;
	  }
	
	  return obj;
	}
	
	
	
	/*
	 * Useful things from Adobe's Snap.svg adopted to the library needs
	 */
	
	/*
	 * Paths
	 */
	
	var spaces = "\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
	var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
	var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");
	
	// Parses given path string into an array of arrays of path segments
	var parsePathString = function (pathString) {
	  if (!pathString) {
	    return null;
	  }
	
	  if(typeof pathString === typeof []) {
	    return pathString;
	  } else {
	    var paramCounts = {a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0},
	        data = [];
	
	    String(pathString).replace(pathCommand, function (a, b, c) {
	      var params = [],
	          name = b.toLowerCase();
	      c.replace(pathValues, function (a, b) {
	        b && params.push(+b);
	      });
	      if (name == "m" && params.length > 2) {
	        data.push([b].concat(params.splice(0, 2)));
	        name = "l";
	        b = b == "m" ? "l" : "L";
	      }
	      if (name == "o" && params.length == 1) {
	        data.push([b, params[0]]);
	      }
	      if (name == "r") {
	        data.push([b].concat(params));
	      } else while (params.length >= paramCounts[name]) {
	        data.push([b].concat(params.splice(0, paramCounts[name])));
	        if (!paramCounts[name]) {
	          break;
	        }
	      }
	    });
	
	    return data;
	  }
	};
	
	// http://schepers.cc/getting-to-the-point
	var catmullRom2bezier=function(crp, z) {
	  var d = [];
	  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	    var p = [
	              {x: +crp[i - 2], y: +crp[i - 1]},
	              {x: +crp[i],     y: +crp[i + 1]},
	              {x: +crp[i + 2], y: +crp[i + 3]},
	              {x: +crp[i + 4], y: +crp[i + 5]}
	            ];
	    if (z) {
	      if (!i) {
	        p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
	      } else if (iLen - 4 == i) {
	        p[3] = {x: +crp[0], y: +crp[1]};
	      } else if (iLen - 2 == i) {
	        p[2] = {x: +crp[0], y: +crp[1]};
	        p[3] = {x: +crp[2], y: +crp[3]};
	      }
	    } else {
	      if (iLen - 4 == i) {
	        p[3] = p[2];
	      } else if (!i) {
	        p[0] = {x: +crp[i], y: +crp[i + 1]};
	      }
	    }
	    d.push(["C",
	          (-p[0].x + 6 * p[1].x + p[2].x) / 6,
	          (-p[0].y + 6 * p[1].y + p[2].y) / 6,
	          (p[1].x + 6 * p[2].x - p[3].x) / 6,
	          (p[1].y + 6*p[2].y - p[3].y) / 6,
	          p[2].x,
	          p[2].y
	    ]);
	  }
	
	  return d;
	
	};
	
	var ellipsePath=function(x, y, rx, ry, a) {
	  if (a == null && ry == null) {
	    ry = rx;
	  }
	  x = +x;
	  y = +y;
	  rx = +rx;
	  ry = +ry;
	  if (a != null) {
	    var rad = Math.PI / 180,
	        x1 = x + rx * Math.cos(-ry * rad),
	        x2 = x + rx * Math.cos(-a * rad),
	        y1 = y + rx * Math.sin(-ry * rad),
	        y2 = y + rx * Math.sin(-a * rad),
	        res = [["M", x1, y1], ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
	  } else {
	    res = [
	        ["M", x, y],
	        ["m", 0, -ry],
	        ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
	        ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
	        ["z"]
	    ];
	  }
	  return res;
	};
	
	var pathToAbsolute=function(pathArray) {
	  pathArray = parsePathString(pathArray);
	
	  if (!pathArray || !pathArray.length) {
	    return [["M", 0, 0]];
	  }
	  var res = [],
	      x = 0,
	      y = 0,
	      mx = 0,
	      my = 0,
	      start = 0,
	      pa0;
	  if (pathArray[0][0] == "M") {
	    x = +pathArray[0][1];
	    y = +pathArray[0][2];
	    mx = x;
	    my = y;
	    start++;
	    res[0] = ["M", x, y];
	  }
	  var crz = pathArray.length == 3 &&
	      pathArray[0][0] == "M" &&
	      pathArray[1][0].toUpperCase() == "R" &&
	      pathArray[2][0].toUpperCase() == "Z";
	  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	    res.push(r = []);
	    pa = pathArray[i];
	    pa0 = pa[0];
	    if (pa0 != pa0.toUpperCase()) {
	      r[0] = pa0.toUpperCase();
	      switch (r[0]) {
	        case "A":
	          r[1] = pa[1];
	          r[2] = pa[2];
	          r[3] = pa[3];
	          r[4] = pa[4];
	          r[5] = pa[5];
	          r[6] = +pa[6] + x;
	          r[7] = +pa[7] + y;
	          break;
	        case "V":
	          r[1] = +pa[1] + y;
	          break;
	        case "H":
	          r[1] = +pa[1] + x;
	          break;
	        case "R":
	          var dots = [x, y].concat(pa.slice(1));
	          for (var j = 2, jj = dots.length; j < jj; j++) {
	            dots[j] = +dots[j] + x;
	            dots[++j] = +dots[j] + y;
	          }
	          res.pop();
	          res = res.concat(catmullRom2bezier(dots, crz));
	          break;
	        case "O":
	          res.pop();
	          dots = ellipsePath(x, y, pa[1], pa[2]);
	          dots.push(dots[0]);
	          res = res.concat(dots);
	          break;
	        case "U":
	          res.pop();
	          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	          r = ["U"].concat(res[res.length - 1].slice(-2));
	          break;
	        case "M":
	          mx = +pa[1] + x;
	          my = +pa[2] + y;
	        default:
	          for (j = 1, jj = pa.length; j < jj; j++) {
	            r[j] = +pa[j] + ((j % 2) ? x : y);
	          }
	      }
	    } else if (pa0 == "R") {
	      dots = [x, y].concat(pa.slice(1));
	      res.pop();
	      res = res.concat(catmullRom2bezier(dots, crz));
	      r = ["R"].concat(pa.slice(-2));
	    } else if (pa0 == "O") {
	      res.pop();
	      dots = ellipsePath(x, y, pa[1], pa[2]);
	      dots.push(dots[0]);
	      res = res.concat(dots);
	    } else if (pa0 == "U") {
	      res.pop();
	      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	      r = ["U"].concat(res[res.length - 1].slice(-2));
	    } else {
	      for (var k = 0, kk = pa.length; k < kk; k++) {
	        r[k] = pa[k];
	      }
	    }
	    pa0 = pa0.toUpperCase();
	    if (pa0 != "O") {
	      switch (r[0]) {
	        case "Z":
	          x = +mx;
	          y = +my;
	          break;
	        case "H":
	          x = r[1];
	          break;
	        case "V":
	          y = r[1];
	          break;
	        case "M":
	          mx = r[r.length - 2];
	          my = r[r.length - 1];
	        default:
	          x = r[r.length - 2];
	          y = r[r.length - 1];
	      }
	    }
	  }
	
	  return res;
	};
	
	var l2c = function(x1, y1, x2, y2) {
	  return [x1, y1, x2, y2, x2, y2];
	};
	var q2c = function(x1, y1, ax, ay, x2, y2) {
	  var _13 = 1 / 3,
	      _23 = 2 / 3;
	  return [
	          _13 * x1 + _23 * ax,
	          _13 * y1 + _23 * ay,
	          _13 * x2 + _23 * ax,
	          _13 * y2 + _23 * ay,
	          x2,
	          y2
	      ];
	};
	var a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	  // for more information of where this math came from visit:
	  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	  var _120 = Math.PI * 120 / 180,
	      rad = Math.PI / 180 * (+angle || 0),
	      res = [],
	      xy,
	      rotate = function (x, y, rad) {
	          var X = x * Math.cos(rad) - y * Math.sin(rad),
	              Y = x * Math.sin(rad) + y * Math.cos(rad);
	          return {x: X, y: Y};
	      };
	  if (!recursive) {
	    xy = rotate(x1, y1, -rad);
	    x1 = xy.x;
	    y1 = xy.y;
	    xy = rotate(x2, y2, -rad);
	    x2 = xy.x;
	    y2 = xy.y;
	    var cos = Math.cos(Math.PI / 180 * angle),
	        sin = Math.sin(Math.PI / 180 * angle),
	        x = (x1 - x2) / 2,
	        y = (y1 - y2) / 2;
	    var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	    if (h > 1) {
	      h = Math.sqrt(h);
	      rx = h * rx;
	      ry = h * ry;
	    }
	    var rx2 = rx * rx,
	        ry2 = ry * ry,
	        k = (large_arc_flag == sweep_flag ? -1 : 1) *
	            Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	        cx = k * rx * y / ry + (x1 + x2) / 2,
	        cy = k * -ry * x / rx + (y1 + y2) / 2,
	        f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
	        f2 = Math.asin(((y2 - cy) / ry).toFixed(9));
	
	    f1 = x1 < cx ? Math.PI - f1 : f1;
	    f2 = x2 < cx ? Math.PI - f2 : f2;
	    f1 < 0 && (f1 = Math.PI * 2 + f1);
	    f2 < 0 && (f2 = Math.PI * 2 + f2);
	    if (sweep_flag && f1 > f2) {
	      f1 = f1 - Math.PI * 2;
	    }
	    if (!sweep_flag && f2 > f1) {
	      f2 = f2 - Math.PI * 2;
	    }
	  } else {
	    f1 = recursive[0];
	    f2 = recursive[1];
	    cx = recursive[2];
	    cy = recursive[3];
	  }
	  var df = f2 - f1;
	  if (Math.abs(df) > _120) {
	    var f2old = f2,
	        x2old = x2,
	        y2old = y2;
	    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	    x2 = cx + rx * Math.cos(f2);
	    y2 = cy + ry * Math.sin(f2);
	    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	  }
	  df = f2 - f1;
	  var c1 = Math.cos(f1),
	      s1 = Math.sin(f1),
	      c2 = Math.cos(f2),
	      s2 = Math.sin(f2),
	      t = Math.tan(df / 4),
	      hx = 4 / 3 * rx * t,
	      hy = 4 / 3 * ry * t,
	      m1 = [x1, y1],
	      m2 = [x1 + hx * s1, y1 - hy * c1],
	      m3 = [x2 + hx * s2, y2 - hy * c2],
	      m4 = [x2, y2];
	  m2[0] = 2 * m1[0] - m2[0];
	  m2[1] = 2 * m1[1] - m2[1];
	  if (recursive) {
	    return [m2, m3, m4].concat(res);
	  } else {
	    res = [m2, m3, m4].concat(res).join().split(",");
	    var newres = [];
	    for (var i = 0, ii = res.length; i < ii; i++) {
	      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	    }
	    return newres;
	  }
	};
	
	var path2curve=function(path, path2) {
	  var p = pathToAbsolute(path),
	      p2 = path2 && pathToAbsolute(path2),
	      attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
	      attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
	      processPath = function (path, d, pcom) {
	        var nx, ny;
	        if (!path) {
	          return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	        }
	        !(path[0] in {T: 1, Q: 1}) && (d.qx = d.qy = null);
	        switch (path[0]) {
	          case "M":
	            d.X = path[1];
	            d.Y = path[2];
	            break;
	          case "A":
	            path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
	            break;
	          case "S":
	            if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
	              nx = d.x * 2 - d.bx;          // And reflect the previous
	              ny = d.y * 2 - d.by;          // command's control point relative to the current point.
	            }
	            else {                            // or some else or nothing
	              nx = d.x;
	              ny = d.y;
	            }
	            path = ["C", nx, ny].concat(path.slice(1));
	            break;
	          case "T":
	            if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
	              d.qx = d.x * 2 - d.qx;        // And make a reflection similar
	              d.qy = d.y * 2 - d.qy;        // to case "S".
	            }
	            else {                            // or something else or nothing
	              d.qx = d.x;
	              d.qy = d.y;
	            }
	            path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	            break;
	          case "Q":
	            d.qx = path[1];
	            d.qy = path[2];
	            path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	            break;
	          case "L":
	            path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
	            break;
	          case "H":
	            path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
	            break;
	          case "V":
	            path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
	            break;
	          case "Z":
	            path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
	            break;
	        }
	        return path;
	      },
	      fixArc = function (pp, i) {
	        if (pp[i].length > 7) {
	          pp[i].shift();
	          var pi = pp[i];
	          while (pi.length) {
	            pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
	            p2 && (pcoms2[i] = "A"); // the same as above
	            pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
	          }
	          pp.splice(i, 1);
	          ii = Math.max(p.length, p2 && p2.length || 0);
	        }
	      },
	      fixM = function (path1, path2, a1, a2, i) {
	        if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	          path2.splice(i, 0, ["M", a2.x, a2.y]);
	          a1.bx = 0;
	          a1.by = 0;
	          a1.x = path1[i][1];
	          a1.y = path1[i][2];
	          ii = Math.max(p.length, p2 && p2.length || 0);
	        }
	      },
	      pcoms1 = [], // path commands of original path p
	      pcoms2 = [], // path commands of original path p2
	      pfirst = "", // temporary holder for original path command
	      pcom = ""; // holder for previous path command of original path
	  for (var i = 0, ii = Math.max(p.length, p2 && p2.length || 0); i < ii; i++) {
	    p[i] && (pfirst = p[i][0]); // save current path command
	
	    if (pfirst != "C") { // C is not saved yet, because it may be result of conversion
	      pcoms1[i] = pfirst; // Save current path command
	      i && ( pcom = pcoms1[i - 1]); // Get previous path command pcom
	    }
	    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath
	
	    if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	    // which may produce multiple C:s
	    // so we have to make sure that C is also C in original path
	
	    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1
	
	    if (p2) { // the same procedures is done to p2
	      p2[i] && (pfirst = p2[i][0]);
	      if (pfirst != "C") {
	        pcoms2[i] = pfirst;
	        i && (pcom = pcoms2[i - 1]);
	      }
	      p2[i] = processPath(p2[i], attrs2, pcom);
	
	      if (pcoms2[i] != "A" && pfirst == "C") {
	        pcoms2[i] = "C";
	      }
	
	      fixArc(p2, i);
	    }
	    fixM(p, p2, attrs, attrs2, i);
	    fixM(p2, p, attrs2, attrs, i);
	    var seg = p[i],
	        seg2 = p2 && p2[i],
	        seglen = seg.length,
	        seg2len = p2 && seg2.length;
	    attrs.x = seg[seglen - 2];
	    attrs.y = seg[seglen - 1];
	    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
	    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
	    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
	    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
	    attrs2.x = p2 && seg2[seg2len - 2];
	    attrs2.y = p2 && seg2[seg2len - 1];
	  }
	
	  return p2 ? [p, p2] : p;
	};
	
	var box=function(x, y, width, height) {
	  if (x == null) {
	    x = y = width = height = 0;
	  }
	  if (y == null) {
	    y = x.y;
	    width = x.width;
	    height = x.height;
	    x = x.x;
	  }
	  return {
	    x: x,
	    y: y,
	    w: width,
	    h: height,
	    cx: x + width / 2,
	    cy: y + height / 2
	  };
	};
	
	// Returns bounding box of cubic bezier curve.
	// Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
	// Original version: NISHIO Hirokazu
	// Modifications: https://github.com/timo22345
	var curveDim=function(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var tvalues = [],
	      bounds = [[], []],
	      a, b, c, t, t1, t2, b2ac, sqrtb2ac;
	  for (var i = 0; i < 2; ++i) {
	    if (i == 0) {
	      b = 6 * x0 - 12 * x1 + 6 * x2;
	      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
	      c = 3 * x1 - 3 * x0;
	    } else {
	      b = 6 * y0 - 12 * y1 + 6 * y2;
	      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
	      c = 3 * y1 - 3 * y0;
	    }
	    if (Math.abs(a) < 1e-12) {
	      if (Math.abs(b) < 1e-12) {
	        continue;
	      }
	      t = -c / b;
	      if (0 < t && t < 1) {
	        tvalues.push(t);
	      }
	      continue;
	    }
	    b2ac = b * b - 4 * c * a;
	    sqrtb2ac = Math.sqrt(b2ac);
	    if (b2ac < 0) {
	      continue;
	    }
	    t1 = (-b + sqrtb2ac) / (2 * a);
	    if (0 < t1 && t1 < 1) {
	      tvalues.push(t1);
	    }
	    t2 = (-b - sqrtb2ac) / (2 * a);
	    if (0 < t2 && t2 < 1) {
	      tvalues.push(t2);
	    }
	  }
	
	  var x, y, j = tvalues.length,
	      jlen = j,
	      mt;
	  while (j--) {
	    t = tvalues[j];
	    mt = 1 - t;
	    bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
	    bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
	  }
	
	  bounds[0][jlen] = x0;
	  bounds[1][jlen] = y0;
	  bounds[0][jlen + 1] = x3;
	  bounds[1][jlen + 1] = y3;
	  bounds[0].length = bounds[1].length = jlen + 2;
	
	  return {
	    min: {x: Math.min.apply(0, bounds[0]), y: Math.min.apply(0, bounds[1])},
	    max: {x: Math.max.apply(0, bounds[0]), y: Math.max.apply(0, bounds[1])}
	  };
	};
	
	var curvePathBBox=function(path) {
	  var x = 0,
	      y = 0,
	      X = [],
	      Y = [],
	      p;
	  for (var i = 0, ii = path.length; i < ii; i++) {
	    p = path[i];
	    if (p[0] == "M") {
	      x = p[1];
	      y = p[2];
	      X.push(x);
	      Y.push(y);
	    } else {
	      var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
	      X = X.concat(dim.min.x, dim.max.x);
	      Y = Y.concat(dim.min.y, dim.max.y);
	      x = p[5];
	      y = p[6];
	    }
	  }
	  var xmin = Math.min.apply(0, X),
	      ymin = Math.min.apply(0, Y),
	      xmax = Math.max.apply(0, X),
	      ymax = Math.max.apply(0, Y),
	      bb = box(xmin, ymin, xmax - xmin, ymax - ymin);
	
	  return bb;
	};
	
	var p2s=/,?([a-z]),?/gi;
	var path2string=function(path) {
	  return path.join(',').replace(p2s, "$1");
	};
	
	/*
	 * Styles
	 */
	
	var hsrg = {hs: 1, rg: 1},
	    has = "hasOwnProperty",
	    colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
	    commaSpaces = new RegExp("[" + spaces + "]*,[" + spaces + "]*");
	
	// Converts RGB values to a hex representation of the color
	// var rgb = function (r, g, b, o) {
	//   if (isFinite(o)) {
	//     var round = math.round;
	//     return "rgba(" + [round(r), round(g), round(b), +o.toFixed(2)] + ")";
	//   }
	//   return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
	// };
	var rgbToString = function (rgb) {
	  var round = Math.round;
	  return "rgba(" + [round(rgb.r), round(rgb.g), round(rgb.b), +rgb.opacity.toFixed(2)] + ")";
	};
	var toHex = function (color) {
	  var i = window.document.getElementsByTagName("head")[0] || window.document.getElementsByTagName("svg")[0],
	      red = "rgb(255, 0, 0)";
	  toHex = function (color) {
	    if (color.toLowerCase() == "red") {
	      return red;
	    }
	    i.style.color = red;
	    i.style.color = color;
	    var out = window.document.defaultView.getComputedStyle(i, "").getPropertyValue("color");
	    return out == red ? null : out;
	  };
	  return toHex(color);
	};
	
	var packageRGB = function (r, g, b, o) {
	  r = Math.round(r * 255);
	  g = Math.round(g * 255);
	  b = Math.round(b * 255);
	  var rgb = {
	      r: r,
	      g: g,
	      b: b,
	      opacity: isFinite(o) ? o : 1
	  };
	  return rgb;
	};
	
	// Converts HSB values to an RGB object
	var hsb2rgb = function (h, s, v, o) {
	  if (typeof h === typeof {} && "h" in h && "s" in h && "b" in h) {
	      v = h.b;
	      s = h.s;
	      h = h.h;
	      o = h.o;
	  }
	  h *= 360;
	  var R, G, B, X, C;
	  h = (h % 360) / 60;
	  C = v * s;
	  X = C * (1 - Math.abs(h % 2 - 1));
	  R = G = B = v - C;
	
	  h = ~~h;
	  R += [C, X, 0, 0, X, C][h];
	  G += [X, C, C, X, 0, 0][h];
	  B += [0, 0, X, C, C, X][h];
	  return packageRGB(R, G, B, o);
	};
	
	// Converts HSL values to an RGB object
	var hsl2rgb = function (h, s, l, o) {
	  if (typeof h === typeof {} && "h" in h && "s" in h && "l" in h) {
	    l = h.l;
	    s = h.s;
	    h = h.h;
	  }
	  if (h > 1 || s > 1 || l > 1) {
	    h /= 360;
	    s /= 100;
	    l /= 100;
	  }
	  h *= 360;
	  var R, G, B, X, C;
	  h = (h % 360) / 60;
	  C = 2 * s * (l < .5 ? l : 1 - l);
	  X = C * (1 - Math.abs(h % 2 - 1));
	  R = G = B = l - C / 2;
	
	  h = ~~h;
	  R += [C, X, 0, 0, X, C][h];
	  G += [X, C, C, X, 0, 0][h];
	  B += [0, 0, X, C, C, X][h];
	  return packageRGB(R, G, B, o);
	};
	
	// Parses color string as RGB object
	var getRGB = function (colour) {
	  if (!colour || !!((colour = String(colour)).indexOf("-") + 1)) {
	    return {r: -1, g: -1, b: -1, opacity: -1, error: 1};
	  }
	  if (colour == "none") {
	    return {r: -1, g: -1, b: -1, opacity: -1};
	  }
	  !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
	  if (!colour) {
	    return {r: -1, g: -1, b: -1, opacity: -1, error: 1};
	  }
	  var res,
	      red,
	      green,
	      blue,
	      opacity,
	      t,
	      values,
	      rgb = colour.match(colourRegExp);
	  if (rgb) {
	    if (rgb[2]) {
	      blue = parseInt(rgb[2].substring(5), 16);
	      green = parseInt(rgb[2].substring(3, 5), 16);
	      red = parseInt(rgb[2].substring(1, 3), 16);
	    }
	    if (rgb[3]) {
	      blue = parseInt((t = rgb[3].charAt(3)) + t, 16);
	      green = parseInt((t = rgb[3].charAt(2)) + t, 16);
	      red = parseInt((t = rgb[3].charAt(1)) + t, 16);
	    }
	    if (rgb[4]) {
	      values = rgb[4].split(commaSpaces);
	      red = parseFloat(values[0]);
	      values[0].slice(-1) == "%" && (red *= 2.55);
	      green = parseFloat(values[1]);
	      values[1].slice(-1) == "%" && (green *= 2.55);
	      blue = parseFloat(values[2]);
	      values[2].slice(-1) == "%" && (blue *= 2.55);
	      rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = parseFloat(values[3]));
	      values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	    }
	    if (rgb[5]) {
	      values = rgb[5].split(commaSpaces);
	      red = parseFloat(values[0]);
	      values[0].slice(-1) == "%" && (red /= 100);
	      green = parseFloat(values[1]);
	      values[1].slice(-1) == "%" && (green /= 100);
	      blue = parseFloat(values[2]);
	      values[2].slice(-1) == "%" && (blue /= 100);
	      (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	      rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = parseFloat(values[3]));
	      values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	      return hsb2rgb(red, green, blue, opacity);
	    }
	    if (rgb[6]) {
	      values = rgb[6].split(commaSpaces);
	      red = parseFloat(values[0]);
	      values[0].slice(-1) == "%" && (red /= 100);
	      green = parseFloat(values[1]);
	      values[1].slice(-1) == "%" && (green /= 100);
	      blue = parseFloat(values[2]);
	      values[2].slice(-1) == "%" && (blue /= 100);
	      (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
	      rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = parseFloat(values[3]));
	      values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
	      return hsl2rgb(red, green, blue, opacity);
	    }
	    red = Math.min(Math.round(red), 255);
	    green = Math.min(Math.round(green), 255);
	    blue = Math.min(Math.round(blue), 255);
	    opacity = Math.min(Math.max(opacity, 0), 1);
	    rgb = {r: red, g: green, b: blue};
	    rgb.opacity = isFinite(opacity) ? opacity : 1;
	    return rgb;
	  }
	  return {r: -1, g: -1, b: -1, opacity: -1, error: 1};
	};
	
	function SVGMorpheus(element, options, callback) {
	  if (!element) {
	    throw new Error('SVGMorpheus > "element" is required');
	  }
	
	  if(typeof element === typeof '') {
	    element=document.querySelector(element);
	    if (!element) {
	      throw new Error('SVGMorpheus > "element" query is not related to an existing DOM node');
	    }
	  }
	
	  if (!!options && typeof options !== typeof {}) {
	    throw new Error('SVGMorpheus > "options" parameter must be an object');
	  }
	  options = options || {};
	
	  if (!!callback && typeof callback !== typeof (function(){})) {
	    throw new Error('SVGMorpheus > "callback" parameter must be a function');
	  }
	
	  var that=this;
	
	  this._icons={};
	  this._curIconId=options.iconId || '';
	  this._toIconId='';
	  this._curIconItems=[];
	  this._fromIconItems=[];
	  this._toIconItems=[];
	  this._morphNodes=[];
	  this._morphG;
	  this._startTime;
	  this._defDuration=options.duration || 750;
	  this._defEasing=options.easing || 'quad-in-out';
	  this._defRotation=options.rotation || 'clock';
	  this._defCallback = callback || function () {};
	  this._duration=this._defDuration;
	  this._easing=this._defEasing;
	  this._rotation=this._defRotation;
	  this._callback=this._defCallback;
	  this._rafid;
	
	  this._fnTick=function(timePassed) {
	    if(!that._startTime) {
	      that._startTime=timePassed;
	    }
	    var progress=Math.min((timePassed-that._startTime)/that._duration,1);
	    that._updateAnimationProgress(progress);
	    if(progress<1) {
	      that._rafid=_reqAnimFrame(that._fnTick);
	    } else {
	      if (that._toIconId != '') {
	        that._animationEnd();
	      }
	    }
	  };
	
	  if(element.nodeName.toUpperCase()==='SVG') {
	    this._svgDoc=element;
	  } else {
	    this._svgDoc = element.getSVGDocument();
	  }
	  if(!this._svgDoc) {
	    element.addEventListener("load",function(){
	      that._svgDoc = element.getSVGDocument();
	      that._init();
	    },false);
	  } else {
	    that._init();
	  }
	}
	
	SVGMorpheus.prototype._init=function(){
	  if(this._svgDoc.nodeName.toUpperCase()!=='SVG') {
	    this._svgDoc=this._svgDoc.getElementsByTagName('svg')[0];
	  }
	
	  if(!!this._svgDoc) {
	    var lastIconId='',
	        i, len, id, items, item, j, len2, icon;
	
	    // Read Icons Data
	    // Icons = 1st tier G nodes having ID
	    for(i=this._svgDoc.childNodes.length-1;i>=0;i--) {
	      var nodeIcon=this._svgDoc.childNodes[i];
	      if(nodeIcon.nodeName.toUpperCase()==='G') {
	        id=nodeIcon.getAttribute('id');
	        if(!!id) {
	          items=[];
	          for(j=0, len2=nodeIcon.childNodes.length;j<len2;j++) {
	            var nodeItem=nodeIcon.childNodes[j];
	            item={
	              path: '',
	              attrs: {},
	              style: {}
	            };
	
	            // Get Item Path (Convert all shapes into Path Data)
	            switch(nodeItem.nodeName.toUpperCase()) {
	              case 'PATH':
	                item.path=nodeItem.getAttribute('d');
	                break;
	              case 'CIRCLE':
	                var cx=nodeItem.getAttribute('cx')*1,
	                    cy=nodeItem.getAttribute('cy')*1,
	                    r=nodeItem.getAttribute('r')*1;
	                item.path='M'+(cx-r)+','+cy+'a'+r+','+r+' 0 1,0 '+(r*2)+',0a'+r+','+r+' 0 1,0 -'+(r*2)+',0z';
	                break;
	              case 'ELLIPSE':
	                var cx=nodeItem.getAttribute('cx')*1,
	                    cy=nodeItem.getAttribute('cy')*1,
	                    rx=nodeItem.getAttribute('rx')*1,
	                    ry=nodeItem.getAttribute('ry')*1;
	                item.path='M'+(cx-rx)+','+cy+'a'+rx+','+ry+' 0 1,0 '+(rx*2)+',0a'+rx+','+ry+' 0 1,0 -'+(rx*2)+',0z';
	                break;
	              case 'RECT':
	                var x=nodeItem.getAttribute('x')*1,
	                    y=nodeItem.getAttribute('y')*1,
	                    w=nodeItem.getAttribute('width')*1,
	                    h=nodeItem.getAttribute('height')*1,
	                    rx=nodeItem.getAttribute('rx')*1,
	                    ry=nodeItem.getAttribute('ry')*1;
	                if(!rx && !ry) {
	                  item.path='M'+x+','+y+'l'+w+',0l0,'+h+'l-'+w+',0z';
	                } else {
	                  item.path='M'+(x+rx)+','+y+
	                            'l'+(w-rx*2)+',0'+
	                            'a'+rx+','+ry+' 0 0,1 '+rx+','+ry+
	                            'l0,'+(h-ry*2)+
	                            'a'+rx+','+ry+' 0 0,1 -'+rx+','+ry+
	                            'l'+(rx*2-w)+',0'+
	                            'a'+rx+','+ry+' 0 0,1 -'+rx+',-'+ry+
	                            'l0,'+(ry*2-h)+
	                            'a'+rx+','+ry+' 0 0,1 '+rx+',-'+ry+
	                            'z';
	                }
	                break;
	              case 'POLYGON':
	                var points=nodeItem.getAttribute('points');
	                var p = points.split(/\s+/);
	                var path = "";
	                for( var k = 0, len = p.length; k < len; k++ ){
	                    path += (k && "L" || "M") + p[k]
	                }
	                item.path=path+'z';
	                break;
	              case 'LINE':
	                var x1=nodeItem.getAttribute('x1')*1,
	                    y1=nodeItem.getAttribute('y1')*1,
	                    x2=nodeItem.getAttribute('x2')*1,
	                    y2=nodeItem.getAttribute('y2')*1;
	                item.path='M'+x1+','+y1+'L'+x2+','+y2+'z';
	                break;
	            }
	            if(item.path!='') {
	              // Traverse all attributes and get style values
	              for (var k = 0, len3=nodeItem.attributes.length; k < len3; k++) {
	                var attrib = nodeItem.attributes[k];
	                if (attrib.specified) {
	                  var name=attrib.name.toLowerCase();
	                  switch (name) {
	                    case 'fill':
	                    case 'fill-opacity':
	                    case 'opacity':
	                    case 'stroke':
	                    case 'stroke-opacity':
	                    case 'stroke-width':
	                      item.attrs[name]=attrib.value;
	                  }
	                }
	              }
	
	              // Traverse all inline styles and get supported values
	              for (var l = 0, len4=nodeItem.style.length; l < len4; l++) {
	                var styleName = nodeItem.style[l];
	                switch (styleName) {
	                  case 'fill':
	                  case 'fill-opacity':
	                  case 'opacity':
	                  case 'stroke':
	                  case 'stroke-opacity':
	                  case 'stroke-width':
	                    item.style[styleName]=nodeItem.style[styleName];
	                }
	              }
	
	              items.push(item);
	            }
	          }
	
	          // Add Icon
	          if(items.length>0) {
	            icon={
	              id: id,
	              items: items
	            };
	            this._icons[id]=icon;
	          }
	
	          // Init Node for Icons Items and remove Icon Nodes
	          if(!this._morphG) {
	            lastIconId=id;
	            this._morphG=document.createElementNS('http://www.w3.org/2000/svg', 'g');
	            this._svgDoc.replaceChild(this._morphG,nodeIcon);
	          } else {
	            this._svgDoc.removeChild(nodeIcon);
	          }
	        }
	      }
	    }
	    // To Default Icon
	    var defaultIcon = this._curIconId || lastIconId;
	    if(defaultIcon!=='') {
	      this._setupAnimation(defaultIcon);
	      this._updateAnimationProgress(1);
	      this._animationEnd();
	    }
	  }
	
	};
	
	SVGMorpheus.prototype._setupAnimation=function(toIconId) {
	  if(!!toIconId && !!this._icons[toIconId]) {
	    this._toIconId=toIconId;
	    this._startTime=undefined;
	    var i, len, j, len2;
	    this._fromIconItems=clone(this._curIconItems);
	    this._toIconItems=clone(this._icons[toIconId].items);
	
	    for(i=0, len=this._morphNodes.length;i<len;i++) {
	      var morphNode=this._morphNodes[i];
	      morphNode.fromIconItemIdx=i;
	      morphNode.toIconItemIdx=i;
	    }
	
	    var maxNum=Math.max(this._fromIconItems.length, this._toIconItems.length);
	    var toBB;
	    for(i=0;i<maxNum;i++) {
	      // Add items to fromIcon/toIcon if needed
	      if(!this._fromIconItems[i]) {
	        if(!!this._toIconItems[i]) {
	          toBB=curvePathBBox(path2curve(this._toIconItems[i].path));
	          this._fromIconItems.push({
	            path: 'M'+toBB.cx+','+toBB.cy+'l0,0',
	            attrs: {},
	            style: {},
	            trans: {
	              'rotate': [0,toBB.cx,toBB.cy]
	            }
	          });
	        } else {
	          this._fromIconItems.push({
	            path: 'M0,0l0,0',
	            attrs: {},
	            style: {},
	            trans: {
	              'rotate': [0,0,0]
	            }
	          });
	        }
	      }
	      if(!this._toIconItems[i]) {
	        if(!!this._fromIconItems[i]) {
	          toBB=curvePathBBox(path2curve(this._fromIconItems[i].path));
	          this._toIconItems.push({
	            path: 'M'+toBB.cx+','+toBB.cy+'l0,0',
	            attrs: {},
	            style: {},
	            trans: {
	              'rotate': [0,toBB.cx,toBB.cy]
	            }
	          });
	        } else {
	          this._toIconItems.push({
	            path: 'M0,0l0,0',
	            attrs: {},
	            style: {},
	            trans: {
	              'rotate': [0,0,0]
	            }
	          });
	        }
	      }
	
	      // Add Node to DOM if needed
	      if(!this._morphNodes[i]) {
	        var node=document.createElementNS('http://www.w3.org/2000/svg', 'path');
	        this._morphG.appendChild(node);
	        this._morphNodes.push({
	          node: node,
	          fromIconItemIdx: i,
	          toIconItemIdx: i
	        });
	      }
	    }
	
	    for(i=0;i<maxNum;i++) {
	      var fromIconItem=this._fromIconItems[i];
	      var toIconItem=this._toIconItems[i];
	
	      // Calculate from/to curve data and set to fromIcon/toIcon
	      var curves=path2curve(this._fromIconItems[i].path,this._toIconItems[i].path);
	      fromIconItem.curve=curves[0];
	      toIconItem.curve=curves[1];
	
	      // Normalize from/to attrs
	      var attrsNorm=styleToNorm(this._fromIconItems[i].attrs,this._toIconItems[i].attrs);
	      fromIconItem.attrsNorm=attrsNorm[0];
	      toIconItem.attrsNorm=attrsNorm[1];
	      fromIconItem.attrs=styleNormToString(fromIconItem.attrsNorm);
	      toIconItem.attrs=styleNormToString(toIconItem.attrsNorm);
	
	      // Normalize from/to style
	      var styleNorm=styleToNorm(this._fromIconItems[i].style,this._toIconItems[i].style);
	      fromIconItem.styleNorm=styleNorm[0];
	      toIconItem.styleNorm=styleNorm[1];
	      fromIconItem.style=styleNormToString(fromIconItem.styleNorm);
	      toIconItem.style=styleNormToString(toIconItem.styleNorm);
	
	      // Calculate from/to transform
	      toBB=curvePathBBox(toIconItem.curve);
	      toIconItem.trans={
	        'rotate': [0,toBB.cx,toBB.cy]
	      };
	      var rotation=this._rotation, degAdd;
	      if(rotation==='random') {
	        rotation=Math.random()<0.5?'counterclock':'clock';
	      }
	      switch(rotation) {
	        case 'none':
	          if(!!fromIconItem.trans.rotate) {
	            toIconItem.trans.rotate[0]=fromIconItem.trans.rotate[0];
	          }
	          break;
	        case 'counterclock':
	          if(!!fromIconItem.trans.rotate) {
	            toIconItem.trans.rotate[0]=fromIconItem.trans.rotate[0]-360;
	            degAdd=-fromIconItem.trans.rotate[0]%360;
	            toIconItem.trans.rotate[0]+=(degAdd<180?degAdd:degAdd-360);
	          } else {
	            toIconItem.trans.rotate[0]=-360;
	          }
	          break;
	        default: // Clockwise
	          if(!!fromIconItem.trans.rotate) {
	            toIconItem.trans.rotate[0]=fromIconItem.trans.rotate[0]+360;
	            degAdd=fromIconItem.trans.rotate[0]%360;
	            toIconItem.trans.rotate[0]+=(degAdd<180?-degAdd:360-degAdd);
	          } else {
	            toIconItem.trans.rotate[0]=360;
	          }
	          break;
	      }
	    }
	
	    this._curIconItems=clone(this._fromIconItems);
	  }
	};
	
	SVGMorpheus.prototype._updateAnimationProgress=function(progress) {
	  progress=easings[this._easing](progress);
	
	  var i, j, k, len;
	  // Update path/attrs/transform
	  for(i=0, len=this._curIconItems.length;i<len;i++) {
	    this._curIconItems[i].curve=curveCalc(this._fromIconItems[i].curve, this._toIconItems[i].curve, progress);
	    this._curIconItems[i].path=path2string(this._curIconItems[i].curve);
	
	    this._curIconItems[i].attrsNorm=styleNormCalc(this._fromIconItems[i].attrsNorm, this._toIconItems[i].attrsNorm, progress);
	    this._curIconItems[i].attrs=styleNormToString(this._curIconItems[i].attrsNorm);
	
	    this._curIconItems[i].styleNorm=styleNormCalc(this._fromIconItems[i].styleNorm, this._toIconItems[i].styleNorm, progress);
	    this._curIconItems[i].style=styleNormToString(this._curIconItems[i].styleNorm);
	
	    this._curIconItems[i].trans=transCalc(this._fromIconItems[i].trans, this._toIconItems[i].trans, progress);
	    this._curIconItems[i].transStr=trans2string(this._curIconItems[i].trans);
	  }
	
	  // Update DOM
	  for(i=0, len=this._morphNodes.length;i<len;i++) {
	    var morphNode=this._morphNodes[i];
	    morphNode.node.setAttribute("d",this._curIconItems[i].path);
	    var attrs=this._curIconItems[i].attrs;
	    for(j in attrs) {
	      morphNode.node.setAttribute(j,attrs[j]);
	    }
	    var style=this._curIconItems[i].style;
	    for(k in style) {
	      morphNode.node.style[k]=style[k];
	    }
	    morphNode.node.setAttribute("transform",this._curIconItems[i].transStr);
	  }
	};
	
	SVGMorpheus.prototype._animationEnd=function() {
	  for(var i=this._morphNodes.length-1;i>=0;i--) {
	    var morphNode=this._morphNodes[i];
	    if(!!this._icons[this._toIconId].items[i]) {
	      morphNode.node.setAttribute("d",this._icons[this._toIconId].items[i].path);
	    } else {
	      morphNode.node.parentNode.removeChild(morphNode.node);
	      this._morphNodes.splice(i,1);
	    }
	  }
	
	  this._curIconId=this._toIconId;
	  this._toIconId='';
	
	  this._callback();
	};
	
	/*
	 * Public methods
	 */
	
	// Morph To Icon
	SVGMorpheus.prototype.to=function(iconId, options, callback) {
	  if(iconId!==this._toIconId) {
	    if (!!options && typeof options !== typeof {}) {
	      throw new Error('SVGMorpheus.to() > "options" parameter must be an object');
	    }
	    options = options || {};
	
	    if (!!callback && typeof callback !== typeof (function(){})) {
	      throw new Error('SVGMorpheus.to() > "callback" parameter must be a function');
	    }
	
	    _cancelAnimFrame(this._rafid);
	
	    this._duration=options.duration || this._defDuration;
	    this._easing=options.easing || this._defEasing;
	    this._rotation=options.rotation || this._defRotation;
	    this._callback=callback || this._defCallback;
	
	    this._setupAnimation(iconId);
	    this._rafid=_reqAnimFrame(this._fnTick);
	  }
	};
	
	// Register custom Easing function
	SVGMorpheus.prototype.registerEasing=function(name, fn) {
	  easings[name] = fn;
	}
	
	return SVGMorpheus;
	
	}());
	
	/*** EXPORTS FROM exports-loader ***/
	module.exports = SVGMorpheus;

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-input-container md-no-float class=\"md-icon-float md-block no-tb-margin no-errors no-borders\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<ng-md-icon icon=\"search\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<input placeholder=\"{{title}}\" aria-label=\"{{title}}\" ng-model=\"searchText\">");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-input-container>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/sidemenu/tpls/search.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-input-container(md-no-float,class=\"md-icon-float md-block no-tb-margin no-errors no-borders\")\n    md-icon\n        ng-md-icon(icon=\"search\")\n    input(placeholder=\"{{title}}\",aria-label=\"{{title}}\",  ng-model=\"searchText\")\nmd-divider");
	}
	}

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<ul ng-if=\"node.{{opts.children}}.length\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<li ng-if=\"node.showed\" ng-repeat=\"node in node.{{opts.children}} | filter: sideCtl.options.filterExpression | orderBy:['{{opts.orderBy}}']:true\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<div fx-side-menu-content-transclude ng-click=\"sideCtl.showChildren(node)\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<md-divider ng-if=\"node.depth===1\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<fx-side-menu-child ng-show=\"sideCtl.isShowChildren(node)\" class=\"side-menu-child nga-fast nga-stagger-fast nga-slide-right\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</fx-side-menu-child>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</li>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</ul>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/sidemenu/tpls/sidemenu.jade" ));
	buf.push("<md-divider ng-if=\"!$last &amp;&amp; node.depth&gt;1\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "ul(ng-if=\"node.{{opts.children}}.length\")\n    li(ng-if=\"node.showed\",ng-repeat=\"node in node.{{opts.children}} | filter: sideCtl.options.filterExpression | orderBy:['{{opts.orderBy}}']:true\")\n        div(fx-side-menu-content-transclude,ng-click=\"sideCtl.showChildren(node)\")\n        md-divider(ng-if=\"node.depth===1\")\n        fx-side-menu-child.side-menu-child.nga-fast.nga-stagger-fast.nga-slide-right(ng-show=\"sideCtl.isShowChildren(node)\")\nmd-divider(ng-if=\"!$last && node.depth>1\")\n");
	}
	}

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-button ng-if=\"{{btnCtl.condition}}\" ng-class=\"btnCtl.className\" aria-label=\"{{btnCtl.title}}\" ng-click=\"btnCtl.onClick($event,btnCtl.ngModel,btnCtl.index)\" ng-disabled=\"{{btnCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-tooltip ng-if=\"btnCtl.tooltip\" md-direction=\"{{btnCtl.tooltip.position}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("{{btnCtl.tooltip.title || btnCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-icon ng-if=\"btnCtl.icon &amp;&amp; btnCtl.icon.icon\" md-menu-align-target ng-style=\"btnCtl.icon.style\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<ng-md-icon icon=\"{{btnCtl.icon.icon}}\" ng-style=\"btnCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{btnCtl.icon.size||'24px'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<span ng-if=\"btnCtl.showTitle\" layout-padding>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
	buf.push("{{btnCtl.title}} ");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<span ng-hide=\"true\" ng-bind=\"{{btnCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<md-icon ng-if=\"btnCtl.icon &amp;&amp; btnCtl.icon.ricon\" md-menu-align-target ng-style=\"btnCtl.icon.style\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/toolbar/tpls/btn.jade" ));
	buf.push("<ng-md-icon icon=\"{{btnCtl.icon.ricon}}\" ng-style=\"btnCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{btnCtl.icon.size||'24px'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-button(ng-if=\"{{btnCtl.condition}}\",ng-class=\"btnCtl.className\",aria-label=\"{{btnCtl.title}}\",ng-click=\"btnCtl.onClick($event,btnCtl.ngModel,btnCtl.index)\",ng-disabled=\"{{btnCtl.disabled}}\")\n    md-tooltip(ng-if=\"btnCtl.tooltip\",md-direction=\"{{btnCtl.tooltip.position}}\") {{btnCtl.tooltip.title || btnCtl.title}}\n    md-icon(ng-if=\"btnCtl.icon && btnCtl.icon.icon\",md-menu-align-target,ng-style=\"btnCtl.icon.style\")\n        ng-md-icon(icon=\"{{btnCtl.icon.icon}}\",ng-style=\"btnCtl.icon.style\",options='{\"rotation\":\"none\"}',size=\"{{btnCtl.icon.size||'24px'}}\")\n    span(ng-if=\"btnCtl.showTitle\",layout-padding) {{btnCtl.title}} \n    span(ng-hide=\"true\",ng-bind=\"{{btnCtl.disabled}}\")\n    md-icon(ng-if=\"btnCtl.icon && btnCtl.icon.ricon\",md-menu-align-target,ng-style=\"btnCtl.icon.style\")\n        ng-md-icon(icon=\"{{btnCtl.icon.ricon}}\",ng-style=\"btnCtl.icon.style\",options='{\"rotation\":\"none\"}',size=\"{{btnCtl.icon.size||'24px'}}\")");
	}
	}

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	buf.push("<md-icon ng-if=\"iconCtl.icon\" md-menu-align-target ng-style=\"iconCtl.icon.style\" ng-class=\"iconCtl.className\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/icon.jade" ));
	buf.push("<ng-md-icon icon=\"{{iconCtl.icon.icon}}\" ng-style=\"iconCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\" size=\"{{iconCtl.icon.size||'24px'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-icon(ng-if=\"iconCtl.icon\",md-menu-align-target,ng-style=\"iconCtl.icon.style\",ng-class=\"iconCtl.className\")\n    ng-md-icon(icon=\"{{iconCtl.icon.icon}}\",ng-style=\"iconCtl.icon.style\",options='{\"rotation\":\"none\"}',size=\"{{iconCtl.icon.size||'24px'}}\")");
	}
	}

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/label.jade" ));
	buf.push("<span ng-class=\"labelCtl.cls\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 1, jade_debug[0].filename ));
	buf.push("{{labelCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "span(ng-class=\"labelCtl.cls\") {{labelCtl.title}}");
	}
	}

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/layout.jade" ));
	buf.push("<div layout=\"{{layoutCtl.layout}}\" flex=\"{{layoutCtl.flex}}\" layout-align=\"{{layoutCtl.layoutAlign}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "div(layout=\"{{layoutCtl.layout}}\",flex=\"{{layoutCtl.flex}}\",layout-align=\"{{layoutCtl.layoutAlign}}\")");
	}
	}

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-divider.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menu-divider.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-divider.jade" ));
	buf.push("<md-menu-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-menu-divider>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu-divider");
	}
	}

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu-item.jade" ));
	buf.push("<md-menu-item fx-toolbar ng-if=\"{{menuItemCtl.condition}}\" ng-init=\"item = menuItemCtl;item.type='btn'\" items=\"item\" ng-model=\"menuItemCtl.ngModel\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-menu-item>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu-item(fx-toolbar,ng-if=\"{{menuItemCtl.condition}}\",ng-init=\"item = menuItemCtl;item.type='btn'\",items=\"item\",ng-model=\"menuItemCtl.ngModel\")\n");
	}
	}

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-menu md-offset=\"2 0\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-button ng-class=\"menuCtl.className\" aria-label=\"菜单\" ng-click=\"menuCtl.materialUtils.openMenu($mdOpenMenu,$event)\" ng-disabled=\"{{menuCtl.disabled}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-tooltip ng-if=\"menuCtl.tooltip\" md-direction=\"{{menuCtl.tooltip.position}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, jade_debug[0].filename ));
	buf.push("{{menuCtl.tooltip.title || menuCtl.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-tooltip>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-icon ng-if=\"menuCtl.icon\" md-menu-origin>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<ng-md-icon icon=\"{{menuCtl.icon.icon}}\" ng-style=\"menuCtl.icon.style\" options=\"{&quot;rotation&quot;:&quot;none&quot;}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/toolbar/tpls/menu.jade" ));
	buf.push("<md-menu-content width=\"{{menuCtl.width}}\" fx-toolbar items=\"menuCtl.items\" ng-model=\"menuCtl.ngModel\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-menu-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-menu>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu(md-offset=\"2 0\")\n    md-button(ng-class=\"menuCtl.className\",aria-label=\"菜单\",ng-click=\"menuCtl.materialUtils.openMenu($mdOpenMenu,$event)\",ng-disabled=\"{{menuCtl.disabled}}\")\n        md-tooltip(ng-if=\"menuCtl.tooltip\",md-direction=\"{{menuCtl.tooltip.position}}\") {{menuCtl.tooltip.title || menuCtl.title}}\n        md-icon(ng-if=\"menuCtl.icon\",md-menu-origin)\n            ng-md-icon(icon=\"{{menuCtl.icon.icon}}\",ng-style=\"menuCtl.icon.style\",options='{\"rotation\":\"none\"}')\n    md-menu-content(width=\"{{menuCtl.width}}\",fx-toolbar,items=\"menuCtl.items\",ng-model=\"menuCtl.ngModel\")\n");
	}
	}

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menubar.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/toolbar/tpls/menubar.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/toolbar/tpls/menubar.jade" ));
	buf.push("<md-menu-bar md-offset=\"2 0\" ng-class=\"menuBarCtl.className\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/toolbar/tpls/menubar.jade" ));
	buf.push("<div fx-toolbar items=\"menuBarCtl.items\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-menu-bar>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-menu-bar(md-offset=\"2 0\",ng-class=\"menuBarCtl.className\")\n    div(fx-toolbar,items=\"menuBarCtl.items\")");
	}
	}

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/content.template.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, jade_debug[0].filename ));
	buf.push("helo");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex)\n    span helo");
	}
	}

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-sidenav ui-view=\"sidenavLeft\" md-is-locked-open=\"$mdMedia('gt-md') || $root.isOpenMenu\" md-component-id=\"left\" md-whiteframe=\"4\" layout=\"column\" class=\"md-sidenav-left\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-toolbar class=\"md-hue-3\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div fx-toolbar items=\"homeCtl.toolbars\" layout=\"row\" ctls=\"homeCtl\" class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-toolbar>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-content flex ui-view=\"content\" layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div execute-cmd real-time=\"true\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<div ng-if=\"!$mdMedia('gt-md')\" class=\"lock-size\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-fab-speed-dial md-direction=\"right\" ng-mouseenter=\"$root.isOpenFab=true\" ng-mouseleave=\"$root.isOpenFab=false\" md-open=\"$root.isOpenFab\" class=\"md-scale md-fab-bottom-left\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-fab-trigger>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-button aria-label=\"menu\" ng-click=\"homeCtl.materialUtils.buildToggle('left')()\" class=\"md-fab md-default\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/pages/home/tpls/home.template.jade" ));
	buf.push("<ng-md-icon icon=\"menu\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-trigger>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-speed-dial>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "//- md-toolbar.md-whiteframe-glow-z1.md-hue-3()\n    //- div.md-toolbar-tools(fx-toolbar,items=\"homeCtl.toolbars\",layout=\"row\",ctls=\"homeCtl\")\nmd-content(flex=\"100\",layout=\"row\")\n    md-sidenav.md-sidenav-left(ui-view=\"sidenavLeft\",md-is-locked-open=\"$mdMedia('gt-md') || $root.isOpenMenu\",md-component-id=\"left\",md-whiteframe=\"4\",layout=\"column\")\n    //- md-sidenav.md-sidenav-right(md-component-id=\"right\",ui-view=\"sidenavRight\",layout=\"column\",md-whiteframe=\"4\")\n    md-content(flex=\"100\",layout=\"column\")\n        md-toolbar.md-hue-3\n            div.md-toolbar-tools(fx-toolbar,items=\"homeCtl.toolbars\",layout=\"row\",ctls=\"homeCtl\")\n        md-divider\n        md-content(flex,ui-view=\"content\",layout=\"column\")\n    div(execute-cmd,real-time=\"true\")\n    div.lock-size(ng-if=\"!$mdMedia('gt-md')\")\n        md-fab-speed-dial.md-scale.md-fab-bottom-left(md-direction=\"right\",ng-mouseenter=\"$root.isOpenFab=true\",ng-mouseleave=\"$root.isOpenFab=false\",md-open=\"$root.isOpenFab\")\n            md-fab-trigger\n                md-button.md-fab.md-default(aria-label=\"menu\",ng-click=\"homeCtl.materialUtils.buildToggle('left')()\")\n                    md-icon\n                        ng-md-icon(icon=\"menu\")\n           ");
	}
	}

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-content flex=\"100\" layout=\"column\" ng-cloak>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<section layout=\"row\" ng-href=\"home.page\" flex class=\"logo\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div fx-toolbar items=\"sideLeftCtl.toolbar\" layout=\"row\" ctls=\"sideLeftCtl\" class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<fx-side-menu-search>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</fx-side-menu-search>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-content flex=\"100\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<fx-side-menu selected-nodes=\"sideLeftCtl.selectedNodes\" modules=\"sideLeftCtl.modules\" ng-click=\"sideLeftCtl.doLinkBind\" class=\"side-menu\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-button ng-click=\"sideCtl.doLinkPre($event,node)\" md-style-color=\"{'background-color': sideCtl.isSelected(node) ? 'primary.300': 'primary.0'}\" class=\"layout-fill\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div flex=\"100\" layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<ng-md-icon icon=\"{{ node.icon||'apps'}}\" md-style-color=\"{'color': sideCtl.isSelected(node) ? 'accent.300': 'primary.500'}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div flex=\"100\" class=\"md-margin\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, jade_debug[0].filename ));
	buf.push("{{node.title}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<ng-md-icon options=\"{&quot;rotation&quot;: &quot;none&quot;}\" ng-if=\"!sideCtl.isLeaf(node)\" icon=\"{{ sideCtl.isShowChildren(node)?'expand_more':'chevron_right' }}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</fx-side-menu>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/pages/home/tpls/sidenavl.template.jade" ));
	buf.push("<div fx-toolbar items=\"sideLeftCtl.toolbarBottom\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex=\"100\",layout=\"column\",ng-cloak)\n    section.logo(layout=\"row\",ng-href=\"home.page\",flex)\n        div.md-toolbar-tools(fx-toolbar,items=\"sideLeftCtl.toolbar\",layout=\"row\",ctls=\"sideLeftCtl\")\n    md-divider\n    fx-side-menu-search\n    md-content(flex=\"100\")\n        fx-side-menu.side-menu(selected-nodes=\"sideLeftCtl.selectedNodes\",modules=\"sideLeftCtl.modules\",ng-click=\"sideLeftCtl.doLinkBind\")\n            md-button.layout-fill(ng-click=\"sideCtl.doLinkPre($event,node)\",md-style-color=\"{'background-color': sideCtl.isSelected(node) ? 'primary.300': 'primary.0'}\")\n                div(flex=\"100\",layout=\"row\")\n                    md-icon\n                        ng-md-icon(icon=\"{{ node.icon||'apps'}}\",md-style-color=\"{'color': sideCtl.isSelected(node) ? 'accent.300': 'primary.500'}\")\n                    div.md-margin(flex=\"100\") {{node.title}}\n                    md-icon\n                        ng-md-icon(options='{\"rotation\": \"none\"}',ng-if=\"!sideCtl.isLeaf(node)\",icon=\"{{ sideCtl.isShowChildren(node)?'expand_more':'chevron_right' }}\")\n    md-divider\n    div(fx-toolbar,items=\"sideLeftCtl.toolbarBottom\")");
	}
	}

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(226);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sidemenu.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./sidemenu.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
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

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
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

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
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

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
	function Directive(mdSideMenuSections, $timeout) {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(266),
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

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
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

/***/ 335:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(12);
	var _ = __webpack_require__(3);
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


/***/ },

/***/ 336:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var module_1 = __webpack_require__(156);
	var _ = __webpack_require__(3);
	__webpack_require__(24);
	var Service = (function () {
	    function Service() {
	    }
	    return Service;
	}());
	Service._name = "toolbarUtils";
	Service.provider = [function () {
	        var Base = (function () {
	            function Base(data) {
	                this.data = data;
	            }
	            Base.prototype.conditionBuilder = function (condition, prefix, useDisabled) {
	                if (prefix === void 0) { prefix = true; }
	                if (useDisabled === void 0) { useDisabled = false; }
	                this.data = _.extend({}, this.data, {
	                    conditionInfo: {
	                        condition: condition,
	                        prefix: prefix,
	                        useDisabled: useDisabled
	                    }
	                });
	                return this;
	            };
	            Base.prototype.className = function (className) {
	                this.data = _.extend({}, this.data, {
	                    className: className
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
	            Base.prototype.iconBuilder = function (icon, style, ricon, options, size) {
	                this.data = _.extend({}, this.data, {
	                    icon: {
	                        icon: icon,
	                        ricon: ricon,
	                        style: style,
	                        size: size || '24px'
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
	            Base.prototype.items = function (items) {
	                if (items === void 0) { items = []; }
	                this.data = _.extend({}, this.data, {
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
	                var _this = _super.call(this, data) || this;
	                _this.data = data;
	                return _this;
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
	            Service.prototype.labelBuilder = function (title, cls) {
	                return new Service({
	                    type: "label",
	                    title: title,
	                    cls: cls
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
	            Service.prototype.menuBarBuilder = function () {
	                return new Service({
	                    type: "menuBar"
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
	module_1.module.service(Service._name, Service.provider);


/***/ },

/***/ 337:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var ContentController = (function () {
	    function ContentController($rootScope, $timeout, materialUtils, svgUtils, fxAction, iconInfoDetailForm) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.materialUtils = materialUtils;
	        this.svgUtils = svgUtils;
	        this.fxAction = fxAction;
	        this.iconInfoDetailForm = iconInfoDetailForm;
	        this.icons = [];
	        this.icons.length = 0;
	        _.each(svgUtils.getAllIcons(), function (shape, key) {
	            _this.icons.push(key);
	        });
	        this.standardItems = [
	            { sizeX: 2, sizeY: 1, row: 0, col: 0, class: "md-whiteframe-1dp" },
	            { sizeX: 2, sizeY: 2, row: 0, col: 2, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 0, col: 4, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 0, col: 5, class: "md-whiteframe-1dp" },
	            { sizeX: 2, sizeY: 1, row: 1, col: 0, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 1, col: 4, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 2, row: 1, col: 5, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 2, col: 0, class: "md-whiteframe-1dp" },
	            { sizeX: 2, sizeY: 1, row: 2, col: 1, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 2, col: 3, class: "md-whiteframe-1dp" },
	            { sizeX: 1, sizeY: 1, row: 2, col: 4, class: "md-whiteframe-1dp" }
	        ];
	        this.gridsterOpts = {
	            draggable: {
	                start: function (event, $element, widget) {
	                    widget.class = "md-whiteframe-16dp";
	                },
	                stop: function (event, $element, widget) {
	                    widget.class = "md-whiteframe-1dp";
	                }
	            }
	        };
	        this.getDetatInfo();
	    }
	    ContentController.prototype.doOpenIconInfo = function ($event, iconInfo) {
	        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
	    };
	    ContentController.prototype.getDetatInfo = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction('departTreeAction', null);
	        promise && promise.then(function (results) {
	            var nodes = [];
	            _.forEach(results, function (result) {
	                if (_.isArray(result)) {
	                    nodes = nodes.concat(result);
	                }
	            });
	            var nodesGroupByDepth = _.groupBy(_.keyBy(nodes, "key"), "depth");
	            var depth = 0, root = {};
	            var _loop_1 = function () {
	                var nodesIsDepth = nodesGroupByDepth[depth];
	                var parentIsDepth = nodesGroupByDepth[depth - 1];
	                if (nodesIsDepth && nodesIsDepth.length > 0) {
	                    switch (depth) {
	                        case 0:
	                            root = nodesIsDepth[0];
	                            break;
	                        case 1:
	                            root['nodes'] = nodesIsDepth;
	                            break;
	                        default:
	                            _.forEach(parentIsDepth, function (parentNode) {
	                                parentNode["nodes"] = _.filter(nodesIsDepth, function (node) {
	                                    return node.lft > parentNode.lft && parentNode.rgt > node.rgt;
	                                });
	                            });
	                            break;
	                    }
	                }
	                else {
	                    return "break";
	                }
	                depth++;
	            };
	            while (true) {
	                var state_1 = _loop_1();
	                if (state_1 === "break")
	                    break;
	            }
	            _this.departs = root["nodes"];
	        });
	        this.treeOptions = {
	            nodeChildren: "nodes",
	            dirSelectable: false,
	            templateUrl: 'treeControlExternalTemplate.html',
	            injectClasses: {
	                ul: "a1",
	                li: "a2",
	                liSelected: "a7",
	                iExpanded: "a3",
	                iCollapsed: "a4",
	                iLeaf: "a5",
	                label: "a6",
	                labelSelected: "a8"
	            }
	        };
	    };
	    return ContentController;
	}());
	ContentController.$inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];
	exports.ContentController = ContentController;


/***/ },

/***/ 338:
/***/ function(module, exports) {

	"use strict";
	var HomeController = (function () {
	    function HomeController($rootScope, materialUtils, toolbarUtils, fxAction) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.fxAction = fxAction;
	        $rootScope["isOpenMenu"] = false;
	        this.toolbars = [
	            toolbarUtils.labelBuilder("").attrBuilder({ flex: "" }).toValue(),
	            toolbarUtils.noneBuilder("icon").className("md-margin").iconBuilder("people", {}, null, null, "24px").toValue(),
	            toolbarUtils.labelBuilder("{{$root.user.username}}", "md-subhead").attrBuilder({}).toValue(),
	            toolbarUtils.menuBarBuilder().className("md-no-padding").tooltipBuilder("").items([
	                toolbarUtils.menuBuilder("", "md-icon-button").attrBuilder({ "md-position-mode": "left bottom" }).iconBuilder("expand_more").menuOptionsBuilder().items([
	                    toolbarUtils.menuItemBuilder("退出登录", "", true).iconBuilder("power-settings").btnClick(function ($event) {
	                        _this.doExit($event);
	                    }).toValue(),
	                ]).toValue()
	            ]).toValue()
	        ];
	    }
	    HomeController.prototype.doExit = function ($event) {
	        var _this = this;
	        this.fxAction.getModel('logout').then(function (model) {
	            var promise = _this.fxAction.doActionModel($event, model);
	            if (promise) {
	                promise.then(function () {
	                    console.log("logout");
	                });
	            }
	        });
	    };
	    return HomeController;
	}());
	HomeController.$inject = ["$rootScope", "materialUtils", "toolbarUtils", "fxAction"];
	exports.HomeController = HomeController;


/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var SidenavLeftController = (function () {
	    function SidenavLeftController($rootScope, mdSideMenuSections, toolbarUtils, fxAction, $state, $stateParams, $timeout, fxSideMenuFactory) {
	        this.$rootScope = $rootScope;
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.toolbarUtils = toolbarUtils;
	        this.fxAction = fxAction;
	        this.$state = $state;
	        this.$stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.fxSideMenuFactory = fxSideMenuFactory;
	        this.selectedNodes = {};
	        this.initModules().initToolbar();
	        this.doLinkBind = this.doLink.bind(this);
	        this.toolbar = [
	            toolbarUtils.labelBuilder("CMDB").attrBuilder({ flex: "" }).toValue()
	        ];
	    }
	    SidenavLeftController.prototype.getModules = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction('moduleMenuAction', null);
	        promise && promise.then(function (results) {
	            var nodes = [];
	            _.forEach(results, function (result) {
	                if (_.isArray(result)) {
	                    nodes = nodes.concat(result);
	                }
	            });
	            var nodesGroupByDepth = _.groupBy(_.keyBy(nodes, "key"), "depth");
	            var depth = 0, root = {};
	            var _loop_1 = function () {
	                var nodesIsDepth = nodesGroupByDepth[depth];
	                var parentIsDepth = nodesGroupByDepth[depth - 1];
	                if (nodesIsDepth && nodesIsDepth.length > 0) {
	                    switch (depth) {
	                        case 0:
	                            root = nodesIsDepth[0];
	                            break;
	                        case 1:
	                            root['nodes'] = nodesIsDepth;
	                            break;
	                        default:
	                            _.forEach(parentIsDepth, function (parentNode) {
	                                parentNode["nodes"] = _.filter(nodesIsDepth, function (node) {
	                                    return node.lft > parentNode.lft && parentNode.rgt > node.rgt;
	                                });
	                            });
	                            break;
	                    }
	                }
	                else {
	                    return "break";
	                }
	                depth++;
	            };
	            while (true) {
	                var state_1 = _loop_1();
	                if (state_1 === "break")
	                    break;
	            }
	            _this.mdSideMenuSections.sections = root["nodes"];
	            _this.modules = _this.mdSideMenuSections.sections;
	            _this.selectedNodes = _.keyBy(nodesGroupByDepth[1], "key") || {};
	            _this.fxSideMenuFactory.onStateChangeStart(null, _this.$state.current, _this.$state.params);
	        });
	    };
	    SidenavLeftController.prototype.initModules = function () {
	        this.getModules();
	        this.mdSideMenuSections.options = {
	            children: "nodes",
	            key: 'key',
	            dirSelectable: false,
	            orderBy: 'lft',
	            filterField: 'key'
	        };
	        return this;
	    };
	    SidenavLeftController.prototype.initToolbar = function () {
	        var _this = this;
	        this.toolbarBottom = [
	            this.toolbarUtils.layoutBuilder("", "row", "space-around center").toolsBuilder([
	                this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false, "top").iconBuilder("refresh").btnClick(function ($event) {
	                    _this.getModules();
	                }).toValue(),
	                this.toolbarUtils.btnBuilder("全部折叠", "md-icon-button", false, "top").iconBuilder("dehaze").btnClick(function ($event) {
	                    _.forEach(_this.selectedNodes, function (val, key) {
	                        delete _this.selectedNodes[key];
	                    });
	                }).toValue(),
	            ]).toValue()
	        ];
	        return this;
	    };
	    SidenavLeftController.prototype.doLink = function ($event, node) {
	        var _this = this;
	        if (node && node.link && node.key) {
	            this.$timeout(function () {
	                _this.$state.go(node.link, node);
	            }, 200);
	        }
	    };
	    return SidenavLeftController;
	}());
	SidenavLeftController.$inject = ["$rootScope", "mdSideMenuSections", "toolbarUtils", "fxAction", "$state", "$stateParams", "$timeout", "fxSideMenuFactory"];
	exports.SidenavLeftController = SidenavLeftController;


/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(7);
	__webpack_require__(175);
	var ngMaterialIcons = __webpack_require__(19);
	var _ = __webpack_require__(3);
	var action_1 = __webpack_require__(15);
	var router_1 = __webpack_require__(200);
	var material_service_1 = __webpack_require__(16);
	var svg_service_1 = __webpack_require__(204);
	var toolbar_1 = __webpack_require__(199);
	var sidemenu_1 = __webpack_require__(198);
	__webpack_require__(176);
	var action_model_1 = __webpack_require__(5);
	__webpack_require__(189);
	__webpack_require__(25);
	__webpack_require__(174);
	var module = angular.module("homeModule", [action_1.default, toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons, 'gridster', 'treeControl']);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$mdAriaProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdAriaProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.alwaysWatchTheme(true);
	        $mdAriaProvider.disableWarnings();
	        $mdThemingProvider.theme('default')
	            .primaryPalette('grey')
	            .accentPalette('blue')
	            .warnPalette('red');
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }
	])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils, fxAction) {
	        var state = {};
	        var handleResolve = function (isComplete) {
	            state.$$isFinish = true;
	            $state.go(state.toState.name, state.toParams, state.options);
	        };
	        $rootScope.$on("$stateRefresh", function () {
	            state.$$isFinish = false;
	        });
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
	                    configConfig: fxAction.doAction("configAction", {}).then(function (result) {
	                        $rootScope["config"] = result.configAction.config;
	                    }),
	                    userinfoAction: fxAction.doAction("userinfoAction", {}).then(function (result) {
	                        result.userinfo && ($rootScope["user"] = result.userinfo);
	                    })
	                }).then(function () { handleResolve(true); }, function () { handleResolve(false); });
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

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7af35d2f474641e3a73ea274191a9107.jpg";

/***/ }

},[340]);
//# sourceMappingURL=home.bundle.js.map
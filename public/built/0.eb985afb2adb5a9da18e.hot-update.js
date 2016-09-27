webpackHotUpdate(0,{

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(148);
	var sidenavl_controller_1 = __webpack_require__(149);
	var sidenavr_controller_1 = __webpack_require__(150);
	var content_controller_1 = __webpack_require__(151);
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
	                template: __webpack_require__(152)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(153)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(154)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(155)(),
	            }
	        }
	    });
	};


/***/ },

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(33);
	var SidenavLeftController = (function () {
	    function SidenavLeftController(mdSideMenuSections, toolbarUtils, fxAction) {
	        this.mdSideMenuSections = mdSideMenuSections;
	        this.toolbarUtils = toolbarUtils;
	        this.fxAction = fxAction;
	        this.selectedNodes = {};
	        this.initModules().initToolbar();
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
	            var _loop_1 = function() {
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
	                if (state_1 === "break") break;
	            }
	            _this.mdSideMenuSections.sections = root["nodes"];
	            _this.modules = _this.mdSideMenuSections.sections;
	            _this.selectedNodes = _.keyBy(nodesGroupByDepth[1], "key") || {};
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
	                }).toValue()
	            ]).toValue()
	        ];
	        return this;
	    };
	    SidenavLeftController.prototype.doLink = function ($event, node) {
	    };
	    SidenavLeftController.$inject = ["mdSideMenuSections", "toolbarUtils", "fxAction"];
	    return SidenavLeftController;
	}());
	exports.SidenavLeftController = SidenavLeftController;


/***/ }

})
//# sourceMappingURL=0.eb985afb2adb5a9da18e.hot-update.js.map
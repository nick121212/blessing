webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(150);
	var passport_1 = __webpack_require__(185);
	var salt_1 = __webpack_require__(194);
	__webpack_require__(199);
	var module = angular.module("indexApp", [ngAnimate, "angular-loading-bar", passport_1.default, home_1.default, page_1.default, loading_1.default, salt_1.default]);
	module.config(["cfpLoadingBarProvider", "$mdThemingProvider", "$mdAriaProvider", function (cfpLoadingBarProvider, $mdThemingProvider, $mdAriaProvider) {
	        cfpLoadingBarProvider.includeSpinner = true;
	        cfpLoadingBarProvider.latencyThreshold = 1000;
	        $mdThemingProvider.alwaysWatchTheme(true);
	        $mdAriaProvider.disableWarnings();
	        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
	        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
	        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
	    }]);
	angular.element(document).ready(function () {
	    angular.bootstrap(document, [module.name]);
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(8);
	var angular = __webpack_require__(1);
	var _name = "fxLoading";
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(12)(),
	        scope: {},
	        replace: false,
	        link: function ($scope) {
	        }
	    };
	}
	Directive.$inject = [];
	var module = angular.module(_name + "Module", []).directive(_name, Directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(36);
	var rest_service_1 = __webpack_require__(37);
	var action_1 = __webpack_require__(39);
	var dycompile_1 = __webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(148);
	var module = angular.module("pageModule", [ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", "materialUtils", function ($state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(25);
	var page_d3_controller_1 = __webpack_require__(26);
	var page_allin_controller_1 = __webpack_require__(32);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.page", {
	        url: "page/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: page_controller_1.PageController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(33)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(34)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(35)()
	            }
	        }
	    });
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	var PageController = (function () {
	    function PageController($stateParams) {
	        this.$stateParams = $stateParams;
	        this.key = $stateParams["key"];
	    }
	    PageController.$inject = ["$stateParams"];
	    return PageController;
	}());
	exports.PageController = PageController;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	var force_d3_1 = __webpack_require__(29);
	var action_model_1 = __webpack_require__(31);
	var D3Controller = (function () {
	    function D3Controller($stateParams, fxAction, toolbarUtils, materialUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.clientData = {};
	        this.key = $stateParams["key"];
	        this.doInit();
	    }
	    D3Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        this.fxAction.doActionModel($event, actionModel, item).then(function (result) {
	            _this.materialUtils.showMsg("" + (actionModel.successMsg || "操作成功!"));
	            if (actionModel.refreshList) {
	            }
	        });
	    };
	    D3Controller.prototype.doGetData = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, { limit: 100, where: {} });
	        if (!promise) {
	            return;
	        }
	        this.isBusy = true;
	        promise.then(function (result) {
	            return _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	        }).then(function (results) {
	        }).finally(function () {
	            _this.isBusy = false;
	            setTimeout(function () {
	                new force_d3_1.Force("#paged3", _this.clientData.rows);
	            }, 200);
	        });
	    };
	    D3Controller.prototype.doInit = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            _this.actionModel = actionModel;
	            _this.actionModel.list.toolbars = [];
	            _this.doGetData();
	            return _this.fxAction.getModels(_this.actionModel.actions);
	        }).then(function (actionModels) {
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-fab md-raised md-mini", false).tooltipBuilder("").iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-fab md-raised md-mini", false).iconBuilder("refresh", { fill: "black" }).btnClick(function ($event) {
	                    _this.doGetData();
	                }).toValue());
	            }
	        });
	    };
	    D3Controller.$inject = ["$stateParams", "fxAction", "toolbarUtils", "materialUtils"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ },
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d3 = __webpack_require__(30);
	var _ = __webpack_require__(27);
	var defaultLinks = [
	    { source: "Microsoft", target: "Amazon", type: "licensing" },
	    { source: "Microsoft", target: "HTC", type: "licensing" },
	    { source: "Samsung", target: "Apple", type: "suit" },
	    { source: "Motorola", target: "Apple", type: "suit" },
	    { source: "Nokia", target: "Apple", type: "resolved" },
	    { source: "HTC", target: "Apple", type: "suit" },
	    { source: "Kodak", target: "Apple", type: "suit" },
	    { source: "Microsoft", target: "Barnes & Noble", type: "suit" },
	    { source: "Microsoft", target: "Foxconn", type: "suit" },
	    { source: "Oracle", target: "Google", type: "suit" },
	    { source: "Apple", target: "HTC", type: "suit" },
	    { source: "Microsoft", target: "Inventec", type: "suit" },
	    { source: "Samsung", target: "Kodak", type: "resolved" },
	    { source: "LG", target: "Kodak", type: "resolved" },
	    { source: "RIM", target: "Kodak", type: "suit" },
	    { source: "Sony", target: "LG", type: "suit" },
	    { source: "Kodak", target: "LG", type: "resolved" },
	    { source: "Apple", target: "Nokia", type: "resolved" },
	    { source: "Qualcomm", target: "Nokia", type: "resolved" },
	    { source: "Apple", target: "Motorola", type: "suit" },
	    { source: "Microsoft", target: "Motorola", type: "suit" },
	    { source: "Motorola", target: "Microsoft", type: "suit" },
	    { source: "Huawei", target: "ZTE", type: "suit" },
	    { source: "Ericsson", target: "ZTE", type: "suit" },
	    { source: "Kodak", target: "Samsung", type: "resolved" },
	    { source: "Apple", target: "Samsung", type: "suit" },
	    { source: "Kodak", target: "RIM", type: "suit" },
	    { source: "Nokia", target: "Qualcomm", type: "suit" }
	];
	var Force = (function () {
	    function Force(select, nodes, links) {
	        var _this = this;
	        this.nodes = nodes;
	        this.links = links;
	        var covNodes = {};
	        this.nodes = [];
	        this.links = _.clone(defaultLinks);
	        _.each(this.links, function (link) {
	            link.source = covNodes[link.source] || (covNodes[link.source] = { title: link.source });
	            link.target = covNodes[link.target] || (covNodes[link.target] = { title: link.target });
	        });
	        this.nodes = d3.values(covNodes);
	        var width = innerWidth, height = innerHeight;
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links || []).distance(60))
	            .force("charge", d3.forceManyBody().strength(-300))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        d3.select(select).select("*").remove();
	        var svg = d3.select(select)
	            .append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%");
	        svg.append("defs").selectAll("marker")
	            .data(["suit", "licensing", "resolved"])
	            .enter().append("marker")
	            .attr("id", function (d) { return d; })
	            .attr("viewBox", "0 -5 10 10")
	            .attr("refX", 15)
	            .attr("refY", -1.5)
	            .attr("markerWidth", 6)
	            .attr("markerHeight", 6)
	            .attr("orient", "auto")
	            .append("path")
	            .attr("d", "M0,-5L10,0L0,5");
	        var path = svg.append("g").selectAll("path")
	            .data(this.links)
	            .enter()
	            .append("path")
	            .attr("class", function (d) {
	            return "link " + d["type"];
	        })
	            .attr("marker-end", function (d) {
	            return "url(#" + d['type'] + ")";
	        });
	        var circle = svg.append("g").selectAll("circle")
	            .data(this.nodes)
	            .enter().append("circle")
	            .attr("r", 6)
	            .call(d3.drag()
	            .on("start", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0.5).restart();
	            }
	            d.fx = d.x;
	            d.fy = d.y;
	        })
	            .on("drag", function (d) {
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        })
	            .on("end", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0);
	            }
	            d.fx = null;
	            d.fy = null;
	        }));
	        var text = svg.append("g").selectAll("text")
	            .data(this.nodes)
	            .enter().append("text")
	            .attr("x", 8)
	            .attr("y", ".31em")
	            .text(function (d) { return d.title; });
	        svg.selectAll("g").attr("width", width).attr("height", height);
	        this.simulation.nodes(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .on("tick", tick);
	        function tick() {
	            path.attr("d", linkArc);
	            circle.attr("transform", transform);
	            text.attr("transform", transform);
	        }
	        function linkArc(d) {
	            if (d.target.x === undefined)
	                return;
	            var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
	            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	        }
	        function transform(d) {
	            return "translate(" + d.x + "," + d.y + ")";
	        }
	    }
	    return Force;
	}());
	exports.Force = Force;
	var Force1 = (function () {
	    function Force1(select, nodes, links) {
	        var _this = this;
	        this.nodes = nodes;
	        this.links = links;
	        var defaultNodes = [
	            { title: "桂林" }, { title: "广州" },
	            { title: "厦门" }, { title: "杭州" },
	            { title: "上海" }, { title: "青岛" },
	            { title: "天津" }
	        ];
	        var defaultLinks = [{ source: 2, target: 4 }];
	        this.nodes = this.nodes || defaultNodes;
	        this.links = this.links || defaultLinks;
	        _.each(this.nodes, function (node, index) {
	            node.fy = null;
	            node.fx = null;
	            _this.links.push({ source: 0, target: index + 1 });
	        });
	        this.nodes.unshift({ title: "Ἀσάνα" });
	        this.svg = d3.select(select);
	        this.svg.select("*").remove();
	        this.svg = this.svg.append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%");
	        this.doDraw();
	    }
	    Force1.prototype.doZoom = function () {
	        var _this = this;
	        this.zoom = d3.zoom()
	            .scaleExtent([0.5, 10])
	            .duration(400)
	            .on("zoom", function () {
	            _this.svg.select(".nodes").attr("transform", d3.event.transform);
	            _this.svg.select(".texts").attr("transform", d3.event.transform);
	            _this.svg.select(".lines").attr("transform", d3.event.transform);
	        });
	        this.svg.call(this.zoom);
	    };
	    Force1.prototype.doDrawNodes = function () {
	        var _this = this;
	        this.svgEdges = this.svg.append("g")
	            .attr("class", "nodes")
	            .selectAll("circle")
	            .data(this.nodes)
	            .enter()
	            .append("circle")
	            .attr("r", 5)
	            .attr("cx", 100)
	            .attr("cy", 100)
	            .style("fill", "black")
	            .call(d3.drag()
	            .on("start", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0.5).restart();
	            }
	            d.fx = d.x;
	            d.fy = d.y;
	        })
	            .on("drag", function (d) {
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        })
	            .on("end", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0);
	            }
	            d.fx = null;
	            d.fy = null;
	        }));
	        return this.svgEdges;
	    };
	    Force1.prototype.doDrawEdges = function () {
	        this.svgEdges = this.svg.append("g")
	            .attr("class", "lines")
	            .selectAll("line")
	            .data(this.links)
	            .enter()
	            .append("line")
	            .style("stroke", "#ccc")
	            .style("stroke-width", 1);
	        return this.svgEdges;
	    };
	    Force1.prototype.doDrawTexts = function () {
	        this.svgTexts = this.svg.append("g")
	            .attr("class", "texts")
	            .selectAll("text")
	            .data(this.nodes)
	            .enter()
	            .append("text")
	            .style("fill", "black")
	            .attr("dx", 20)
	            .attr("dy", 8)
	            .text(function (d) {
	            return d.title;
	        });
	        this.svgTexts.append("title")
	            .text(function (d) { return d.title; });
	        this.svgTexts.append("text")
	            .attr("dy", ".3em")
	            .attr("class", "nodetext")
	            .style("text-anchor", "middle")
	            .text(function (d) { return d.title; });
	        return this.svgTexts;
	    };
	    Force1.prototype.doDraw = function () {
	        var width = innerWidth, height = innerHeight;
	        this.doZoom();
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .force("charge", d3.forceManyBody().strength(-5000).theta(200).distanceMin(200))
	            .force("center", d3.forceCenter(width / 3, height / 2));
	        var edges = this.doDrawEdges();
	        var texts = this.doDrawTexts();
	        var nodes = this.doDrawNodes();
	        this.simulation.nodes(this.nodes)
	            .on("tick", tick)
	            .force("link");
	        function tick() {
	            edges && edges
	                .attr("x1", function (d) {
	                return d.source.x || 0;
	            })
	                .attr("y1", function (d) {
	                return d.source.y || 0;
	            })
	                .attr("x2", function (d) {
	                return d.target.x || 0;
	            })
	                .attr("y2", function (d) {
	                return d.target.y || 0;
	            });
	            nodes && nodes.attr("cx", function (datum) {
	                return datum.x || 0;
	            }).attr("cy", function (datum) {
	                return datum.y || 0;
	            });
	            texts && texts.attr("x", function (d) {
	                return d.x || 0;
	            }).attr("y", function (d) {
	                return d.y || 0;
	            });
	        }
	    };
	    return Force1;
	}());
	exports.Force1 = Force1;
	var Force2 = (function () {
	    function Force2(select, nodes, links) {
	        this.nodes = nodes;
	        this.links = links;
	        var defaultLinks = [{ source: 2, target: 4 }, { source: 2, target: 5 }, { source: 2, target: 3 }];
	        this.links = defaultLinks;
	        this.container = d3.select(select);
	        this.cardContainer = this.container.select(".card-container");
	        this.doZoom();
	        this.doDrawEdges();
	        this.doDraw();
	    }
	    Force2.prototype.doZoom = function () {
	        var _this = this;
	        this.zoom = d3.zoom()
	            .scaleExtent([0.5, 10])
	            .duration(400)
	            .on("zoom", function () {
	            _this.container.select(".card-container").style("transform", "scale(" + d3.event.transform.k + ") translate(" + d3.event.transform.x + "px," + d3.event.transform.y + "px)");
	            _this.container.select(".lines").attr("transform", d3.event.transform);
	        });
	        this.container.call(this.zoom);
	    };
	    Force2.prototype.doDrawEdges = function () {
	        this.svgEdges = this.cardContainer.append("svg")
	            .attr("class", "lines")
	            .selectAll("line")
	            .data(this.links)
	            .enter()
	            .append("line")
	            .style("stroke", "#ccc")
	            .style("stroke-width", 1);
	        this.dragLine = this.cardContainer.select("svg")
	            .append("line")
	            .attr("class", "drag_line")
	            .attr("x1", 0)
	            .attr("y1", 0)
	            .attr("x2", 0)
	            .attr("y2", 0);
	    };
	    Force2.prototype.doDraw = function () {
	        var _this = this;
	        var width = innerWidth, height = innerHeight;
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links || []))
	            .force("charge", d3.forceManyBody().strength(-50))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        this.container
	            .on("mousemove", function () {
	            _this.currentNode && _this.dragLine
	                .attr("x1", _this.currentNode.x)
	                .attr("y1", _this.currentNode.y)
	                .attr("x2", d3.event.layerX)
	                .attr("y2", d3.event.layerY)
	                .style("stroke", "#000")
	                .style("stroke-width", 1);
	            return false;
	        });
	        this.cardContainer
	            .selectAll(".card")
	            .data(this.nodes)
	            .enter();
	        this.cardContainer
	            .selectAll(".card")
	            .on("mousedown", function (d) {
	            _this.currentNode = d;
	        })
	            .on("mouseup", function () {
	        });
	        this.simulation.nodes(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .on("tick", ticked)
	            .force("link");
	        var container = this.cardContainer;
	        var edges = this.svgEdges;
	        function ticked() {
	            edges
	                .attr("x1", function (d) {
	                return (d.source.x || 0);
	            })
	                .attr("y1", function (d) {
	                return d.source.y || 0;
	            })
	                .attr("x2", function (d) {
	                return d.target.x || 0;
	            })
	                .attr("y2", function (d) {
	                return (d.target.y || 0);
	            });
	            container.selectAll(".card").style("left", function (d) {
	                return (d.x || 0) + "px";
	            }).style("top", function (d) {
	                return (d.y || 0) + "px";
	            });
	        }
	    };
	    return Force2;
	}());
	exports.Force2 = Force2;


/***/ },
/* 30 */,
/* 31 */
/***/ function(module, exports) {

	"use strict";
	(function (ActionType) {
	    ActionType[ActionType["none"] = 0] = "none";
	    ActionType[ActionType["list"] = 1] = "list";
	    ActionType[ActionType["form"] = 2] = "form";
	    ActionType[ActionType["wizard"] = 3] = "wizard";
	    ActionType[ActionType["confirm"] = 4] = "confirm";
	})(exports.ActionType || (exports.ActionType = {}));
	var ActionType = exports.ActionType;


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	var AllInController = (function () {
	    function AllInController($stateParams, fxAction, toolbarUtils, materialUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	    }
	    AllInController.$inject = ["$stateParams", "fxAction", "toolbarUtils", "materialUtils"];
	    return AllInController;
	}());
	exports.AllInController = AllInController;


/***/ },
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var Service = (function () {
	    function Service() {
	    }
	    Service._name = "materialUtils";
	    Service.provider = ["$timeout", "$state", "$stateParams", "$mdToast", "$mdDialog", "$mdSidenav", function ($timeout, $state, $stateParams, $mdToast, $mdDialog, $mdSidenav) {
	            var MaterialService = (function () {
	                function MaterialService() {
	                }
	                MaterialService.prototype.preventDefault = function ($event) {
	                    if ($event) {
	                        $event.preventDefault();
	                    }
	                };
	                MaterialService.prototype.stopPropagation = function ($event) {
	                    $event && ($event.cancelBubble = true) && $event.stopPropagation();
	                };
	                MaterialService.prototype.stopAll = function ($event) {
	                    this.preventDefault($event);
	                    this.stopPropagation($event);
	                };
	                MaterialService.prototype.close = function () {
	                    $mdDialog && $mdDialog.cancel();
	                };
	                MaterialService.prototype.safeApply = function ($scope, applyFn) {
	                    if (!$scope.$$phase)
	                        $scope.$apply(applyFn);
	                    else
	                        applyFn();
	                };
	                MaterialService.prototype.alert = function (title, content) {
	                    var alert = $mdDialog.show($mdDialog.alert()
	                        .clickOutsideToClose(true)
	                        .title(title)
	                        .content(content || "操作成功！")
	                        .ariaLabel(title)
	                        .ok("知道了"));
	                    return alert;
	                };
	                MaterialService.prototype.showErrMsg = function (msg) {
	                    return $mdToast.show($mdToast.simple()
	                        .textContent(msg || "error")
	                        .position("bottom right")
	                        .action("关闭")
	                        .capsule(true)
	                        .highlightAction(true)
	                        .hideDelay(3000));
	                };
	                MaterialService.prototype.showMsg = function (msg) {
	                    return $mdToast.show($mdToast.simple()
	                        .textContent(msg || "success")
	                        .position("top right")
	                        .action("关闭")
	                        .capsule(true)
	                        .highlightAction(true)
	                        .hideDelay(3000));
	                };
	                MaterialService.prototype.openMenu = function ($mdOpenMenu, $event) {
	                    $mdOpenMenu($event);
	                };
	                MaterialService.prototype.buildToggle = function (navId) {
	                    return function () {
	                        $mdSidenav(navId).toggle()
	                            .then(function () {
	                        });
	                    };
	                };
	                return MaterialService;
	            }());
	            return new MaterialService();
	        }];
	    return Service;
	}());
	var module = angular.module("fxMaterialModule", []);
	module.service(Service._name, Service.provider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	__webpack_require__(38);
	var Service = (function () {
	    function Service() {
	    }
	    Service._name = "restUtils";
	    Service.provider = ["$rootScope", "Restangular", function ($rootScope, restangular) {
	            var Service = (function () {
	                function Service(baseUrl) {
	                    var _this = this;
	                    if (baseUrl === void 0) { baseUrl = ""; }
	                    this.params = {};
	                    this.headers = {};
	                    restangular.setBaseUrl(baseUrl);
	                    this.rest = restangular.withConfig(function (restAngularConfig) {
	                        _this.restAngularConfig = restAngularConfig;
	                    });
	                }
	                Service.prototype.getCustom = function (address, port, path) {
	                    if (port === void 0) { port = 0; }
	                    var baseUrl = "";
	                    var restangu;
	                    if (address) {
	                        baseUrl = "" + address;
	                    }
	                    if (address && port) {
	                        baseUrl += ":" + port;
	                    }
	                    if (!path) {
	                        console.error("path\u4E0D\u80FD\u4E3A\u7A7A!");
	                        return null;
	                    }
	                    if (baseUrl) {
	                        restangu = this.rest.oneUrl("custom", baseUrl);
	                    }
	                    else {
	                        restangu = this.rest;
	                    }
	                    _.each(path.split("/"), function (p) {
	                        restangu = restangu.all(p);
	                    });
	                    return restangu;
	                };
	                Service.prototype.getCustomRestful = function (address, port, path) {
	                    if (port === void 0) { port = 0; }
	                    var baseUrl = "";
	                    if (address) {
	                        baseUrl = "" + address;
	                    }
	                    if (address && port) {
	                        baseUrl += ":" + port;
	                    }
	                    return this.getRestAngular(path, true, baseUrl);
	                };
	                Service.prototype.setConfig = function (fn) {
	                    if (_.isFunction(fn)) {
	                        return fn(this.restAngularConfig);
	                    }
	                };
	                Service.prototype.getRestAngular = function (router, unique, baseUrl) {
	                    if (unique === void 0) { unique = true; }
	                    if (baseUrl === void 0) { baseUrl = ""; }
	                    var restAngular;
	                    var restAngularP = unique ? this.rest : restangular;
	                    if (baseUrl) {
	                        restAngular = restAngularP.oneUrl(router, baseUrl);
	                    }
	                    restAngular = (restAngular || restAngularP).all(router);
	                    return restAngular;
	                };
	                return Service;
	            }());
	            return new Service("");
	        }];
	    return Service;
	}());
	var module = angular.module("fxRestModule", ["restangular"]);
	module.service(Service._name, Service.provider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 38 */,
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(40);
	__webpack_require__(54);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	var module_1 = __webpack_require__(41);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var Service = (function () {
	    function Service() {
	    }
	    Service._builderName = "actionUtils";
	    Service.builder = [function () {
	            var Base = (function () {
	                function Base(data) {
	                    this.data = data;
	                }
	                Base.prototype.columnUnitBuilder = function (unit, numeric) {
	                    if (numeric === void 0) { numeric = false; }
	                    this.data = _.extend({}, this.data, {
	                        unit: unit,
	                        numeric: numeric
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
	                Service.prototype.columnBuilder = function (content, title, name, sort, unit) {
	                    return new Service({
	                        content: content,
	                        title: title,
	                        name: name,
	                        sort: sort,
	                        unit: unit
	                    });
	                };
	                return Service;
	            }(Base));
	            return new Service();
	        }];
	    return Service;
	}());
	module_1.module.service(Service._builderName, Service.builder);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	var ngMaterial = __webpack_require__(16);
	var rest_service_1 = __webpack_require__(37);
	__webpack_require__(42);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(49);
	var _name = "fxAction";
	exports.module = angular.module(_name + "Module", [ngMaterial, rest_service_1.default, "schemaForm", "ng.jsoneditor"])
	    .config(["sfErrorMessageProvider", function (sfErrorMessageProvider) {
	        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
	        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
	        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
	        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
	        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
	        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
	        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
	    }])
	    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", "layoutBuilderProvider", function (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder, layoutBuilder) {
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'jeditor', "./decorators/jsoneditor.jade", sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder));
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'card', "./decorators/card.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]);
	        schemaFormDecoratorsProvider.defineAddOn('materialDecorator', 'autocomplete-1', "./decorators/autocomplete-1.jade", [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, layoutBuilder.builder, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilder.builder]);
	    }])
	    .run(["$templateCache", "autoCompleteBuilder", function ($templateCache) {
	        $templateCache.put('./decorators/jsoneditor.jade', __webpack_require__(50)());
	        $templateCache.put('./decorators/card.jade', __webpack_require__(51)());
	        $templateCache.put('./decorators/autocomplete-1.jade', __webpack_require__(52)());
	        $templateCache.put('./decorators/section-1.jade', __webpack_require__(53)());
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mdl = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var pointer = __webpack_require__(56);
	var _ = __webpack_require__(27);
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
	    Provider.prototype.getModelFromServer = function (key) {
	        var _this = this;
	        var defer = this.$q.defer();
	        this.getModel("actionCommonfx-1").then(function (actionModel) {
	            _this.doAction(actionModel.key, {
	                where: {
	                    key: {
	                        "$eq": key
	                    }
	                }
	            }).then(function (results) {
	                var resource = { rows: [] };
	                _this.doDealResult(actionModel, results, resource);
	                if (resource.rows && resource.rows.length) {
	                    mdl.module.value(key, resource.rows[0]);
	                    return defer.resolve(resource.rows[0]);
	                }
	                _this.mdUtils.showErrMsg("\u6CA1\u6709\u627E\u5230key[" + key + "]!");
	                defer.reject(key);
	            });
	        }).catch(defer.reject);
	        return defer.promise;
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
	                if (angular.injector([mdl.module.name]).has(key)) {
	                    defer.resolve(angular.injector([mdl.module.name]).get(key));
	                }
	                else {
	                    return this.getModelFromServer(key);
	                }
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
	            this.getModel("schemaCommonfx-1").then(function (model) {
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
	                    _a[action_model_1.ActionType.form] = __webpack_require__(58)(),
	                    _a[action_model_1.ActionType.wizard] = __webpack_require__(59)(),
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
	                    return _this.doAction(actionModel.key, item).then(function (results) {
	                        _.isFunction(callback) && callback(results);
	                    });
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
	    Provider.prototype.doDealResult = function (actionModel, results, clientData, key) {
	        if (key === void 0) { key = 'jpp'; }
	        _.forEach(actionModel.interfaces, function (iInterface) {
	            var result = results[iInterface.key];
	            var jpp = iInterface[key];
	            if (result && jpp) {
	                _.each(jpp.set, function (val) {
	                    pointer.has(result, val.from) && pointer.set(clientData, val.to, pointer.get(result, val.from));
	                });
	                _.isArray(jpp.del) && _.each(jpp.del, function (val) {
	                    pointer.has(clientData, val) && pointer.remove(clientData, val);
	                });
	            }
	        });
	        return clientData;
	    };
	    Provider.prototype.doGetField = function (restAngular, queryDataCline, interfaceModel) {
	        var idFieldPaths = !_.isArray(interfaceModel.idFieldPath) ? [] : interfaceModel.idFieldPath;
	        _.each(idFieldPaths, function (field) {
	            if (!pointer.has(queryDataCline, field)) {
	                var err = new Error("\u6CA1\u6709\u627E\u5230\u8DEF\u5F84" + field);
	                console.error(err);
	                throw err;
	            }
	            restAngular = restAngular.all(pointer.get(queryDataCline, field));
	        });
	        console.log(restAngular.getRestangularUrl());
	    };
	    Provider.prototype.doAction = function (key, queryData, $form) {
	        var _this = this;
	        var queryDataCline, actionModel;
	        if (!this.doFormCheck($form)) {
	            return;
	        }
	        return this.getModel(key).then(function (aModel) {
	            var interfacesRest = {};
	            var headers = _this.restUtils.headers;
	            var params = _this.restUtils.params;
	            actionModel = aModel;
	            _.each(actionModel.interfaces, function (interfaceModel) {
	                var promise, restAngular = interfaceModel.isRestful
	                    ? _this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
	                    : _this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
	                queryDataCline = _.cloneDeep(queryData);
	                if (interfaceModel.jpp) {
	                    _.each(interfaceModel.jpp.del, function (val) {
	                        pointer.has(queryDataCline, val) && pointer.remove(queryDataCline, val);
	                    });
	                }
	                interfaceModel.config && restAngular.withHttpConfig(interfaceModel.config);
	                switch (interfaceModel.method) {
	                    case interface_model_1.MethodType.POST:
	                        promise = restAngular.post(queryDataCline, null, headers);
	                        break;
	                    case interface_model_1.MethodType.GET:
	                        _this.doGetField(restAngular, queryDataCline, interfaceModel);
	                        promise = restAngular.customGET(null, queryDataCline, headers);
	                        break;
	                    case interface_model_1.MethodType.PUT:
	                        _this.doGetField(restAngular, queryDataCline, interfaceModel);
	                        promise = restAngular.customPUT(_.isObject(queryDataCline) ? queryDataCline : null, null, headers);
	                        break;
	                    case interface_model_1.MethodType.DELETE:
	                        _this.doGetField(restAngular, queryDataCline, interfaceModel);
	                        promise = restAngular.customDELETE(null, headers);
	                        break;
	                }
	                interfacesRest[interfaceModel.key] = promise;
	            });
	            return interfacesRest;
	        }).then(function (interfacesRest) {
	            return _this.$q.all(interfacesRest);
	        }).then(function (results) {
	            _this.doDealResult(actionModel, results, _this.restUtils.headers, 'header');
	            return results;
	        });
	    };
	    Provider.$inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q", "$mdDialog"];
	    Provider._name = 'fxAction';
	    return Provider;
	}());
	mdl.module.provider(Provider._name, [Provider]);


/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	(function (MethodType) {
	    MethodType[MethodType["GET"] = 0] = "GET";
	    MethodType[MethodType["POST"] = 1] = "POST";
	    MethodType[MethodType["DELETE"] = 2] = "DELETE";
	    MethodType[MethodType["PUT"] = 3] = "PUT";
	    MethodType[MethodType["HEAD"] = 4] = "HEAD";
	})(exports.MethodType || (exports.MethodType = {}));
	var MethodType = exports.MethodType;


/***/ },
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	function Provider() {
	    this.builder = function (args) {
	        var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');
	        if (layoutDiv && args.form.grid) {
	            Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
	                layoutDiv.setAttribute(property, args.form.grid[property]);
	            });
	        }
	        ;
	    };
	    this.$get = [function () {
	            return {};
	        }];
	}
	module_1.module.provider('layoutBuilder', [Provider]);


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	function Provider() {
	    this.builder = function (args) {
	        args.form.acOptions = _.extend({
	            textField: "",
	            keyField: "",
	            dataField: "",
	            delay: 300,
	            noCache: false,
	            _where: {},
	            search: "",
	            actionKey: ""
	        }, args.form.acOptions || {});
	    };
	    this.$get = [function () {
	            return {};
	        }];
	}
	module_1.module.provider('autoCompleteBuilder', [Provider]);


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	function Provider() {
	    function Builder(args) {
	        var options = {
	            modes: ['tree', 'code', 'text'],
	            mode: 'code',
	            name: args.form.key.join('')
	        };
	        args.form.preferText = !!args.form.preferText;
	        args.form.jsonOptions = _.extend(args.form.jsonOptions || {}, options);
	    }
	    this.builder = Builder;
	    this.$get = [function () {
	            return {};
	        }];
	}
	module_1.module.provider('jsonEditorBuilder', [Provider]);


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tv4 = __webpack_require__(48);
	var validator = __webpack_require__(64);
	var CustomFormat = (function () {
	    function CustomFormat() {
	        tv4.addFormat("email", function (data, schema) {
	            if (validator.isEmail(data)) {
	                return true;
	            }
	            return 10000;
	        });
	        tv4.addFormat("mobile", function (data, schema) {
	            if (validator.isMobilePhone(data, "zh-CN")) {
	                return null;
	            }
	            return 10003;
	        });
	        tv4.addFormat("json", function (data, schema) {
	            if (validator.isJSON(data)) {
	                return null;
	            }
	            return 10004;
	        });
	        tv4.addFormat("url-ip", function (data, schema) {
	            if (validator.isURL(data) || validator.isIP(data)) {
	                return null;
	            }
	            return { code: 10005 };
	        });
	        tv4.setErrorReporter(function (error, data, schema) {
	            return "Error code: " + error.code;
	        });
	    }
	    return CustomFormat;
	}());
	exports.customFormats = new CustomFormat();


/***/ },
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var ListSchema = (function () {
	    function ListSchema(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListSchema.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "modulesList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "schemas",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ListSchema.$inject = ["toolbarUtils", "actionUtils"];
	    ListSchema.key = "schemaCommonfx-1";
	    return ListSchema;
	}());
	var ListAction = (function () {
	    function ListAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ListAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "actionList",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "actions",
	                    jpp: {
	                        set: [{ "from": "/count", "to": "/total" }, { "from": "/rows", "to": "/rows" }]
	                    },
	                    isRestful: true
	                }]
	        };
	        return actionModel;
	    }
	    ListAction.$inject = ["toolbarUtils", "actionUtils"];
	    ListAction.key = "actionCommonfx-1";
	    return ListAction;
	}());
	var ConfigAction = (function () {
	    function ConfigAction(toolbarUtils, actionUtils) {
	        var actionModel = {
	            key: ConfigAction.key,
	            type: action_model_1.ActionType.none,
	            interfaces: [{
	                    key: "configAction",
	                    method: interface_model_1.MethodType.GET,
	                    address: "",
	                    port: null,
	                    path: "/home/config",
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    ConfigAction.$inject = ["toolbarUtils", "actionUtils"];
	    ConfigAction.key = "configAction";
	    return ConfigAction;
	}());
	var services = [ListSchema, ListAction, ConfigAction];
	_.each(services, function (ser) {
	    module_1.module.service(ser.key, ser);
	});


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.isBusy = true;
	        this.fxAction.getModel(this.key).then(function (model) {
	            return _this.fxAction.getSchema(model);
	        }).then(function (model) {
	            _this.actionModel = model;
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(130)(),
	        scope: true,
	        require: "^fxFormAction",
	        bindToController: {
	            formData: "=ngModel",
	            actionModel: "=?",
	            isBusy: "=?ngDisabled",
	            key: "@?"
	        },
	        controller: Controller,
	        controllerAs: 'formCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attrs, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxFormAction", Directive);


/***/ },
/* 130 */,
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var pointer = __webpack_require__(56);
	var Controller = (function () {
	    function Controller($scope, $q, $timeout, fxAction, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.mdLimitOptions = [10, 30, 50, 100, 300];
	        this.clientData = {};
	        this.queryData = { offset: 0, limit: 10, page: 1 };
	        this.isBusy = false;
	        this.showPage = false;
	        this.selected = [];
	        fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = _.cloneDeep(model);
	            _this.queryData = _.extend({ offset: 0, limit: 10, page: 1 }, _this.actionModel.list.queryData || {});
	            _this.initToolbar();
	            _this.initItemToolbar();
	            _this.doSearch();
	        });
	        this.onOrderChange = this.orderChange.bind(this);
	        this.onPageChange = this.pageChange.bind(this);
	        this.doSearchBind = this.doSearch.bind(this);
	    }
	    Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        var itemSource = _.clone(item);
	        if (actionModel.type === action_model_1.ActionType.form || actionModel.type === action_model_1.ActionType.wizard) {
	            itemSource = {};
	            if (pointer.has(item, actionModel.path || "")) {
	                itemSource = pointer.get(item, actionModel.path || "");
	            }
	        }
	        this.fxAction.doActionModel($event, actionModel, itemSource).then(function (result) {
	            _this.materialUtils.showMsg("" + (actionModel.successMsg || "操作成功!"));
	            _this.$timeout(function () {
	                if (actionModel.refreshList) {
	                    _this.doSearch(_this.queryData.where || {});
	                }
	            }, 200);
	        });
	    };
	    Controller.prototype.initToolbar = function () {
	        var _this = this;
	        this.actionModel.list.toolbars = [];
	        this.fxAction.getModels(this.actionModel.actions).then(function (actionModels) {
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon, { fill: "black" }).toValue());
	            _this.actionModel.list.toolbars.push(_this.toolbarUtils.labelBuilder("" + _this.actionModel.title).attrBuilder({ flex: "" }).toValue());
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-icon-button", false).tooltipBuilder("").iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false).iconBuilder("refresh", { fill: "black" }).btnClick(function ($event) {
	                    _this.doSearch(_this.queryData.where || {});
	                }).toValue());
	            }
	            if (_this.actionModel.list.showSearchBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}", { fill: "black" }).btnClick(function ($event) {
	                    _this.actionModel.list.showSearchPanel = !_this.actionModel.list.showSearchPanel;
	                }).toValue());
	            }
	        });
	    };
	    Controller.prototype.initItemToolbar = function () {
	        var _this = this;
	        var menuTool = this.toolbarUtils.menuBuilder("", "md-icon-button").tooltipBuilder("操作菜单").iconBuilder("expand_more").menuOptionsBuilder().toValue();
	        var keys = [];
	        var itemActionsObj = _.keyBy(this.actionModel.itemActions, "key");
	        _.each(this.actionModel.itemActions, function (item) {
	            keys.push(item.key);
	        });
	        keys.length && this.fxAction.getModels(keys).then(function (actionModels) {
	            _.forEach(actionModels, function (actionModel, key) {
	                var condition = itemActionsObj[key].condition;
	                switch (actionModel.type) {
	                    case action_model_1.ActionType.form:
	                    case action_model_1.ActionType.wizard:
	                    case action_model_1.ActionType.confirm:
	                        var menu = _this.toolbarUtils.menuItemBuilder(actionModel.title, null, true).tooltipBuilder("").noOptions(true, false).iconBuilder(actionModel.icon).btnClick(function ($event, item) {
	                            _this.doClickActionMenu($event, actionModel, item);
	                        });
	                        if (condition) {
	                            menu.conditionBuilder(condition);
	                        }
	                        menuTool.items.push(menu.toValue());
	                        break;
	                }
	            });
	            _this.actionModel.list.itemToolbars = [menuTool];
	        });
	    };
	    Controller.prototype.orderChange = function (order) {
	        this.queryData.order = order;
	        this.doSearch(this.queryData.where || {});
	    };
	    Controller.prototype.pageChange = function (page, limit) {
	        if (limit !== this.queryData.limit) {
	            page = 1;
	        }
	        this.queryData.page = page;
	        if (page > 0) {
	            this.queryData.offset = (page - 1) * limit;
	        }
	        this.doSearch(this.queryData.where || {});
	    };
	    Controller.prototype.doSearch = function (filterData) {
	        var _this = this;
	        this.isBusy = true;
	        this.queryData.where = filterData || {};
	        this.promise = this.fxAction.doAction(this.key, this.queryData);
	        if (!this.promise) {
	            return;
	        }
	        this.promise.then(function (result) {
	            _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    Controller.$inject = ["$scope", "$q", "$timeout", "fxAction", "toolbarUtils", "materialUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(132)(),
	        scope: true,
	        bindToController: {
	            key: "@",
	            selected: '=?'
	        },
	        controller: Controller,
	        controllerAs: 'listCtl',
	        replace: true,
	        transclude: true
	    };
	}
	module_1.module.directive("fxListAction", Directive);


/***/ },
/* 132 */,
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var pointer = __webpack_require__(56);
	var _name = "fxAutocompleteBoost";
	var Builder = (function () {
	    function Builder(form, fxAction, formData) {
	        this.form = form;
	        this.fxAction = fxAction;
	        this.formData = formData;
	        this.init();
	    }
	    Builder.prototype.init = function () {
	        var viewModel = null;
	        if (!_.isArray(this.form.key)) {
	            return;
	        }
	        if (pointer.has(this.formData, "/" + this.form.key.join('/'))) {
	            viewModel = pointer.get(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (!viewModel) {
	            return;
	        }
	        if (this.form.acOptions.keyField) {
	            return this.searchText = viewModel;
	        }
	        this.searchText = viewModel[this.form.acOptions.textField];
	        this.onChange(viewModel);
	    };
	    Builder.prototype.onChange = function (item) {
	        var curValue;
	        this.selected = item;
	        if (_.isEmpty(item) || !this.searchText) {
	            this.selected = null;
	            pointer.remove(this.formData, "/" + this.form.key.join('/'));
	            return undefined;
	        }
	        if (this.form.acOptions.keyField) {
	            if (pointer.has(item, "/" + this.form.acOptions.keyField)) {
	                curValue = pointer.get(item, "/" + this.form.acOptions.keyField);
	                pointer.set(this.formData, "/" + this.form.key.join('/'), curValue);
	                return curValue;
	            }
	            else {
	                console.error("autocomplete-1-\u6CA1\u6709\u5728item\u4E2D\u627E\u5230" + this.form.acOptions.keyField);
	                return undefined;
	            }
	        }
	        curValue = {};
	        _.each(this.form.items.concat(this.form.acOptions.fields || []), function (childItem) {
	            var keys = [].concat(childItem.key);
	            var childKey = keys.pop();
	            if (childKey && pointer.has(item, "/" + childKey)) {
	                pointer.set(curValue, "/" + childKey, pointer.get(item, "/" + childKey));
	            }
	        });
	        pointer.set(this.formData, "/" + this.form.key.join('/'), curValue);
	        return curValue;
	    };
	    Builder.prototype.query = function () {
	        var _this = this;
	        var actionModel, clientData = {};
	        var filter = {};
	        if (this.form.acOptions.actionKey) {
	            pointer.set(filter, this.form.acOptions.search, this.searchText);
	            _.forEach(this.form.acOptions._where, function (val, key) {
	                pointer.set(filter, key, val);
	            });
	            return this.fxAction.getModel(this.form.acOptions.actionKey).then(function (aModel) {
	                actionModel = aModel;
	                return _this.fxAction.doAction(actionModel.key, filter);
	            }).then(function (results) {
	                return _this.fxAction.doDealResult(actionModel, results, clientData);
	            }).then(function (results) {
	                return results[_this.form.acOptions.dataField];
	            });
	        }
	        return this.form.data || [];
	    };
	    return Builder;
	}());
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        var formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;
	        var form;
	        var compare = function (item) {
	            if (!_.isArray(item['key'])) {
	                return false;
	            }
	            return item['key'].join('') === $scope.form["key"].join('') ||
	                _.filter(item['key'], function (key) {
	                    return key && !_.isNumber(key);
	                }).join('') === $scope.form["key"].join('');
	        };
	        formWithIndex && (form = _.first(_.filter([formWithIndex], compare)));
	        !form && formWithIndex && (form = _.first(_.filter(formWithIndex.items, compare)));
	        $scope.boost = new Builder(form ? form : $scope.form, fxAction, $scope.model);
	        var onChange = $scope.boost.onChange.bind($scope.boost);
	        $scope.boost.onChange = function (item) {
	            $scope.ngModel.$setViewValue(onChange(item));
	            $scope.ngModel.$commitViewValue();
	        };
	        $scope.options = $scope.form.ngModelOptions;
	    }
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'A',
	        scope: false,
	        controller: Controller
	    };
	}
	Directive.$inject = [];
	module_1.module.directive(_name, Directive);


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var _dirName = 'fxDialogFormAction';
	var Controller = (function () {
	    function Controller($scope, fxAction, materialUtils, toolbarUtils, $mdDialog) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.doSubmit = function ($form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, $form);
	        if (promise) {
	            this.isBusy = true;
	            promise.then(function (result) {
	                _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                if (_.isFunction(_this.submitCallBack)) {
	                    _this.submitCallBack(result);
	                }
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }
	        return promise;
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = model;
	            _this.toolbars = [
	                _this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon).toValue(),
	                _this.toolbarUtils.labelBuilder(_this.actionModel.title).attrBuilder({ flex: "" }).toValue(),
	                _this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close").btnClick(function ($event) {
	                    _this.$mdDialog.cancel();
	                }).toValue()
	            ];
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction", "materialUtils", "toolbarUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(135)(),
	        scope: true,
	        require: "^" + _dirName,
	        bindToController: {
	            key: "@",
	            formData: '=ngModel',
	            submitCallBack: '=?ngSubmit'
	        },
	        controller: Controller,
	        controllerAs: 'dialogFormCtl',
	        replace: false,
	        compile: function ($ele) {
	            $ele.replaceWith(angular.element($ele.html()));
	            return function ($scope, $ele, $attrs, $ctl) {
	                $scope.$watch(function () {
	                    return $ctl.key;
	                }, function () {
	                    $ctl.getActionModel();
	                });
	            };
	        }
	    };
	}
	module_1.module.directive(_dirName, Directive);


/***/ },
/* 135 */,
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _ = __webpack_require__(27);
	var pointer = __webpack_require__(56);
	var _name = "fxSearchAction";
	var Controller = (function () {
	    function Controller(fxAction, toolbarUtils) {
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.initSearchToolbar();
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.clearFilterData = function () {
	        var _this = this;
	        _.forEach(this.formData, function (val, key) {
	            delete _this.formData[key];
	        });
	    };
	    Controller.prototype.initSearchToolbar = function () {
	        var _this = this;
	        this.toolbars = [
	            this.toolbarUtils.labelBuilder('{{searchCtl.title}}搜索').attrBuilder({ flex: "" }).toValue(),
	            this.toolbarUtils.btnBuilder("清空搜索条件", "md-icon-button", false).iconBuilder("clear_all").btnClick(function ($event) {
	                _this.clearFilterData();
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("关闭搜索栏", "md-icon-button", false).iconBuilder("{{searchCtl.isShow?'window-open':'window-closed'}}").btnClick(function ($event) {
	                _this.isShow = !_this.isShow;
	            }).toValue()
	        ];
	    };
	    Controller.prototype.doPreSearch = function ($event, $form) {
	        var searchData = {};
	        if (this.fxAction.doFormCheck($form) && _.isFunction(this.doSearch)) {
	            _.forEach(this.formData, function (data, key) {
	                if (key.substr(0, 1) === "/") {
	                    if (!_.isNull(data) && !_.isUndefined(data)) {
	                        pointer.set(searchData, key, data);
	                    }
	                    else {
	                        pointer.has(searchData, key) && pointer.remove(searchData, key);
	                    }
	                }
	            });
	            this.doSearch(searchData);
	        }
	    };
	    Controller.$inject = ["fxAction", "toolbarUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(137)(),
	        bindToController: {
	            formData: "=ngModel",
	            key: "@",
	            disabled: '=',
	            isShow: '=',
	            doSearch: '=?',
	            title: '=?'
	        },
	        require: "^" + _name,
	        controller: Controller,
	        controllerAs: 'searchCtl',
	        replace: true
	    };
	}
	module_1.module.directive(_name, Directive);


/***/ },
/* 137 */,
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var action_model_1 = __webpack_require__(31);
	var Controller = (function () {
	    function Controller($scope, $timeout, fxAction, toolbarUtils, materialUtils, $mdDialog) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.$mdDialog = $mdDialog;
	        this.isShow = true;
	        this.selectedIndex = 0;
	        this.initToolbar();
	        this.$scope.$on("$destroy", function () {
	            _this.formData = null;
	            _this.$forms = null;
	            _this.toolbars = null;
	            _this.actionModel = null;
	        });
	    }
	    Controller.prototype.initForm = function (action, $scope) {
	        if (!this.$forms) {
	            this.$forms = {};
	        }
	        this.$forms[action.key] = $scope[(action.key + "Form")];
	    };
	    Controller.prototype.showForm = function (action, index) {
	        return index === 0 || this.$forms.hasOwnProperty(action.key) || index == this.selectedIndex || index == this.actionModel.wizard.actions.length - 1;
	    };
	    Controller.prototype.doCheckCurrentForm = function (index) {
	        var actionModel = this.actionModel.wizard.actions[_.isUndefined(index) ? this.selectedIndex : index];
	        if (this.$forms) {
	            var formController = this.$forms[("" + actionModel.key)];
	            if (!this.fxAction.doFormCheck(formController)) {
	                return false;
	            }
	        }
	        return true;
	    };
	    Controller.prototype.doCheckForms = function () {
	        var _this = this;
	        var res = true;
	        _.each(this.actionModel.wizard.actions, function (action, index) {
	            res = _this.doCheckCurrentForm(index);
	            if (!res) {
	                _this.selectedIndex = index;
	                return false;
	            }
	        });
	        return res;
	    };
	    Controller.prototype.reset = function () {
	        var _this = this;
	        this.formData = {};
	        this.$forms = {};
	        this.selectedIndex = 0;
	        this.isShow = false;
	        this.$timeout(function () {
	            _this.isShow = true;
	        }, 0);
	    };
	    Controller.prototype.initToolbar = function () {
	        var _this = this;
	        this.toolbars = [
	            this.toolbarUtils.btnBuilder("上一步", null, true, "top").iconBuilder("navigate_before").conditionBuilder("wizardCtl.selectedIndex>0", false).btnClick(function ($event) {
	                _this.selectedIndex && _this.selectedIndex--;
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("下一步", null, true, "top").iconBuilder(null, null, "navigate_next").conditionBuilder("wizardCtl.selectedIndex < wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckCurrentForm() && _.isArray(_this.actionModel.wizard.actions) && _this.actionModel.wizard.actions.length > _this.selectedIndex) {
	                    _this.selectedIndex++;
	                }
	            }).toValue(),
	            this.toolbarUtils.btnBuilder("完成", "md-primary", true, "top").iconBuilder("done_all").conditionBuilder("!wizardCtl.isBusy && wizardCtl.selectedIndex===wizardCtl.actionModel.wizard.actions.length-1", false).btnClick(function ($event) {
	                if (_this.doCheckForms()) {
	                    _this.isBusy = true;
	                    _this.fxAction.doAction(_this.actionModel.key, _this.formData).then(function (result) {
	                        _this.actionModel.closeDialog === true && _this.$mdDialog.hide(result);
	                        if (_.isFunction(_this.submitCallBack)) {
	                            _this.submitCallBack(result);
	                        }
	                    }).finally(function () {
	                        _this.isBusy = false;
	                    });
	                }
	            }).toValue()
	        ];
	    };
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        var actionModel;
	        this.fxAction.getModel(this.key).then(function (model) {
	            actionModel = _.cloneDeep(model);
	            return _this.fxAction.getModels(model.wizard.actions);
	        }).then(function (actionModels) {
	            var actions = [];
	            _.each(actionModel.wizard.actions, function (action) {
	                if (_.isString(action)) {
	                    action = actionModels[action];
	                }
	                if (action && (action.type === action_model_1.ActionType.form || action.type === action_model_1.ActionType.wizard)) {
	                    actions.push(action);
	                }
	            });
	            actionModel.wizard.actions = actions;
	            _this.actionModel = actionModel;
	        });
	    };
	    Controller.$inject = ["$scope", "$timeout", "fxAction", "toolbarUtils", "materialUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(139)(),
	        scope: true,
	        require: "^fxWizardAction",
	        bindToController: {
	            formData: "=ngModel",
	            submitCallBack: "=?ngSubmit",
	            key: "@"
	        },
	        controller: Controller,
	        controllerAs: 'wizardCtl',
	        replace: true,
	        transclude: true,
	        link: function ($scope, $ele, $attr, $ctl) {
	            $scope.$watch(function () {
	                return $ctl.key;
	            }, function () {
	                $ctl.getActionModel();
	            });
	        }
	    };
	}
	module_1.module.directive("fxWizardAction", Directive);


/***/ },
/* 139 */,
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _dirName = 'fxDialogWizardAction';
	var Controller = (function () {
	    function Controller($scope, fxAction, materialUtils, toolbarUtils, $mdDialog) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.formData = this.formData || {};
	    }
	    Controller.prototype.getActionModel = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (model) {
	            _this.actionModel = model;
	            _this.toolbars = [
	                _this.toolbarUtils.noneBuilder("icon").iconBuilder(_this.actionModel.icon).toValue(),
	                _this.toolbarUtils.labelBuilder(_this.actionModel.title).attrBuilder({ flex: "" }).toValue(),
	                _this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close").btnClick(function ($event) {
	                    _this.$mdDialog.cancel("用户关闭");
	                }).toValue()
	            ];
	        });
	    };
	    Controller.$inject = ["$scope", "fxAction", "materialUtils", "toolbarUtils", "$mdDialog"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(141)(),
	        scope: true,
	        require: "^" + _dirName,
	        bindToController: {
	            key: "@",
	            formData: '=ngModel',
	            submitCallBack: "=?ngSubmit",
	        },
	        controller: Controller,
	        controllerAs: 'dialogWizardCtl',
	        replace: false,
	        compile: function ($ele) {
	            $ele.replaceWith(angular.element($ele.html()));
	            return function ($scope, $ele, $attr, $ctl) {
	                $scope.$watch(function () {
	                    return $ctl.key;
	                }, function () {
	                    $ctl.getActionModel();
	                });
	            };
	        }
	    };
	}
	module_1.module.directive(_dirName, Directive);


/***/ },
/* 141 */,
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(41);
	var _name = "fxBuilderAction";
	var Controller = (function () {
	    function Controller(fxAction, toolbarUtils) {
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.formData = this.formData || {};
	    }
	    Controller.$inject = ["fxAction", "toolbarUtils"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(143)(),
	        bindToController: {
	            formData: "=ngModel",
	            key: "@"
	        },
	        require: "^" + _name,
	        controller: Controller,
	        controllerAs: 'formBuilderCtl',
	        replace: true
	    };
	}
	Directive.$inject = [];
	module_1.module.directive(_name, Directive);


/***/ },
/* 143 */,
/* 144 */
/***/ function(module, exports) {

	"use strict";
	var CompileDirective = (function () {
	    function CompileDirective() {
	    }
	    CompileDirective._name = "dyCompile";
	    CompileDirective.directive = [
	        "$compile",
	        function ($compile) {
	            var directive = {
	                replace: false,
	                restrict: "A",
	                scope: {
	                    item: "=",
	                    $index: "@",
	                    parent: "="
	                },
	                link: function ($scope, $element, $attrs) {
	                    var dummyScope = {
	                        $destroy: angular.noop
	                    }, childScope, content, destoryChildScope = function () {
	                        (childScope || dummyScope).$destroy();
	                    };
	                    $attrs.$observe("html", function (html) {
	                        if (html) {
	                            destoryChildScope();
	                            childScope = $scope.$new(false);
	                            childScope["item"] = $scope["item"];
	                            childScope["$index"] = $scope["$index"];
	                            childScope["parent"] = $scope["parent"];
	                            if (html.search("<") === 0) {
	                                content = $compile(html)(childScope);
	                                $element.replaceWith(content);
	                            }
	                            else {
	                                content = childScope.$eval(html);
	                                $element.text(content);
	                            }
	                        }
	                    });
	                }
	            };
	            return directive;
	        }
	    ];
	    return CompileDirective;
	}());
	var moduleName = "dyCompile";
	var module = angular.module(moduleName, []).directive(CompileDirective._name, CompileDirective.directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(151);
	var ngMaterialIcons = __webpack_require__(20);
	var _ = __webpack_require__(27);
	var router_1 = __webpack_require__(152);
	var material_service_1 = __webpack_require__(36);
	var svg_service_1 = __webpack_require__(161);
	var toolbar_1 = __webpack_require__(162);
	var sidemenu_1 = __webpack_require__(171);
	__webpack_require__(183);
	var action_model_1 = __webpack_require__(31);
	var module = angular.module("homeModule", [toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.definePalette('amazingPaletteName', {
	            '50': 'E8EAF6',
	            '100': 'C5CAE9',
	            '200': 'B39DDB',
	            '300': 'B39DDB',
	            '400': 'BDBDBD',
	            '500': '9B26AF',
	            '600': '757575',
	            '700': '7A1EA1',
	            '800': '691A99',
	            '900': '263238',
	            'A100': 'FFE57F',
	            'A200': '68EFAD',
	            'A400': 'FF3D00',
	            'A700': 'DD2C00',
	            'contrastDefaultColor': 'light',
	            'contrastDarkColors': ['50', '100',
	                '200', '300', '400', 'A100'],
	            'contrastLightColors': ['50', '100',
	                '200', '300', '400', 'A100']
	        });
	        $mdThemingProvider.theme('default')
	            .primaryPalette('purple')
	            .accentPalette('red')
	            .warnPalette('grey');
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
/* 151 */,
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var home_controller_1 = __webpack_require__(153);
	var sidenavl_controller_1 = __webpack_require__(154);
	var sidenavr_controller_1 = __webpack_require__(155);
	var content_controller_1 = __webpack_require__(156);
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
	                template: __webpack_require__(157)(),
	            },
	            "sidenavLeft@home": {
	                controller: sidenavl_controller_1.SidenavLeftController,
	                controllerAs: "sideLeftCtl",
	                template: __webpack_require__(158)(),
	            },
	            "sidenavRight@home": {
	                controller: sidenavr_controller_1.SidenavRightController,
	                controllerAs: "sideRightCtl",
	                template: __webpack_require__(159)(),
	            },
	            "content@home": {
	                controller: content_controller_1.ContentController,
	                controllerAs: "contentCtl",
	                template: __webpack_require__(160)(),
	            }
	        }
	    });
	};


/***/ },
/* 153 */
/***/ function(module, exports) {

	"use strict";
	var HomeController = (function () {
	    function HomeController($rootScope, materialUtils, toolbarUtils) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.materialUtils = materialUtils;
	        this.toolbarUtils = toolbarUtils;
	        this.title = "Ἀσάνα";
	        $rootScope["user"] = "NICK";
	        this.toolbar = [
	            toolbarUtils.btnBuilder("logo", "md-icon-button", false).iconBuilder("blender").btnClick(function ($event) {
	                _this.doOpenNav($event);
	            }).toValue(),
	            toolbarUtils.labelBuilder(this.title).attrBuilder({ flex: "" }).toValue(),
	            toolbarUtils.btnBuilder($rootScope["user"], null, true).iconBuilder("more_vert").btnClick(function ($event) {
	                _this.doOpenNav($event, 'right');
	            }).toValue(),
	        ];
	    }
	    HomeController.prototype.doOpenNav = function ($event, directive) {
	        if (directive === void 0) { directive = "left"; }
	        this.materialUtils.buildToggle(directive).call(this, $event);
	    };
	    HomeController.$inject = ["$rootScope", "materialUtils", "toolbarUtils"];
	    return HomeController;
	}());
	exports.HomeController = HomeController;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
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
	                }).toValue()
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
	    SidenavLeftController.$inject = ["$rootScope", "mdSideMenuSections", "toolbarUtils", "fxAction", "$state", "$stateParams", "$timeout", "fxSideMenuFactory"];
	    return SidenavLeftController;
	}());
	exports.SidenavLeftController = SidenavLeftController;


/***/ },
/* 155 */
/***/ function(module, exports) {

	"use strict";
	var SidenavRightController = (function () {
	    function SidenavRightController($mdColorPalette, fxAction) {
	        this.$mdColorPalette = $mdColorPalette;
	        this.fxAction = fxAction;
	        this.colors = Object.keys($mdColorPalette);
	    }
	    SidenavRightController.prototype.selectTheme = function (color) {
	        console.log(color);
	    };
	    SidenavRightController.prototype.showTheme = function ($event) {
	        console.log($event);
	    };
	    SidenavRightController.prototype.doExit = function ($event) {
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
	    SidenavRightController.$inject = ["$mdColorPalette", "fxAction"];
	    return SidenavRightController;
	}());
	exports.SidenavRightController = SidenavRightController;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
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
	    }
	    ContentController.prototype.doOpenIconInfo = function ($event, iconInfo) {
	        this.fxAction.doActionModel($event, this.iconInfoDetailForm, { key: iconInfo });
	    };
	    ContentController.$inject = ["$rootScope", "$timeout", "materialUtils", "svgUtils", "fxAction", "iconInfoDetailForm"];
	    return ContentController;
	}());
	exports.ContentController = ContentController;


/***/ },
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	var ngMaterialIcons = __webpack_require__(20);
	var ngMaterial = __webpack_require__(16);
	var Service = (function () {
	    function Service() {
	    }
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
	    return Service;
	}());
	var module = angular.module("mdSvgModule", [ngMaterialIcons, ngMaterial]);
	module.service(Service._name, Service.provider);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(163);
	__webpack_require__(170);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	var angular = __webpack_require__(1);
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
	strategy.register("icon", __webpack_require__(164)());
	strategy.register("btn", __webpack_require__(165)());
	strategy.register("layout", __webpack_require__(166)());
	strategy.register("label", __webpack_require__(167)());
	strategy.register("menu", __webpack_require__(168)());
	strategy.register("menuItem", __webpack_require__(169)());
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
	exports.module = angular.module(_name + "Module", []).directive(_name, Directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var module_1 = __webpack_require__(163);
	var _ = __webpack_require__(27);
	__webpack_require__(38);
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
	module_1.module.service(Service._name, Service.provider);


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(182);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
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
	exports.module = angular.module(_module, ["ngAnimate", "ngMaterial"]).directive(_name, ["mdSideMenuSections", Directive]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
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
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
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
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
	function Directive(mdSideMenuSections, $timeout) {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(181),
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
/* 181 */,
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(172);
	var _ = __webpack_require__(27);
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
/* 183 */,
/* 184 */,
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var router_1 = __webpack_require__(186);
	var material_service_1 = __webpack_require__(36);
	var rest_service_1 = __webpack_require__(37);
	var action_1 = __webpack_require__(39);
	var login_value_1 = __webpack_require__(193);
	__webpack_require__(38);
	var module = angular.module("loginModule", [ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default, action_1.default, 'restangular']);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$state", "restUtils", function ($state, restUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status === 401 && !response.config["salt"]) {
	                    !$state.is("passport.login") && $state.go("passport.login");
	                    return false;
	                }
	                return true;
	            });
	        });
	    }]);
	login_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var login_controller_1 = __webpack_require__(187);
	var register_controller_1 = __webpack_require__(188);
	var index_controller_1 = __webpack_require__(189);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("passport", {
	        url: "/passport",
	        abstract: true,
	        views: {
	            "": {
	                controller: index_controller_1.IndexController,
	                controllerAs: "indexCtl",
	                template: __webpack_require__(190)()
	            }
	        }
	    }).state("passport.login", {
	        url: "/login",
	        views: {
	            "passportContent": {
	                controller: login_controller_1.LoginController,
	                controllerAs: "loginCtl",
	                template: __webpack_require__(191)()
	            }
	        }
	    }).state("passport.register", {
	        url: "/register",
	        views: {
	            "passportContent": {
	                controller: register_controller_1.RegisterController,
	                controllerAs: "registerCtl",
	                template: __webpack_require__(192)()
	            }
	        }
	    });
	};


/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";
	var LoginController = (function () {
	    function LoginController($state, fxAction, materialUtils) {
	        this.$state = $state;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.key = "login";
	        this.formData = { username: "nick", password: "nick" };
	    }
	    LoginController.prototype.doSubmit = function ($form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, $form);
	        promise && promise.then(function () {
	            _this.materialUtils.showMsg("登陆成功,正在跳转!").then(function () {
	                _this.$state.go("home");
	            });
	        });
	    };
	    LoginController.$inject = ["$state", "fxAction", "materialUtils"];
	    return LoginController;
	}());
	exports.LoginController = LoginController;


/***/ },
/* 188 */
/***/ function(module, exports) {

	"use strict";
	var RegisterController = (function () {
	    function RegisterController($rootScope, $timeout) {
	        this.$rootScope = $rootScope;
	        this.$timeout = $timeout;
	        this.title = "用户注册";
	    }
	    return RegisterController;
	}());
	exports.RegisterController = RegisterController;
	RegisterController.$inject = ["$rootScope", "$timeout"];


/***/ },
/* 189 */
/***/ function(module, exports) {

	"use strict";
	var IndexController = (function () {
	    function IndexController($scope, $mdMedia) {
	        var _this = this;
	        this.$scope = $scope;
	        this.$mdMedia = $mdMedia;
	        $scope.$watch(function () {
	            return $mdMedia('xs');
	        }, function (small) {
	            _this.screenIsSmall = small;
	        });
	    }
	    IndexController.$inject = ["$scope", "$mdMedia"];
	    return IndexController;
	}());
	exports.IndexController = IndexController;


/***/ },
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	function LoginSchemaValue() {
	    var actionModel = {
	        key: "login",
	        type: action_model_1.ActionType.form,
	        icon: "",
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
	        interfaces: [{
	                key: "loginAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/login",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	function LogoutSchemaValue() {
	    var actionModel = {
	        key: "logout",
	        type: action_model_1.ActionType.confirm,
	        icon: "",
	        confirm: {
	            confirmTitle: '用户中心',
	            confirmContent: '确定要退出么?',
	            confirmOk: "果断退出",
	            confirmCancel: '在看看'
	        },
	        interfaces: [{
	                key: "logoutAction",
	                method: interface_model_1.MethodType.POST,
	                address: "",
	                port: null,
	                path: "/passport/logout",
	                isRestful: false
	            }]
	    };
	    return actionModel;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var models = [LoginSchemaValue(), LogoutSchemaValue()];
	    _.each(models, function (model) {
	        module.value(model.key, model);
	    });
	};


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var router_1 = __webpack_require__(195);
	var material_service_1 = __webpack_require__(36);
	var rest_service_1 = __webpack_require__(37);
	var salt_api_value_1 = __webpack_require__(198);
	var module = angular.module("saltModule", [ngMaterialIcons, ngMaterial, 'ui.router', material_service_1.default, rest_service_1.default]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "RestangularProvider",
	    function ($stateProvider, $urlRouterProvider, RestangularProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        RestangularProvider.setDefaultHeaders({
	            'Content-Type': 'application/json'
	        });
	        RestangularProvider.setDefaultHttpFields({
	            'withCredentials': true
	        });
	    }])
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", function ($rootScope, $state, restUtils, materialUtils) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
	                if (response.status === 200 && response.config["salt"] && what === "login") {
	                    $rootScope.$emit("saltLoginEvent", data);
	                }
	                return data;
	            });
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status === 401 && response.config["salt"]) {
	                    materialUtils.showErrMsg("SALT未登录");
	                    return false;
	                }
	                return true;
	            });
	        });
	    }]);
	salt_api_value_1.default(module);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_controller_1 = __webpack_require__(196);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.salt", {
	        url: "salt/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: index_controller_1.SaltController,
	                controllerAs: "saltCtl",
	                template: __webpack_require__(197)()
	            }
	        }
	    });
	};


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(27);
	var SaltController = (function () {
	    function SaltController($rootScope, $scope, $stateParams, toolbarUtils, materialUtils, fxAction, restUtils) {
	        var _this = this;
	        this.$rootScope = $rootScope;
	        this.$scope = $scope;
	        this.$stateParams = $stateParams;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.fxAction = fxAction;
	        this.restUtils = restUtils;
	        this.toolbar = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', {}).toValue(),
	            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({ flex: "" }).toValue()
	        ];
	        this.fxAction.getModels(["saltApiRun", "saltApiRun1", "saltApiStats", "saltApiLogin", "saltApiLogout", "saltApiMinions", "saltApiJobs"]).then(function (actionModels) {
	            _this.toolbarTest = [];
	            _.forEach(actionModels, function (actionModel) {
	                _this.toolbarTest.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-button", true).iconBuilder(actionModel.icon, {}).btnClick(function ($event) {
	                    _this.fxAction.doActionModel($event, actionModel, null, function (result) {
	                        return _this.fxAction.getModel("resultAction").then(function (actionModelResult) {
	                            _this.fxAction.doActionModel($event, actionModelResult, _this.fxAction.doDealResult(actionModel, result, {}), function () {
	                                _this.materialUtils.close();
	                            });
	                        });
	                    });
	                }).toValue());
	            });
	        });
	        this.$rootScope.$on("saltLoginEvent", function (event, data) {
	            _this.initEvents(data);
	        });
	    }
	    SaltController.prototype.initEvents = function (data) {
	        var source = new window["EventSource"]('https://172.16.140.164:8888/events/' + data.return[0].token);
	        source.onopen = function () {
	            console.debug('opening');
	        };
	        source.onerror = function (e) {
	            console.debug('error!', e);
	        };
	        source.onmessage = function (e) {
	            console.debug(e.data);
	        };
	    };
	    SaltController.$inject = ["$rootScope", "$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction", "restUtils"];
	    return SaltController;
	}());
	exports.SaltController = SaltController;


/***/ },
/* 197 */,
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(31);
	var interface_model_1 = __webpack_require__(55);
	var ip = "https://172.16.140.164";
	var port = 8888;
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
	                    address: ip,
	                    port: port,
	                    path: "login",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    header: {
	                        set: [{
	                                "from": "/return/0/token", "to": "/X-Auth-Token"
	                            }]
	                    },
	                    config: {
	                        salt: true
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
	                    address: ip,
	                    port: port,
	                    path: "logout",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
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
	            key: Minions.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有CLIENT",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取minions!"
	            },
	            interfaces: [{
	                    key: "saltApiMinions",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "minions",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Minions.key = "saltApiMinions";
	    return Minions;
	}());
	var Jobs = (function () {
	    function Jobs() {
	        var actionModel = {
	            key: Jobs.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有JOBS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取JOBS!"
	            },
	            interfaces: [{
	                    key: "saltApiJobs",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "jobs",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Jobs.key = "saltApiJobs";
	    return Jobs;
	}());
	var Events = (function () {
	    function Events() {
	        var actionModel = {
	            key: Events.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有EVENTS",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取EVENTS!"
	            },
	            interfaces: [{
	                    key: "saltApiEvents",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "events",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Events.key = "saltApiEvents";
	    return Events;
	}());
	var Stats = (function () {
	    function Stats() {
	        var actionModel = {
	            key: Stats.key,
	            type: action_model_1.ActionType.confirm,
	            title: "所有Stats",
	            icon: "client",
	            refreshList: true,
	            confirm: {
	                confirmTitle: "",
	                confirmContent: "获取Stats!"
	            },
	            interfaces: [{
	                    key: "saltApiStats",
	                    method: interface_model_1.MethodType.GET,
	                    address: ip,
	                    port: port,
	                    path: "stats",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Stats.key = "saltApiStats";
	    return Stats;
	}());
	var Run = (function () {
	    function Run() {
	        var actionModel = {
	            key: Run.key,
	            type: action_model_1.ActionType.form,
	            title: "执行命令",
	            icon: "run",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["client"],
	                    properties: {
	                        username: {
	                            type: "string",
	                            title: "用户名",
	                            default: "saltapi"
	                        },
	                        eauth: {
	                            type: "string",
	                            default: "pam"
	                        },
	                        password: {
	                            type: "string",
	                            title: "密码",
	                            default: "saltapi",
	                            minLength: 4,
	                            maxLength: 20
	                        },
	                        client: {
	                            type: "string",
	                            default: "local"
	                        },
	                        tgt: {
	                            type: "string",
	                            default: "*"
	                        },
	                        fun: {
	                            type: "string",
	                            default: "test.ping"
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "client",
	                        type: "text"
	                    }, {
	                        key: "tgt",
	                        type: "text"
	                    }, {
	                        key: "fun",
	                        type: "text"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiRun",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "run",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Run.key = "saltApiRun";
	    return Run;
	}());
	var Run1 = (function () {
	    function Run1() {
	        var actionModel = {
	            key: Run1.key,
	            type: action_model_1.ActionType.form,
	            title: "执行命令-1",
	            icon: "run",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["client"],
	                    properties: {
	                        mode: {
	                            type: "string",
	                            default: "async"
	                        },
	                        tgt: {
	                            type: "string",
	                            default: "*"
	                        },
	                        fun: {
	                            type: "string",
	                            default: "test.ping"
	                        },
	                        arg: {
	                            "type": "array",
	                            "title": "参数",
	                            "default": [],
	                            "items": {
	                                "type": "string",
	                                "title": "参数"
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "tgt",
	                        type: "text"
	                    }, {
	                        key: "fun",
	                        type: "text"
	                    }, {
	                        key: "arg",
	                        startEmpty: true,
	                        type: "chips"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "saltApiRun",
	                    method: interface_model_1.MethodType.POST,
	                    address: ip,
	                    port: port,
	                    path: "minions",
	                    jpp: {
	                        set: [{ "from": "/return", "to": "/data" }]
	                    },
	                    config: {
	                        salt: true
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    Run1.key = "saltApiRun1";
	    return Run1;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [Login, Logout, Minions, Jobs, Events, Stats, Run, Run1];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ }
])
//# sourceMappingURL=0.d87e271ab228ace7e6b1.hot-update.js.map
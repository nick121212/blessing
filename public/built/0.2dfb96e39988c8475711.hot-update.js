webpackHotUpdate(0,{

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(25);
	var page_d3_controller_1 = __webpack_require__(26);
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
	                template: __webpack_require__(28)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(208)()
	            }
	        }
	    });
	};


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d3 = __webpack_require__(27);
	var nodes = [{ "id": 1, "key": "p-uc", "title": "用户中心", "description": "用户中心", "createdAt": "2016-11-08T06:14:30.000Z", "updatedAt": "2016-11-09T02:29:22.000Z" }, { "id": 2, "key": "p-longguo", "title": "龙果", "description": "龙果", "createdAt": "2016-11-08T06:15:35.000Z", "updatedAt": "2016-11-09T02:29:41.000Z" }, { "id": 4, "key": "p-cms", "title": "cms", "description": null, "createdAt": "2016-11-09T02:30:33.000Z", "updatedAt": "2016-11-09T02:30:33.000Z" }, { "id": 5, "key": "p-trade", "title": "支付中心", "description": "支付中心", "createdAt": "2016-11-09T02:30:48.000Z", "updatedAt": "2016-11-09T02:30:48.000Z" }, { "id": 6, "key": "p-erp", "title": "erp", "description": "erp", "createdAt": "2016-11-09T02:31:01.000Z", "updatedAt": "2016-11-09T02:31:01.000Z" }, { "id": 7, "key": "p-crm", "title": "crm", "description": "crm", "createdAt": "2016-11-09T02:31:11.000Z", "updatedAt": "2016-11-09T02:31:11.000Z" }, { "id": 8, "key": "p-hongmei", "title": "红美主站", "description": "红美主站", "createdAt": "2016-11-09T02:32:06.000Z", "updatedAt": "2016-11-09T02:32:06.000Z" }, { "id": 9, "key": "p-longyan", "title": "龙眼", "description": "龙眼", "createdAt": "2016-11-09T02:32:25.000Z", "updatedAt": "2016-11-09T02:32:25.000Z" }, { "id": 10, "key": "p-jiazhuang", "title": "家装", "description": "家装", "createdAt": "2016-11-09T05:51:14.000Z", "updatedAt": "2016-11-09T05:51:14.000Z" }, { "id": 11, "key": "p-dts", "title": "dts", "description": "dts", "createdAt": "2016-11-09T05:51:32.000Z", "updatedAt": "2016-11-09T05:51:32.000Z" }];
	var links = [];
	var D3Controller = (function () {
	    function D3Controller($stateParams) {
	        var _this = this;
	        this.$stateParams = $stateParams;
	        this.nodes = nodes;
	        setTimeout(function () {
	            _this.drawSuits();
	        }, 1000);
	    }
	    D3Controller.prototype.doTrans = function () {
	    };
	    D3Controller.prototype.drawSuits = function () {
	        var width = innerWidth || Math.max(960, innerWidth), height = innerHeight || Math.max(500, innerHeight);
	        var svg = d3.select("#homed3")
	            .attr("width", width)
	            .attr("height", height);
	        var simulation = this.simulation = d3.forceSimulation()
	            .force("link", d3.forceLink().id(function (d) { return d.title; }))
	            .force("charge", d3.forceManyBody().strength(-300))
	            .force("center", d3.forceCenter(width / 3, height / 2));
	        var node = svg
	            .selectAll("md-card")
	            .data(nodes)
	            .style("position", "absolute");
	        simulation.nodes(this.nodes)
	            .on("tick", ticked)
	            .force("link", d3.forceLink(links).distance(100));
	        function ticked() {
	            node.attr("cx", function (d) {
	                return d.x;
	            }).attr("cy", function (d) {
	                return d.y;
	            }).style("top", function (d) {
	                return d.x;
	            }).style("left", function (d) {
	                return d.y;
	            });
	        }
	    };
	    D3Controller.$inject = ["$stateParams"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ }

})
//# sourceMappingURL=0.2dfb96e39988c8475711.hot-update.js.map
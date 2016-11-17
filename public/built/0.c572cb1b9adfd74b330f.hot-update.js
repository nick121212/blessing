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
	var nodes = [
	    { name: "桂林" },
	    { name: "广州" },
	    { name: "厦门" },
	    { name: "杭州" },
	    { name: "上海" },
	    { name: "青岛" },
	    { name: "天津" }
	], links = [
	    { source: 0, target: 1 },
	    { source: 0, target: 2 },
	    { source: 0, target: 3 },
	    { source: 1, target: 4 },
	    { source: 1, target: 5 },
	    { source: 1, target: 6 }
	];
	var D3Controller = (function () {
	    function D3Controller($stateParams) {
	        this.$stateParams = $stateParams;
	        this.drawSuits();
	    }
	    D3Controller.prototype.doTrans = function () {
	        links.pop();
	    };
	    D3Controller.prototype.drawSuits = function () {
	        var width = innerWidth || Math.max(960, innerWidth), height = innerHeight || Math.max(500, innerHeight);
	        var svg = d3.select("#homed3")
	            .attr("width", width)
	            .attr("height", height);
	        var color = d3.scaleOrdinal(d3.schemeCategory20);
	        var simulation = this.simulation = d3.forceSimulation()
	            .force("link", d3.forceLink().id(function (d) { return d.name; }))
	            .force("charge", d3.forceManyBody().strength(-300))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        var link = svg.append("g")
	            .attr("class", "links")
	            .selectAll("line")
	            .data(links)
	            .enter()
	            .append("line")
	            .style("stroke", function (d, i) {
	            return color(i);
	        })
	            .attr("stroke-width", function (d) { return Math.sqrt(1.2); });
	        var dragFunc = d3.drag()
	            .on("start", dragstarted)
	            .on("drag", dragged)
	            .on("end", dragended);
	        var node = svg.append("g")
	            .attr("class", "nodes")
	            .selectAll("circle")
	            .data(nodes)
	            .enter()
	            .append("circle")
	            .attr("r", 5)
	            .style("fill", function (d, i) {
	            return color(i);
	        })
	            .call(dragFunc);
	        simulation.nodes(nodes)
	            .on("tick", ticked)
	            .force("link", d3.forceLink(links).distance(100));
	        function dragstarted(d) {
	            if (!d3.event.active)
	                simulation.alphaTarget(0.5).restart();
	            d.fx = d.x;
	            d.fy = d.y;
	        }
	        function dragged(d) {
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        }
	        function dragended(d) {
	            if (!d3.event.active)
	                simulation.alphaTarget(0);
	            d.fx = null;
	            d.fy = null;
	        }
	        function ticked() {
	            link
	                .attr("x1", function (d) { return d.source.x; })
	                .attr("y1", function (d) { return d.source.y; })
	                .attr("x2", function (d) { return d.target.x; })
	                .attr("y2", function (d) { return d.target.y; });
	            node
	                .attr("cx", function (d) { return d.x; })
	                .attr("cy", function (d) { return d.y; });
	        }
	        return;
	    };
	    D3Controller.$inject = ["$stateParams"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ }

})
//# sourceMappingURL=0.c572cb1b9adfd74b330f.hot-update.js.map
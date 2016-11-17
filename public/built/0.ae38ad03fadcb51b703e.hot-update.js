webpackHotUpdate(0,{

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var force_d3_1 = __webpack_require__(27);
	var D3Controller = (function () {
	    function D3Controller($stateParams) {
	        this.$stateParams = $stateParams;
	        new force_d3_1.Force("#paged3");
	    }
	    D3Controller.$inject = ["$stateParams"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var nodes = [{ name: "桂林" }, { name: "广州" },
	    { name: "厦门" }, { name: "杭州" },
	    { name: "上海" }, { name: "青岛" },
	    { name: "天津" }];
	var links = [{ source: 0, target: 1 }, { source: 0, target: 2 },
	    { source: 0, target: 3 }, { source: 1, target: 4 },
	    { source: 1, target: 5 }, { source: 1, target: 6 }];
	var d3 = __webpack_require__(28);
	var Force = (function () {
	    function Force(select) {
	        this.nodes = nodes;
	        this.svg = d3.select(select)
	            .append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%");
	        this.doZoom();
	        this.doDraw();
	    }
	    Force.prototype.doZoom = function () {
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
	    Force.prototype.doDraw = function () {
	        var width = +this.svg.attr("width"), height = +this.svg.attr("height");
	        var simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(links))
	            .force("charge", d3.forceManyBody().strength(-150))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        var svg_edges = this.svg.append("g")
	            .attr("class", "lines")
	            .selectAll("line")
	            .data(links)
	            .enter()
	            .append("line")
	            .style("stroke", "#ccc")
	            .style("stroke-width", 1);
	        var svg_texts = this.svg.append("g")
	            .attr("class", "texts")
	            .selectAll("text")
	            .data(nodes)
	            .enter()
	            .append("text")
	            .style("fill", "black")
	            .attr("dx", 20)
	            .attr("dy", 8)
	            .text(function (d) {
	            return d.name;
	        });
	        var node = this.svg.append("g")
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
	            .on("start", dragstarted)
	            .on("drag", dragged)
	            .on("end", dragended));
	        simulation.nodes(this.nodes)
	            .on("tick", ticked)
	            .force("link");
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
	            svg_edges.attr("x1", function (d) { return d.source.x; })
	                .attr("y1", function (d) { return d.source.y; })
	                .attr("x2", function (d) { return d.target.x; })
	                .attr("y2", function (d) { return d.target.y; });
	            node.attr("cx", function (datum) { return datum.x; })
	                .attr("cy", function (datum) { return datum.y; });
	            svg_texts.attr("x", function (d) { return d.x; })
	                .attr("y", function (d) { return d.y; });
	        }
	    };
	    return Force;
	}());
	exports.Force = Force;


/***/ }

})
//# sourceMappingURL=0.ae38ad03fadcb51b703e.hot-update.js.map
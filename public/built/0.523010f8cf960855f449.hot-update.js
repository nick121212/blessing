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
	                template: "<svg flex id='homed3'></svg>"
	            }
	        }
	    });
	};


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d3 = __webpack_require__(27);
	var D3Controller = (function () {
	    function D3Controller($stateParams) {
	        this.$stateParams = $stateParams;
	        this.drawSuits();
	    }
	    D3Controller.prototype.drawSuits = function () {
	        var nodes = [
	            { name: "BeiJing" },
	            { name: "XiaMen" },
	            { name: "XiAn" },
	            { name: "HangZhou" },
	            { name: "ShangHai" },
	            { name: "QingDao" },
	            { name: "NanJing" }
	        ], links = [
	            { source: 0, target: 1 },
	            { source: 0, target: 2 },
	            { source: 0, target: 3 },
	            { source: 1, target: 4 },
	            { source: 1, target: 5 },
	            { source: 1, target: 6 }
	        ];
	        var width = innerWidth || Math.max(960, innerWidth), height = innerHeight || Math.max(500, innerHeight);
	        var svg = d3.select("#homed3")
	            .append("svg")
	            .attr("width", width)
	            .attr("height", height);
	        var simulation = d3.forceSimulation(nodes)
	            .force("link", d3.forceLink(links).distance(100))
	            .force("charge", d3.forceManyBody().strength(-300))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        var color = d3.scaleOrdinal(d3.schemeCategory20);
	        var marker = svg.append("marker")
	            .attr("id", function (d) { return d; })
	            .attr("id", "resolved")
	            .attr("markerUnits", "strokeWidth")
	            .attr("markerUnits", "userSpaceOnUse")
	            .attr("viewBox", "0 -5 10 10")
	            .attr("refX", 32)
	            .attr("refY", -1)
	            .attr("markerWidth", 12)
	            .attr("markerHeight", 12)
	            .attr("orient", "auto")
	            .attr("stroke-width", 2)
	            .append("path")
	            .attr("d", "M0,-5L10,0L0,5")
	            .attr('fill', '#ff0000');
	        var svg_links = svg.selectAll(".edgepath")
	            .data(links)
	            .enter()
	            .append("path")
	            .attr("d", function (d) { return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y; })
	            .attr("class", "edgepath")
	            .attr("id", function (d, i) { return 'edgepath' + i; })
	            .style("stroke", "#B43232")
	            .style("pointer-events", "none")
	            .style("stroke-width", 1)
	            .attr("marker-end", "url(#resolved)");
	        var drag = d3.drag().on("drag", function (d) {
	            d3.select(d)
	                .attr("cx", d.cx = d3.event.x)
	                .attr("cy", d.cy = d3.event.y);
	        });
	        var svg_nodes = svg.selectAll("circle")
	            .data(nodes)
	            .enter()
	            .append("circle")
	            .attr("r", 20)
	            .style("fill", function (d, i) {
	            return color(i);
	        })
	            .attr("cx", function (d) { return d.x; })
	            .attr("cy", function (d) { return d.y; })
	            .call(drag);
	        var svg_text = svg.selectAll("text")
	            .data(nodes)
	            .enter()
	            .append("text")
	            .style("fill", "#000")
	            .attr("dx", 20)
	            .attr("dy", 10)
	            .text(function (d) { return d.name; });
	        function draw() {
	            svg_nodes
	                .attr("cx", function (d) { return d.x; })
	                .attr("cy", function (d) { return d.y; });
	            svg_text
	                .attr("x", function (d) { return d.x; })
	                .attr("y", function (d) { return d.y; });
	            svg_links.attr('d', function (d) {
	                var path = 'M ' + (d.source.x + 5) + ' ' + (d.source.y + 5) + ' L ' + d.target.x + ' ' + d.target.y;
	                return path;
	            });
	        }
	        simulation.on("tick", draw);
	    };
	    D3Controller.$inject = ["$stateParams"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ }

})
//# sourceMappingURL=0.523010f8cf960855f449.hot-update.js.map
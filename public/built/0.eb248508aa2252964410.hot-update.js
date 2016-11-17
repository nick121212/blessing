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
	        var svg = d3.select("#homed3"), width = ~~svg.attr("width"), height = ~~svg.attr("height");
	        var color = d3.scaleOrdinal(d3.schemeCategory20);
	        var simulation = d3.forceSimulation()
	            .force("link", d3.forceLink().id(function (d) { return d.name; }));
	        return;
	    };
	    D3Controller.$inject = ["$stateParams"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ }

})
//# sourceMappingURL=0.eb248508aa2252964410.hot-update.js.map
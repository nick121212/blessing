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
	    function Force() {
	    }
	    return Force;
	}());
	exports.Force = Force;


/***/ }

})
//# sourceMappingURL=0.ac02db333fb12b09f29b.hot-update.js.map
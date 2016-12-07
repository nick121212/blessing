webpackHotUpdate(0,{

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(161);
	__webpack_require__(206);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(158);
	var io = __webpack_require__(162);
	module_1.module.factory("sockets", ["socketFactory", "$rootScope", function (socketFactory, $rootScope) {
	        var events = socketFactory({
	            ioSocket: io($rootScope.config.events)
	        });
	        events.forward("error");
	        events.forward("events");
	        events.forward("connect");
	        events.forward("disconnect");
	        return {
	            events: events
	        };
	    }]);


/***/ }

})
//# sourceMappingURL=0.4cec80d8158090c3364a.hot-update.js.map
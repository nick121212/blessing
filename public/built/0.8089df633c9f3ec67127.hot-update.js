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
	        var Sockets = (function () {
	            function Sockets() {
	            }
	            Sockets.prototype.init = function () {
	                this.events = socketFactory({
	                    ioSocket: io($rootScope.config.events)
	                });
	                this.events.forward("error");
	                this.events.forward("events");
	                this.events.forward("connect");
	                this.events.forward("disconnect");
	            };
	            return Sockets;
	        }());
	        return {
	            events: new Sockets()
	        };
	    }]);


/***/ }

})
//# sourceMappingURL=0.8089df633c9f3ec67127.hot-update.js.map
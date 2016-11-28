webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(252);
	var passport_1 = __webpack_require__(287);
	var salt_1 = __webpack_require__(296);
	__webpack_require__(301);
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

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(16);
	var ngMaterialIcons = __webpack_require__(20);
	var mdDataTable = __webpack_require__(22);
	var router_1 = __webpack_require__(24);
	var material_service_1 = __webpack_require__(41);
	var rest_service_1 = __webpack_require__(42);
	var action_1 = __webpack_require__(44);
	var dycompile_1 = __webpack_require__(151);
	var query_table_1 = __webpack_require__(152);
	var compare_1 = __webpack_require__(156);
	var execute_cmd_1 = __webpack_require__(34);
	__webpack_require__(159);
	__webpack_require__(365);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(250);
	var module = angular.module("pageModule", [compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', 'ngWebSocket', 'btford.socket-io', material_service_1.default, rest_service_1.default, query_table_1.default]);
	execute_cmd_1.default(module);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }])
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", "fxAction", function ($rootScope, $state, restUtils, materialUtils, fxAction) {
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

/***/ 365:
/***/ function(module, exports) {

	/*
	 * @license
	 * angular-socket-io v0.7.0
	 * (c) 2014 Brian Ford http://briantford.com
	 * License: MIT
	 */
	
	angular.module('btford.socket-io', []).
	  provider('socketFactory', function () {
	
	    'use strict';
	
	    // when forwarding events, prefix the event name
	    var defaultPrefix = 'socket:',
	      ioSocket;
	
	    // expose to provider
	    this.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	
	      var asyncAngularify = function (socket, callback) {
	        return callback ? function () {
	          var args = arguments;
	          $timeout(function () {
	            callback.apply(socket, args);
	          }, 0);
	        } : angular.noop;
	      };
	
	      return function socketFactory (options) {
	        options = options || {};
	        var socket = options.ioSocket || io.connect();
	        var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
	        var defaultScope = options.scope || $rootScope;
	
	        var addListener = function (eventName, callback) {
	          socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
	        };
	
	        var addOnceListener = function (eventName, callback) {
	          socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
	        };
	
	        var wrappedSocket = {
	          on: addListener,
	          addListener: addListener,
	          once: addOnceListener,
	
	          emit: function (eventName, data, callback) {
	            var lastIndex = arguments.length - 1;
	            var callback = arguments[lastIndex];
	            if(typeof callback == 'function') {
	              callback = asyncAngularify(socket, callback);
	              arguments[lastIndex] = callback;
	            }
	            return socket.emit.apply(socket, arguments);
	          },
	
	          removeListener: function (ev, fn) {
	            if (fn && fn.__ng) {
	              arguments[1] = fn.__ng;
	            }
	            return socket.removeListener.apply(socket, arguments);
	          },
	
	          removeAllListeners: function() {
	            return socket.removeAllListeners.apply(socket, arguments);
	          },
	
	          disconnect: function (close) {
	            return socket.disconnect(close);
	          },
	
	          connect: function() {
	            return socket.connect();
	          },
	
	          // when socket.on('someEvent', fn (data) { ... }),
	          // call scope.$broadcast('someEvent', data)
	          forward: function (events, scope) {
	            if (events instanceof Array === false) {
	              events = [events];
	            }
	            if (!scope) {
	              scope = defaultScope;
	            }
	            events.forEach(function (eventName) {
	              var prefixedEvent = prefix + eventName;
	              var forwardBroadcast = asyncAngularify(socket, function () {
	                Array.prototype.unshift.call(arguments, prefixedEvent);
	                scope.$broadcast.apply(scope, arguments);
	              });
	              scope.$on('$destroy', function () {
	                socket.removeListener(eventName, forwardBroadcast);
	              });
	              socket.on(eventName, forwardBroadcast);
	            });
	          }
	        };
	
	        return wrappedSocket;
	      };
	    }];
	  });


/***/ }

})
//# sourceMappingURL=0.c0a822740723a487078b.hot-update.js.map
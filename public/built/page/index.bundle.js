webpackJsonp([5],{

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(210);
	module.exports = 'angular-loading-bar';


/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(228);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(304);
	var _name = "fxLoading";
	function Directive() {
	    return {
	        restrict: 'EA',
	        template: __webpack_require__(264)(),
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

/***/ 210:
/***/ function(module, exports) {

	/*! 
	 * angular-loading-bar v0.9.0
	 * https://chieffancypants.github.io/angular-loading-bar
	 * Copyright (c) 2016 Wes Cruver
	 * License: MIT
	 */
	/*
	 * angular-loading-bar
	 *
	 * intercepts XHR requests and creates a loading bar.
	 * Based on the excellent nprogress work by rstacruz (more info in readme)
	 *
	 * (c) 2013 Wes Cruver
	 * License: MIT
	 */
	
	
	(function() {
	
	'use strict';
	
	// Alias the loading bar for various backwards compatibilities since the project has matured:
	angular.module('angular-loading-bar', ['cfp.loadingBarInterceptor']);
	angular.module('chieffancypants.loadingBar', ['cfp.loadingBarInterceptor']);
	
	
	/**
	 * loadingBarInterceptor service
	 *
	 * Registers itself as an Angular interceptor and listens for XHR requests.
	 */
	angular.module('cfp.loadingBarInterceptor', ['cfp.loadingBar'])
	  .config(['$httpProvider', function ($httpProvider) {
	
	    var interceptor = ['$q', '$cacheFactory', '$timeout', '$rootScope', '$log', 'cfpLoadingBar', function ($q, $cacheFactory, $timeout, $rootScope, $log, cfpLoadingBar) {
	
	      /**
	       * The total number of requests made
	       */
	      var reqsTotal = 0;
	
	      /**
	       * The number of requests completed (either successfully or not)
	       */
	      var reqsCompleted = 0;
	
	      /**
	       * The amount of time spent fetching before showing the loading bar
	       */
	      var latencyThreshold = cfpLoadingBar.latencyThreshold;
	
	      /**
	       * $timeout handle for latencyThreshold
	       */
	      var startTimeout;
	
	
	      /**
	       * calls cfpLoadingBar.complete() which removes the
	       * loading bar from the DOM.
	       */
	      function setComplete() {
	        $timeout.cancel(startTimeout);
	        cfpLoadingBar.complete();
	        reqsCompleted = 0;
	        reqsTotal = 0;
	      }
	
	      /**
	       * Determine if the response has already been cached
	       * @param  {Object}  config the config option from the request
	       * @return {Boolean} retrns true if cached, otherwise false
	       */
	      function isCached(config) {
	        var cache;
	        var defaultCache = $cacheFactory.get('$http');
	        var defaults = $httpProvider.defaults;
	
	        // Choose the proper cache source. Borrowed from angular: $http service
	        if ((config.cache || defaults.cache) && config.cache !== false &&
	          (config.method === 'GET' || config.method === 'JSONP')) {
	            cache = angular.isObject(config.cache) ? config.cache
	              : angular.isObject(defaults.cache) ? defaults.cache
	              : defaultCache;
	        }
	
	        var cached = cache !== undefined ?
	          cache.get(config.url) !== undefined : false;
	
	        if (config.cached !== undefined && cached !== config.cached) {
	          return config.cached;
	        }
	        config.cached = cached;
	        return cached;
	      }
	
	
	      return {
	        'request': function(config) {
	          // Check to make sure this request hasn't already been cached and that
	          // the requester didn't explicitly ask us to ignore this request:
	          if (!config.ignoreLoadingBar && !isCached(config)) {
	            $rootScope.$broadcast('cfpLoadingBar:loading', {url: config.url});
	            if (reqsTotal === 0) {
	              startTimeout = $timeout(function() {
	                cfpLoadingBar.start();
	              }, latencyThreshold);
	            }
	            reqsTotal++;
	            cfpLoadingBar.set(reqsCompleted / reqsTotal);
	          }
	          return config;
	        },
	
	        'response': function(response) {
	          if (!response || !response.config) {
	            $log.error('Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
	            return response;
	          }
	
	          if (!response.config.ignoreLoadingBar && !isCached(response.config)) {
	            reqsCompleted++;
	            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: response.config.url, result: response});
	            if (reqsCompleted >= reqsTotal) {
	              setComplete();
	            } else {
	              cfpLoadingBar.set(reqsCompleted / reqsTotal);
	            }
	          }
	          return response;
	        },
	
	        'responseError': function(rejection) {
	          if (!rejection || !rejection.config) {
	            $log.error('Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50');
	            return $q.reject(rejection);
	          }
	
	          if (!rejection.config.ignoreLoadingBar && !isCached(rejection.config)) {
	            reqsCompleted++;
	            $rootScope.$broadcast('cfpLoadingBar:loaded', {url: rejection.config.url, result: rejection});
	            if (reqsCompleted >= reqsTotal) {
	              setComplete();
	            } else {
	              cfpLoadingBar.set(reqsCompleted / reqsTotal);
	            }
	          }
	          return $q.reject(rejection);
	        }
	      };
	    }];
	
	    $httpProvider.interceptors.push(interceptor);
	  }]);
	
	
	/**
	 * Loading Bar
	 *
	 * This service handles adding and removing the actual element in the DOM.
	 * Generally, best practices for DOM manipulation is to take place in a
	 * directive, but because the element itself is injected in the DOM only upon
	 * XHR requests, and it's likely needed on every view, the best option is to
	 * use a service.
	 */
	angular.module('cfp.loadingBar', [])
	  .provider('cfpLoadingBar', function() {
	
	    this.autoIncrement = true;
	    this.includeSpinner = true;
	    this.includeBar = true;
	    this.latencyThreshold = 100;
	    this.startSize = 0.02;
	    this.parentSelector = 'body';
	    this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>';
	    this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>';
	
	    this.$get = ['$injector', '$document', '$timeout', '$rootScope', function ($injector, $document, $timeout, $rootScope) {
	      var $animate;
	      var $parentSelector = this.parentSelector,
	        loadingBarContainer = angular.element(this.loadingBarTemplate),
	        loadingBar = loadingBarContainer.find('div').eq(0),
	        spinner = angular.element(this.spinnerTemplate);
	
	      var incTimeout,
	        completeTimeout,
	        started = false,
	        status = 0;
	
	      var autoIncrement = this.autoIncrement;
	      var includeSpinner = this.includeSpinner;
	      var includeBar = this.includeBar;
	      var startSize = this.startSize;
	
	      /**
	       * Inserts the loading bar element into the dom, and sets it to 2%
	       */
	      function _start() {
	        if (!$animate) {
	          $animate = $injector.get('$animate');
	        }
	
	        $timeout.cancel(completeTimeout);
	
	        // do not continually broadcast the started event:
	        if (started) {
	          return;
	        }
	
	        var document = $document[0];
	        var parent = document.querySelector ?
	          document.querySelector($parentSelector)
	          : $document.find($parentSelector)[0]
	        ;
	
	        if (! parent) {
	          parent = document.getElementsByTagName('body')[0];
	        }
	
	        var $parent = angular.element(parent);
	        var $after = parent.lastChild && angular.element(parent.lastChild);
	
	        $rootScope.$broadcast('cfpLoadingBar:started');
	        started = true;
	
	        if (includeBar) {
	          $animate.enter(loadingBarContainer, $parent, $after);
	        }
	
	        if (includeSpinner) {
	          $animate.enter(spinner, $parent, loadingBarContainer);
	        }
	
	        _set(startSize);
	      }
	
	      /**
	       * Set the loading bar's width to a certain percent.
	       *
	       * @param n any value between 0 and 1
	       */
	      function _set(n) {
	        if (!started) {
	          return;
	        }
	        var pct = (n * 100) + '%';
	        loadingBar.css('width', pct);
	        status = n;
	
	        // increment loadingbar to give the illusion that there is always
	        // progress but make sure to cancel the previous timeouts so we don't
	        // have multiple incs running at the same time.
	        if (autoIncrement) {
	          $timeout.cancel(incTimeout);
	          incTimeout = $timeout(function() {
	            _inc();
	          }, 250);
	        }
	      }
	
	      /**
	       * Increments the loading bar by a random amount
	       * but slows down as it progresses
	       */
	      function _inc() {
	        if (_status() >= 1) {
	          return;
	        }
	
	        var rnd = 0;
	
	        // TODO: do this mathmatically instead of through conditions
	
	        var stat = _status();
	        if (stat >= 0 && stat < 0.25) {
	          // Start out between 3 - 6% increments
	          rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
	        } else if (stat >= 0.25 && stat < 0.65) {
	          // increment between 0 - 3%
	          rnd = (Math.random() * 3) / 100;
	        } else if (stat >= 0.65 && stat < 0.9) {
	          // increment between 0 - 2%
	          rnd = (Math.random() * 2) / 100;
	        } else if (stat >= 0.9 && stat < 0.99) {
	          // finally, increment it .5 %
	          rnd = 0.005;
	        } else {
	          // after 99%, don't increment:
	          rnd = 0;
	        }
	
	        var pct = _status() + rnd;
	        _set(pct);
	      }
	
	      function _status() {
	        return status;
	      }
	
	      function _completeAnimation() {
	        status = 0;
	        started = false;
	      }
	
	      function _complete() {
	        if (!$animate) {
	          $animate = $injector.get('$animate');
	        }
	
	        $rootScope.$broadcast('cfpLoadingBar:completed');
	        _set(1);
	
	        $timeout.cancel(completeTimeout);
	
	        // Attempt to aggregate any start/complete calls within 500ms:
	        completeTimeout = $timeout(function() {
	          var promise = $animate.leave(loadingBarContainer, _completeAnimation);
	          if (promise && promise.then) {
	            promise.then(_completeAnimation);
	          }
	          $animate.leave(spinner);
	        }, 500);
	      }
	
	      return {
	        start            : _start,
	        set              : _set,
	        status           : _status,
	        inc              : _inc,
	        complete         : _complete,
	        autoIncrement    : this.autoIncrement,
	        includeSpinner   : this.includeSpinner,
	        latencyThreshold : this.latencyThreshold,
	        parentSelector   : this.parentSelector,
	        startSize        : this.startSize
	      };
	
	
	    }];     //
	  });       // wtf javascript. srsly
	})();       //


/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".fx-loading {\n  margin: 100px auto;\n  width: 90px;\n  height: 90px;\n  position: relative;\n  text-align: center;\n  animation: lodding-rotate 2.0s infinite linear; }\n  .fx-loading .dot1, .fx-loading .dot2 {\n    width: 60%;\n    height: 60%;\n    display: inline-block;\n    position: absolute;\n    top: 0;\n    background-color: #000;\n    border-radius: 100%;\n    -webkit-animation: lodding-bounce 2.0s infinite ease-in-out;\n    animation: lodding-bounce 2.0s infinite ease-in-out; }\n  .fx-loading .dot2 {\n    top: auto;\n    bottom: 0px;\n    -webkit-animation-delay: -1.0s;\n    animation-delay: -1.0s; }\n\n@-webkit-keyframes lodding-rotate {\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n@keyframes lodding-rotate {\n  100% {\n    transform: rotate(360deg);\n    -webkit-transform: rotate(360deg); } }\n\n@-webkit-keyframes lodding-bounce {\n  0%, 100% {\n    -webkit-transform: scale(0); }\n  50% {\n    -webkit-transform: scale(1); } }\n\n@keyframes lodding-bounce {\n  0%, 100% {\n    transform: scale(0);\n    -webkit-transform: scale(0); }\n  50% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n", ""]);
	
	// exports


/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".over-hidden, body {\n  overflow: hidden; }\n\n.no-tb-margin {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.no-borders .md-input {\n  border: none !important; }\n\n.fx-autocomplete {\n  margin-top: -20px; }\n  .fx-autocomplete .md-input-container {\n    margin-bottom: 0; }\n\n.no-errors .md-errors-spacer {\n  display: none !important; }\n\nmd-tabs.scroll.md-dynamic-height md-tabs-content-wrapper {\n  overflow-y: auto !important;\n  overflow-x: hidden !important; }\n\n.fx-invalid {\n  opacity: 1 !important;\n  margin-top: 0 !important; }\n\n.schema-form-chips > label:not(.md-no-float):not(.md-container-ignore),\n.schema-form-chips .md-placeholder {\n  transform: translate3d(0, 0, 0) scale(1); }\n\ntable.md-table th.md-column {\n  color: inherit; }\n\n.red {\n  fill: red; }\n\n.green {\n  fill: green; }\n", ""]);
	
	// exports


/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/loading/tpls/loading.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/loading/tpls/loading.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/loading/tpls/loading.jade" ));
	buf.push("<div class=\"fx-loading\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/loading/tpls/loading.jade" ));
	buf.push("<div class=\"dot1\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/loading/tpls/loading.jade" ));
	buf.push("<div class=\"dot2\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "div.fx-loading\n    div.dot1\n    div.dot2\n");
	}
	}

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(225);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./loading.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./loading.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	__webpack_require__(18);
	var loading_1 = __webpack_require__(195);
	__webpack_require__(190);
	__webpack_require__(171);
	var module = angular.module("indexApp", ["angular-loading-bar", loading_1.default]);
	module.config(["cfpLoadingBarProvider", function (cfpLoadingBarProvider) {
	        cfpLoadingBarProvider.includeSpinner = true;
	        cfpLoadingBarProvider.latencyThreshold = 1000;
	    }]);
	$(function () {
	    angular.bootstrap(document, [module.name, 'homeModule', 'pageModule', 'passportModule']);
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }

},[341]);
//# sourceMappingURL=index.bundle.js.map
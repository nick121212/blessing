webpackHotUpdate(0,{

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(165);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(175);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(165);
	var _ = __webpack_require__(31);
	function Factory($rootScope, $timeout, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections &&
	                _.forEach(sections, function (section) {
	                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                        digest(section[mdSideMenuSections.options.children], section);
	                    }
	                    if (section.showed && toState.name == section.link && toParams.key == section.key) {
	                        mdSideMenuSections.selectedNode = section;
	                        return false;
	                    }
	                });
	            return false;
	        }
	        mdSideMenuSections.selectedNode = null;
	        digest(mdSideMenuSections.sections, null);
	    };
	    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);
	    return {
	        onStateChangeStart: onStateChangeStart
	    };
	}
	module_1.module.factory('fxSideMenuFactory', ["$rootScope", "$timeout", "mdSideMenuSections", Factory]);


/***/ }

})
//# sourceMappingURL=0.e77bfd9ed9914e8b8708.hot-update.js.map
webpackHotUpdate(0,{

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(211);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(177);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(211);
	function Provider() {
	    var _sections = [], _theme, _palettes;
	    this.initWithSections = function (value) {
	        _sections = value ? value : [];
	    };
	    this.initWithTheme = function (value) {
	        _theme = value.theme();
	        _palettes = value._PALETTES;
	    };
	    this.$get = [function () {
	            var MdSideMenuSections = function () {
	                this.sections = _sections;
	                this.selectedNode = null;
	                this.options = {};
	                this.theme = _theme;
	                this.palettes = _palettes;
	                this.searchStr = "";
	            };
	            return new MdSideMenuSections();
	        }];
	}
	module_1.module.provider('mdSideMenuSections', [Provider]);


/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(211);
	var _ = __webpack_require__(31);
	function Factory($rootScope, mdSideMenuSections) {
	    var onStateChangeStart = function (event, toState, toParams) {
	        var options = mdSideMenuSections.options;
	        function digest(sections, currentSection) {
	            !mdSideMenuSections.selectedNode && sections &&
	                _.forEach(sections, function (section) {
	                    if (section[mdSideMenuSections.options.children] && section[mdSideMenuSections.options.children].length) {
	                        return digest(section[mdSideMenuSections.options.children], section);
	                    }
	                    if (section.showed && toState.name == section.link && toParams.key == section.key) {
	                        mdSideMenuSections.selectedNode = section;
	                        return false;
	                    }
	                });
	            return false;
	        }
	        mdSideMenuSections.selectedNode = null;
	        setTimeout(function () {
	            digest(mdSideMenuSections.sections, null);
	        }, 10);
	    };
	    $rootScope.$on('$stateChangeSuccess', onStateChangeStart);
	    return {
	        onStateChangeStart: onStateChangeStart
	    };
	}
	module_1.module.factory('fxSideMenuFactory', ["$rootScope", "mdSideMenuSections", Factory]);


/***/ }

})
//# sourceMappingURL=0.3af228e7d8de6b01808a.hot-update.js.map
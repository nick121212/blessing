webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	__webpack_require__(3);
	var ngAnimate = __webpack_require__(5);
	var loading_1 = __webpack_require__(7);
	var page_1 = __webpack_require__(15);
	var home_1 = __webpack_require__(160);
	var passport_1 = __webpack_require__(195);
	var salt_1 = __webpack_require__(204);
	__webpack_require__(209);
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

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var ngMaterial = __webpack_require__(16);
	__webpack_require__(161);
	var ngMaterialIcons = __webpack_require__(20);
	var _ = __webpack_require__(27);
	var router_1 = __webpack_require__(162);
	var material_service_1 = __webpack_require__(37);
	var svg_service_1 = __webpack_require__(171);
	var toolbar_1 = __webpack_require__(172);
	var sidemenu_1 = __webpack_require__(181);
	__webpack_require__(193);
	var action_model_1 = __webpack_require__(31);
	var module = angular.module("homeModule", [toolbar_1.default, sidemenu_1.default, svg_service_1.default, material_service_1.default, ngMaterial, 'ui.router', ngMaterialIcons]);
	module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    "$httpProvider",
	    "$mdThemingProvider",
	    "$locationProvider",
	    "mdSideMenuSectionsProvider",
	    function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider) {
	        $mdThemingProvider.definePalette('amazingPaletteName', {
	            '50': 'E8EAF6',
	            '100': 'C5CAE9',
	            '200': 'B39DDB',
	            '300': 'B39DDB',
	            '400': 'BDBDBD',
	            '500': '9B26AF',
	            '600': '757575',
	            '700': '7A1EA1',
	            '800': '691A99',
	            '900': '263238',
	            'A100': 'FFE57F',
	            'A200': '68EFAD',
	            'A400': 'FF3D00',
	            'A700': 'DD2C00',
	            'contrastDefaultColor': 'light',
	            'contrastDarkColors': ['50', '100',
	                '200', '300', '400', 'A100'],
	            'contrastLightColors': ['50', '100',
	                '200', '300', '400', 'A100']
	        });
	        $mdThemingProvider.theme('default')
	            .dark()
	            .primaryPalette('grey')
	            .accentPalette('red')
	            .warnPalette('green');
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
	    }])
	    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", function ($rootScope, $state, $q, svgUtils, fxAction) {
	        var state = {};
	        var handleResolve = function () {
	            state.$$isFinish = true;
	            $state.go(state.toState.name, state.toParams, state.options);
	        };
	        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
	            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
	        });
	        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
	            if (!state.$$isFinish) {
	                _.extend(state, {
	                    toState: toState,
	                    toParams: toParams,
	                    fromState: fromState,
	                    fromParams: fromParams,
	                    options: options
	                });
	                event.preventDefault();
	                $q.all({
	                    mdi: svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg'),
	                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg'),
	                    config: fxAction.doAction("configAction", {}).then(function (result) {
	                        $rootScope["config"] = result.configAction;
	                    })
	                }).then(handleResolve, handleResolve);
	            }
	        });
	    }]);
	module.value("iconInfoDetailForm", {
	    key: "iconInfoDetailForm",
	    icon: "search",
	    type: action_model_1.ActionType.form,
	    title: "ICON详情",
	    form: {
	        dataSchema: {
	            type: "object",
	            properties: {
	                key: {
	                    type: "string",
	                    title: "KEY"
	                }
	            }
	        },
	        formSchema: [{
	                key: "key",
	                type: "string",
	                placeHolder: "KEY",
	                htmlClass: "md-block"
	            }]
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;
	
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }

})
//# sourceMappingURL=0.53e87619a04d2fa2577a.hot-update.js.map
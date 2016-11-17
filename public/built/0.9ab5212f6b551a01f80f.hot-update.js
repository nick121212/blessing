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
	                template: __webpack_require__(29)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(30)()
	            }
	        }
	    });
	};


/***/ },

/***/ 26:
/***/ function(module, exports) {

	"use strict";
	var D3Controller = (function () {
	    function D3Controller($stateParams, fxAction, toolbarUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.key = $stateParams["key"];
	        this.doInit();
	    }
	    D3Controller.prototype.doInit = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            _this.actionModel = actionModel;
	            return _this.fxAction.getModels(_this.actionModel.actions);
	        }).then(function (actionModels) {
	        });
	    };
	    D3Controller.$inject = ["$stateParams", "fxAction", "toolbarUtils"];
	    return D3Controller;
	}());
	exports.D3Controller = D3Controller;


/***/ }

})
//# sourceMappingURL=0.9ab5212f6b551a01f80f.hot-update.js.map
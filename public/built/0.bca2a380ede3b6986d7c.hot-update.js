webpackHotUpdate(0,{

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var login_controller_1 = __webpack_require__(252);
	var register_controller_1 = __webpack_require__(253);
	var index_controller_1 = __webpack_require__(254);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("passport", {
	        url: "/passport",
	        abstract: true,
	        views: {
	            "": {
	                controller: index_controller_1.IndexController,
	                controllerAs: "indexCtl",
	                template: __webpack_require__(255)()
	            }
	        }
	    }).state("passport.login", {
	        url: "/login",
	        views: {
	            "passportContent": {
	                controller: login_controller_1.LoginController,
	                controllerAs: "loginCtl",
	                template: __webpack_require__(256)()
	            }
	        }
	    }).state("passport.register", {
	        url: "/register",
	        views: {
	            "passportContent": {
	                controller: register_controller_1.RegisterController,
	                controllerAs: "registerCtl",
	                template: __webpack_require__(257)()
	            }
	        }
	    });
	};


/***/ },

/***/ 252:
/***/ function(module, exports) {

	"use strict";
	var LoginController = (function () {
	    function LoginController($rootScope, $state, fxAction, materialUtils) {
	        this.$rootScope = $rootScope;
	        this.$state = $state;
	        this.fxAction = fxAction;
	        this.materialUtils = materialUtils;
	        this.key = "login";
	        this.formData = { username: "nick", password: "nick" };
	    }
	    LoginController.prototype.doSubmit = function ($form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, $form);
	        promise && promise.then(function (user) {
	            _this.$state["$$isFinish"] = false;
	            _this.materialUtils.showMsg("登陆成功,正在跳转!");
	            _this.$state.go("home");
	            _this.$rootScope['user'] = user.loginAction.username;
	        });
	    };
	    LoginController.$inject = ["$rootScope", "$state", "fxAction", "materialUtils"];
	    return LoginController;
	}());
	exports.LoginController = LoginController;


/***/ }

})
//# sourceMappingURL=0.bca2a380ede3b6986d7c.hot-update.js.map
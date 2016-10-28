webpackHotUpdate(0,{

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(35);
	__webpack_require__(49);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	var module_1 = __webpack_require__(36);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(36);
	var _ = __webpack_require__(31);
	var pointer = __webpack_require__(52);
	var _name = "fxAutocompleteBoost";
	var Builder = (function () {
	    function Builder(form, fxAction, formData) {
	        this.form = form;
	        this.fxAction = fxAction;
	        this.formData = formData;
	        this.init();
	    }
	    Builder.prototype.init = function () {
	        var viewModel = null;
	        if (pointer.has(this.formData, "/" + this.form.key.join('/'))) {
	            viewModel = pointer.get(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (!viewModel) {
	            return;
	        }
	        if (this.form.acOptions.keyField) {
	            return this.searchText = viewModel;
	        }
	        this.searchText = viewModel[this.form.acOptions.textField];
	        this.onChange(viewModel);
	    };
	    Builder.prototype.onChange = function (item) {
	        this.selected = item;
	        if (_.isEmpty(item) || !this.searchText) {
	            this.selected = null;
	            return pointer.remove(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (this.form.acOptions.keyField) {
	            if (pointer.has(item, "/" + this.form.acOptions.keyField)) {
	                return pointer.set(this.formData, "/" + this.form.key.join('/'), pointer.get(item, "/" + this.form.acOptions.keyField));
	            }
	            else {
	                return console.error("autocomplete-1-\u6CA1\u6709\u5728item\u4E2D\u627E\u5230" + this.form.acOptions.keyField);
	            }
	        }
	        pointer.set(this.formData, "/" + this.form.key.join('/'), item);
	    };
	    Builder.prototype.query = function () {
	        var _this = this;
	        var actionModel, clientData = {};
	        var filter = {};
	        if (this.form.acOptions.actionKey) {
	            pointer.set(filter, this.form.acOptions.search, this.searchText);
	            _.forEach(this.form.acOptions._where, function (val, key) {
	                pointer.set(filter, key, val);
	            });
	            return this.fxAction.getModel(this.form.acOptions.actionKey).then(function (aModel) {
	                actionModel = aModel;
	                return _this.fxAction.doAction(actionModel.key, filter);
	            }).then(function (results) {
	                return _this.fxAction.doDealResult(actionModel, results, clientData);
	            }).then(function (results) {
	                return results[_this.form.acOptions.dataField];
	            });
	        }
	        return this.form.data || [];
	    };
	    return Builder;
	}());
	var Controller = (function () {
	    function Controller($scope, fxAction) {
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        var formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;
	        formWithIndex && (formWithIndex = _.first(_.filter(formWithIndex.items, function (item) {
	            return item['key'].join('') === $scope.form["key"].join('') ||
	                _.filter(item['key'], function (key) {
	                    return key && !_.isNumber(key);
	                }).join('') === $scope.form["key"].join('');
	        })));
	        $scope.boost = new Builder(formWithIndex ? formWithIndex : $scope.form, fxAction, $scope.model);
	    }
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'A',
	        scope: false,
	        controller: Controller,
	        replace: false
	    };
	}
	Directive.$inject = [];
	module_1.module.directive(_name, Directive);


/***/ }

})
//# sourceMappingURL=0.6a899f1256ea61ca5c7a.hot-update.js.map
webpackHotUpdate(0,{

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(42);
	__webpack_require__(57);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(135);
	__webpack_require__(136);
	__webpack_require__(138);
	__webpack_require__(140);
	__webpack_require__(142);
	__webpack_require__(144);
	var module_1 = __webpack_require__(43);
	__webpack_require__(146);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(43);
	var _ = __webpack_require__(25);
	var pointer = __webpack_require__(58);
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
	        if (!_.isArray(this.form.key)) {
	            return;
	        }
	        if (pointer.has(this.formData, "/" + this.form.key.join('/'))) {
	            viewModel = pointer.get(this.formData, "/" + this.form.key.join('/'));
	        }
	        if (!viewModel) {
	            return;
	        }
	        if (this.form.acOptions.keyField) {
	            this.searchText = viewModel;
	            return this.query(true);
	        }
	        this.searchText = viewModel[this.form.acOptions.textField];
	        this.onChange(viewModel);
	    };
	    Builder.prototype.onChange = function (item, init) {
	        var curValue;
	        this.selected = item;
	        if (_.isEmpty(item) || !this.searchText) {
	            this.selected = null;
	            pointer.remove(this.formData, "/" + this.form.key.join('/'));
	            return undefined;
	        }
	        if (this.form.acOptions.keyField) {
	            if (pointer.has(item, "/" + this.form.acOptions.keyField)) {
	                curValue = pointer.get(item, "/" + this.form.acOptions.keyField);
	                pointer.set(this.formData, "/" + this.form.key.join('/'), curValue);
	                return curValue;
	            }
	            else {
	                console.error("autocomplete-1-\u6CA1\u6709\u5728item\u4E2D\u627E\u5230" + this.form.acOptions.keyField);
	                return undefined;
	            }
	        }
	        curValue = {};
	        if (!init) {
	            _.each(this.form.items.concat(this.form.acOptions.fields || []), function (childItem) {
	                var keys = [].concat(childItem.key);
	                var childKey = keys.pop();
	                if (childKey && pointer.has(item, "/" + childKey)) {
	                    pointer.set(curValue, "/" + childKey, pointer.get(item, "/" + childKey));
	                }
	            });
	        }
	        pointer.set(this.formData, "/" + this.form.key.join('/'), curValue);
	        return curValue;
	    };
	    Builder.prototype.query = function (setValueIfOnlyOne) {
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
	            }).then(function (results) {
	                if (results.length === 1 && setValueIfOnlyOne) {
	                    _this.onChange(results[0], true);
	                }
	                return results;
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
	        var form;
	        var compare = function (item) {
	            if (!_.isArray(item['key'])) {
	                return false;
	            }
	            return item['key'].join('') === $scope.form["key"].join('') ||
	                _.filter(item['key'], function (key) {
	                    return key && !_.isNumber(key);
	                }).join('') === $scope.form["key"].join('');
	        };
	        formWithIndex && (form = _.first(_.filter([formWithIndex], compare)));
	        !form && formWithIndex && (form = _.first(_.filter(formWithIndex.items, compare)));
	        $scope.boost = new Builder(form ? form : $scope.form, fxAction, $scope.model);
	        var onChange = $scope.boost.onChange.bind($scope.boost);
	        $scope.boost.onChange = function (item) {
	            $scope.ngModel.$setViewValue(onChange(item));
	            $scope.ngModel.$commitViewValue();
	        };
	        $scope.options = $scope.form.ngModelOptions;
	        $scope.$on("$destroy", function () {
	            $scope.boost = null;
	            $scope.options = null;
	        });
	    }
	    Controller.$inject = ["$scope", "fxAction"];
	    return Controller;
	}());
	function Directive() {
	    return {
	        restrict: 'A',
	        scope: false,
	        priority: 9,
	        require: "ngModel",
	        controller: Controller
	    };
	}
	Directive.$inject = [];
	module_1.module.directive(_name, Directive);


/***/ }

})
//# sourceMappingURL=0.209778a2f6c8fda348d6.hot-update.js.map
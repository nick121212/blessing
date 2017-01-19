import { module } from '../../module';
import * as _ from 'lodash';
import * as pointer from 'json-pointer';
import "./autocomplete.provider";

const _name = "fxAutocompleteBoost";
const _name1 = "fxSuggestBoost";

class Builder {
    searchText: string = "";
    selected: any;
    isBusy: boolean = false;

    constructor(private $q: ng.IQService, private form, private fxAction, private formData) {
        if (this.form.acOptions.init) {
            this.init();
        }
    }

    /**
     * 初始化数据
     * 如果存在keyField，执行一次搜索
     * 如果不存在keyField，取出数据，执行onChange方法
     */
    init() {
        let viewModel = null;

        if (!_.isArray(this.form.key)) {
            return;
        }
        if (pointer.has(this.formData, `/${this.form.key.join('/')}`)) {
            viewModel = pointer.get(this.formData, `/${this.form.key.join('/')}`);
        }

        if (!viewModel) {
            return;
        }

        if (this.form.acOptions.keyField) {
            this.searchText = viewModel.toString();
            return this.form.acOptions.init ? this.query(true) : null;
        }
        this.searchText = viewModel[this.form.acOptions.textField];
        this.onChange(viewModel);
    }

    getItemText(item) {
        let defer = this.$q.defer();

        if (item) {
            let text = item[this.form.acOptions.textField];
            defer.resolve(text || "");
        }
        defer.resolve(this.searchText);

        return defer.promise;
    }

    onTextChange() {
        if (_.isObject(this.searchText)) {
            this.searchText = "";
        }
        if (!this.searchText) {
            if (this.form.acOptions.keyField) {
                pointer.remove(this.formData, `/${this.form.key.join('/')}`);
            } else {
                pointer.set(this.formData, `/${this.form.key.join('/')}`, {});
            }
        } else {
            if (this.form.acOptions.useSearchText && this.form.acOptions.keyField) {
                pointer.set(this.formData, `/${this.form.key.join('/')}`, this.searchText);
            }
        }
    }

    onItemChange(item) {
        return this.onChange(item);
    }

    /**
     * 当数据变化时，触发事件
     * @param item 更改后的item
     */
    onChange(item) {
        let curValue;

        if (!this.searchText) {
            return this.form.acOptions.keyField ? null : "";
        }

        if (!item) {
            return null;
        }

        if (this.form.acOptions.keyField) {
            if (pointer.has(item, `/${this.form.acOptions.keyField}`)) {
                curValue = pointer.get(item, `/${this.form.acOptions.keyField}`);
                pointer.set(this.formData, `/${this.form.key.join('/')}`, curValue);
                return curValue;
            } else {
                console.error(`autocomplete-1-没有在item中找到${this.form.acOptions.keyField}`);
                return null;
            }
        }

        curValue = {};
        _.each(this.form.items.concat(this.form.acOptions.fields || []), (childItem) => {
            let keys = [].concat(childItem.key);
            let childKey = keys.pop();

            if (childKey && pointer.has(item, `/${childKey}`)) {
                pointer.set(curValue, `/${childKey}`, pointer.get(item, `/${childKey}`));
            }
        });
        pointer.set(this.formData, `/${this.form.key.join('/')}`, curValue);

        return curValue;
    }

    /**
     * 查询数据，如果存在actionKey，则获取actionKey中的interface数据
     * 查询接口，返回数据
     * @returns {any}
     */
    query(init) {
        let actionModel, clientData = {};
        let filter = {};

        if (!this.searchText && ~~this.form.acOptions.minLength > 0) {
            return;
        }
        if (this.form.acOptions.actionKey && !this.isBusy) {
            // 设置搜索条件
            pointer.set(filter, this.form.acOptions.search, this.searchText || this.form.acOptions.searchPrefix);
            // 设置全局条件
            _.forEach(this.form.acOptions._where, (val, key) => {
                pointer.set(filter, key, val);
            });
            this.isBusy = true;
            return this.fxAction.getModel(this.form.acOptions.actionKey).then((aModel) => {
                actionModel = aModel;
                return this.fxAction.doAction(actionModel.key, filter);
            }).then((results) => {
                return this.fxAction.doDealResult(actionModel, results, clientData);
            }).then((results) => {
                return results[this.form.acOptions.dataField];
            }).then((results) => {
                if (init && results.length == 1) {
                    this.selected = results[0];
                }
                return results || [];
            }).finally(() => {
                this.isBusy = false;
            });
        }

        return this.form.data || [];
    }
}

class Controller {
    static $inject = ["$scope", "fxAction", "$q"];

    constructor(private $scope, private fxAction, private $q) {
        let formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;
        let form;
        const compare = (item) => {
            if (!_.isArray(item['key'])) {
                return false;
            }
            return item['key'].join('') === $scope.form["key"].join('') ||
                _.filter(item['key'], (key) => {
                    return key && !_.isNumber(key);
                }).join('') === $scope.form["key"].join('');
        };
        formWithIndex && (form = _.first(_.filter([formWithIndex], compare)));
        // 获取copy，填充数组索引
        !form && formWithIndex && (form = _.first(_.filter(formWithIndex.items, compare)));
        form = form ? form : $scope.form;

        $scope.acBoost = new Builder($q, form, fxAction, $scope.model);

        $scope.$watch(() => {
            return pointer.has($scope.model, `/${form.key.join('/')}`) ? pointer.get($scope.model, `/${form.key.join('/')}`) : null;
        }, (newVal, oldVal) => {
            if (newVal != oldVal && !newVal) {
                $scope.acBoost.selected = {};
                $scope.acBoost.searchText = null;
            }
        });

        let onChange = $scope.acBoost.onChange.bind($scope.acBoost);
        $scope.acBoost.onChange = (item) => {
            let val = onChange(item);

            if (val) {
                $scope.ngModel.$setViewValue(val);
                $scope.ngModel.$commitViewValue();
            }
        }
        $scope.options = $scope.form.ngModelOptions;

        $scope.$on("$destroy", () => {
            $scope.acBoost = null;
            $scope.options = null;
        });
    }
}

class Controller1 {
    static $inject = ["$scope", "fxAction"];

    constructor(private $scope, private fxAction) {
        $scope.cpBoost = {
            transformChip: (chip) => {
                if (angular.isObject(chip)) {
                    return chip[$scope.form.cpOptions.textField || "text"];
                }
                return chip;
            }
        };
    }
}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive(): ng.IDirective {
    return {
        restrict: 'A',
        scope: false,
        priority: 9,
        require: "ngModel",
        controller: Controller
    };

}

Directive.$inject = [];

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive1(): ng.IDirective {
    return {
        restrict: 'A',
        scope: false,
        priority: 9,
        require: "ngModel",
        controller: Controller1
    };

}

Directive1.$inject = [];

module.directive(_name, Directive);
module.directive(_name1, Directive1);

module.config(["schemaFormDecoratorsProvider", "sfBuilderProvider", "fxBuildersProvider", "autoCompleteBuilderProvider", (schemaFormDecoratorsProvider, sfBuilderProvider, fxBuilders, autoCompleteBuilderProvider) => {
    // suggest--schema-form组件化
    schemaFormDecoratorsProvider.defineAddOn(
        'materialDecorator',
        'suggest',
        "./decorators/suggest.chips.jade",
        [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilderProvider.builder, fxBuilders.suggest]
    );
    // autocomplete--schema-form组件化
    schemaFormDecoratorsProvider.defineAddOn(
        'materialDecorator',
        'autocomplete-1',
        "./decorators/autocomplete-1.jade",
        [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion, autoCompleteBuilderProvider.builder]
    );
}]).run(["$templateCache", ($templateCache) => {
    $templateCache.put('./decorators/suggest.chips.jade', require("./suggest.chips.jade")());
    $templateCache.put('./decorators/autocomplete-1.jade', require("./autocomplete-1.jade")());

}]);
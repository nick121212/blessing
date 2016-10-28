import { module } from '../module';
import * as _ from 'lodash';
import * as pointer from 'json-pointer';

const _name = "fxAutocompleteBoost";

class Builder {
    searchText: string;
    selected: any;

    constructor(private form, private fxAction, private formData) {
        this.init();
    }

    /**
     * 初始化数据
     * 如果存在keyField，执行一次搜索
     * 如果不存在keyField，取出数据，执行onChange方法
     */
    init() {
        let viewModel = null;

        if (pointer.has(this.formData, `/${this.form.key.join('/')}`)) {
            viewModel = pointer.get(this.formData, `/${this.form.key.join('/')}`);
        }

        if (!viewModel) {
            return;
        }

        if (this.form.acOptions.keyField) {
            return this.searchText = viewModel;
        }
        this.searchText = viewModel[this.form.acOptions.textField];
        this.onChange(viewModel);
    }

    /**
     * 当数据变化时，触发事件
     * @param item 更改后的item
     */
    onChange(item) {
        this.selected = item;

        if (_.isEmpty(item) || !this.searchText) {
            this.selected = null;
            return pointer.remove(this.formData, `/${this.form.key.join('/')}`);
        }
        if (this.form.acOptions.keyField) {
            if (pointer.has(item, `/${this.form.acOptions.keyField}`)) {
                return pointer.set(this.formData, `/${this.form.key.join('/')}`, pointer.get(item, `/${this.form.acOptions.keyField}`));
            } else {
                return console.error(`autocomplete-1-没有在item中找到${this.form.acOptions.keyField}`);
            }
        }
        pointer.set(this.formData, `/${this.form.key.join('/')}`, item);
    }

    /**
     * 查询数据，如果存在actionKey，则获取actionKey中的interface数据
     * 查询接口，返回数据
     * @returns {any}
     */
    query() {
        let actionModel, clientData = {};
        let filter = {};

        if (this.form.acOptions.actionKey) {
            // 设置搜索条件
            pointer.set(filter, this.form.acOptions.search, this.searchText);
            // 设置全局条件
            _.forEach(this.form.acOptions._where, (val, key) => {
                pointer.set(filter, key, val);
            });
            return this.fxAction.getModel(this.form.acOptions.actionKey).then((aModel) => {
                actionModel = aModel;
                return this.fxAction.doAction(actionModel.key, filter);
            }).then((results) => {
                return this.fxAction.doDealResult(actionModel, results, clientData);
            }).then((results) => {
                return results[this.form.acOptions.dataField];
            });
        }

        return this.form.data || [];
    }
}

class Controller {
    static $inject = ["$scope", "fxAction"];

    constructor(private $scope, private fxAction) {
        let formWithIndex = $scope.copyWithIndex ? $scope.copyWithIndex($scope.$index) : null;

        // 获取copy，填充数组索引
        formWithIndex && (formWithIndex = _.first(_.filter(formWithIndex.items, (item) => {
            return item['key'].join('') === $scope.form["key"].join('') ||
                _.filter(item['key'], (key) => {
                    return key && !_.isNumber(key);
                }).join('') === $scope.form["key"].join('');
        })));

        $scope.boost = new Builder(formWithIndex ? formWithIndex : $scope.form, fxAction, $scope.model);
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
        controller: Controller,
        replace: false
    };

}

Directive.$inject = [];

module.directive(_name, Directive);


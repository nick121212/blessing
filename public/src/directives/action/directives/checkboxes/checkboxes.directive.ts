import { module } from '../../module';
import * as _ from 'lodash';
import * as pointer from 'json-pointer';

const _name = "fxCheckboxesBoost";

class Boost {
    constructor() { }

    toggle(item, selected) {
        if (!selected) selected = [];

        let idx = selected.indexOf(item.value);

        if (idx >= 0) {
            return selected.splice(idx, 1);
        }

        selected.push(item.value);
    }

    exists(item, selected) {
        if (!selected) selected = [];
        return selected.indexOf(item.value) > -1;
    }
}

class Controller {
    static $inject = ["$scope"];

    constructor(private $scope) {
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

        $scope.cbsBoost = new Boost();

        $scope.$on("$destroy", () => {
            $scope.cbsBoost = null;
        });
    }
}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
module.directive(_name, () => {
    return {
        restrict: 'A',
        scope: false,
        priority: 9,
        require: "ngModel",
        controller: Controller
    };
});


module.config(["schemaFormDecoratorsProvider", "sfBuilderProvider", (schemaFormDecoratorsProvider, sfBuilderProvider) => {
    // suggest--schema-form组件化
    schemaFormDecoratorsProvider.defineAddOn(
        'materialDecorator',
        'checkboxes',
        "./decorators/checkboxes.jade",
        [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
    );
}]).run(["$templateCache", ($templateCache) => {
    $templateCache.put('./decorators/checkboxes.jade', require("./checkboxes.jade")());
}]);
import { module } from '../module';
import * as pointer from 'json-pointer';
import * as _ from 'lodash';

class Provider {
    $get: Array<string | Function> = ["$injector", ($injector) => {
        const service = $injector.invoke(Provider, this, null);

        return new Provider();
    }];

    onChange(scope) {
        if (!scope.form || !scope.form.fxOptions || !scope.model) {
            return;
        }

        let options = scope.form.fxOptions, item;
        if (options.item && pointer.has(scope, options.item)) {
            item = pointer.get(scope, options.item)
        }

        if (!item) {
            return;
        }

        _.forEach(options.set, (val, key) => {
            pointer.has(item, val) &&
                pointer.set(scope.model, key, pointer.get(item, val));
        });
    }

    onReverseChange(scope, ctrl) {
        if (!scope.form || !scope.form.fxOptions || !scope.model) {
            return;
        }

        let options = scope.form.fxOptions, item = {};

        _.forEach(options.set, (val, key) => {
            pointer.has(scope.model, key) &&
                pointer.set(item, val, pointer.get(scope.model, key));
        });

        pointer.set(item, scope.form.fxOptions.keyField, ctrl.$modelValue);
        pointer.set(scope, options.item, item);

        console.log(item);
    }
}

module.provider('formChange', [Provider]);
module.directive('fxChanged', ["formChange", function (formChange) {
    return {
        require: 'ngModel',
        restrict: 'AC',
        scope: false,
        link: function (scope: ng.IScope, element: any, attrs: any, ctrl: any) {
            var form = scope.$eval(attrs.fxChanged);
            //"form" is really guaranteed to be here since the decorator directive
            //waits for it. But best be sure.
            if (form && form.fxOptions) {
                ctrl.$viewChangeListeners.push(function () {
                    formChange.onChange(scope);
                });
                formChange.onReverseChange(scope, ctrl);
            }
        }
    };
}]);
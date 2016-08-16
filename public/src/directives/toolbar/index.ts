/**
 * Created by NICK on 16/8/9.
 */

import * as _ from 'lodash';
import * as angular from 'angular';

const _name = "fxToolbar";

interface IDirectiveScope extends ng.IScope {
    ngModel: Object;
}

class Strategy {
    private tools: {[id: string]: String;} = {};

    register(key: string, template: String) {
        this.tools[key] = template;
    }

    get(key: string) {
        return this.tools[key] || null;
    }
}

const strategy = new Strategy();

strategy.register("btn", require('./tpls/btn.jade')());
strategy.register("layout", require('./tpls/layout.jade')());
strategy.register("search", require('./tpls/search.jade')());
strategy.register("placeholder", require('./tpls/placeholder.jade')());

function Directive($rootScope: ng.IRootScopeService, $compile: ng.ICompileService): ng.IDirective {
    return {
        restrict: 'EA',
        scope: {
            ngModel: '='
        },
        require: ["^ngModel"],
        replace: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attr: ng.IAttributes) => {
            let model = $scope.ngModel;

            if (!_.isObject(model) || !_.isArray(model)) {
                return console.error("ngModel只能是对象或者数组!");
            }

            function diggest(models, $ele, $scope) {
                _.each(models, (model)=> {
                    if (strategy.get(model['type'])) {
                        let $newScope = $rootScope.$new(true, $scope);

                        $newScope[`${model['type']}Ctl`] = model;

                        let $newEle = angular.element(strategy.get(model['type']));

                        _.each(model.attributes, (attr, key)=> {
                            $newEle.attr(key, attr);
                        });
                        $newEle = $compile($newEle)($newScope);
                        $ele.append($newEle);

                        if (_.isArray(model.tools)) {
                            diggest(model.tools, $newEle, $newScope);
                        }
                    }
                });
            }

            diggest(_.isObject(model) ? [model] : model, $ele, $scope);
        }
    }
}

Directive.$inject = ["$rootScope", "$compile"];

angular.module(`${_name}Module`, []).directive('fxToolbar', Directive);

export default `${_name}Module`;


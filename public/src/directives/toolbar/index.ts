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
    private tools: {[id: string]: string;} = {};

    register(key: string, template: string) {
        this.tools[key] = template;
    }

    get(key: string) {
        return this.tools[key] || "";
    }
}

const strategy = new Strategy();

strategy.register("btn", require('./tpls/btn.jade')());
strategy.register("layout", require('./tpls/layout.jade')());
strategy.register("search", require('./tpls/search.jade')());
strategy.register("placeholder", require('./tpls/placeholder.jade')());
strategy.register("label", require('./tpls/label.jade')());

class Controller {
    constructor(private $scope) {
        // $scope.ctls = this.ctls;
    }
}

Controller.$inject = ["$scope"];

function Directive($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $interpolate: ng.IInterpolateService): ng.IDirective {
    return {
        restrict: 'EA',
        require: ["^ngModel"],
        scope: {
            ctls: '@',
            ngModel: '='
        },
        replace: false,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attr: ng.IAttributes) => {
            function diggest(models, $ele, $scope) {
                _.each(models, (model)=> {
                    if (strategy.get(model['type'])) {
                        let $newScope = $rootScope.$new(true, $scope);

                        $newScope[`${model['type']}Ctl`] = model;

                        if ($scope.ctls) {
                            $newScope[$scope.ctls] = $scope.$parent[$scope.ctls] || {};
                        }

                        let tmp: any = $interpolate(strategy.get(model['type']))($newScope);
                        let $newEle = angular.element(tmp);

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

            $scope.$watch('ngModel', (newValue)=> {
                let model = newValue;

                if (!model) return;
                if (!_.isObject(model) && !_.isArray(model)) {
                    return console.error("ngModel只能是对象或者数组!");
                }
                diggest(_.isArray(model) ? model : [model], $ele, $scope);
            });
        }
    }
}

Directive.$inject = ["$rootScope", "$compile", "$interpolate"];

const module = angular.module(`${_name}Module`, []).directive('fxToolbar', Directive);

export default module.name;


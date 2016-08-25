/**
 * Created by NICK on 16/8/9.
 */

import * as _ from 'lodash';
import * as angular from 'angular';

import toolbarSerFunc from './toolbar.service';

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
strategy.register("label", require('./tpls/label.jade')());
strategy.register("menu", require('./tpls/menu.jade')());

class Controller {
    static $inject = ["$scope", "$rootScope", "$compile", "$interpolate"];

    ctls: string;
    ngModel: Object;

    constructor(private $scope: ng.IScope, private $rootScope: ng.IRootScopeService, private $compile: ng.ICompileService, private $interpolate: ng.IInterpolateService) {

    }

    dig(models, $ele, $scope) {
        _.each(models, (model)=> {
            let template = strategy.get(model['type']);
            let $newScope = this.$rootScope.$new(true, $scope);
            let tmp: string, $newEle: JQuery;

            if (!template) {
                template = model.template;
            }
            if (!template) {
                return console.error("没有模板或者找不到类型!");
            }
            // 设置controllerAs
            $newScope[`${model['type']}Ctl`] = model;
            if (this.ctls) {
                $newScope[this.ctls] = $scope.$parent[this.ctls] || {};
            }
            // 编译一次模板
            tmp = this.$interpolate(template)($newScope);
            $newEle = angular.element(tmp);
            // 设置属性
            _.each(model.attributes, (attr, key)=> {
                $newEle.attr(key, attr);
            });
            // $compile
            $newEle = this.$compile($newEle)($newScope);
            $ele.append($newEle);
            // 递归
            if (_.isArray(model.tools)) {
                this.dig(model.tools, $newEle, $newScope);
            }
        });
    }
}

function Directive(): ng.IDirective {
    return {
        restrict: 'EA',
        require: [_name, "^ngModel"],
        scope: {},
        bindToController: {
            ctls: '@',
            ngModel: '='
        },
        controllerAs: 'toolbarCtl',
        controller: Controller,
        replace: false,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attr: ng.IAttributes, $ctl: Controller) => {
            $scope.$watchCollection(()=> {
                return $ctl[0].ngModel;
            }, (newValue)=> {
                let model = newValue;

                if (!model) return;
                if (!_.isObject(model) && !_.isArray(model)) {
                    return console.error("ngModel只能是对象或者数组!");
                }
                $ctl[0].dig(_.isArray(model) ? model : [model], $ele, $scope);
            });
        }
    }
}

Directive.$inject = [];

const module = angular.module(`${_name}Module`, []).directive(_name, Directive);

toolbarSerFunc(module);

export default module.name;


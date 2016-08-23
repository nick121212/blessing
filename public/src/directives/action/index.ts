/**
 * Created by NICK on 16/8/9.
 */

import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import {ActionModel, ActionType} from './models/action.model';
import actProviderRegFunc from './services/action.provider';

import restSvrMod from '../../services/rest.service';

const _name = "fxAction";

interface IDirectiveScope extends ng.IScope {
    ngModel: any;
}

interface IDirectiveAttr extends ng.IAttributes {

}

class Controller {
    static $inject: Array<string> = [];


}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive(materialUtils, fxAction): ng.IDirective {
    return {
        restrict: 'EA',
        // template: require("./tpls/index.jade")(),
        scope: {
            ngModel: "=",
            fxAction: "@"
        },
        replace: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr) => {
            fxAction.getModule();
        }
    };

}

Directive.$inject = ["materialUtils", "fxAction"];

const module = angular.module(`${_name}Module`, [ngMaterial, restSvrMod]);

module.directive(_name, Directive);
actProviderRegFunc(module);

export default module.name;

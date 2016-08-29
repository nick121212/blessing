/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel, ActionType} from '../models/action.model';

interface IDirectiveScope extends ng.IScope {
    ngModel: any;
    fxAction: string;
    actionModel: IActionModel;
    key: string;
}

interface IDirectiveAttr extends ng.IAttributes {

}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive(fxAction): ng.IDirective {
    return {
        restrict: 'EA',
        template: require("../tpls/muti-form.jade")(),
        scope: {
            ngModel: "=",
            key: "@"
        },
        replace: false,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr) => {
            $scope.actionModel = fxAction.getModel($scope.key);
        }
    };

}

Directive.$inject = ["fxAction"];

export default (module: ng.IModule)=> {
    module.directive("fxSearchAction", Directive);
}

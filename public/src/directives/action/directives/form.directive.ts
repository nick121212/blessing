/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel} from '../models/action.model';

interface IDirectiveScope extends ng.IScope {

}

interface IDirectiveAttr extends ng.IAttributes {

}

class Controller {
    static $inject = ["$scope", "fxAction"];

    actionModel: IActionModel;
    key: string;
    ngModel: Object;

    constructor(private $scope, private fxAction) {
        if (this.key) {
            fxAction.getModel(this.key).then((model)=> {
                this.actionModel = model;
            });
        }
    }
}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive(): ng.IDirective {
    return {
        restrict: 'EA',
        template: require("../tpls/form.jade")(),
        scope: true,
        bindToController: {
            ngModel: "=",
            key: "@"
        },
        controller: Controller,
        controllerAs: 'formCtl',
        replace: false,
        transclude: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr) => {

        }
    };

}

export default (module: ng.IModule)=> {
    module.directive("fxFormAction", Directive);
}

import {IActionModel} from '../models/action.model';

interface IDirectiveScope extends ng.IScope {

}

interface IDirectiveAttr extends ng.IAttributes {

}

class Controller {
    static $inject = ["$scope", "fxAction"];

    actionModel: IActionModel;
    key: string;
    formData: Object;

    constructor(private $scope, private fxAction) {
        this.formData = this.formData || {};
    }

    getActionModel() {
        this.fxAction.getModel(this.key).then((model)=> {
            this.actionModel = model;
        });
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
        require: "^fxFormAction",
        bindToController: {
            formData: "=ngModel",
            actionModel: "=?",
            key: "@?"
        },
        controller: Controller,
        controllerAs: 'formCtl',
        replace: true,
        transclude: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr, $ctl: Controller) => {
            $scope.$watch(()=> {
                return $ctl.key;
            }, ()=> {
                $ctl.getActionModel();
            });
        }
    };
}

export default (module: ng.IModule)=> {
    module.directive("fxFormAction", Directive);
}

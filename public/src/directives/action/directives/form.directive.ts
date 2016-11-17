import { module } from '../module';
import { IActionModel, ActionType } from '../models/action.model';
import * as pointer from 'json-pointer';

interface IDirectiveScope extends ng.IScope {

}

interface IDirectiveAttr extends ng.IAttributes {

}

class Controller {
    static $inject = ["$scope", "fxAction"];

    actionModel: IActionModel;
    key: string;
    formData: Object;
    ngModel: Object;
    isBusy: boolean;

    constructor(private $scope, private fxAction) {
        this.ngModel = this.ngModel || {};
    }

    getActionModel() {
        this.isBusy = true;
        this.fxAction.getModel(this.key).then((actionModel: IActionModel) => {
            // 取得数据中的特定部分
            if (actionModel.type === ActionType.form && actionModel.form) {
                this.formData = {};
                if (pointer.has(this.ngModel, actionModel.form.path || "")) {
                    this.formData = pointer.get(this.ngModel, actionModel.form.path || "");
                }
            }

            return this.fxAction.getSchema(actionModel);
        }).then((model) => {
            this.actionModel = model;
        }).finally(() => {
            this.isBusy = false;
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
            ngModel: "=ngModel",
            actionModel: "=?",
            isBusy: "=?ngDisabled",
            key: "@?"
        },
        controller: Controller,
        controllerAs: 'formCtl',
        replace: true,
        transclude: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr, $ctl: Controller) => {
            $scope.$watch(() => {
                return $ctl.key;
            }, () => {
                $ctl.getActionModel();
            });
        }
    };
}

module.directive("fxFormAction", Directive);

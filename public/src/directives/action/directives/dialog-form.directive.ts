/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel} from '../models/action.model';

const _dirName = 'fxDialogFormAction';

class Controller {
    static $inject = ["$scope", "fxAction", "materialUtils", "toolbarUtils", "$mdDialog"];

    formData: {};
    actionModel: IActionModel;
    key: string;
    toolbars: Array<any>;

    constructor(private $scope, private fxAction, private materialUtils: fx.utils.materialStatic, private toolbarUtils, private $mdDialog: ng.material.IDialogService) {
        this.formData = this.formData || {};
    }

    doSubmit($form) {
        let promise = this.fxAction.doAction(this.key, this.formData, $form);

        if (promise) {
            promise.then((result)=> {
                this.$mdDialog.hide(result);
            });
        }

        return promise;
    }

    getActionModel() {
        this.fxAction.getModel(this.key).then((model)=> {
            this.actionModel = model;
            this.toolbars = [
                this.toolbarUtils.noneBuilder("icon").iconBuilder(this.actionModel.icon).toValue(),
                this.toolbarUtils.labelBuilder(this.actionModel.title).attrBuilder({flex: ""}).toValue(),
                this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close").btnClick(($event)=> {
                    this.$mdDialog.cancel();
                }).toValue()
            ];
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
        template: require("../tpls/form-dialog.jade")(),
        scope: {},
        require: `^${_dirName}`,
        bindToController: {
            key: "@",
            formData: '=ngModel'
        },
        controller: Controller,
        controllerAs: 'dialogFormCtl',
        replace: false,
        compile: ($ele)=> {
            $ele.replaceWith(angular.element($ele.html()));
            return ($scope, $ele: ng.IAugmentedJQuery, $attrs, $ctl: Controller) => {
                $scope.$watch(()=> {
                    return $ctl.key;
                }, ()=> {
                    $ctl.getActionModel();
                });
            };
        }
    };
}

export default (module: ng.IModule)=> {
    module.directive(_dirName, Directive);
}

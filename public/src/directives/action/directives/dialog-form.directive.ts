/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel} from '../models/action.model';

const _dirName = 'fxDialogFormAction';

class Controller {
    static $inject = ["$scope", "fxAction", "toolbarUtils", "$mdDialog"];

    formData: {};
    actionModel: IActionModel;
    key: string;
    toolbars: Array<any>;

    constructor(private $scope, private fxAction, private toolbarUtils, private $mdDialog) {
        this.formData = this.formData || {};
    }

    doSubmit($form) {
        this.fxAction.doFormCheck($form);
        // console.log($form, this.formData);
    }

    getActionModel() {
        this.fxAction.getModel(this.key).then((model)=> {
            this.actionModel = model;
            this.toolbars = [
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
        replace: true,
        compile: ($ele)=> {
            // $ele.replaceWith(angular.element($ele.html()));
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

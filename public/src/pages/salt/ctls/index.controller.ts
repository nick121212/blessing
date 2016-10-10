import * as io from 'socket.io-client';

export class SaltController {
    static $inject = ["$scope", "$stateParams", "toolbarUtils", "materialUtils", "fxAction"];

    toolbar: Array<Object>;

    constructor(private $scope: ng.IScope, private $stateParams: ng.ui.IStateParamsService, private toolbarUtils, private materialUtils: fx.utils.materialStatic, private fxAction) {
        this.toolbar = [
            this.toolbarUtils.noneBuilder("icon").iconBuilder('power-socket', {fill: "black"}).toValue(),
            this.toolbarUtils.labelBuilder('SALT-API').attrBuilder({flex: ""}).toValue(),
            this.toolbarUtils.btnBuilder("登陆", "md-icon-button", false).iconBuilder("login", {fill: "black"}).btnClick(($event)=> {
                this.fxAction.getModel("saltApiLogin").then((actionModel)=> {
                    this.fxAction.doActionModel($event, actionModel, null, (result)=> {
                        console.log(result);
                    });
                });
            }).toValue()
        ];
    }
}

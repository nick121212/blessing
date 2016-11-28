/**
 * Created by NICK on 16/8/10.
 */
import { IActionModel, ActionType, IClientData } from '../../../directives/action/models/action.model';
import { ExecuteCmdForm } from '../services/execute.cmd';


export class PageExecuteCmdResultController {
    static $inject = ["$scope", "fxAction", "sockets"];

    private

    constructor(private $scope, private fxAction, private sockets) {
        this.$scope.$on("socket:connect", () => {
            // console.log("dfidjifjaijd");
        });
        this.$scope.$on("socket:events", (msg) => {
            // console.log(msg);
        });


    }
}

export class PageExecuteCmdController {
    static $inject = ["$rootScope", "$stateParams", "materialUtils", "fxAction", "toolbarUtils"];

    key: string;
    isOpen: boolean;
    toolbars: Array<any>;
    actionModel: IActionModel;
    formData: any;
    isBusy: boolean;
    executeResult: any = {};

    constructor(private $rootScope: angular.IRootScopeService, private $stateParams: ng.ui.IStateParamsService, private materilUtils: fx.utils.materialStatic, private fxAction, private toolbarUtils) {
        this.key = ExecuteCmdForm.key;
        this.doInitToolbar();
        this.formData = {
            listIps: []
        };
    }

    doInitToolbar() {
        this.toolbars = [
            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
        ];
    }

    showSivenav() {
        this.isOpen = !this.isOpen;
    }

    doSubmit($event, form) {
        let promise = this.fxAction.doAction(this.key, this.formData, form);
        let results;

        if (promise) {
            this.isBusy = true;
            promise.then((res) => {
                this.materilUtils.showMsg("执行命令成功！");
                results = res;

                return this.fxAction.getModel(this.key);
            }).then((actionModel) => {
                this.actionModel = actionModel;

                return this.fxAction.doDealResult(actionModel, results, this.executeResult);
            }).then((res) => {
                this.isOpen = true;
                this.$rootScope.$emit("showExecuteCmdResult", res.jid);
            }).finally(() => {
                this.isBusy = false;
            });
        }
    }
}
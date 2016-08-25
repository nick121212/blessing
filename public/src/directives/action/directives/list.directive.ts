/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel, IClientData, IQueryData} from '../models/action.model';

interface IDirectiveScope extends ng.IScope {

}

interface IDirectiveAttr extends ng.IAttributes {

}

class Controller {
    static $inject = ["$scope", "fxAction"];

    mdLimitOptions: Array<number> = [10, 30, 50, 100, 300];
    actionModel: IActionModel;
    clientData: IClientData = {};
    key: string;
    ngModel: Object;
    onOrderChange: Function;
    onPageChange: Function;
    queryData: IQueryData = {};
    isBusy: boolean = false;
    showPage: boolean = false;

    title: string = "测试表单";

    constructor(private $scope, private fxAction) {
        if (this.key) {
            fxAction.getModel(this.key).then((model) => {
                this.actionModel = model;
                this.clientData = {
                    total: 100,
                    rows: [{
                        key: "1"
                    }]
                };
            });
        }
        this.onOrderChange = this.orderChange.bind(this);
        this.onPageChange = this.pageChange.bind(this);
        this.queryData.page = 1;
        this.queryData.limit = 10;
    }

    orderChange(order: string) {
        console.log(order, this.key);
        console.log(this.queryData);
    }

    pageChange(page: number, limit: number) {
        if (limit !== this.queryData.limit) {
            page = 1;
        }
        this.queryData.page = page;
        if (page > 0) {
            this.queryData.offset = (page - 1) * limit;
        }
        console.log(this.queryData.page, this.queryData.limit, this.queryData.offset);
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
        template: require("../tpls/list.jade")(),
        scope: true,
        bindToController: {
            ngModel: "=",
            key: "@"
        },
        controller: Controller,
        controllerAs: 'listCtl',
        replace: true,
        transclude: true,
        link: ($scope: IDirectiveScope, $ele: ng.IAugmentedJQuery, $attrs: IDirectiveAttr) => {

        }
    };
}

export default (module: ng.IModule) => {
    module.directive("fxListAction", Directive);
}

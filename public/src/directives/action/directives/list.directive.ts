/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel, IClientData, IQueryData, ActionType} from '../models/action.model';

class Controller {
    static $inject = ["$scope", "$q", "$timeout", "fxAction", "toolbarUtils"];

    key: string;
    mdLimitOptions: Array<number> = [10, 30, 50, 100, 300];
    actionModel: IActionModel;
    clientData: IClientData = {};
    queryData: IQueryData = {page: 1, limit: 10};
    isBusy: boolean = false;
    showPage: boolean = false;
    selected: Array<Object> = [];
    promise: ng.IPromise<any>;

    onOrderChange: Function;
    onPageChange: Function;
    doSearchBind: Function;

    /**
     * 构造函数
     * @param $scope
     * @param $q
     * @param $timeout
     * @param fxAction
     * @param toolbarUtils
     */
    constructor(private $scope, private $q, private $timeout, private fxAction, private toolbarUtils) {
        fxAction.getModel(this.key).then((model) => {
            this.actionModel = model;
            this.initToolbar();
            this.initItemToolbar();
            this.doSearch();
        });
        this.onOrderChange = this.orderChange.bind(this);
        this.onPageChange = this.pageChange.bind(this);
        this.doSearchBind = this.doSearch.bind(this);
    }

    /**
     * 初始化顶部toolbar
     */
    initToolbar() {
        // 添加标题label
        this.actionModel.list.toolbars.unshift(this.toolbarUtils.labelBuilder(this.actionModel.title).attrBuilder({flex: ""}).toValue());
        // 添加刷新按钮
        if (this.actionModel.list.showRefreshBtn) {
            this.actionModel.list.toolbars.push(this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false).iconBuilder("refresh", {fill: "black"}).btnClick(($event)=> {
                this.doSearch();
            }).toValue());
        }
        // 添加显示/隐藏搜索按钮
        if (this.actionModel.list.showSearchBtn) {
            this.actionModel.list.toolbars.push(this.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}", {fill: "black"}).btnClick(($event)=> {
                this.actionModel.list.showSearchPanel = !this.actionModel.list.showSearchPanel;
            }).toValue());
        }
    }

    /**
     * 初始化单项的Item的toolbar
     */
    initItemToolbar() {
        const menuTool: any = this.toolbarUtils.menuBuilder("", "md-icon-button").tooltipBuilder("").iconBuilder("more_vert").noOptions(true, false).menuOptionsBuilder().toValue();

        this.fxAction.getModels(this.actionModel.actions).then((actionModels)=> {
            _.forEach(actionModels, (actionModel: IActionModel)=> {
                if (actionModel.type = ActionType.form) {
                    menuTool.items.push(this.toolbarUtils.menuItemBuilder(actionModel.title, null, true).tooltipBuilder("").noOptions(true, false).iconBuilder(actionModel.icon).btnClick(($event, item: any)=> {
                        this.fxAction.doActionModel($event, actionModel, item);
                    }).toValue());
                }
            });
            this.actionModel.list.itemToolbars = [menuTool];
        });
        this.actionModel.list.itemToolbars = [menuTool];
    }

    /**
     * 更改排序回调
     * @param order
     */
    orderChange(order: string) {
        let orders = order.split('-');

        // 返回的order信息是  -key|key,前面带"-"的是倒序
        if (orders.length > 0) {
            switch (orders.length) {
                case 1:
                    orders.push("asc");
                    break;
                case 2:
                    orders = _.reverse(orders);
                    orders[1] = "desc";
                    break;
            }
            this.queryData.order = orders;
            this.doSearch();
        }
    }

    /**
     * 更改页码或者pageSize回调
     * @param page
     * @param limit
     */
    pageChange(page: number, limit: number) {
        if (limit !== this.queryData.limit) {
            page = 1;
        }
        this.queryData.page = page;
        if (page > 0) {
            this.queryData.offset = (page - 1) * limit;
        }
        this.doSearch();
    }

    /**
     * 搜索数据
     * @param filterData {Object} 搜索数据
     */
    doSearch(filterData?: any) {
        this.isBusy = true;

        this.queryData.where = filterData || {};
        this.promise = this.fxAction.doAction(this.key, this.queryData);

        if(!this.promise) {
            return;
        }
        this.promise.then((result)=> {
            this.fxAction.doDealResult(this.actionModel, result, this.clientData);
        }).finally(()=> {
            this.isBusy = false
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
        template: require("../tpls/list.jade")(),
        scope: true,
        bindToController: {
            key: "@",
            selected: '=?'
        },
        controller: Controller,
        controllerAs: 'listCtl',
        replace: true,
        transclude: true
    };
}

export default (module: ng.IModule) => {
    module.directive("fxListAction", Directive);
}

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
    ngModel: Object;
    onOrderChange: Function;
    onPageChange: Function;
    queryData: IQueryData = {};
    isBusy: boolean = false;
    showPage: boolean = false;
    selected: Array<Object> = [];
    promise: ng.IPromise<any>;
    filterData: Object = {};

    /**
     * 构造函数
     * @param $scope
     * @param $q
     * @param $timeout
     * @param fxAction
     * @param toolbarUtils
     */
    constructor(private $scope, private $q, private $timeout, private fxAction, private toolbarUtils) {
        if (this.key) {
            fxAction.getModel(this.key).then((model) => {
                this.actionModel = model;
                this.initToolbar();
                this.initItemToolbar();
                this.doSearch();
            });
        }
        this.onOrderChange = this.orderChange.bind(this);
        this.onPageChange = this.pageChange.bind(this);
        this.queryData.page = 1;
        this.queryData.limit = 10;
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
            // 初始化搜索栏
            this.initSearchToolbar();
        }
    }

    /**
     * 初始化搜索toolbar
     */
    initSearchToolbar() {
        this.actionModel.list.searchToolbars = [
            this.toolbarUtils.labelBuilder(`${this.actionModel.title}搜索`).attrBuilder({flex: ""}).toValue(),
            this.toolbarUtils.btnBuilder("清空搜索条件", "md-icon-button", false).iconBuilder("do_not_disturb_alt").btnClick(($event)=> {
                this.clearFilterData();
            }).toValue(),
            this.toolbarUtils.btnBuilder("关闭搜索栏", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}").btnClick(($event)=> {
                this.actionModel.list.showSearchPanel = !this.actionModel.list.showSearchPanel;
            }).toValue()
        ];
    }

    /**
     * 初始化单项的Item的toolbar
     */
    initItemToolbar() {
        const menuTool: any = this.toolbarUtils.menuBuilder("", "md-icon-button").tooltipBuilder("").iconBuilder("more_vert").noOptions(true, false).menuOptionsBuilder().toValue();

        this.fxAction.getModels(this.actionModel.actions).then((actionModels)=> {
            _.forEach(actionModels, (actionModel: IActionModel)=> {
                if (actionModel.type = ActionType.form) {
                    menuTool.items.push(this.toolbarUtils.menuItemBuilder(actionModel.title, null, true).tooltipBuilder("").noOptions(true, false).iconBuilder(actionModel.icon).btnClick(($event)=> {
                        console.log(actionModel);
                    }).toValue());
                }
            });
            this.actionModel.list.itemToolbars = [menuTool];
        });
        this.actionModel.list.itemToolbars = [menuTool];
    }

    /**
     * 删除搜索字段
     */
    clearFilterData() {
        this.filterData = {};
    }

    /**
     * 更改排序回调
     * @param order
     */
    orderChange(order: string) {
        console.log(order, this.key);
        console.log(this.queryData);

        this.doSearch();
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
        console.log(this.queryData.page, this.queryData.limit, this.queryData.offset);
        this.doSearch();
    }

    /**
     * 搜索数据
     * @param clearParams
     */
    doSearch(clearParams: boolean = false) {
        this.isBusy = true;
        this.promise = this.fxAction.doAction(this.key, this.filterData).then(()=> {
            let defer = this.$q.defer();

            this.clientData = {
                total: 100,
                rows: [{
                    key: "100",
                    content: "80.5"
                }]
            };

            this.$timeout(()=> {
                defer.resolve();
            }, 3000);

            return defer.promise;
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
            ngModel: "=",
            key: "@"
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

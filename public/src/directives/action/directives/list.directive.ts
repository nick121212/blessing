import {IActionModel, IClientData, IQueryData, ActionType} from '../models/action.model';

class Controller {
    static $inject = ["$scope", "$q", "$timeout", "fxAction", "toolbarUtils", "materialUtils"];

    key: string;
    mdLimitOptions: Array<number> = [10, 30, 50, 100, 300];
    actionModel: IActionModel;
    clientData: IClientData = {};
    queryData: IQueryData = {offset: 0, limit: 10, page: 1};
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
     * @param materialUtils
     */
    constructor(private $scope, private $q, private $timeout, private fxAction, private toolbarUtils, private materialUtils: fx.utils.materialStatic) {
        fxAction.getModel(this.key).then((model) => {
            this.actionModel = _.cloneDeep(model);
            this.initToolbar();
            this.initItemToolbar();
            this.doSearch();
            this.queryData = _.extend({offset: 0, limit: 10, page: 1}, model.list.queryData || {});
        });
        this.onOrderChange = this.orderChange.bind(this);
        this.onPageChange = this.pageChange.bind(this);
        this.doSearchBind = this.doSearch.bind(this);
    }

    /**
     * 按钮的点击事件
     * @param $event
     * @param actionModel
     * @param item
     */
    doClickActionMenu($event, actionModel, item) {
        this.fxAction.doActionModel($event, actionModel, item).then((result)=> {
            this.materialUtils.showMsg(`${actionModel.successMsg || "操作成功!"}`);
            this.$timeout(()=> {
                if (actionModel.refreshList) {
                    this.doSearch(this.queryData.where || {});
                }
            }, 200);
        });
    }

    /**
     * 初始化顶部toolbar
     */
    initToolbar() {
        this.actionModel.list.toolbars=[];
        // 添加标题label和icon
        this.actionModel.list.toolbars.push(this.toolbarUtils.noneBuilder("icon").iconBuilder(this.actionModel.icon, {fill: "black"}).toValue());
        this.actionModel.list.toolbars.push(this.toolbarUtils.labelBuilder(`${this.actionModel.title}`).attrBuilder({flex: ""}).toValue());
        // 获取操作按钮
        this.fxAction.getModels(this.actionModel.actions).then((actionModels)=> {
            // 添加顶部按钮
            _.forEach(actionModels, (actionModel: IActionModel)=> {
                if (actionModel.type !== ActionType.list) {
                    this.actionModel.list.toolbars.push(this.toolbarUtils.btnBuilder(actionModel.title, "md-icon-button", false).tooltipBuilder("").iconBuilder(actionModel.icon, {fill: "black"}).btnClick(($event, item: any)=> {
                        this.doClickActionMenu($event, actionModel, item || {});
                    }).toValue());
                }
            });
            // 添加刷新按钮
            if (this.actionModel.list.showRefreshBtn) {
                this.actionModel.list.toolbars.push(this.toolbarUtils.btnBuilder("刷新", "md-icon-button", false).iconBuilder("refresh", {fill: "black"}).btnClick(($event)=> {
                    this.doSearch(this.queryData.where || {});
                }).toValue());
            }
            // 添加显示/隐藏搜索按钮
            if (this.actionModel.list.showSearchBtn) {
                this.actionModel.list.toolbars.push(this.toolbarUtils.btnBuilder("{{listCtl.actionModel.list.showSearchPanel?'关闭搜索栏':'打开搜索栏'}}", "md-icon-button", false).iconBuilder("{{listCtl.actionModel.list.showSearchPanel?'window-open':'window-closed'}}", {fill: "black"}).btnClick(($event)=> {
                    this.actionModel.list.showSearchPanel = !this.actionModel.list.showSearchPanel;
                }).toValue());
            }
        });
    }

    /**
     * 初始化单项的Item的toolbar
     */
    initItemToolbar() {
        const menuTool: any = this.toolbarUtils.menuBuilder("", "md-icon-button").tooltipBuilder("操作菜单").iconBuilder("expand_more").menuOptionsBuilder().toValue();
        const keys = [];
        let itemActionsObj = _.keyBy(this.actionModel.itemActions, "key");

        // 提取所有的keys
        _.each(this.actionModel.itemActions, (item)=> {
            keys.push(item.key);
        });
        // 处理所有提取的keys
        keys.length && this.fxAction.getModels(keys).then((actionModels)=> {
            _.forEach(actionModels, (actionModel: IActionModel, key)=> {
                let condition = itemActionsObj[key].condition;

                // 添加操作按钮
                switch (actionModel.type) {
                    case  ActionType.form:
                    case  ActionType.wizard:
                    case  ActionType.confirm:
                        let menu = this.toolbarUtils.menuItemBuilder(actionModel.title, null, true).tooltipBuilder("").noOptions(true, false).iconBuilder(actionModel.icon).btnClick(($event, item: any)=> {
                            this.doClickActionMenu($event, actionModel, item);
                        });
                        // 处理显示/隐藏逻辑
                        if (condition) {
                            menu.conditionBuilder(condition);
                        }
                        // 添加到操作
                        menuTool.items.push(menu.toValue());
                        break;
                }
            });
            // 单挑数据的操作按钮数据
            this.actionModel.list.itemToolbars = [menuTool];
        });
    }

    /**
     * 更改排序回调
     * @param order
     */
    orderChange(order: string) {
        this.queryData.order = order;
        this.doSearch(this.queryData.where || {});
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
        this.doSearch(this.queryData.where || {});
    }

    /**
     * 搜索数据
     * @param filterData {Object} 搜索数据
     */
    doSearch(filterData?: any) {
        this.isBusy = true;

        this.queryData.where = filterData || {};
        this.promise = this.fxAction.doAction(this.key, this.queryData);

        if (!this.promise) {
            return;
        }
        this.promise.then((result)=> {
            this.fxAction.doDealResult(this.actionModel, result, this.clientData);
        }).finally(()=> {
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
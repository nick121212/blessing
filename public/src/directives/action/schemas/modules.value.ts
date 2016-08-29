/**
 * Created by NICK on 16/8/23.
 */

import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

class ModuleList {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesListAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleList.key,
            type: ActionType.list,
            title: "模块管理",
            icon: "view-module",
            list: {
                columns: [
                    actionUtils.columnBuilder("<span>KEY:{{item.key}}</span>", "KEY", "key").toValue(),
                    actionUtils.columnBuilder("<span>{{ item.content|currency:'CHY￥':1 }}</span>", "金额(元)", "content").columnUnitBuilder("元", true).toValue()
                ],
                searchActionKey: "modulesSearchAction",
                showRefreshBtn: true,
                showSearchBtn: true,
                showSearchPanel: false,
                toolbars: [],
                itemToolbars: []
            },
            actions: [ModuleAdd.key, ModuleSearch.key],
            interfaces: [{
                key: "modulesList",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "modules",
                isRestful: true
            }]
        };

        return actionModel;
    }
}
class ModuleAdd {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesAddAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleList.key,
            type: ActionType.form,
            title: "新建模块",
            icon: "add",
            form: {
                dataSchema: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            title: "KEY"
                        }
                    }
                },
                formSchema: [{
                    key: "username",
                    type: "string",
                    placeHolder: "KEY",
                    description: "请输入key来进行搜索,不支持模糊查询",
                    showHints: true,
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}
class ModuleSearch {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesSearchAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleList.key,
            icon: "search",
            type: ActionType.form,
            title: "模块搜索表单",
            form: {
                dataSchema: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            title: "KEY"
                        }
                    }
                },
                formSchema: [{
                    key: "username",
                    type: "string",
                    placeHolder: "KEY",
                    description: "请输入key来进行搜索,不支持模糊查询",
                    showHints: true,
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

export default (module: ng.IModule) => {
    module.service(ModuleList.key, ModuleList);
    module.service(ModuleSearch.key, ModuleSearch);
    module.service(ModuleAdd.key, ModuleAdd);
}

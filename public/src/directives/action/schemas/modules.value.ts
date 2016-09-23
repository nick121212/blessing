/**
 * Created by NICK on 16/8/23.
 */

import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

const dataSchema = {
    type: "object",
    required: ["key", "title", "icon"],
    properties: {
        key: {
            type: "string",
            title: "KEY"
        },
        title: {
            type: "string",
            title: "模块名称"
        },
        link: {
            type: "string",
            title: "路由状态名"
        },
        icon: {
            type: "string",
            title: "图标"
        },
        parentKey: {
            type: "string",
            title: "父亲节点KEY"
        },
        description: {
            type: "string",
            title: "描述",
            maxLength: "500"
        },
        showed: {
            type: "boolean",
            title: "是否显示"
        }
    }
};

/**
 * 模块查询
 */
class ModuleList {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "module";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleList.key,
            type: ActionType.list,
            title: "模块管理",
            icon: "view-module",
            list: {
                columns: [
                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.title }}</span>", "模块名称").toValue(),
                    actionUtils.columnBuilder(`<ng-md-icon icon="{{ ::item.icon }}"></ng-md-icon>`, "图标").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.lft }}</span>`, "lft", "lft").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.rgt }}</span>`, "rgt", "rgt").toValue()
                ],
                searchActionKey: ModuleSearch.key,
                showRefreshBtn: true,
                showSearchBtn: true,
                showSearchPanel: false,
                toolbars: [],
                itemToolbars: []
            },
            itemActions: [{key: ModuleEdit.key}, {key: ModuleDelete.key}],
            actions: [ModuleAdd.key],
            interfaces: [{
                key: "modulesList",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "modules",
                jpp: {
                    set: {
                        "/total": "/count",
                        "/rows": "/rows"
                    },
                    copy: {},
                    move: {},
                    del: {}
                },
                isRestful: true
            }]
        };

        return actionModel;
    }
}
/**
 * 模块侧边栏
 */
class ModuleMenus {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "moduleMenuAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleMenus.key,
            type: ActionType.list,
            title: "模块管理",
            icon: "view-module",
            interfaces: [{
                key: "moduleMenu",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "/modules/menu",
                isRestful: false
            }]
        };

        return actionModel;
    }
}
/**
 * 模块增加
 */
class ModuleAdd {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesAddAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleAdd.key,
            type: ActionType.form,
            title: "新建模块",
            icon: "add",
            refreshList: true,
            form: {
                dataSchema: dataSchema,
                formSchema: [{
                    key: "parentKey",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "key",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "title",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "link",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "icon",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "description",
                    type: "textarea",
                    htmlClass: "md-block"
                }, {
                    key: "showed",
                    type: "checkbox"
                }]
            },
            closeDialog: true,
            interfaces: [{
                key: "modulesAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "modules",
                isRestful: true
            }]
        };

        return actionModel;
    }
}
/**
 * 模块修改
 */
class ModuleEdit {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesEditAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleEdit.key,
            type: ActionType.form,
            title: "修改模块",
            icon: "edit",
            refreshList: true,
            form: {
                dataSchema: dataSchema,
                formSchema: [{
                    key: "parentKey",
                    type: "text",
                    readonly: true,
                    htmlClass: "md-block"
                }, {
                    key: "key",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "title",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "link",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "icon",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "description",
                    type: "textarea",
                    htmlClass: "md-block"
                }, {
                    key: "showed",
                    type: "checkbox"
                }]
            },
            closeDialog: true,
            interfaces: [{
                key: "modulesEdit",
                method: MethodType.PUT,
                idFieldPath: "/key",
                address: "",
                port: null,
                path: "modules",
                isRestful: true
            }]
        };

        return actionModel;
    }
}
/**
 * 模块删除
 */
class ModuleDelete {
    static key: string = "modulesDeleteAction";

    constructor() {
        let actionModel: IActionModel = {
            key: ModuleDelete.key,
            type: ActionType.confirm,
            title: "删除模块",
            icon: "delete",
            refreshList: true,
            confirm: {
                confirmTitle: "",
                confirmContent: "确定要删除模块吗!"
            },
            interfaces: [{
                key: "modulesDelete",
                method: MethodType.DELETE,
                idFieldPath: "/key",
                address: "",
                port: null,
                path: "modules",
                isRestful: true
            }]
        };

        return actionModel;
    }
}
/**
 * 模块搜索
 */
class ModuleSearch {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesSearchAction";

    constructor() {
        let actionModel: IActionModel = {
            key: ModuleSearch.key,
            icon: "search",
            type: ActionType.form,
            title: "模块搜索表单",
            form: {
                dataSchema: dataSchema,
                formSchema: [{
                    key: "key",
                    type: "text",
                    required: false,
                    placeHolder: "KEY",
                    description: "请输入key来进行搜索,不支持模糊查询",
                    showHints: true,
                    copyValueTo: ["/key/$eq"],
                    htmlClass: "md-block"
                }, {
                    key: "showed",
                    type: "select",
                    copyValueTo: ["/showed/$eq"],
                    titleMap: [{value: null, name: "全部"}, {value: true, name: "显示"}, {value: false, name: "不显示"}],
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

export default (module: ng.IModule) => {
    const services: Array<any> = [ModuleDelete, ModuleMenus, ModuleList, ModuleSearch, ModuleAdd, ModuleEdit];

    _.each(services, (ser)=> {
        module.service(ser.key, ser);
    });
}

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
                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY", "key").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.title }}</span>", "模块名称").toValue(),
                    actionUtils.columnBuilder(`<ng-md-icon icon="{{ ::item.icon }}"></ng-md-icon>`, "图标").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.lft }}</span>`, "lft").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.rgt }}</span>`, "rgt").toValue()
                ],
                searchActionKey: "modulesSearchAction",
                showRefreshBtn: true,
                showSearchBtn: true,
                showSearchPanel: false,
                toolbars: [],
                itemToolbars: []
            },
            itemActions: [ModuleEdit.key],
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
class ModuleAdd {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesAddAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleAdd.key,
            type: ActionType.form,
            title: "新建模块",
            icon: "add",
            form: {
                dataSchema: {
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
                },
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
class ModuleEdit {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesEditAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleEdit.key,
            type: ActionType.form,
            title: "修改模块",
            icon: "edit",
            form: {
                dataSchema: {
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
                },
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
class ModuleSearch {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "modulesSearchAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: ModuleSearch.key,
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
    module.service(ModuleEdit.key, ModuleEdit);
}

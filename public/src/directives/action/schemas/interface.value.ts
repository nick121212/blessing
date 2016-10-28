import { module } from '../module';
import { IActionModel, ActionType } from '../models/action.model';
import { MethodType } from '../models/interface.model';

class List {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "interface";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: List.key,
            type: ActionType.list,
            title: "接口管理",
            icon: "view-module",
            list: {
                columns: [
                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
                    actionUtils.columnBuilder("<span>{{::item.group}}</span>", "分组名称", "group").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.method }}</span>", "请求类型").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.address }}</span>", "接口地址").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.port }}</span>", "接口端口").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.path }}</span>", "接口路径").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.isRestful }}</span>", "是否是REST").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.description }}</span>`, "描述").toValue(),
                ],
                queryData: { limit: 50 },
                showPagination: true,
                searchActionKey: Search.key,
                showRefreshBtn: true,
                showSearchBtn: true,
                showSearchPanel: false,
                toolbars: [],
                itemToolbars: []
            },
            itemActions: [{ key: Edit.key }, { key: Delete.key }, { key: Copy.key }],
            actions: [Add.key],
            interfaces: [{
                key: "modulesList",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "interfaces",
                jpp: {
                    set: {
                        "/total": "/count",
                        "/rows": "/rows"
                    }
                },
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Add {
    static key: string = "interfaceAddAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Add.key,
            type: ActionType.form,
            title: "新建interface",
            icon: "add",
            refreshList: true,
            form: {
                dataSchema: "interfaceActionData",
                formSchema: "interfaceAddActionData"
            },
            closeDialog: true,
            interfaces: [{
                key: "interfaceAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "interfaces",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Edit {
    static key: string = "interfaceEditAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Edit.key,
            type: ActionType.form,
            title: "修改interface",
            icon: "edit",
            refreshList: true,
            form: {
                dataSchema: "interfaceActionData",
                formSchema: "interfaceAddActionData"
            },
            closeDialog: true,
            interfaces: [{
                key: "interfaceEdit",
                method: MethodType.PUT,
                idFieldPath: "/id",
                address: "",
                port: null,
                path: "interfaces",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Copy {
    static key: string = "interfaceCopyAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Copy.key,
            type: ActionType.form,
            title: "复制interface",
            icon: "content_copy",
            refreshList: true,
            form: {
                dataSchema: "interfaceActionData",
                formSchema: "interfaceAddActionData"
            },
            closeDialog: true,
            interfaces: [{
                key: "interfaceAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "interfaces",
                jpp: {
                    del: ["/id"]
                },
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Delete {
    static key: string = "interfaceDeleteAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Delete.key,
            type: ActionType.confirm,
            title: "删除interface",
            icon: "delete",
            refreshList: true,
            confirm: {
                confirmTitle: "",
                confirmContent: "确定要删除interface吗!"
            },
            interfaces: [{
                key: "interfaceDelete",
                method: MethodType.DELETE,
                idFieldPath: "/id",
                address: "",
                port: null,
                path: "interfaces",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Search {
    static key: string = "interfaceSearchAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Search.key,
            type: ActionType.form,
            title: "搜索interface",
            icon: "search",
            form: {
                dataSchema: "interfaceActionData",
                formSchema: "interfaceSearchActionData"
            }
        };

        return actionModel;
    }
}

const services: Array<any> = [List, Add, Edit, Delete, Copy, Search];

_.each(services, (ser) => {
    module.service(ser.key, ser);
});


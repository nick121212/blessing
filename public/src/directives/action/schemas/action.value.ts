import { module } from '../module';
import { IActionModel, ActionType } from '../models/action.model';
import { MethodType } from '../models/interface.model';

class List {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "action";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: List.key,
            type: ActionType.list,
            title: "SCHEMA管理",
            icon: "view-module",
            list: {
                columns: [
                    actionUtils.columnBuilder("<span>{{::item.id}}</span>", "ID", "id").toValue(),
                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
                    actionUtils.columnBuilder("<span>{{::item.type}}</span>", "操作类型", "type").toValue(),
                    actionUtils.columnBuilder("<span>{{::item.title }}</span>", "操作标题").toValue()
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
                key: "actionList",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "actions",
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
    static key: string = "actionAddAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Add.key,
            type: ActionType.form,
            title: "新建SCHEMA",
            icon: "add",
            refreshList: true,
            form: {
                dataSchema: "actionActionData",
                formSchema: [
                    {
                        "key": "key",
                        "type": "text",
                        "htmlClass": "md-block"
                    },
                    {
                        "key": "title",
                        "type": "text",
                        "htmlClass": "md-block"
                    },
                    {
                        "key": "icon",
                        "type": "text",
                        "htmlClass": "md-block"
                    },
                    {
                        "key": "type",
                        "type": "select",
                        "htmlClass": "md-block",
                        "titleMap": [
                            {
                                "name": "NONE",
                                "value": 0
                            },
                            {
                                "name": "列表操作",
                                "value": 1
                            },
                            {
                                "name": "表单操作",
                                "value": 2
                            },
                            {
                                "name": "多表单操作",
                                "value": 3
                            },
                            {
                                "name": "确认操作",
                                "value": 4
                            }
                        ]
                    },
                    {
                        "key": "condition",
                        "type": "text",
                        "condition": "model.type>1",
                        "htmlClass": "md-block"
                    },
                    {
                        "key": "successMsg",
                        "condition": "model.type>1",
                        "type": "text",
                        "htmlClass": "md-block"
                    },
                    {
                        "key": "refreshList",
                        "condition": "model.type>1",
                        "type": "checkbox"
                    },
                    {
                        "key": "closeDialog",
                        "condition": "model.type>1",
                        "type": "checkbox"
                    },
                    {
                        "key": "list",
                        "type": "card",
                        "condition": "model.type==1",
                        "fieldClass": "flex layout-column",
                        "items": [
                            {
                                "key": "list.columns",
                                "type": "array",
                                "htmlClass": "flex",
                                "items": [
                                    {
                                        "key": "list.columns[].content",
                                        "type": "text"
                                    },
                                    {
                                        "key": "list.columns[].title",
                                        "type": "text"
                                    },
                                    {
                                        "key": "list.columns[].name",
                                        "type": "text"
                                    },
                                    {
                                        "key": "list.columns[].sort",
                                        "type": "text"
                                    },
                                    {
                                        "key": "list.columns[].unit",
                                        "type": "text"
                                    }
                                ]
                            }, {
                                "key": "list.searchActionKey",
                                "type": "autocomplete-1",
                                "htmlClass": "md-block flex",
                                "acOptions": {
                                    "textField": "description",
                                    "keyField": "key",
                                    "dataField": "rows",
                                    "noCache": false,
                                    "search": "/where/key/$like",
                                    "actionKey": "schemaListAction"
                                }
                            }, {
                                "key": "list.showPagination",
                                "type": "checkbox"
                            }, {
                                "key": "list.showSearchBtn",
                                "type": "checkbox"
                            }, {
                                "key": "list.showRefreshBtn",
                                "type": "checkbox"
                            }, {
                                "key": "list.showSearchPanel",
                                "type": "checkbox"
                            }, {
                                "key": "list.queryData.limit",
                                "type": "number"
                            }
                        ]
                    },
                    {
                        "key": "wizard",
                        "type": "card",
                        "condition": "model.type==3",
                        "fieldClass": "flex layout-gt-md-row layout-column",
                        "items": [
                            {
                                "key": "wizard.actions",
                                "type": "array",
                                "htmlClass": "flex",
                                "items": [
                                    {
                                        "key": "wizard.actions[]",
                                        "type": "autocomplete-1",
                                        "startEmpty": true,
                                        "htmlClass": "md-block flex",
                                        "acOptions": {
                                            "textField": "title",
                                            "keyField": "key",
                                            "dataField": "rows",
                                            "noCache": false,
                                            "search": "/where/key/$like",
                                            "actionKey": "action"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "key": "form",
                        "type": "card",
                        "condition": "model.type==2",
                        "fieldClass": "flex layout-gt-md-row layout-column",
                        "items": [
                            {
                                "key": "form.dataSchema",
                                "type": "autocomplete-1",
                                "acOptions": {
                                    "textField": "description",
                                    "keyField": "key",
                                    "dataField": "rows",
                                    "noCache": false,
                                    "search": "/where/key/$like",
                                    "_where": {
                                        "/where/type/$eq": "DATA"
                                    },
                                    "actionKey": "schemaListAction"
                                },
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "form.formSchema",
                                "type": "autocomplete-1",
                                "acOptions": {
                                    "textField": "description",
                                    "keyField": "key",
                                    "dataField": "rows",
                                    "noCache": false,
                                    "search": "/where/key/$like",
                                    "_where": {
                                        "/where/type/$eq": "FORM"
                                    },
                                    "actionKey": "schemaListAction"
                                },
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "form.title",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "confirm.path",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            }
                        ]
                    },
                    {
                        "key": "confirm",
                        "type": "card",
                        "condition": "model.type==4",
                        "fieldClass": "flex layout-gt-md-row layout-column",
                        "items": [
                            {
                                "key": "confirm.confirmTitle",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "confirm.confirmContent",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "confirm.confirmOk",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            },
                            {
                                "key": "confirm.confirmCancel",
                                "text": "text",
                                "htmlClass": "md-block flex"
                            }
                        ]
                    },
                    {
                        "key": "interfaces",
                        "type": "array",
                        "items": [
                            {
                                "key": "interfaces[].key",
                                "type": "text"
                            },
                            {
                                "key": "interfaces[]",
                                "type": "autocomplete-1",
                                "acOptions": {
                                    "textField": "description",
                                    "dataField": "rows",
                                    "noCache": true,
                                    "search": "/where/key/$like",
                                    "actionKey": "schemaListAction"
                                },
                                "htmlClass": "md-block flex"
                            }
                        ]
                    }
                ]
            },
            closeDialog: true,
            interfaces: [{
                key: "actionAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "actions",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Edit {
    static key: string = "actionEditAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Edit.key,
            type: ActionType.form,
            title: "修改SCHEMA",
            icon: "edit",
            refreshList: true,
            form: {
                dataSchema: "actionActionData",
                formSchema: "actionEditActionForm"
            },
            closeDialog: true,
            interfaces: [{
                key: "actionEdit",
                method: MethodType.PUT,
                idFieldPath: "/id",
                address: "",
                port: null,
                path: "actions",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Copy {
    static key: string = "actionCopyAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Copy.key,
            type: ActionType.form,
            title: "复制SCHEMA",
            icon: "content_copy",
            refreshList: true,
            form: {
                dataSchema: "actionActionData",
                formSchema: "actionAddActionForm"
            },
            closeDialog: true,
            interfaces: [{
                key: "actionAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "actions",
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
    static key: string = "actionDeleteAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Delete.key,
            type: ActionType.confirm,
            title: "删除SCHEMA",
            icon: "delete",
            refreshList: true,
            confirm: {
                confirmTitle: "",
                confirmContent: "确定要删除SCHEMA吗!"
            },
            interfaces: [{
                key: "actionDelete",
                method: MethodType.DELETE,
                idFieldPath: "/id",
                address: "",
                port: null,
                path: "actions",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Search {
    static key: string = "actionSearchAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Search.key,
            type: ActionType.form,
            title: "搜索操作",
            icon: "search",
            form: {
                dataSchema: "actionActionData",
                formSchema: "actionSearchActionForm"
            }
        };

        return actionModel;
    }
}

const services: Array<any> = [List, Add, Edit, Delete, Copy, Search];

_.each(services, (ser) => {
    module.service(ser.key, ser);
});


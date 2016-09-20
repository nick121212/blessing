/**
 * Created by NICK on 16/8/23.
 */

import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

const dataSchema = {
    type: "object",
    required: ["key", "host", "interval"],
    properties: {
        key: {
            type: "string",
            title: "KEY"
        },
        host: {
            type: "string",
            title: "主HOST"
        },
        domainWhiteList: {
            type: "array",
            title: "域名白名单",
            default: [],
            minItems: 2,
            items: {
                type: "string",
                format: "url-ip",
                title: "域名或者IP"
            }
        },
        whitePathList: {
            type: "array",
            title: "路径白名单",
            default: [],
            minItems: 2,
            items: {
                type: "object",
                title: "路径配置",
                required: ["regexp", "scope"],
                properties: {
                    regexp: {
                        type: "string",
                        title: "正则规则"
                    },
                    scope: {
                        type: "string",
                        title: "修饰符"
                    }
                }
            }
        },
        interval: {
            type: "number",
            default: 1000,
            minimum: 1000,
            title: "下载间隔，单位ms"
        },
        downloader: {
            type: "string",
            default: "superagent",
            title: "下载策略"
        },
        initDomain: {
            type: "string",
            title: "初始化域名"
        },
        proxySettings: {
            type: "object",
            title: "基础设置",
            properties: {
                useProxy: {
                    type: "boolean",
                    title: "是否启用代理"
                },
                timeout: {
                    type: "number",
                    title: "超时时间"
                },
                charset: {
                    type: "string",
                    title: "字符编码"
                },
                ipInfo: {
                    type: "object",
                    title: "代理ip设置",
                    properties: {
                        host: {
                            type: "string",
                            format: 'url-ip',
                            title: "代理ip或域名"
                        },
                        port: {
                            type: "number",
                            title: "代理端口"
                        }
                    }
                }
            }
        },
        pages: {
            type: "object",
            title: "分析页面配置"
        },
        description: {
            type: "string",
            title: "描述",
            maxLength: 500
        }
    }
};

/**
 * 模块查询
 */
class List {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingListAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: List.key,
            type: ActionType.list,
            title: "爬虫配置文件管理",
            icon: "content-save-settings",
            list: {
                columns: [
                    actionUtils.columnBuilder("<span>{{::item.key}}</span>", "KEY").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.host }}</span>", "域名").toValue(),
                    actionUtils.columnBuilder("<span>{{ ::item.interval }}</span>", "间隔时间").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.downloader }}</span>`, "下载策略").toValue(),
                    actionUtils.columnBuilder(`<span>{{ ::item.description }}</span>`, "详情").toValue()
                ],
                searchActionKey: Search.key,
                showRefreshBtn: true,
                showSearchBtn: true,
                showSearchPanel: false,
                toolbars: [],
                itemToolbars: []
            },
            itemActions: [{key: Edit.key}, {key: Delete.key}, {key: Copy.key}],
            actions: [Add.key],
            interfaces: [{
                key: "crawlerSettingList",
                method: MethodType.GET,
                address: "",
                port: null,
                path: "crawler_settings",
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

class AddFirst {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingAddFirstAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: AddFirst.key,
            type: ActionType.form,
            title: "新建爬虫配置文件-基础设置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "key",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "host",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "initDomain",
                    type: "text",
                    htmlClass: "md-block"
                }, {
                    key: "interval",
                    type: "number",
                    htmlClass: "md-block"
                }, {
                    key: "downloader",
                    type: "select",
                    titleMap: [{
                        "name": "SUPERAGENT",
                        "value": "superagent"
                    }, {
                        "name": "PHANTOM",
                        "value": "phantom"
                    }],
                    htmlClass: "md-block"
                }, {
                    key: "description",
                    type: "textarea",
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

class AddSecond {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingAddSecondAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: AddSecond.key,
            type: ActionType.form,
            title: "新建爬虫配置文件-白名单设置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "domainWhiteList",
                    type: "chips",
                    startEmpty: true,
                    description: "域名白名单，配置可以爬取的域名列表",
                    showHints: true,
                    htmlClass: "md-block"
                }, {
                    key: "whitePathList",
                    type: "array",
                    startEmpty: true,
                    description: "路径白名单，配置可以爬取的路径列表",
                    showHints: true,
                    htmlClass: "md-block",
                    grid: {layout: 'column'},
                    items: [{
                        type: "section",
                        grid: {layout: "row", flex: ""},
                        items: [{
                            key: "whitePathList[].regexp",
                            grid: {flex: ""},
                            type: "text"
                        }, {
                            key: "whitePathList[].scope",
                            type: "text"
                        }]
                    }]
                }]
            }
        };

        return actionModel;
    }
}

class AddThird {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingAddThirdAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: AddThird.key,
            type: ActionType.form,
            title: "新建爬虫配置文件-其他设置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "proxySettings",
                    type: "card",
                    items: [{
                        key: "proxySettings.useProxy",
                        type: "checkbox"
                    }, {
                        key: "proxySettings.timeout",
                        type: "number",
                        htmlClass: "md-block"
                    }, {
                        key: "proxySettings.charset",
                        type: "text",
                        htmlClass: "md-block"
                    }, {
                        key: "proxySettings.ipInfo",
                        type: "card",
                        items: [{
                            key: "proxySettings.ipInfo.host",
                            type: "text",
                            htmlClass: "md-block"
                        }, {
                            key: "proxySettings.ipInfo.port",
                            type: "number",
                            htmlClass: "md-block"
                        }]
                    }],
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

class AddForth {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingAddForthAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: AddForth.key,
            type: ActionType.form,
            title: "新建爬虫配置文件-页面配置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "pages",
                    type: "jeditor",
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

class Add {
    static key: string = "crawlerSettingAddAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Add.key,
            type: ActionType.wizard,
            title: "新建爬虫配置文件",
            icon: "add",
            refreshList: true,
            wizard: {
                defaultSchema: {
                    dataSchema: dataSchema
                },
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key]
            },
            interfaces: [{
                key: "crawlerSettingAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "crawler_settings",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Copy {
    static key: string = "crawlerSettingCopyAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Copy.key,
            type: ActionType.wizard,
            title: "复制爬虫配置文件",
            icon: "content_copy",
            refreshList: true,
            wizard: {
                defaultSchema: {
                    dataSchema: dataSchema
                },
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key]
            },
            interfaces: [{
                key: "crawlerSettingAdd",
                method: MethodType.POST,
                address: "",
                port: null,
                path: "crawler_settings",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Edit {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingEditAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: Edit.key,
            type: ActionType.wizard,
            title: "修改爬虫配置文件",
            icon: "edit",
            refreshList: true,
            wizard: {
                defaultSchema: {
                    dataSchema: dataSchema
                },
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key]
            },
            interfaces: [{
                key: "crawlerSettingEdit",
                method: MethodType.PUT,
                idFieldPath: "/key",
                address: "",
                port: null,
                path: "crawler_settings",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Delete {
    static key: string = "crawlerSettingDeleteAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Delete.key,
            type: ActionType.confirm,
            title: "删除爬虫配置文件",
            icon: "delete",
            refreshList: true,
            confirm: {
                confirmTitle: "",
                confirmContent: "确定要删除爬虫配置文件吗!"
            },
            interfaces: [{
                key: "crawlerSettingDelete",
                method: MethodType.DELETE,
                idFieldPath: "/key",
                address: "",
                port: null,
                path: "crawler_settings",
                isRestful: true
            }]
        };

        return actionModel;
    }
}

class Search {
    static key: string = "crawlerSettingSearchAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Search.key,
            type: ActionType.form,
            title: "搜索爬虫配置文件",
            icon: "search",
            form: {
                dataSchema: dataSchema,
                formSchema: [{
                    key: "key",
                    type: "text",
                    required: false,
                    copyValueTo: ["/key/$eq"],
                    htmlClass: "md-block"
                }]
            }
        };

        return actionModel;
    }
}

class Ack {
    static key: string = "crawlerSettingAckAction";

    constructor() {
        let actionModel: IActionModel = {
            key: Ack.key,
            type: ActionType.form,
            title: "爬虫命令",
            icon: "apple-keyboard-command",
            form: {
                dataSchema: {
                    type: "object",
                    required: ["key", "action"],
                    properties: {
                        key: {
                            type: "string",
                            title: "配置文件KEY"
                        },
                        action: {
                            type: "string",
                            title: "执行的命令"
                        },
                        options: {
                            type: "object",
                            title: "可选项",
                            properties: {
                                type: {
                                    type: "string",
                                    default: "forever",
                                    title: "爬虫启动模式"
                                },
                                startCrawler: {
                                    type: "boolean",
                                    default: true,
                                    title: "开启爬取链接模块"
                                },
                                startDeal: {
                                    type: "boolean",
                                    default: false,
                                    title: "开启html处理模块"
                                },
                                startDownload: {
                                    type: "boolean",
                                    default: false,
                                    title: "开启图片下载模块"
                                },
                                startChip: {
                                    type: "boolean",
                                    default: false,
                                    title: "开启更换ip模块"
                                }
                            }
                        }
                    }
                },
                formSchema: [{
                    key: "action",
                    type: "select",
                    titleMap: [
                        {"value": "crawler:start", "name": "开始爬虫", "group": ""},
                        {"value": "crawler:stop", "name": "停止爬虫", "group": ""},
                        {"value": "crawler:create", "name": "开启一个新爬虫", "group": ""},
                        {"value": "crawler:reset", "name": "重置一个数据库", "group": ""},
                        {"value": "crawler:chip", "name": "更改代理ip", "group": ""}
                    ],
                    htmlClass: "md-block"
                }, {
                    key: "key",
                    type: "autocomplete-1",
                    condition: "model.action==='crawler:start'",
                    acOptions: {
                        textField: "key",
                        // keyField: "key",
                        dataField: "rows",
                        noCache: false,
                        search: "/where/key/$like",
                        actionKey: List.key
                    },
                    htmlClass: "md-block"
                }, {
                    key: "options",
                    type: "card",
                    grid: {"flex": ""},
                    condition: "!!model.action",
                    items: [{
                        key: "options.type",
                        type: "select",
                        htmlClass: "md-block",
                        titleMap: [
                            {"value": "forever", "name": "FOREVER启动"},
                            {"value": "", "name": "NODE启动"}
                        ]
                    }, {
                        key: "options.startCrawler",
                        condition: "model.action==='crawler:start'",
                        htmlClass: "md-block",
                        type: "checkbox"
                    }, {
                        key: "options.startDeal",
                        condition: "model.action==='crawler:start'",
                        htmlClass: "md-block",
                        type: "checkbox"
                    }, {
                        key: "options.startDownload",
                        condition: "model.action==='crawler:start'",
                        htmlClass: "md-block",
                        type: "checkbox"
                    }, {
                        key: "options.startChip",
                        condition: "model.action==='crawler:start'",
                        htmlClass: "md-block",
                        type: "checkbox"
                    }]
                }]
            }
        };

        return actionModel;
    }
}

export default (module: ng.IModule) => {
    const services: Array<any> = [List, Search, Add, Edit, Delete, Copy, Ack, AddFirst, AddSecond, AddThird, AddForth];

    _.each(services, (ser)=> {
        module.service(ser.key, ser);
    });
}

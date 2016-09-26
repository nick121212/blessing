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
            // minItems: 2,
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
            // minItems: 2,
            items: {
                type: "object",
                title: "路径配置",
                required: ["regexp", "scope"],
                properties: {
                    enable: {
                        type: "boolean",
                        title: "是否启用"
                    },
                    regexp: {
                        type: "string",
                        title: "正则规则"
                    },
                    scope: {
                        type: "string",
                        title: "修饰符"
                    },
                    description: {
                        type: "string",
                        title: "介绍"
                    },
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
                ua: {
                    type: "string",
                    title: "USERAGENT"
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
            type: "array",
            title: "分析页面配置",
            items: {
                type: "object",
                required: ["key", "fieldKey"],
                title: "分析页面配置",
                properties: {
                    key: {
                        type: "string",
                        title: "页面的KEY"
                    },
                    areas: {
                        type: "array",
                        title: "页面区域",
                        items: {
                            type: "object",
                            required: ["selector", "dealStrategy", "key"],
                            properties: {
                                key: {
                                    type: "string",
                                    title: "区域KEY"
                                },
                                selector: {
                                    type: "string",
                                    title: "选择器"
                                },
                                dealStrategy: {
                                    type: "string",
                                    default: "jsdom",
                                    title: "分析策略"
                                }
                            }
                        }
                    },
                    rule: {
                        type: "array",
                        title: "匹配规则",
                        default: [],
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
                    fieldKey: {
                        type: "string",
                        title: "主键字段"
                    },
                    strict: {
                        type: "boolean",
                        title: "是否启用严格模式"
                    },
                    strictFields: {
                        type: "array",
                        title: "严格模式下，验证字段",
                        default: [],
                        items: {
                            type: "string",
                            title: "验证字段"
                        }
                    },
                    fields: {
                        type: "object",
                        title: "分析字段配置"
                    }
                }
            }
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
            title: "基础设置",
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
            title: "白名单设置",
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
                    fieldHtmlClass: "layout-row flex",
                    startEmpty: true,
                    description: "路径白名单，配置可以爬取的路径列表",
                    showHints: true,
                    items: [{
                        type: "section",
                        htmlClass: "layout-row flex",
                        items: [{
                            key: "whitePathList[].enable",
                            type: "select",
                            titleMap: [{
                                name: "启用",
                                value: true
                            }, {
                                name: "不启用",
                                value: false
                            }]
                        }, {
                            key: "whitePathList[].regexp",
                            htmlClass: "md-block flex",
                            type: "text"
                        }, {
                            key: "whitePathList[].scope",
                            type: "text"
                        }, {
                            key: "whitePathList[].description",
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
            title: "其他设置",
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
                        key: "proxySettings.ua",
                        type: "textarea",
                        maxLength: 300,
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
            key: AddFifth.key,
            type: ActionType.form,
            title: "页面配置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "pages",
                    type: "tabarray",
                    startEmpty: true,
                    fieldHtmlClass: "layout-column flex",
                    items: [{
                        type: "section",
                        grid: {flex: ""},
                        items: [{
                            key: "pages[].key",
                            type: "text",
                            htmlClass: "md-block"
                        }, {
                            key: "pages[].fieldKey",
                            type: "text",
                            htmlClass: "md-block"
                        }, {
                            key: "pages[].strict",
                            type: "switch",
                            htmlClass: "md-block"
                        }, {
                            key: "pages[].strictFields",
                            startEmpty: true,
                            type: "chips",
                            htmlClass: "md-block"
                        }, {
                            key: "pages[].rule",
                            type: "array",
                            startEmpty: true,
                            items: [{
                                type: "section",
                                htmlClass: "layout-row flex",
                                items: [{
                                    key: "pages[].rule[].regexp",
                                    htmlClass: "md-block flex",
                                    type: "text"
                                }, {
                                    key: "pages[].rule[].scope",
                                    type: "text"
                                }]
                            }]
                        }]
                    }]
                }]
            }
        };

        return actionModel;
    }
}

class AddFifth {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "crawlerSettingAddFifthAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: AddFifth.key,
            type: ActionType.form,
            title: "页面配置",
            icon: "add",
            form: {
                formSchema: [{
                    key: "pages",
                    type: "tabarray",
                    items: [{
                        type: "section",
                        htmlClass: "column-row flex",
                        items: [{
                            key: "pages[].key",
                            type: "text",
                            htmlClass: "md-block"
                        }, {
                            key: "pages[].areas",
                            type: "array",
                            startEmpty: true,
                            description: "区域配置，用户优化分析性能，减少dom的查询。",
                            showHints: true,
                            items: [{
                                type: "section",
                                grid: {flex: "", layout: "row"},
                                items: [{
                                    key: "pages[].areas[].key",
                                    type: "text"
                                }, {
                                    key: "pages[].areas[].selector",
                                    htmlClass: "md-block flex",
                                    type: "text"
                                }, {
                                    key: "pages[].areas[].dealStrategy",
                                    type: "text"
                                }]
                            }]
                        }, {
                            key: "pages[].fields",
                            type: "jeditor",
                            htmlClass: "md-block"
                        }]
                    }]
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
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
            },
            closeDialog: true,
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
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
            },
            closeDialog: true,
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
                actions: [AddFirst.key, AddSecond.key, AddThird.key, AddForth.key, AddFifth.key]
            },
            closeDialog: true,
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
                                url: {
                                    type: "string",
                                    title: "测试的地址"
                                },
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
                                    default: true,
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
                        {"value": "crawler:test", "name": "测试地址", "group": ""}
                    ],
                    htmlClass: "md-block"
                }, {
                    key: "key",
                    type: "autocomplete-1",
                    condition: "model.action==='crawler:start' || model.action==='crawler:reset'  || model.action==='crawler:test'",
                    acOptions: {
                        textField: "key",
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
                        key: "options.url",
                        htmlClass: "md-block",
                        type: "text"
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
    const services: Array<any> = [List, Search, Add, Edit, Delete, Copy, Ack, AddFirst, AddSecond, AddThird, AddForth, AddFifth];

    _.each(services, (ser)=> {
        module.service(ser.key, ser);
    });
}

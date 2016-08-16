/**
 * Created by NICK on 16/8/10.
 */

export class SidenavLeftController {
    public static $inject = ["$rootScope", "materialUtils", "mdSideMenuSections"];

    modules: Array<Object>;
    toolbarTop: Object;
    toolbarBottom: Object;
    filterExpression: string = "nick";

    constructor(private $rootScope, private materialUtils, private mdSideMenuSections) {
        mdSideMenuSections.sections = this.modules = [
            {
                "menuId": 2,
                "menuTitle": "系统设置",
                "icon": "settings",
                "menuLink": null,
                "lft": 2,
                "rgt": 15,
                "menuParentId": 1,
                "menuType": 0,
                "showed": 1,
                "menuKey": "settings",
                "columns": null,
                "depth": 1,
                "nodes": [
                    {
                        "menuId": 3,
                        "menuTitle": "模块管理",
                        "icon": "view_module",
                        "menuLink": "#/pages/module",
                        "lft": 3,
                        "rgt": 4,
                        "createAt": 2147483647,
                        "updateAt": 2147483647,
                        "menuParentId": 2,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "module",
                        "depth": 2
                    },
                    {
                        "menuId": 13,
                        "menuTitle": "接口设置",
                        "icon": "extension",
                        "menuLink": "#/pages/interface",
                        "lft": 11,
                        "rgt": 12,
                        "menuParentId": 2,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "interface",
                        "depth": 2
                    },
                    {
                        "menuId": 14,
                        "menuTitle": "SCHEMA设置",
                        "icon": "wallet_giftcard",
                        "menuLink": "#/pages/schema",
                        "lft": 13,
                        "rgt": 14,
                        "createAt": 2147483647,
                        "updateAt": 2147483647,
                        "menuParentId": 2,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "schema",
                        "depth": 2
                    }
                ]
            },
            {
                "menuId": 5,
                "menuTitle": "权限设置",
                "icon": "apps",
                "menuLink": null,
                "lft": 16,
                "rgt": 21,
                "createAt": 2147483647,
                "updateAt": 2147483647,
                "menuParentId": 1,
                "menuType": 0,
                "showed": 1,
                "menuKey": "permiss",
                "columns": null,
                "depth": 1,
                "nodes": [
                    {
                        "menuId": 6,
                        "menuTitle": "权限组管理",
                        "icon": "group",
                        "menuLink": "#/pages/group",
                        "lft": 17,
                        "rgt": 18,
                        "menuParentId": 5,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "group",
                        "depth": 2
                    },
                    {
                        "menuId": 7,
                        "menuTitle": "角色管理",
                        "icon": "people_outline",
                        "menuLink": "#/pages/actor",
                        "lft": 19,
                        "rgt": 20,
                        "menuParentId": 5,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "actor",
                        "depth": 2
                    }
                ]
            },
            {
                "menuId": 9,
                "menuTitle": "用户设置",
                "icon": "person",
                "menuLink": "",
                "lft": 22,
                "rgt": 27,
                "createAt": 2147483647,
                "updateAt": 2147483647,
                "menuParentId": 1,
                "menuType": 0,
                "showed": 1,
                "menuKey": "person_set",
                "columns": null,
                "depth": 1,
                "nodes": [
                    {
                        "menuId": 10,
                        "menuTitle": "用户管理",
                        "icon": "person_outline",
                        "menuLink": "#/pages/person",
                        "lft": 23,
                        "rgt": 24,
                        "createAt": 2147483647,
                        "updateAt": 2147483647,
                        "menuParentId": 9,
                        "menuType": 0,
                        "showed": 1,
                        "menuKey": "person",
                        "depth": 2
                    }
                ]
            }
        ];
        mdSideMenuSections.options = {
            children: "nodes",
            key: 'menuId',
            showSearchBar: true,
            dirSelectable: false,
            orderBy: 'menuId',
            filterField: 'menuTitle',
            filterComparator: (node)=> {
                // console.log(...arguments);

                return node;
            }
        };
        this.toolbarTop = {
            type: 'search',
            class: "md-icon-float md-block no-tb-margin no-errors no-borders",
            title: "搜索",
            context: this,
            ngModelField: "filterExpression"
        };
        this.toolbarBottom = {
            type: 'layout',
            layout: 'row',
            flex: "flex",
            attributes: {
                "layout-align": "space-around center"
            },
            tools: [{
                type: 'btn',
                title: '刷新',
                noTitle: true,
                tooltip: {
                    position: "top"
                },
                click: ($event, ctl)=> {
                    // console.log(this.nodes);
                },
                class: 'md-icon-button',
                icon: 'refresh'
            }, {
                type: 'btn',
                title: '全部折叠',
                noTitle: true,
                tooltip: {
                    position: "top"
                },
                click: ($event, ctl)=> {
                    // console.log(this.nodes);
                },
                class: 'md-icon-button',
                icon: 'dehaze'
            }]
        };
    }
}


/**
 * Created by NICK on 16/8/9.
 */

import {PageController} from './ctls/page.controller';
import {WizardController} from './ctls/page.wizard.controller';
import {D3Controller} from './ctls/page.d3.controller';

export const initRouter = ($urlRouterProvider, $stateProvider) => {
    // 路由规则
    $stateProvider.state("home.page", {
        url: "page/:key",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "content": {
                controller: PageController,
                controllerAs: "pageCtl",
                template: require("./tpls/page.template.jade")()
            }
        }
    }).state("home.wizard", {
        url: "wizard",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "content": {
                controller: WizardController,
                controllerAs: "pageCtl",
                template: require("./tpls/page.wizard.template.jade")()
            }
        }
    }).state('home.d3', {
        url: "d3",
        views: {
            "content": {
                controller: D3Controller,
                controllerAs: "pageCtl",
                template: "<svg flex id='homed3'></svg>"
            }
        }
    });
};
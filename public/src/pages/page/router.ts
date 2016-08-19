/**
 * Created by NICK on 16/8/9.
 */

import {PageController} from './ctls/page.controller';

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
    });
};
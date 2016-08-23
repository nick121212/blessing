/**
 * Created by NICK on 16/8/9.
 */

import {LoginController} from './ctls/login.controller';
import {RegisterController} from './ctls/register.controller';

export const initRouter = ($urlRouterProvider, $stateProvider) => {
    // 路由规则
    $stateProvider.state("passport", {
        url: "/passport",
        abstract: true,
        // resolve: {
        //     svg: ["svgUtils", (svgUtils: fx.utils.svgStatic)=> {
        //         return svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg');
        //     }]
        // },
        views: {
            "": {
                template: require("./tpls/index.template.jade")()
            }
        }
    }).state("passport.login", {
        url: "/login",
        views: {
            "passportContent": {
                controller: LoginController,
                controllerAs: "loginCtl",
                template: require("./tpls/login.template.jade")()
            }
        }
    }).state("passport.register", {
        url: "/register",
        views: {
            "passportContent": {
                controller: RegisterController,
                controllerAs: "registerCtl",
                template: require("./tpls/register.template.jade")()
            }
        }
    });
};
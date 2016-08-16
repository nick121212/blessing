/**
 * Created by NICK on 16/8/9.
 */

import {HomeController} from './ctls/home.controller';
import {SidenavLeftController} from './ctls/sidenavl.controller';
import {SidenavRightController} from './ctls/sidenavr.controller';
import {ContentController} from './ctls/content.controller';

export const initRouter = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("home", {
        url: "/",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "": {
                controller: HomeController,
                controllerAs: "homeCtl",
                template: require("./tpls/home.template.jade")(),
            },
            "sidenavLeft@home":{
                controller: SidenavLeftController,
                controllerAs: "sideLeftCtl",
                template: require("./tpls/sidenavl.template.jade")(),
            },
            "sidenavRight@home":{
                controller: SidenavRightController,
                controllerAs: "sideRightCtl",
                template: require("./tpls/sidenavr.template.jade")(),
            },
            "content@home":{
                controller: ContentController,
                controllerAs: "contentCtl",
                template: require("./tpls/content.template.jade")(),
            }
        }
    });
};
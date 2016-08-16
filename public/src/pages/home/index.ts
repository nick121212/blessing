/**
 * Created by NICK on 16/8/9.
 */
import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import {initRouter} from './router';
import {materialServiceInit} from '../../services/material.service';
import * as ngMaterialIcons from 'angular-material-icons';
import * as ngTree from 'angular-ui-tree';

import toolbar from '../../directives/toolbar';
import sidemenu from '../../directives/sidemenu';
import 'expose?SVGMorpheus!exports?SVGMorpheus!svg-morpheus';

const module = angular.module("homeApp", [toolbar, sidemenu, ngMaterial as string, uiRouter as string, ngMaterialIcons, ngTree as string]);

materialServiceInit(module);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$mdThemingProvider",
    "$locationProvider",
    "mdSideMenuSectionsProvider",
    ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
        // sideMenu初始化
        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);

    }]);

export default module.name;
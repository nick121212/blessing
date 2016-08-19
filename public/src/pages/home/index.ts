/**
 * Created by NICK on 16/8/9.
 * 首页,用于生成页面框架
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';

import {initRouter} from './router';
import materialService from '../../services/material.service';
import svgUtilsMod from '../../services/svg.service';

import toolbar from '../../directives/toolbar';
import sidemenu from '../../directives/sidemenu';
import 'expose?SVGMorpheus!exports?SVGMorpheus!svg-morpheus';

const module = angular.module("homeModule", [toolbar, sidemenu, svgUtilsMod, materialService, ngMaterial, uiRouter as string, ngMaterialIcons]);

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
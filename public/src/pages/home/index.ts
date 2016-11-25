/**
 * Created by NICK on 16/8/9.
 * 首页,用于生成页面框架
 */

import * as ngMaterial from 'angular-material';
import 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';
import * as _ from 'lodash';
import { initRouter } from './router';
import materialService from '../../services/material.service';
import svgUtilsMod from '../../services/svg.service';
import toolbar from '../../directives/toolbar';
import sidemenu from '../../directives/sidemenu';
import 'expose?SVGMorpheus!exports?SVGMorpheus!svg-morpheus';
import { ActionType } from '../../directives/action/models/action.model';

const module = angular.module("homeModule", [toolbar, sidemenu, svgUtilsMod, materialService, ngMaterial, 'ui.router', ngMaterialIcons]);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    "$httpProvider",
    "$mdThemingProvider",
    "$locationProvider",
    "mdSideMenuSectionsProvider",
    ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $locationProvider, mdSideMenuSectionsProvider, cfpLoadingBarProvider: angular.loadingBar.ILoadingBarProvider) => {
        // 定义默认样式
        // $mdThemingProvider.definePalette('amazingPaletteName', {
        //     '50': 'E8EAF6',
        //     '100': 'C5CAE9',
        //     '200': 'B39DDB',
        //     '300': 'B39DDB',
        //     '400': 'BDBDBD',
        //     '500': '9B26AF',
        //     '600': '757575',
        //     '700': '7A1EA1',
        //     '800': '691A99',
        //     '900': '263238',
        //     'A100': 'FFE57F',
        //     'A200': '68EFAD',
        //     'A400': 'FF3D00',
        //     'A700': 'DD2C00',
        //     'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        //     // on this palette should be dark or light
        //     'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        //         '200', '300', '400', 'A100'],
        //     'contrastLightColors': ['50', '100', //hues which contrast should be 'dark' by default
        //         '200', '300', '400', 'A100']    // could also specify this if default was 'dark'
        // });
        $mdThemingProvider.theme('default')
            .dark()
            .primaryPalette('grey')
            .accentPalette('blue')
            .warnPalette('red');
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
        // sideMenu初始化
        mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
    }])
    .run(["$rootScope", "$state", "$q", "svgUtils", "fxAction", "fxSideMenuFactory", ($rootScope: ng.IRootScopeService, $state, $q: ng.IQService, svgUtils: fx.utils.svgStatic, fxAction) => {
        let state: { $$isFinish?: boolean, toState?: ng.ui.IState, toParams?: Object, options?: Object } = {};
        // 处理路回调
        let handleResolve = (isComplete) => {
            state.$$isFinish = true;
            $state.go(state.toState.name, state.toParams, state.options);
        };
        // 注册路由更改事件
        $rootScope.$on("$stateChangeStart", (evt, toState, toParams, fromState, fromParams) => {
            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
        });
        // 处理首次加载的时候,加载2个svg文件
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (!state.$$isFinish) {
                _.extend(state, {
                    toState: toState,
                    toParams: toParams,
                    fromState: fromState,
                    fromParams: fromParams,
                    options: options
                });
                event.preventDefault();
                $q.all({
                    mdi: svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg'),
                    weibo: svgUtils.loadSvgUrl(__dirname + 'svgs/weibo.svg')
                }).then(() => { handleResolve(true) }, () => { handleResolve(false) });
            }
        });
        // 获取服务器一些配置信息
        fxAction.doAction("configAction", {}).then((result) => {
            $rootScope["config"] = result.configAction;
        });
    }]);

// 添加一个操作,显示ICON的KEY值表单
module.value("iconInfoDetailForm", {
    key: "iconInfoDetailForm",
    icon: "search",
    type: ActionType.form,
    title: "ICON详情",
    form: {
        dataSchema: {
            type: "object",
            properties: {
                key: {
                    type: "string",
                    title: "KEY"
                }
            }
        },
        formSchema: [{
            key: "key",
            type: "string",
            placeHolder: "KEY",
            htmlClass: "md-block"
        }]
    }
});

export default `${module.name}`;
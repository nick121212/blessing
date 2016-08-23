/**
 * Created by NICK on 16/8/9.
 * 首页,用于生成页面框架
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';
import * as _ from 'lodash';
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
        // 装饰模式,修正data数据
        // $stateProvider.decorator('data', function (state, parent) {
        //     let result, data = parent(state);
        //
        //     result = _.extend({
        //         svg: ["svgUtils", (svgUtils: fx.utils.svgStatic)=> {
        //             return svgUtils.loadSvgUrl(__dirname + 'svgs/mdi.svg');
        //         }]
        //     }, data);
        //
        //     return result;
        // });
    }])
    .run(["$rootScope", "$state", "$q", "svgUtils", ($rootScope: ng.IRootScopeService, $state, $q: ng.IQService, svgUtils: fx.utils.svgStatic)=> {
        let state: {$$isFinish?: boolean,toState?: uiRouter.IState,toParams?: Object,options?: Object} = {};

        // 处理路回调
        function handleResolve() {
            state.$$isFinish = true;
            $state.go(state.toState.name, state.toParams, state.options);
        }

        // 注册路由更改事件
        $rootScope.$on("$stateChangeStart", (evt, toState, toParams, fromState, fromParams)=> {
            console.log("$stateChangeStart", evt, toState, toParams, fromState, fromParams);
        });
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
                }).then(handleResolve, handleResolve);
            }
        });
    }]);

export default module.name;
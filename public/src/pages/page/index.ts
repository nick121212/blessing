/**
 * Created by NICK on 16/8/16.
 * page页面,用户生成列表页和表单操作
 */

import * as ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';
import * as mdDataTable from 'angular-material-data-table';
import * as Pointer from 'json-pointer';

import { initRouter } from './router';
import materialServiceMod from '../../services/material.service';
import restRegMod from '../../services/rest.service';
import actionDir from '../../directives/action';
import dyCompileMod from '../../directives/dycompile';
import queryTable from '../../directives/query.table';

import compareDir from '../../directives/compare';

import executeCmdFunc from './services/execute.cmd';

import 'angular-gridster';

import 'angular-gridster.css';
import './index.scss';

const module = angular.module("pageModule", [compareDir, ngMaterialIcons, dyCompileMod, actionDir, mdDataTable, ngMaterial as string, 'ui.router', 'gridster', materialServiceMod, restRegMod, queryTable]);

executeCmdFunc(module);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    ($stateProvider, $urlRouterProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
    }])
    .run(["$rootScope", "$state", "restUtils", "materialUtils", "fxAction", ($rootScope, $state, restUtils: fx.utils.restStatic, materialUtils: fx.utils.materialStatic, fxAction) => {
        // 添加全局错误拦截器
        restUtils.setConfig((restAngularConfigure: restangular.IProvider) => {
            restAngularConfigure.setErrorInterceptor((response: restangular.IResponse) => {
                if (response.status !== 401) {
                    response.data && materialUtils.showErrMsg(response.data.msg);
                }
            });
        });
    }]);


export default `${module.name}`;
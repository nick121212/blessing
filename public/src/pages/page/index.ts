/**
 * Created by NICK on 16/8/16.
 * page页面,用户生成列表页和表单操作
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';
import * as mdDataTable from 'angular-material-data-table';

import {initRouter} from './router';
import materialServiceMod from '../../services/material.service';
import restRegMod from '../../services/rest.service';
import actionDir from '../../directives/action';
import dyCompileMod from '../../directives/dycompile';

import 'angular-animate';
import 'angular-aria';

import 'tv4';
import 'objectPath';
import 'angular-schema-form';
import 'angular-schema-form-ng-material';

const module = angular.module("pageModule", [ngMaterialIcons, dyCompileMod, actionDir, "schemaForm", mdDataTable, ngMaterial as string, uiRouter as string, materialServiceMod, restRegMod]);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    ($stateProvider, $urlRouterProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
    }])
    .run(["$state", "restUtils", "materialUtils", ($state, restUtils: fx.utils.restStatic, materialUtils: fx.utils.materialStatic)=> {
        // 添加全局错误拦截器
        restUtils.setConfig((restAngularConfigure: restangular.IProvider)=> {
            restAngularConfigure.setErrorInterceptor((response: restangular.IResponse)=> {
                if (response.status !== 401) {
                    materialUtils.showErrMsg(response.data.msg);
                }
            });
        });
    }]);

export default module.name;
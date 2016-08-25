/**
 * Created by NICK on 16/8/16.
 * page页面,用户生成列表页和表单操作
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import {initRouter} from './router';
import materialServiceMod from '../../services/material.service';
import restRegMod from '../../services/rest.service';
import actionDir from '../../directives/action';

import "restangular";

const module = angular.module("loginModule", [ngMaterial as string, uiRouter as string, materialServiceMod, restRegMod, actionDir, 'restangular']);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    ($stateProvider, $urlRouterProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
    }])
    .run(["$state", "restUtils", ($state, restUtils: fx.utils.restStatic)=> {
        // 添加全局错误拦截器
        restUtils.setConfig((restAngularConfigure: restangular.IProvider)=> {
            restAngularConfigure.setErrorInterceptor((response: restangular.IResponse)=> {
                if (response.status == 401) {
                    console.error(response.data);
                    !$state.is("passport.login") && $state.go("passport.login");
                    return false;
                }
                return true;
            });
        });
    }]);

export default module.name;
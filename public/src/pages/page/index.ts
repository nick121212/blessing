/**
 * Created by NICK on 16/8/16.
 * page页面,用户生成列表页和表单操作
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import {initRouter} from './router';
import materialServiceMod from '../../services/material.service';
import restRegMod from '../../services/rest.service';

const module = angular.module("pageModule", [ngMaterial as string, uiRouter as string, materialServiceMod, restRegMod]);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    ($stateProvider, $urlRouterProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
    }]);

export default module.name;
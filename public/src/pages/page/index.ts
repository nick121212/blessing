/**
 * Created by NICK on 16/8/16.
 * page页面,用户生成列表页和表单操作
 */

import * as ngMaterial from 'angular-material';
import * as uiRouter from 'angular-ui-router';
import * as ngMaterialIcons from 'angular-material-icons';
import {initRouter} from './router';
import materialServiceMod from '../../services/material.service';
import restRegMod from '../../services/rest.service';
import actionDir from '../../directives/action';
import 'angular-animate';
import 'angular-aria';

import 'tv4';
import 'objectPath';
import 'angular-schema-form';
import 'angular-schema-form-ng-material';

import * as mdDataTable from 'angular-material-data-table';

// import 'md-data-table.css';
// import 'md-data-table-template';
// import 'md-data-table';

const module = angular.module("pageModule", [ngMaterialIcons, actionDir, "schemaForm", mdDataTable, ngMaterial as string, uiRouter as string, materialServiceMod, restRegMod]);

module.config([
    "$stateProvider",
    "$urlRouterProvider",
    ($stateProvider, $urlRouterProvider) => {
        // 初始化路由
        initRouter($urlRouterProvider, $stateProvider);
    }]);

export default module.name;
/**
 * Created by NICK on 16/8/10.
 * 链接所有的页面
 */

import * as angular from 'angular';
import * as ngLoadingBar from 'angular-loading-bar';
import * as ngAnimate from 'angular-animate';
import loadingDir from '../../directives/loading';

import pageModule from '../page';
import homeModule from '../home';
import passportModule from '../passport';
import ttyModule from '../tty';

import './index.scss';

const module = angular.module("indexApp", [ngAnimate, ngLoadingBar, passportModule, homeModule, pageModule, loadingDir, ttyModule]);

module.config(["cfpLoadingBarProvider", (cfpLoadingBarProvider)=> {
    // ng-loading-bar设置
    // cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    // cfpLoadingBarProvider.includeSpinner = true;
    // cfpLoadingBarProvider.latencyThreshold = 1000;
}]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name]);
});

/**
 * Created by NICK on 16/8/10.
 * 链接所有的页面
 */

import * as angular from 'angular';
import 'angular-loading-bar';
import * as ngAnimate from 'angular-animate';
import loadingDir from '../../directives/loading';

import pageModule from '../page';
import homeModule from '../home';
import passportModule from '../passport';
import saltModule from '../salt';

import './index.scss';

const module = angular.module("indexApp", [ngAnimate, "angular-loading-bar", passportModule, homeModule, pageModule, loadingDir, saltModule]);

module.config(["cfpLoadingBarProvider", "$mdThemingProvider", "$mdAriaProvider", (cfpLoadingBarProvider, $mdThemingProvider, $mdAriaProvider)=> {
    // ng-loading-bar设置
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 1000;
    // 监听样式的更改
    $mdThemingProvider.alwaysWatchTheme(true);
    // 取消aria-label警告
    $mdAriaProvider.disableWarnings();
    // 定义样式
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
}]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name]);
});

// +(function () {
//     var _log = console.log;
//
//     console.log = function () {
//         _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color:transparent;text-shadow:0 0 2px rgba(0,0,0,.5);');
//     };
// })();
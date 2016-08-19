/**
 * Created by NICK on 16/8/9.
 * 链接所有的页面
 */

import * as angular from 'angular';
import loadingDir from '../../directives/loading';

import homeModule from '../home';
import pageModule from '../page';
import passportModule from '../passport';

import './index.scss';

const module = angular.module("indexApp", [passportModule, homeModule, pageModule, loadingDir]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name], {});
});

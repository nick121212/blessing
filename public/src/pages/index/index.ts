/**
 * Created by NICK on 16/8/10.
 * 链接所有的页面
 */

import * as angular from 'angular';
import loadingDir from '../../directives/loading';

import pageModule from '../page';
import homeModule from '../home';
import passportModule from '../passport';
import ttyModule from '../tty';

import './index.scss';

const module = angular.module("indexApp", [passportModule, homeModule, pageModule, loadingDir, ttyModule]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name]);
});

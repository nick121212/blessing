/**
 * Created by NICK on 16/8/9.
 */

import * as angular from 'angular';
import loadingDir from '../../directives/loading';

import homeModule from '../home';

import './index.scss';

const module = angular.module("indexApp", [homeModule, loadingDir]);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name], {});
});

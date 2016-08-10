/**
 * Created by NICK on 16/8/9.
 */

import * as angular from 'angular';
import * as ngMaterial from 'angular-material';

import loadingDirReg from '../../directives/loading/loading.directive';

const module = angular.module("indexApp", [ngMaterial as string]);

loadingDirReg(module);

angular.element(document).ready(() => {
    angular.bootstrap(document, [module.name], {
        strictDi: true
    });
});

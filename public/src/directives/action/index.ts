/**
 * Created by NICK on 16/8/9.
 */

import * as angular from 'angular';
import * as ngMaterial from 'angular-material';

import actProviderRegFunc from './services/action.provider';
import actUtilsFunc from './services/utils.service';
import restSvrMod from '../../services/rest.service';
import loginSchFunc from './schemas/login.value';
import moudlesSchFunc from './schemas/modules.value';
import formActionFunc from './directives/form.directive';

import listActionFunc from './directives/list.directive';

const _name = "fxAction";
const module = angular.module(`${_name}Module`, [ngMaterial, restSvrMod]);

actUtilsFunc(module);
actProviderRegFunc(module);
formActionFunc(module);
listActionFunc(module);

moudlesSchFunc(module);
loginSchFunc(module);


export default module.name;

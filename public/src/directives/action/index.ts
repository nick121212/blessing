/**
 * Created by NICK on 16/8/9.
 */

import * as angular from 'angular';
import * as ngMaterial from 'angular-material';
import 'expose?JSONEditor!jsoneditor';
import 'ng-jsoneditor';

import actProviderRegFunc from './services/action.provider';
import actUtilsFunc from './services/utils.service';
import restSvrMod from '../../services/rest.service';
import loginSchFunc from './schemas/login.value';
import moduleSchFunc from './schemas/modules.value';
import crawlerSchFunc from './schemas/crawler.value';
import commonSchFunc from './schemas/common.value';
import formActionFunc from './directives/form.directive';
import listActionFunc from './directives/list.directive';
import dialogFormFunc from './directives/dialog-form.directive';
import searchActionFunc from './directives/search.directive';
import wizardActionFunc from './directives/wizard.directive';
import wizardDialogActionFunc from './directives/dialog-wizard.directive';
import builderActionFunc from './directives/builder.directive';

import autoCompleteFunc from './services/autocomplete.provider';
import jsonEditorFunc from './services/jsoneditor.provider';

import 'angular-schema-form';
import 'angular-schema-form-ng-material';
import './services/validator.custom.value';

const _name = "fxAction";
const module = angular.module(`${_name}Module`, [ngMaterial, restSvrMod, "schemaForm", "ng.jsoneditor"]);

actUtilsFunc(module);
actProviderRegFunc(module);
formActionFunc(module);
listActionFunc(module);
moduleSchFunc(module);
loginSchFunc(module);
dialogFormFunc(module);
searchActionFunc(module);
wizardActionFunc(module);
wizardDialogActionFunc(module);
builderActionFunc(module);
crawlerSchFunc(module);
commonSchFunc(module);
autoCompleteFunc(module);
jsonEditorFunc(module);


function sfLayout(args) {
    var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');

    if (layoutDiv && args.form.grid) {
        Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
            layoutDiv.setAttribute(property, args.form.grid[property]);
        });
    }
};
// 处理默认的错误信息
module
    .config(["sfErrorMessageProvider", (sfErrorMessageProvider)=> {
        // sfErrorMessageProvider.setDefaultMessage("10000", "邮箱格式不正确");
        // sfErrorMessageProvider.setDefaultMessage("10001", "两次密码不一致");
        // sfErrorMessageProvider.setDefaultMessage("10002", "用户名中存在非法字符");
        // sfErrorMessageProvider.setDefaultMessage("10003", "手机格式不正确");
        // sfErrorMessageProvider.setDefaultMessage("10004", "JSON格式不正确");
        // sfErrorMessageProvider.setDefaultMessage("10005", "地址格式不正确");
        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
        sfErrorMessageProvider.setDefaultMessage("500", "格式不正确");
    }])
    // 添加自定义的表单组件
    .config(["sfBuilderProvider", "schemaFormDecoratorsProvider", "jsonEditorBuilderProvider", "autoCompleteBuilderProvider", (sfBuilderProvider, schemaFormDecoratorsProvider, jsonEditorBuilder, autoCompleteBuilder)=> {
        // jsoneditor--schema-form组件化
        schemaFormDecoratorsProvider.defineAddOn(
            'materialDecorator',
            'jeditor',
            "./decorators/jsoneditor.jade",
            sfBuilderProvider.stdBuilders.concat(jsonEditorBuilder.builder)
        );
        // card--schema-form组件化
        schemaFormDecoratorsProvider.defineAddOn(
            'materialDecorator',
            'card',
            "./decorators/card.jade",
            [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
        );
        // autocomplete--schema-form组件化
        schemaFormDecoratorsProvider.defineAddOn(
            'materialDecorator',
            'autocomplete-1',
            "./decorators/autocomplete-1.jade",
            [sfBuilderProvider.builders.sfField, sfLayout, sfBuilderProvider.builders.condition, autoCompleteBuilder.builder, sfBuilderProvider.builders.transclusion]
        );
        // section--schema-section组件
        schemaFormDecoratorsProvider.defineAddOn(
            'materialDecorator',
            'section-1',
            "./decorators/section-1.jade",
            [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.simpleTransclusion, sfBuilderProvider.builders.array]
        );
    }])
    // 打包工具的原因,只能把模板字符串写入cache中
    .run(["$templateCache", "autoCompleteBuilder", ($templateCache: ng.ITemplateCacheService)=> {
        $templateCache.put('./decorators/jsoneditor.jade', require("./decorators/jsoneditor.jade")());
        $templateCache.put('./decorators/card.jade', require("./decorators/card.jade")());
        $templateCache.put('./decorators/autocomplete-1.jade', require("./decorators/autocomplete-1.jade")());
        $templateCache.put('./decorators/section-1.jade', require("./decorators/section-1.jade")());
    }]);


export default module.name;

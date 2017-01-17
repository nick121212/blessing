
import * as ngMaterial from 'angular-material';
import restSvrMod from '../../services/rest.service';

import 'expose?JSONEditor!jsoneditor.js';
import 'ng-jsoneditor';
import 'angular-schema-form';
import 'angular-schema-form-ng-material';
import 'angular-sortable-view';
import 'angular-translate';
import 'ng-file-upload';
import 'smdatetimerangepicker';

const _name = "fxAction";
export const module = angular.module(`${_name}Module`, [ngMaterial, restSvrMod, "schemaForm", "ng.jsoneditor", "angular-sortable-view", 'pascalprecht.translate', 'ngFileUpload', 'smDateTimeRangePicker'])
    .config(["sfErrorMessageProvider", (sfErrorMessageProvider) => {
        // 处理默认的错误信息
        sfErrorMessageProvider.setDefaultMessage("302", "[{{title}}]是必填项");
        sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
        sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
        sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
        sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
        sfErrorMessageProvider.setDefaultMessage("400", "数组长度不正确，{{schema.minItems||0}}-{{schema.maxItems||'∞'}}");
        sfErrorMessageProvider.setDefaultMessage("500", "[{{title}}]格式不正确");
        sfErrorMessageProvider.setDefaultMessage("compareTo", "{{title}}和{{form.compare.to}}不一致");
    }])
    .config(["sfBuilderProvider", "schemaFormProvider", "schemaFormDecoratorsProvider", "sfPathProvider", "autoCompleteBuilderProvider", "fxBuildersProvider",
        (sfBuilderProvider, schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, autoCompleteBuilderProvider, fxBuilders) => {
            // 添加自定义的表单组件
            // jsoneditor--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'jeditor',
                "./decorators/jsoneditor.jade",
                sfBuilderProvider.stdBuilders.concat(fxBuilders.jsonEditor)
            );
            // card--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'card',
                "./decorators/card.jade",
                [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
            );

            // querytable--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'querytable',
                "./decorators/querytable.jade",
                [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
            );

            // querytable--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'modandact',
                "./decorators/modandact.jade",
                [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
            );

            // querytable--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'formaction',
                "./decorators/formaction.jade",
                [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
            );

            // querytable--schema-form组件化
            schemaFormDecoratorsProvider.defineAddOn(
                'materialDecorator',
                'datetime',
                "./decorators/datetime.jade",
                [sfBuilderProvider.builders.sfField, sfBuilderProvider.builders.ngModel, fxBuilders.layout, sfBuilderProvider.builders.condition, sfBuilderProvider.builders.transclusion]
            );

        }])
    .run(["$templateCache", ($templateCache: ng.ITemplateCacheService) => {
        // 打包工具的原因,只能把模板字符串写入cache中
        $templateCache.put('./decorators/jsoneditor.jade', require("./decorators/jsoneditor.jade")());
        $templateCache.put('./decorators/card.jade', require("./decorators/card.jade")());
        $templateCache.put('./decorators/section-1.jade', require("./decorators/section-1.jade")());
        $templateCache.put('./decorators/querytable.jade', require("./decorators/querytable.jade")());
        $templateCache.put('./decorators/modandact.jade', require("./decorators/modandact.jade")());
        $templateCache.put('./decorators/formaction.jade', require("./decorators/formaction.jade")());
        
         $templateCache.put('./decorators/datetime.jade', require("./decorators/datetime.jade")());
    }]);

export default `${module.name}`;

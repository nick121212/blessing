/**
 * Created by NICK on 16/8/9.
 */

import {IActionModel, ActionType} from '../models/action.model';
import * as _ from 'lodash';

const _name = "fxSearchAction";

interface IDirectiveScope extends ng.IScope {
    ngModel: any;
    fxAction: string;
    actionModel: IActionModel;
    key: string;
}

class Controller {
    static $inject = ["fxAction", "toolbarUtils"];

    key: string;
    formData: any;
    actionModel: IActionModel;
    disabled: boolean;
    toolbars: Array<any>;
    isShow: boolean;
    doSearch: Function;

    constructor(private fxAction, private toolbarUtils) {
        this.initSearchToolbar();
        this.formData = this.formData || {};
    }

    /**
     * 删除搜索字段
     */
    clearFilterData() {
        _.forEach(this.formData, (val, key)=> {
            delete this.formData[key];
        });
    }

    /**
     * 初始化搜索toolbar
     */
    initSearchToolbar() {
        this.toolbars = [
            this.toolbarUtils.labelBuilder('{{searchCtl.title}}搜索').attrBuilder({flex: ""}).toValue(),
            this.toolbarUtils.btnBuilder("清空搜索条件", "md-icon-button", false).iconBuilder("clear_all").btnClick(($event)=> {
                this.clearFilterData();
            }).toValue(),
            this.toolbarUtils.btnBuilder("关闭搜索栏", "md-icon-button", false).iconBuilder("{{searchCtl.isShow?'window-open':'window-closed'}}").btnClick(($event)=> {
                this.isShow = !this.isShow;
            }).toValue()
        ];
    }

    /**
     * 搜索数据
     * @param $form
     */
    doPreSearch($event, $form: ng.IFormController) {
        if (this.fxAction.doFormCheck($form) && _.isFunction(this.doSearch)) {
            this.doSearch(this.formData);
        }
    }
}

/**
 * 操作指令,某个表单操作
 * @returns {{restrict: string, template: any, scope: {}, replace: boolean, link: (($scope:IDirectiveScope))}}
 * @constructor
 */
function Directive(): ng.IDirective {
    return {
        restrict: 'EA',
        template: require("../tpls/search.jade")(),
        bindToController: {
            formData: "=ngModel",
            key: "@",
            disabled: '=',
            isShow: '=',
            doSearch: '=?',
            title: '=?'
        },
        require: `^${_name}`,
        controller: Controller,
        controllerAs: 'searchCtl',
        replace: true
    };

}

Directive.$inject = [];

export default (module: ng.IModule)=> {
    module.directive(_name, Directive);
}

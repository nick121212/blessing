import { module } from '../module';
import * as pointer from 'json-pointer';
import * as _ from 'lodash';

function Provider() {
    /**
     * layout builder函数
     * 初始化参数
     * 初始化搜索功能
     * @param args
     */
    this.layout = function (args) {
        var layoutDiv = args.fieldFrag.querySelector('[sf-layout]');

        if (layoutDiv && args.form.grid) {
            Object.getOwnPropertyNames(args.form.grid).forEach(function (property, idx, array) {
                layoutDiv.setAttribute(property, args.form.grid[property]);
            });
        };

    };

    this.suggest = function (args) {
        args.form.cpOptions = _.extend({
            textField: "",
            requireMatch: false
        }, args.form.cpOptions || {});
    };

     this.jsonEditor = function(args) {
        const options = {
            modes: ['tree', 'code', 'text'],
            mode: 'code',
            name: args.form.key.join('')
        };

        args.form.preferText = !!args.form.preferText;
        args.form.jsonOptions = _.extend(args.form.jsonOptions || {}, options);
    };


    this.$get = [function () {
        return {};
    }];
}

module.provider('fxBuilders', [Provider]);
import { module } from '../module';
import * as pointer from 'json-pointer';
import * as _ from 'lodash';

function Provider() {
    /**
     * autocomplete builder函数
     * 初始化参数
     * 初始化搜索功能
     * @param args
     */
    this.builder = function (args) {
        args.form.cpOptions = _.extend({
            textField: "",
            requireMatch: false
        }, args.form.cpOptions || {});
    };

    this.$get = [function () {
        return {};
    }];
}

module.provider('suggestBuilder', [Provider]);
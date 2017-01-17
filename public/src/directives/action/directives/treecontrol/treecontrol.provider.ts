import { module } from '../../module';
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
        args.form.onChange = (item, form) => {
            console.log(item, form);
        };
        args.form.tcOptions = _.extend({
            textField: "",
            keyField: "",
            _where: {},
            init: true,
            actionKey: "",

        }, args.form.tcOptions || {});
    };

    this.$get = [function () {
        return {};
    }];
}

module.provider('treeControlBuilder', [Provider]);
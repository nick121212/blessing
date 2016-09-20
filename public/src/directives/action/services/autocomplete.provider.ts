/**
 * Created by NICK on 16/9/19.
 */

import * as pointer from 'json-pointer';

function Provider() {

    class Builder {
        static $inject = ["form", "fxAction"];

        searchText: string;
        selected: any;
        formData: any;

        constructor(private form, private fxAction) {
        }

        init(modelValue, formData) {
            this.formData = formData;
        }

        /**
         * 当数据变化时，触发事件
         * @param item 更改后的item
         */
        onChange(item) {

            if (!item) {
                return pointer.remove(this.formData, `/${this.form.key.join('/')}`);
            }

            this.selected = item;

            if (this.form.acOptions.keyField) {
                return pointer.set(this.formData, `/${this.form.key.join('/')}`, pointer.get(item, this.form.acOptions.keyField));
            }

            pointer.set(this.formData, `/${this.form.key.join('/')}`, item);
        }

        /**
         * 查询数据，如果存在actionKey，则获取actionKey中的interface数据
         * 查询接口，返回数据
         * @returns {any}
         */
        query() {
            let actionModel, clientData = {};
            let filter = {};

            if (this.form.acOptions.actionKey) {
                // 设置搜索条件
                pointer.set(filter, this.form.acOptions.search, this.searchText);

                return this.fxAction.getModel(this.form.acOptions.actionKey).then((aModel)=> {
                    actionModel = aModel;
                    return this.fxAction.doAction(actionModel.key, filter);
                }).then((results)=> {
                    return this.fxAction.doDealResult(actionModel, results, clientData);
                }).then((results)=> {
                    return results[this.form.acOptions.dataField];
                });
            }

            return this.form.data || [];
        }
    }

    let config = {
        fxAction: null,
    };

    /**
     * autocomplete builder函数
     * 初始化参数
     * 初始化搜索功能
     * @param args
     */
    this.builder = function (args) {
        args.form.acOptions = _.extend({
            textField: "",
            keyField: "",
            dataField: "",
            noCache: false,
            search: "",
            actionKey: ""
        }, args.form.acOptions || {});
        args.form.boost = new Builder(args.form, config.fxAction);
    };

    this.$get = ["fxAction", function (fxAction) {
        config.fxAction = fxAction;

        return {};
    }];
}

export default (module: ng.IModule)=> {
    module.provider('autoCompleteBuilder', [Provider]);
};
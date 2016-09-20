/**
 * Created by NICK on 16/9/19.
 */


function Provider() {
    function Builder(args) {
        const options = {
            modes: ['tree', 'code', 'text'],
            mode: 'code',
            name: args.form.key.join('')
        };

        args.form.preferText = !!args.form.preferText;
        args.form.jsonOptions = _.extend(args.form.jsonOptions || {}, options);
    }

    this.builder = Builder;
    this.$get = [function () {
        return {};
    }];
}

export default (module: ng.IModule)=> {
    module.provider('jsonEditorBuilder', [Provider]);
};
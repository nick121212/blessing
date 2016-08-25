/**
 * Created by NICK on 16/8/16.
 */

import * as _ from 'lodash';
import {IActionModel} from "../models/action.model";
import {IInterfaceModel, MethodType} from "../models/interface.model";

class Provider {
    static $inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q"];

    constructor(private $rootScope: ng.IRootScopeService, private $injector: ng.auto.IInjectorService, private restUtils: fx.utils.restStatic, private mdUtils: fx.utils.materialStatic, private $q: ng.IQService) {
        return this;
    }

    $get: Array<string|Function> = ["$injector", ($injector)=> {
        const service = $injector.invoke(Provider, this, null);

        return service;
    }];

    /**
     * 查找操作模型,如果本地没有,则去服务器中查找
     * @param key  {String}  操作的kEY
     * @returns {IPromise<T>}
     */
    getModel(key: string) {
        const defer = this.$q.defer();

        if (this.$injector.has(key)) {
            defer.resolve(this.$injector.get(key));
        } else {
            this.mdUtils.showErrMsg(`没有找到key[${key}]!`);
            defer.reject("没有找到!");
        }

        return defer.promise;
    }

    /**
     * 执行操作
     * @param key {String} 操作的KEY
     */
    doAction(key: string, data: Object, form?: ng.IFormController) {
        if (form) {
            this.$rootScope.$broadcast("schemaFormValidate");
            if (!form.$valid) {
                console.log(form.$error);
                this.mdUtils.showErrMsg("表单没有填写正确!");
                return;
            }
        }

        return this.getModel(key).then((model: IActionModel)=> {
            let interfacesRest:{ [id: string]: ng.IPromise<any>; } = {};

            _.each(model.interfaces, (interfaceModel: IInterfaceModel)=> {
                let restAngular = interfaceModel.isRestful ? this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
                    : this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
                let promise: ng.IPromise<any>;
                switch (interfaceModel.method) {
                    case MethodType.POST:
                        promise = restAngular.post(data, null);
                        break;
                    case MethodType.GET:
                        promise = restAngular.getList(data);
                        break;
                }
                interfacesRest[interfaceModel.key] = promise;
            });

            return interfacesRest;
        }).then((interfacesRest)=> {
            return this.$q.all(interfacesRest);
        });
    }
}

export default (module: ng.IModule)=> {
    module.provider('fxAction', [Provider]);
};
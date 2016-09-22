/**
 * Created by NICK on 16/8/16.
 */

import * as _ from 'lodash';
import {IActionModel, ActionType, IClientData} from "../models/action.model";
import {IInterfaceModel, MethodType} from "../models/interface.model";
import * as pointer from 'json-pointer';

class Provider {
    static $inject = ["$rootScope", "$injector", "restUtils", "materialUtils", "$q", "$mdDialog"];

    static _name: string = 'fxAction';

    constructor(private $rootScope: ng.IRootScopeService, private $injector: ng.auto.IInjectorService, private restUtils: fx.utils.restStatic, private mdUtils: fx.utils.materialStatic, private $q: ng.IQService, private $mdDialog: ng.material.IDialogService) {
        return this;
    }

    $get: Array<string|Function> = ["$injector", ($injector)=> {
        const service = $injector.invoke(Provider, this, null);

        return service;
    }];

    /**
     * 查找操作模型,如果本地没有,则去服务器中查找
     * @param key  {String}  操作的KEY
     * @returns {IPromise<T>}
     */
    getModel(key: string) {
        const defer = this.$q.defer();

        if (!key) {
            defer.reject();
        } else {

            if (this.$injector.has(key)) {
                defer.resolve(_.cloneDeepWith(this.$injector.get(key)));
            } else {
                this.mdUtils.showErrMsg(`没有找到key[${key}]!`);
                defer.reject(key);
            }
        }

        return defer.promise;
    }

    /**
     * 查找操作模型数组,如果本地没有,则去服务器中查找
     * @param keys
     * @returns {IPromise<T>}
     */
    getModels(keys: Array<string|IActionModel>) {
        const defer = this.$q.defer();
        const actionModels = {};
        const notFoundsKeys = [];
        const promises: {[id: string]: ng.IPromise<any>} = {};

        _.each(keys, (key)=> {
            if (_.isObject(key)) {
                actionModels[(key as IActionModel).key] = key;
            }
            else {
                promises[key as string] = this.getModel(key as string).then((actionModel)=> {
                    actionModels[key as string] = actionModel;
                }).catch((key)=> {
                    notFoundsKeys.push(key);
                });
            }
        });

        this.$q.all(promises).then(()=> {
            defer.resolve(actionModels);
        }).catch(()=> {
            defer.resolve(actionModels);
        });

        return defer.promise;
    }

    /**
     * 执行弹窗表单操作
     * @param $event
     * @param actionModel
     * @param item
     * @return {Promise<any>}
     */
    doActionModel($event: MouseEvent, actionModel: IActionModel, item?: any, callback?: Function): ng.IPromise<any> {
        // 表单和多级表单操作,弹出dialog
        // 确认框操作,弹出确认窗口
        switch (actionModel.type) {
            case ActionType.wizard:
            case ActionType.form:
                const templates = {
                    [ActionType.form]: require("../tpls/form-dialog-action.jade")(),
                    [ActionType.wizard]: require("../tpls/wizard-dialog-action.jade")()
                };

                return this.$mdDialog.show({
                    targetEvent: $event,
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    fullscreen: true,
                    controller: function ($scope) {
                        $scope['item'] = item || {};
                        $scope['key'] = actionModel.key;
                        $scope['submit'] = callback;
                    },
                    template: templates[actionModel.type]
                }).then(()=> {
                    item = null;
                });
            case ActionType.confirm:
                const confirm = this.$mdDialog.confirm()
                    .title(actionModel.confirm.confirmTitle)
                    .textContent(actionModel.confirm.confirmContent)
                    .ariaLabel(actionModel.confirm.confirmTitle)
                    .targetEvent($event)
                    .ok(actionModel.confirm.confirmOk || "确定")
                    .cancel(actionModel.confirm.confirmCancel || "取消");

                return this.$mdDialog.show(confirm).then(()=> {
                    return this.doAction(actionModel.key, item);
                });
        }

        return null;
    }

    /**
     * 检测表单是否合法
     * @param $form
     * @returns {boolean}
     */
    doFormCheck($form) {
        if ($form) {
            this.$rootScope.$broadcast("schemaFormValidate");
            if (!$form.$valid) {
                console.log($form.$error);
                this.mdUtils.showErrMsg("表单没有填写正确!");
                return false;
            }
        }

        return true;
    }

    /**
     * 处理接口的数据,数据的互相拷贝
     * @param actionModel
     * @param results
     * @param clientData
     * @return {IClientData}
     */
    doDealResult(actionModel: IActionModel, results: Object, clientData: IClientData) {
        _.forEach(actionModel.interfaces, (iInterface)=> {
            let result = results[iInterface.key];

            if (result) {
                // 接口数据拷贝到本地
                _.forEach(iInterface.jpp.set, (val, key)=> {
                    pointer.set(clientData, key, pointer.get(result, val));
                });
                // 本地数据的删除
                _.forEach(iInterface.jpp.del, (val, key)=> {
                    pointer.remove(clientData, key);
                });
            }
        });

        return clientData;
    }

    /**
     * 获取接口列表,使用restangular处理接口地址,最后调用接口
     * @param key
     * @param queryData
     * @param $form
     * @returns {IPromise<TResult>}
     */
    doAction(key: string, queryData: Object|restangular.IElement, $form?: ng.IFormController) {
        if (!this.doFormCheck($form)) {
            return;
        }

        return this.getModel(key).then((actionModel: IActionModel)=> {
            let interfacesRest: { [id: string]: ng.IPromise<any>; } = {};

            // 获取接口列表,使用restangular处理接口地址,最后调用接口,返回promise
            _.each(actionModel.interfaces, (interfaceModel: IInterfaceModel)=> {
                // 获取接口的地址
                let promise: ng.IPromise<any>,
                    restAngular = interfaceModel.isRestful
                        ? this.restUtils.getCustomRestful(interfaceModel.address, interfaceModel.port, interfaceModel.path)
                        : this.restUtils.getCustom(interfaceModel.address, interfaceModel.port, interfaceModel.path);
                // 判断接口请求类型,做提交操作
                switch (interfaceModel.method) {
                    case MethodType.POST:
                        promise = restAngular.post(queryData, null);
                        break;
                    case MethodType.GET:
                        promise = restAngular.customGET(null, queryData, null);
                        break;
                    case MethodType.PUT:
                        promise = restAngular.customPUT(queryData, pointer.get(queryData, interfaceModel.idFieldPath));
                        break;
                    case MethodType.DELETE:
                        promise = restAngular.customDELETE(pointer.get(queryData, interfaceModel.idFieldPath), null)
                }
                interfacesRest[interfaceModel.key] = promise;
            });

            return interfacesRest;
        }).then((interfacesRest)=> {
            // 返回promise
            return this.$q.all(interfacesRest);
        });
    }
}

export default (module: ng.IModule)=> {
    module.provider(Provider._name, [Provider]);
};
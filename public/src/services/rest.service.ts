/**
 * Created by NICK on 16/8/12.
 */

import * as _ from "lodash";
import 'restangular';

class Service {
    public static _name: string = "restUtils";

    public static provider: Array<string | Function> = ["Restangular", (restangular: restangular.IService) => {
        class Service {

            private rest;
            private restAngularConfig;

            constructor(baseUrl: string = "") {
                // this.rest = restangular;
                restangular.setBaseUrl(baseUrl);
                this.rest = restangular.withConfig((restAngularConfig)=> {
                    this.restAngularConfig = restAngularConfig;
                    // restAngularConfig.setFullResponse(true);
                });
            }

            /**
             * 获取不是restful风格的接口信息
             * @param address
             * @param port
             * @param path
             * @param params
             */
            getCustom(address: string, port: number = 0, path: string) {
                let baseUrl = "";
                let restangu: restangular.IElement;

                if (address) {
                    baseUrl = `${address}`;
                }
                if (address && port) {
                    baseUrl += `:${port}`;
                }

                if (!path) {
                    console.error(`path不能为空!`);

                    return null;
                }

                if (baseUrl) {
                    restangu = restangular.oneUrl("custom", baseUrl);
                } else {
                    restangu = this.rest;
                }

                _.each(path.split("/"), (p)=> {
                    restangu = restangu.all(p);
                });

                return restangu;
            }

            getCustomRestful(address: string, port: number = 0, path: string) {
                let baseUrl = "";

                if (address) {
                    baseUrl = `${address}`;
                }
                if (address && port) {
                    baseUrl += `:${port}`;
                }

                return this.getRestAngular(path, true, baseUrl);
            }

            /**
             * 设置restangular的参数
             * @param fn  {Function(configurer)}   设置方法
             * @returns {any}
             */
            setConfig(fn: Function) {
                if (_.isFunction(fn)) {
                    return fn(this.restAngularConfig);
                }
            }

            /**
             * 获取一个restangular对象
             * @param router    {String} 路由
             * @param fullRes   {boolean} 是否是fullres
             * @param baseUrl
             * @returns {any}
             */
            getRestAngular(router: string, unique: boolean = true, baseUrl: string = ""): restangular.IElement {
                let restAngular;
                let restAngularP = unique ? this.rest : restangular;

                console.log(unique);

                if (baseUrl) {
                    restAngular = restAngularP.oneUrl(router, baseUrl);
                }
                restAngular = (restAngular || restAngularP).all(router);

                // restAngular.withConfig(function () {
                //     console.log(arguments)
                // })

                return restAngular;
            }
        }

        return new Service("");
    }];
}

const module = angular.module("fxRestModule", ["restangular"]);

module.service(Service._name, Service.provider);

export default module.name;
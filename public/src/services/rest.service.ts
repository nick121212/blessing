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
            private restangularConfigurer;

            constructor(baseUrl: string = "") {
                restangular.setBaseUrl(baseUrl);

                this.rest = restangular.withConfig((restangularConfigurer)=> {
                    this.restangularConfigurer = restangularConfigurer;
                    restangularConfigurer.setFullResponse(true);
                });
            }

            /**
             * 设置restangular的参数
             * @param fn  {Function(configurer)}   设置方法
             * @returns {any}
             */
            setConfig(fn: Function) {
                if (_.isFunction(fn)) {
                    return fn(this.restangularConfigurer);
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
                let restangu;
                let restangularP = unique ? this.rest : restangular;

                if (baseUrl) {
                    restangu = restangularP.oneUrl(router, baseUrl);
                }
                restangu = (restangu || restangularP).all(router);

                return restangu;
            }
        }

        return new Service("http://localhost:3000/");
    }];
}

const module = angular.module("fxRestModule", ["restangular"]);

module.service(Service._name, Service.provider);

export default module.name;
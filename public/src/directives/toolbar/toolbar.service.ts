/**
 * Created by NICK on 16/8/12.
 */

import * as _ from "lodash";
import 'restangular';

class Service {
    public static _name: string = "toolbarUtils";

    public static provider: Array<string | Function> = [() => {

        class Base {
            constructor(protected data?: Object) {

            }

            tooltipBuilder(title: string = "", position: string = "bottom") {
                this.data = _.extend({}, this.data, {
                    tooltip: {
                        title: title,
                        position: position
                    }
                });

                return this;
            }

            iconBuilder(icon: string, style?: [{(id: string): any}]) {
                this.data = _.extend({}, this.data, {
                    icon: {
                        icon: icon,
                        style: style
                    }
                });

                return this;
            }

            attrBuilder(attributes: [{(id: string): any}]) {
                this.data = _.extend({}, this.data, {
                    attributes: attributes
                });

                return this;
            }

            toolsBuilder(tools: Array<Object>) {
                this.data = _.extend({}, this.data, {
                    tools: tools || []
                });

                return this;
            }

            btnClick(func: Function) {
                if(func && _.isFunction(func)){
                    this.data = _.extend({}, this.data, {
                        onClick: func
                    });
                }

                return this;
            }

            toValue() {
                return this.data;
            }
        }

        class Service extends Base {
            constructor(protected data?: Object) {
                super(data);
            }

            /**
             * 按钮配置生成方法
             * @param title        按钮title
             * @param cls          按钮className
             * @param showTitle
             * @returns {Service}
             */
            btnBuilder(title: string, className: string, showTitle: boolean = true, tooltipPosition: string = "bottom"): Object {
                const service = new Service({
                    type: "btn",
                    title: title,
                    className: className,
                    showTitle: showTitle
                });

                service.tooltipBuilder(title, tooltipPosition);

                return service;
            }

            /**
             * label配置生成方法
             * @param title
             * @returns {Service}
             */
            labelBuilder(title: string) {
                return new Service({
                    type: "label",
                    title: title
                });
            }

            layoutBuilder(flex: string = "none", layout: string = "none", layoutAlign: string = "none none") {
                return new Service({
                    type: "layout",
                    flex: flex,
                    layout: layout,
                    layoutAlign: layoutAlign
                });
            }
        }

        return new Service();
    }];
}

export default (module: ng.IModule)=> {
    module.service(Service._name, Service.provider);
};
/**
 * Created by NICK on 16/8/12.
 */

import * as _ from "lodash";
import {IActionModel, IColumn} from "../models/action.model";


class Service {
    public static _name: string = "actionUtils";

    public static provider: Array<string | Function> = [() => {

        class Base<T> {
            constructor(protected data?: T) {

            }

            columnUnitBuilder(unit: string, numeric: boolean|string = false) {
                this.data = _.extend({}, this.data, {
                    unit: unit,
                    numeric: numeric
                });

                return this;
            }

            toValue(): T {
                return this.data;
            }
        }

        class Service<T> extends Base<T> {
            constructor(protected data?: T) {
                super(data);
            }

            /**
             * 按钮配置生成方法
             * @param title        按钮title
             * @param cls          按钮className
             * @param showTitle
             * @returns {Service}
             */
            columnBuilder(content: string, title: string, name?: string, sort?: string, unit?: string): Object {
                return new Service<IColumn>({
                    content: content,
                    title: title,
                    name: name,
                    sort: sort,
                    unit: unit
                });
            }
        }

        return new Service();
    }];
}

export default (module: ng.IModule)=> {
    module.service(Service._name, Service.provider);
};
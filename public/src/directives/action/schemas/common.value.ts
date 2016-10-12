/**
 * Created by NICK on 16/8/23.
 */

import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

/**
 * 模块查询
 */
class Result {
    static $inject = ["toolbarUtils", "actionUtils"];
    static key: string = "resultAction";

    constructor(toolbarUtils, actionUtils) {
        let actionModel: IActionModel = {
            key: Result.key,
            type: ActionType.form,
            title: "结果反馈",
            icon: "view-module",
            form: {
                dataSchema: "resultActionData",
                formSchema: "resultActionForm"
            }
        };

        return actionModel;
    }
}

export default (module: ng.IModule) => {
    const services: Array<any> = [Result];

    _.each(services, (ser)=> {
        module.service(ser.key, ser);
    });
}

/**
 * Created by NICK on 16/8/23.
 */

import {IActionModel, ActionType} from '../models/action.model';
import {MethodType} from '../models/interface.model';

const key = "modulesListAction";

/**
 * 返回用户登录界面的schema
 * @returns {IActionModel}
 * @constructor
 */
function SchemaValue(toolbarUtils, actionUtils) {
    let actionModel: IActionModel = {
        key: key,
        type: ActionType.list,
        list: {
            columns: [actionUtils.columnBuilder("item.key", "KEY", "key").toValue()],
            toolbars: [
                toolbarUtils.labelBuilder("{{listCtl.title}}").attrBuilder({flex: ""}).toValue(),
                toolbarUtils.btnBuilder("刷新", "", true).iconBuilder("refresh", {fill: "black"}).btnClick(($event)=> {
                    console.log("refresh");
                }).toValue()
            ]
        },
        interfaces: [{
            key: "modulesList",
            method: MethodType.GET,
            address: "",
            port: null,
            path: "modules",
            isRestful: true
        }]
    };

    return actionModel;
}

SchemaValue.$inject = ["toolbarUtils", "actionUtils"];

export default (module: ng.IModule) => {
    module.service(key, SchemaValue);
}

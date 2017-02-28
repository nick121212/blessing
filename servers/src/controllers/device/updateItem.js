import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';
import utils from "../";
import { logger } from "../../auth/log";

export default (Model, config) => {
    return async(ctx, next) => {
        let { key, type } = ctx.params;
        let model = ctx.request.body;
        let curConfig = utils.elastic.getConfig(config, "/updateItem");

        if (!key || !type) {
            throw boom.badData(`key,type不能为空`);
        }

        let result = await client.get({
            index: 'cmdb.device',
            type: type,
            id: key
        });

        if (!result.found) {
            throw boom.badData(`没有找到编号为【${key}】的设备！`);
        }

        utils.elastic.removeAttributes(model, curConfig.removeAttributes);
        utils.elastic.setSuggest(model, curConfig.suggest);

        model.updateAt = new Date().getTime();
        model.lastUpdateUserId = ctx.state.user.id;
        model.lastUpdateUserName = ctx.state.user.name;
        model.entryAt && (model.entryAt = new Date(model.entryAt).getTime());
        _.each(model.usedAt, (val, idx) => {
            model.usedAt[idx] = new Date(val).getTime();
        });

        // 类型|时间|数据|操作人
        ctx.log = { logType: 2, id: key, body: model, optUser: ctx.state.user.id };

        ctx.body = await client.update({
            index: 'cmdb.device',
            type: type,
            id: key,
            body: {
                doc: model
            }
        });
    };
};
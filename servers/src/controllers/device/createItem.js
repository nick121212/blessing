import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';
import utils from "../";
import { logger } from "../../auth/log";

export default (Model, config) => {
    return async(ctx, next) => {
        let model = ctx.request.body;
        let curConfig = utils.elastic.getConfig(config, "/createItem");
        let type = _.first(_.filter(curConfig.type, (t, key) => {
            return key === model.deviceType;
        }));

        if (!model.NO) {
            throw boom.badData(`固定资产编号不能为空`);
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
        ctx.log = { logType: 1, id: model.NO, body: model, optUser: { id: ctx.state.user.id, name: ctx.state.user.name } };

        ctx.body = await client.create({
            index: "cmdb.device",
            type: type || "other",
            id: model.NO,
            body: model
        });
    };
};
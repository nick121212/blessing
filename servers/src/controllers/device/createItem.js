import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';
import utils from "../";

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

        model.used = false;

        ctx.body = await client.create({
            index: "cmdb.device",
            type: type || "other",
            id: model.NO,
            body: model
        });
    };
};
import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let { client } = app.config.es.index;

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        ctx.body = await client.delete({
            index: 'cmdb.device',
            type: 'manual',
            id: key
        });
    };
};
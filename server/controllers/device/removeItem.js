import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';

export default (app, logger) => {
    let utils = app.config.utils.index;
    let { client } = app.config.es.index;

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        let result = await client.delete({
            index: 'cmdb.device',
            type: 'manual',
            id: key
        });

        ctx.body = result;
    };
};
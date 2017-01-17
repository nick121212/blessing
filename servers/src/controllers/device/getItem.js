import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';

export default () => {
    return async(ctx, next) => {
        let { key, type } = ctx.params;

        if (!key || !type) {
            throw boom.badData(`key,type不能为空`);
        }
        let result = await client.get({
            index: 'cmdb.device',
            type: type,
            id: key
        });

        ctx.body = result;
    };
};
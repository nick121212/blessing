import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';

export default () => {
    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        ctx.body = await client.get({
            index: 'cmdb.apply',
            type: 'est-agent',
            id: key
        });
    };
};
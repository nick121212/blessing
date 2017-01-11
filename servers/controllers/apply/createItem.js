import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import { client } from '../../utils/es';

export default () => {
    return async(ctx, next) => {
        let model = ctx.request.body;
        let results = await client.index({
            index: 'cmdb.apply',
            type: 'est-agent',
            id: model.id,
            body: model
        });

        ctx.body = results;
    };
};
import fs from 'fs';
import _ from 'lodash';
import boom from 'boom';
import moment from "moment";
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

        // if (result._source.entryAt) {
        //     let m = moment(result._source.entryAt);

        //     result._source.entryAt = m.format("YYYY/MM/DD");
        // }

        // _.each(result._source.usedAt, (val, idx) => {
        //     let m = moment(val);

        //     result._source.usedAt[idx] = m.format("YYYY/MM/DD");
        // });

        ctx.body = result;
    };
};
import fs from 'fs';
import _ from 'lodash';
import { client } from '../../utils/es';
import utils from '../../utils';

export default () => {
    return async(ctx, next) => {
        let filter = utils.query(ctx.query);
        let sort;
        filter.where && (filter.where.query.and = _.filter(filter.where.query.and, (item) => {
            return item;
        }));

        _.each(filter.order, (order) => {
            if (_.isArray(order) && order.length == 2) {
                !sort && (sort = []);
                sort.push({
                    [order[0]]: {
                        "order": order[1]
                    }
                });
            }
        });

        console.log(client);

        let results = await client.search({
            index: "cmdb.device",
            from: filter.offset,
            size: filter.limit,
            body: filter.where,
            sort: sort ? JSON.stringify(sort) : null
        });

        ctx.body = results.hits;
    };
};
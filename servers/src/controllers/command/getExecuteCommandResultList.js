import boom from 'boom';
import utils from '../';
import rabbitmq from '../../utils/rabbitmq';
import { client } from '../../utils/es';
import uuid from 'node-uuid';
import _ from 'lodash';
import db from '../../utils/db';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let filter = utils.elastic.getEsQuery(ctx.query);

        filter.esQuery.aggs = {
            "count_success": {
                "terms": {
                    "field": "success"
                }
            }
        };

        let results = await client.search({
            index: "commdone.logs",
            from: filter.offset,
            size: filter.limit,
            body: filter.esQuery,
            sort: filter.sort,
            timeout: '10s'
        });

        ctx.body = results;
    };
};
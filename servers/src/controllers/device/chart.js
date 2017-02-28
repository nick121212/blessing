import boom from 'boom';
import utils from '../';
import _ from 'lodash';
import { client } from '../../utils/es';

export default (sequelizeModel) => {
    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let filter = utils.elastic.getEsQuery(ctx.query);

        filter.esQuery.aggs = {
            "type_aggs": {
                "terms": {
                    "field": "_type",
                    "missing": "未设置"
                }
            },
            "depart_aggs": {
                "terms": {
                    "field": "departName",
                    "missing": "未设置"
                },
                "aggs": {
                    "type_aggs": {
                        "terms": {
                            "field": "_type",
                            "missing": "未设置"
                        }
                    }
                }
            }
        };
        filter.esQuery._source = false;
        let results = await client.search({
            index: "cmdb.device",
            // from: filter.offset,
            // size: filter.limit,
            body: filter.esQuery,
            sort: filter.sort,
            timeout: '10s'
        });

        ctx.body = results;
    };
};
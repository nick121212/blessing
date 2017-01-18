import _ from 'lodash';
import { client } from '../utils/es';
import * as jsonPointer from 'json-pointer';
import pointer from "json-pointer";

export class CommonUtils {
    constructor() {}

    /**
     * 提取query中的数据
     */
    query(query) {
        let filter = query || {};

        filter = _.extend({
            limit: 10,
            offset: 0
        }, filter);

        if (filter.attributes && _.isArray(filter.attributes)) {
            !filter.attributes.length && delete filter.attributes;
        } else {
            delete filter.attributes;
        }

        filter.limit = ~~filter.limit;
        filter.offset = ~~filter.offset;
        filter.where && typeof filter.where === "string" && (filter.where = JSON.parse(filter.where));
        filter.suggest && typeof filter.suggest === "string" && (filter.suggest = JSON.parse(filter.suggest));
        if (_.isEmpty(filter.where)) {
            delete filter.where;
        }
        if (_.isEmpty(filter.suggest)) {
            delete filter.suggest;
        }

        if (filter.order) {
            let orders = filter.order.split('-');
            // 返回的order信息是  -key|key,前面带"-"的是倒序
            if (orders.length > 0) {
                switch (orders.length) {
                    case 1:
                        orders.push("asc");
                        break;
                    case 2:
                        orders = _.reverse(orders);
                        orders[1] = "desc";
                        break;
                }
                filter.order = [orders];
            }
        }

        return filter;
    }

    /**
     * 获取模型的配置信息
     */
    getConfig(config, jsonPpath) {
        if (pointer.has(config, jsonPpath)) {
            return pointer.get(config, jsonPpath) || {};
        }

        return {};
    }
}

export class MysqlUtils extends CommonUtils {
    constructor() {
        super();
    }

    /**
     * 获取模型的主键和外键
     * @params Model {Object} Sequelize对象
     */
    getUniqueFields(Model) {
        let uniqueFields = [];
        let primaryKey = "";

        _.forEach(Model.attributes, (attr, key) => {
            if (attr.unique) {
                uniqueFields.push(key);
            }
            if (attr.primaryKey) {
                primaryKey = key;
            }
        });

        return {
            uniqueFields: uniqueFields,
            primaryKey: primaryKey
        };
    }

    /**
     * 检测主键或者必填字段是否完整
     * @params Model {Object} Sequelize对象
     * @params modelIntance {Object} 模型实例
     */
    async checkUniqueFields(Model, modelIntance) {
        let { uniqueFields } = this.getUniqueFields(Model);

        if (_.isArray(uniqueFields) && uniqueFields.length) {
            let where = [];

            _.each(uniqueFields, (field) => {
                if (modelIntance[field]) {
                    where.push({
                        [field]: modelIntance[field]
                    });
                } else {
                    throw boom.badData(`【${field}】没有填写完整!`);
                }
            });

            if (where.length) {
                let findModel = await Model.count({
                    where: {
                        $or: where
                    }
                });

                if (findModel) {
                    throw boom.badData(`主键${_.join(uniqueFields,',')}已经存在!`);
                }
            }
        }
    }

    /**
     * 删除配置中的字段
     * @params modelIntance  {Object} 数据模型实例
     * @params Model  {Object} Sequelize对象
     * @params removeAttributes {Array}  删除对属性数组
     */
    removeAttributes(modelIntance, Model, removeAttributes = []) {
        _.forEach(modelIntance, (val, key) => {
            if (!Model.attributes.hasOwnProperty(key)) {
                delete modelIntance[key];
            }
        });

        if (_.isArray(removeAttributes)) {
            _.each(removeAttributes, (attr) => {
                delete modelIntance[attr];
            });
        }
    }
}

export class ElasticUtils extends CommonUtils {
    constructor() {
        super();
    }

    getEsQuery(query) {
        let filter = this.query(query);
        let sort = [];
        let esQuery = {};

        !filter.where && (filter.where = {});
        !filter.suggest && (filter.suggest = {});

        if (filter.where.hasOwnProperty('_type')) {
            filter._type = filter.where['_type'];
            delete filter.where['_type'];
        }

        // 处理搜索条件
        _.each(jsonPointer.dict(filter.where), (d, key) => {
            let path = jsonPointer.parse(key.replace(/\d/i, '-'));
            jsonPointer.set(esQuery, jsonPointer.compile(_.reverse(path)), d);
        });
        // 处理排序
        filter.order && _.each(filter.order, (order) => {
            if (_.isArray(order) && order.length == 2) {
                sort.push(`${[order[0]]}:${order[1]}`);
            }
        });

        filter.sort = sort;
        filter.esQuery = {};

        if (!_.isEmpty(esQuery)) {
            filter.esQuery = { query: esQuery };
        }

        return filter;
    }

    removeAttributes(modelIntance, removeAttributes) {
        _.each(removeAttributes, (attr) => {
            if (modelIntance.hasOwnProperty(attr)) {
                delete modelIntance[attr];
            }
        });
    }

    /**
     * 搜索es数据
     */
    async getEsList(query, index) {
        let filter = this.getEsQuery(query);

        let results = await client.search({
            index: index,
            from: filter.offset,
            size: filter.limit,
            body: filter.esQuery,
            sort: filter.sort,
            type: filter._type || null,
            searchType: 'dfs_query_then_fetch',
            timeout: '10s'
        });

        return results;
    }

    async getEsSuggest(query, index) {
        let filter = this.getEsQuery(query);

        if (!filter.suggest.text) {
            return {};
        }

        return client.suggest({
            index: index,
            body: {
                results: {
                    text: filter.suggest.text,
                    completion: {
                        field: filter.suggest.field
                    }
                }
            }
        });
    }

    setSuggest(modelIntance, suggests) {
        _.forEach(suggests, (valKey, key) => {
            if (modelIntance[valKey]) {
                if (_.isArray(modelIntance[valKey])) {
                    modelIntance[key] = {
                        input: modelIntance[valKey]
                    };
                } else {
                    modelIntance[key] = {
                        input: [modelIntance[valKey]]
                    };
                }
            }
        });
    }
}

export default {
    mysql: new MysqlUtils(),
    elastic: new ElasticUtils()
}
import _ from 'lodash';

export default (app, log) => {
    return {
        modelNames: {
            passport: "passport",
            module: "module",
            crawlerSetting: "crawler_setting",
            schedule: "schedule",
            backup: 'backup',
            schema: 'schema',
            action: 'action',
            interface: 'interface',
            environment: 'environment',
            device: 'device',
            member: 'member'
        },
        findModel: (modelName) => {
            let { models, sequelize, Sequelize } = app.config.db.index;
            let model = _.first(_.filter(models, (model) => {
                return _.camelCase(model.name) == _.camelCase(modelName);
            }));

            if (!model) {
                throw new Error(`没有找到模型${modelName}!!!`);
            }

            return model;
        },
        query: (query) => {
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
            filter.where && (filter.where = JSON.parse(filter.where));
            if (_.isEmpty(filter.where)) {
                delete filter.where;
            }

            if (filter.order) {
                let orders = filter.order.split('-');
                // 返回的order信息是  -key|key,前面带"-"的是倒序
                if (orders.length > 0) {
                    switch (orders.length) {
                        case 1:
                            // orders.push("asc");
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
    };
};
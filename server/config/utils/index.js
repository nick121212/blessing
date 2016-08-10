import _ from 'lodash';

module.exports = (app)=> {
    "use strict";
    return {
        modelNames: {
            module: "module"
        },
        findModel: (modelName)=> {
            let {models, sequelize, Sequelize} = app.config.db.index;
            let model = models[modelName];

            if (!model) {
                throw new Error("没有找到模型!!!");
            }

            return model;
        },
        query: (ctx) => {
            let {query} = ctx;
            let filter = query.filter || {};

            _.extend({
                limit: 10,
                offset: 0
            }, filter);

            if (filter.attributes && typeof filter.attributes === "array") {
                !filter.attributes.length && delete filter.attributes;
            } else {
                delete filter.attributes;
            }

            return filter;
        }
    };
};
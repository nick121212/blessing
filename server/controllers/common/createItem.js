const boom = require("boom");
const _ = require('lodash');

exports = module.exports = (app, logger) => {

    return (modelName, uniqueFields) => {
        "use strict";

        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);
        let { models, sequelize, Sequelize } = app.config.db.index;

        /**
         * 创建模块数据
         */
        return async(ctx, next) => {
            let model = ctx.request.body;

            if (typeof model !== "object") {
                throw boom.badData('数据没有填写完整!');
            }

            if (_.isArray(uniqueFields) && uniqueFields.length) {
                let where = [];

                _.each(uniqueFields, (field) => {
                    if (model[field]) {
                        where.push({
                            [field]: model[field]
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
            model.createdAt = ~~(Date.now() / 1000);

            _.forEach(model, (val, key) => {
                if (!Model.attributes.hasOwnProperty(key)) {
                    delete model[key];
                }
            });

            ctx.body = await Model.create(model);
        };
    }
};
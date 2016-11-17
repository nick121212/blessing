const boom = require("boom");
const _ = require('lodash');

exports = module.exports = (app, logger) => {

    return (modelName, uniqueFields, idField = "id") => {
        "use strict";

        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);

        return async(ctx, next) => {
            let key = ctx.params["key"];
            let model = ctx.request.body;

            if (!key) {
                throw boom.badData(`key不能为空!`);
            }

            let modelInstance = await Model.findOne({
                where: {
                    [idField]: key
                }
            });

            if (!modelInstance) {
                throw boom.badData(`找不到key:${key}的数据或者已删除!`);
            }

            delete modelInstance.createdAt;
            modelInstance.updatedAt = new Date();

            _.forEach(model, (val, key) => {
                if (!Model.attributes.hasOwnProperty(key)) {
                    delete model[key];
                }
            });

            ctx.body = await modelInstance.updateAttributes(model);
        };
    };
};
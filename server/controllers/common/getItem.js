const boom = require("boom");

export default (app, logger) => {

    return (modelName, idField = "id") => {
        "use strict";
        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);

        return async(ctx, next) => {
            let key = ctx.params["key"];

            if (!key) {
                throw boom.badData(`key不能为空`);
            }

            let model = await Model.findOne({
                where: {
                    [idField]: key
                }
            });

            if (!model) {
                throw boom.badData(`找不到key:${key}的数据或者已删除!`);
            }

            ctx.body = model;
        };
    };
};
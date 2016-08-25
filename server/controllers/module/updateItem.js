const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);

    return async(ctx, next) => {
        let key = ctx.params["key"];
        let model = ctx.body;

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        let modelInstance = await Model.findOne({
            where: {
                key: key
            }
        });

        if (!modelInstance) {
            throw boom.badData(`找不到key:${key}的数据或者已删除!`);
        }

        delete modelInstance.createdAt;
        modelInstance.updatedAt = new Date();
        ctx.body = await modelInstance.updateAttributes(model);
    };
};
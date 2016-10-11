const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);

    return async(ctx, next) => {
        let key = ctx.params["key"];
        let model = ctx.request.body;

        if (!key) {
            throw boom.badData(`id不能为空`);
        }

        let modelInstance = await Model.findOne({
            where: {
                id: key
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
const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (!key) {
            throw boom.badData(`key不能为空`);
        }

        let model = await Model.findOne({
            where: {
                key: key
            }
        });

        if (!model) {
            throw boom.badData(`找不到key:${key}的数据或者已删除!`);
        }

        ctx.body = model;
    };
};
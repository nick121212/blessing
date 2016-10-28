const boom = require("boom");

exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.action);
    let {models, sequelize, Sequelize} = app.config.db.index;

    /**
     * 创建模块数据
     */
    return async(ctx, next) => {
        let model = ctx.request.body;

        if (typeof model !== "object" || !model.key) {
            throw boom.badData('数据没有填写完整!');
        }

        ctx.body = await Model.create(model);
    };
};
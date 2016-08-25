exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.module);

    return async(ctx, next) => {
        let filter = utils.query(ctx.params);
        let result = await Model.findAndCountAll(filter);

        ctx.body = result;
    };
};
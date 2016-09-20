exports = module.exports = (app, logger) => {
    let utils = app.config.utils.index;
    let Model = utils.findModel(utils.modelNames.crawler_setting);

    return async(ctx, next) => {
        let filter = utils.query(ctx.query);
        let result = await Model.findAndCountAll(filter);

        ctx.body = result;
    };
};
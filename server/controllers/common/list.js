export default (app, logger) => {
    return (modelName) => {
        "use strict";
        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);

        return async(ctx, next) => {
            let filter = utils.query(ctx.query);
            let result = await Model.findAndCountAll(filter);

            ctx.body = result;
        };
    };
};
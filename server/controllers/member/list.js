import _ from 'lodash';

export default (app, logger) => {
    return (modelName) => {
        let utils = app.config.utils.index;
        let Model = utils.findModel(modelName);

        return async(ctx, next) => {
            let filter = utils.query(ctx.query);
            let result = await Model.findAndCountAll(filter);

            _.each(result.rows, (row) => {
                delete row.dataValues.password;
            });

            ctx.body = result;
        };
    };
};
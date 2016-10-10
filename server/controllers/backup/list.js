import fs from 'fs';

exports = module.exports = (app, logger) => {
    let config = app.config.config.index;

    return async(ctx, next) => {
        let result = await fs.readdirSync(config.db.backup);

        ctx.body = result;
    };
};
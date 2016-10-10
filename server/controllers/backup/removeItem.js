import path from 'path';
import fs from 'fs';
import boom from "boom";

exports = module.exports = (app, logger, error) => {
    let config = app.config.config.index;

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (fs.existsSync(path.join(config.db.backup, key))) {
            fs.unlinkSync(path.join(config.db.backup, key));
        } else {
            throw boom.badData(`没有找到文件！`);
        }

        ctx.body = {ret: 0};
    };
};
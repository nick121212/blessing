import fs from 'fs';
import config from '../../config';
import path from "path";

export default () => {
    return async(ctx, next) => {

        console.log(path.resolve(config.db.backup));

        if (!fs.existsSync(config.db.backup)) {
            return ctx.body = [];
        }
        ctx.body = await fs.readdirSync(config.db.backup);;
    };
};
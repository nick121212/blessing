import mysqlTools from 'mysql-tools';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';

export default (app, logger) => {
    let config = app.config.config.index;

    return async(ctx, next) => {
        let key = ctx.params["key"];

        if (fs.existsSync(path.join(config.db.backup, key))) {

            ctx.set('Content-disposition', `inline; filename=${key}`);
            ctx.set('Content-type', 'application/sql');

            ctx.body = fs.readFileSync(path.join(config.db.backup, key));
        } else {
            throw boom.badData(`没有找到文件！`);
        }
    };
};
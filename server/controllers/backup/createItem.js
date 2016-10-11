import mysqlTools from 'mysql-tools';
import path from 'path';
import Promise from 'bluebird';

exports = module.exports = (app, logger) => {
    let config = app.config.config.index;

    return async(ctx, next) => {
        await new Promise(function (resolve, reject) {
            let tool = new mysqlTools();

            tool.dumpDatabase({
                host: config.db.options.host,
                user: config.db.username,
                password: config.db.password,
                database: config.db.database,
                dumpPath: path.join(config.db.backup, Date.now().toString() + ".sql")
            }, function (error, output, message, dumpFileName) {
                if (error instanceof Error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        ctx.body = {ret: 0};
    };
};
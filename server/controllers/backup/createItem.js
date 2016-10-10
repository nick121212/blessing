import mysqlDump from 'mysqldump';
import path from 'path';
import Promise from 'bluebird';

exports = module.exports = (app, logger) => {
    let config = app.config.config.index;
    let dump = ()=> {
        return new Promise(function (resolve, reject) {
            mysqlDump({
                host: config.db.options.host,
                user: config.db.username,
                password: config.db.password,
                database: config.db.database,
                ifNotExist: true,
                where: {},
                dest: path.join(config.db.backup, Date.now().toString() + ".sql")
            }, function (err) {
                if (err) {
                    return reject(err);
                }

                resolve();
            });
        });
    };

    return async(ctx, next) => {
        await dump();

        ctx.body = {ret: 0};
    };
};
/**
 * Created by NICK on 16/8/9.
 */

import Sequelize from 'sequelize';
import sequelizeImport from 'sequelize-import';

module.exports = (app, logger)=> {
    "use strict";
    let config = app.config.config.index;

    let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
    let models = sequelizeImport(__dirname + '/../../models', sequelize, {
        exclude: ['index.js']
    });


    sequelize.sync().then(()=> {
        // config.db.force && sequelize.query(fs.readFileSync(path.resolve(__dirname, './sqls/blessing_module.sql'), 'utf-8'), {
        //     type: sequelize.QueryTypes.DESCRIBE
        // }).then(function (metadata) {
        //     console.log(metadata);
        // });
    }).catch((err)=> {
        logger.error(err);
    });

    return {
        sequelize: sequelize,
        Sequelize: Sequelize,
        models: models
    };
};
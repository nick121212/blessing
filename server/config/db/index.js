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

    sequelize.sync({force: config.db.force}).then(()=> {

    }).catch((err)=> {
        logger.error(err);
    });

    return {
        sequelize: sequelize,
        Sequelize: Sequelize,
        models: models
    };
};
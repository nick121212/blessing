/**
 * Created by NICK on 16/8/9.
 */

import Sequelize from 'sequelize';
import sequelizeImport from 'sequelize-import';
import * as _ from 'lodash';

module.exports = (app, logger) => {
    "use strict";
    let config = app.config.config.index;
    let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
    let models = sequelizeImport(__dirname + '/../../models', sequelize, {
        exclude: ['index.js']
    });

    sequelize.sync({ force: false }).then(() => {

        // models["action"].findAndCountAll({}).then((results) => {
        //     _.each(results.rows, (result) => {
        //         _.each(result.interfaces, (inter) => {
        //             if (_.isObject(inter)) {
        //                 if (!inter.idFieldPath) {
        //                     inter.idFieldPath = [];
        //                 }
        //             }

        //             result.updateAttributes(result);
        //         });

        //     });
        // })


    }).catch((err) => {
        logger.error(err);
    });

    return {
        sequelize: sequelize,
        Sequelize: Sequelize,
        models: models
    };
};
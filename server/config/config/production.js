import path from 'path';

module.exports = (app)=> {
    "use strict";

    return {
        db: {
            username: 'root',
            password: '',
            database: 'blessing',
            backup: path.resolve(__dirname, '../../uploads/backup'),
            force: false,
            options: {
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                charset: 'utf8',
                collation: 'utf8_swedish_ci',
                define: {
                    timestamps: true,
                    freezeTableName: true
                },
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }
        }
    }
};
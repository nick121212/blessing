import path from 'path';

export default (app) => {
    "use strict";

    return {
        env: "development",
        ip: "http://localhost:3000/crawler",
        es: {
            host: '172.16.140.164',
            port: '9200',
            log: 'trace'
        },
        db: {
            username: 'root',
            password: '',
            database: 'blessing',
            backup: path.resolve(__dirname, '../../../uploads/backup'),
            force: true,
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
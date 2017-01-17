'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    return _lodash2.default.extend({}, {
        username: 'root',
        password: '',
        database: 'blessing',
        force: true,
        backup: __dirname + '/../backups',
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
    }, config.db || {});
};
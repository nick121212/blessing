'use strict';

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('schema', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        type: {
            type: DataTypes.STRING(10)
        },
        group: {
            type: DataTypes.STRING(20)
        },
        text: (0, _sequelizeJson2.default)(sequelize, 'schema', 'text'),
        textForm: (0, _sequelizeJson2.default)(sequelize, 'schema', 'textForm'),
        description: { type: DataTypes.TEXT }
    });
}; /**
    * 定义SCHEMA列表
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
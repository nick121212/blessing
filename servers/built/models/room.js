'use strict';

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('room', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        position: { type: DataTypes.STRING(100), allowNull: true },
        ips: (0, _sequelizeJson2.default)(sequelize, 'room', 'ips'),
        description: { type: DataTypes.TEXT, allowNull: true }
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
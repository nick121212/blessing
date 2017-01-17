'use strict';

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('role', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        groups: (0, _sequelizeJson2.default)(sequelize, 'role', 'groups')
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
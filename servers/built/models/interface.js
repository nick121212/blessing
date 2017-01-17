'use strict';

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 定义模块表
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('interface', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        group: { type: DataTypes.STRING(10), allowNull: false },
        protocol: { type: DataTypes.STRING(10), allowNull: true },
        method: { type: DataTypes.INTEGER, allowNull: true },
        path: { type: DataTypes.STRING(50), allowNull: true },
        host: { type: DataTypes.STRING(20), allowNull: true },
        port: { type: DataTypes.INTEGER, allowNull: true },
        server: { type: DataTypes.STRING(10), allowNull: true },
        description: { type: DataTypes.STRING(100), allowNull: true },
        jpp: (0, _sequelizeJson2.default)(sequelize, 'interface', 'jpp'),
        idFieldPath: (0, _sequelizeJson2.default)(sequelize, 'interface', 'idFieldPath'),
        isRestful: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
};
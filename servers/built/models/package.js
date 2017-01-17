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
    return sequelize.define('package', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        commands: (0, _sequelizeJson2.default)(sequelize, 'package', 'commands'),
        description: { type: DataTypes.TEXT, allowNull: true }
    });
};
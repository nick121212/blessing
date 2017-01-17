'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('command', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        cmd: { type: DataTypes.STRING(50), allowNull: false },
        args: (0, _sequelizeJson2.default)(sequelize, 'command', 'args'),
        dataSchemaKey: { type: DataTypes.TEXT, allowNull: true },
        formSchemaKey: { type: DataTypes.TEXT, allowNull: true },
        options: (0, _sequelizeJson2.default)(sequelize, 'command', 'options'),
        description: { type: DataTypes.TEXT, allowNull: true }
    });
}; /**
    * 定义命令执行模块
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
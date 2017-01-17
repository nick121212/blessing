'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('cabinet', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        position: { type: DataTypes.STRING(100), allowNull: true },
        roomKey: { type: DataTypes.STRING(50) },
        totalUnit: { type: DataTypes.INTEGER },
        description: { type: DataTypes.TEXT, allowNull: true }
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
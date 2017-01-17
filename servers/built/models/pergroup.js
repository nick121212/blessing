'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models.pergroup.hasMany(models.pergroupaction, {
//         foreignKey: 'group_id',
//         constraints: false,
//         as: 'groupActions'
//     });

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('perGroup', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true }
    }, {
        relations: [{ type: 'hasMany', target: 'perGroupAction', options: { as: 'groupActions' } }]
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
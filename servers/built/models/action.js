'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('action', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        type: { type: DataTypes.INTEGER, allowNull: false },
        icon: { type: DataTypes.STRING, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false },
        successMsg: { type: DataTypes.STRING, allowNull: true },
        refreshList: { type: DataTypes.BOOLEAN, allowNull: true },
        closeDialog: { type: DataTypes.BOOLEAN, allowNull: true },
        condition: { type: DataTypes.STRING, allowNull: true },
        path: { type: DataTypes.STRING, allowNull: true },
        itemActions: (0, _sequelizeJson2.default)(sequelize, 'action', 'itemActions'),
        actions: (0, _sequelizeJson2.default)(sequelize, 'action', 'actions'),
        confirm: (0, _sequelizeJson2.default)(sequelize, 'action', 'confirm'),
        form: (0, _sequelizeJson2.default)(sequelize, 'action', 'form'),
        wizard: (0, _sequelizeJson2.default)(sequelize, 'action', 'wizard'),
        list: (0, _sequelizeJson2.default)(sequelize, 'action', 'list'),
        interfaces: (0, _sequelizeJson2.default)(sequelize, 'action', 'interfaces'),
        redirect: (0, _sequelizeJson2.default)(sequelize, 'action', 'redirect'),
        group: { type: DataTypes.STRING, allowNull: true }
    }, {
        relations: [{
            type: 'hasMany',
            target: 'perGroupAction',
            as: 'pgActions',
            options: {
                foreignKey: 'actionId',
                constraints: false
            }
        }]
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
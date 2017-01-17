'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('crawlerSetting', {
        key: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            unique: true
        },
        host: { type: DataTypes.STRING(30), allowNull: false },
        domainWhiteList: (0, _sequelizeJson2.default)(sequelize, 'crawlerSetting', 'domainWhiteList'),
        whitePathList: (0, _sequelizeJson2.default)(sequelize, 'crawlerSetting', 'whitePathList'),
        interval: { type: DataTypes.INTEGER },
        downloader: { type: DataTypes.STRING(10) },
        initDomain: { type: DataTypes.STRING(30) },
        proxySettings: (0, _sequelizeJson2.default)(sequelize, 'crawlerSetting', 'proxySettings'),
        pages: (0, _sequelizeJson2.default)(sequelize, 'crawlerSetting', 'pages'),
        description: { type: DataTypes.TEXT, allowNull: true }
    });
}; /**
    * 定义爬虫的配置文件
    * @param sequelize
    * @param DataTypes
    * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
    */
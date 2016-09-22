/**
 * 定义爬虫的配置文件
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
 */

import JsonField from 'sequelize-json';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('crawlerSetting', {
        key: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            unique: true
        },
        host: {type: DataTypes.STRING(30), allowNull: false},
        domainWhiteList: JsonField(sequelize, 'crawlerSetting', 'domainWhiteList'),// {type: DataTypes.TEXT, allowNull: false},
        whitePathList: JsonField(sequelize, 'crawlerSetting', 'whitePathList'),//{type: DataTypes.TEXT, allowNull: false},
        interval: {type: DataTypes.INTEGER},
        downloader: {type: DataTypes.STRING(10)},
        initDomain: {type: DataTypes.STRING(30)},
        proxySettings: JsonField(sequelize, 'crawlerSetting', 'proxySettings'),//{type: DataTypes.TEXT},
        pages: JsonField(sequelize, 'crawlerSetting', 'pages'),//{type: DataTypes.TEXT},
        description: {type: DataTypes.TEXT, allowNull: true},
    }, {
        hooks: {

        }
    });
};
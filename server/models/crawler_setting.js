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
//
// var a =
// {
//     "key": "cityhouse",
//     "host": "www.cityhouse.cn",
//     "domainWhiteList": ["sh.cityhouse.cn"],
//     "whitePathList": [{"regexp": "/^\\/ha(?:\\/pg\\d+|)\\/?$/", "scope": "i"}],
//     "pages": {
//         "broker": {
//             "key": "crawler.loupan",
//             "extendData": {},
//             "rule": [{"regexp": "/\\/pg\\d+\\/$/", "scope": "i"}],
//             "fieldKey": "random",
//             "strict": false,
//             "strictField": "name",
//             "test": false,
//             "area": {
//                 "none": {
//                     "data": [{
//                         "key": "houses",
//                         "selector": [".halistbox .halist"],
//                         "removeSelector": [],
//                         "data": [{
//                             "key": "name",
//                             "selector": [".infobox .title h4 a"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "status",
//                             "selector": [".infobox .title .struct"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "averagePrice",
//                             "selector": [".infobox .text ul:eq(0) li:eq(0) .mr span"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "completeTime",
//                             "selector": [".infobox .text ul:eq(0) li:eq(0) span:last"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "address",
//                             "selector": [".infobox .text ul:eq(1) li:eq(0) span[class]"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "usage",
//                             "selector": [".infobox .text ul:eq(1) li:eq(1) span[class]"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }, {
//                             "key": "propertyType",
//                             "selector": [".infobox .text ul:eq(1) li:eq(2) span:eq(1)"],
//                             "removeSelector": [],
//                             "methodInfo": {"text": []},
//                             "formats": [{"str": []}],
//                             "htmlStrategy": "jsdom",
//                             "dealStrategy": "normal"
//                         }],
//                         "htmlStrategy": "jsdom",
//                         "dealStrategy": "array"
//                     }]
//                 }
//             },
//             "ajax": {}
//         }
//     },
//     "interval": 2000,
//     "downloader": "superagent",
//     "initDomain": "sh.cityhouse.cn/ha",
//     "proxySettings": {
//         "useProxy": false,
//         "timeout": 10000,
//         "charset": "utf-8",
//         "errorInterval": 2,
//         "ipInfo": {"host": "114.55.146.215", "port": "8083"},
//         "images": "/data/images/anjuke/"
//     }
// };

'use strict';

var _sequelizeJson = require('sequelize-json');

var _sequelizeJson2 = _interopRequireDefault(_sequelizeJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('perGroupAction', {
        // actionKey: DataTypes.STRING(50)
    }, {
        createdAt: false,
        updatedAt: false,
        relations: [{ type: 'belongsTo', target: 'perGroup' }, { type: 'belongsTo', target: 'action' }]
    });
};
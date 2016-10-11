/**
 * 定义SCHEMA列表
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
 */

import JsonField from 'sequelize-json';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('schema', {
        key: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            unique: true
        },
        type: {
            type: DataTypes.INTEGER
        },
        text: JsonField(sequelize, 'schema', 'text'),
        description: {type: DataTypes.TEXT},
    });
};
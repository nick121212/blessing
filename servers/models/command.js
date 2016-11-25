/**
 * 定义命令执行模块
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
 */

import JsonField from 'sequelize-json';

export default (sequelize, DataTypes) => {
    return sequelize.define('command', {
        key: {
            type: DataTypes.STRING(50),
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        cmd: { type: DataTypes.STRING(50), allowNull: false },
        args: { type: DataTypes.TEXT, allowNull: true },
        dataSchemaKey: { type: DataTypes.TEXT, allowNull: true },
        formSchemaKey: { type: DataTypes.TEXT, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true }
    });
};
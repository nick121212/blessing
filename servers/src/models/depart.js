/**
 * 定义模块表
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}|{timestamps, freezeTableName}|Model|void}
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('depart', {
        key: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            unique: true
        },
        title: { type: DataTypes.STRING(50), allowNull: false },
        lft: DataTypes.INTEGER,
        rgt: DataTypes.INTEGER,
        parentKey: {
            type: DataTypes.STRING(50)
        },
        description: { type: DataTypes.TEXT, allowNull: true }
    });
};
"use strict";

var crypto = require("crypto-browserify");

module.exports = function (sequelize, DataTypes) {
    var changePsw = function changePsw(instance) {
        var sha1 = crypto.createHash("sha1");
        sha1.update(instance.password);
        instance.password = sha1.digest("hex");
    };

    return sequelize.define('member', {
        username: { type: DataTypes.STRING(45), allowNull: false, unique: true },
        password: { type: DataTypes.STRING(100), allowNull: false },
        name: { type: DataTypes.STRING(45), allowNull: true },
        avatar: { type: DataTypes.STRING(200), allowNull: true },
        role: { type: DataTypes.STRING(45), allowNull: true }
    }, {
        hooks: {
            beforeCreate: function beforeCreate(instance, options, fn) {
                changePsw(instance);
                fn();
            },
            beforeUpdate: function beforeUpdate(instance) {
                if (!instance.changePsw) {
                    delete instance.password;
                } else {
                    changePsw(instance);
                    delete instance.changePsw;
                }
            }
        }
    });
};
'use strict';
module.exports = (sequelize, DataTypes) => {
    var auth = sequelize.define('auth', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        last_login: DataTypes.DATE,
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    }, {});
    auth.associate = function (models) {
        // association to user table
        auth.hasOne(models.user, {
            onDelete: "cascade"
        });
    };
    return auth;
};
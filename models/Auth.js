module.exports = function (sequelize, Sequelize) {
    var Auth = sequelize.define('Auth', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
    //    Auth.associate = function (models) {
    //        // Associating Auth with User
    //        // When an Auth is deleted, also delete any associated User
    //        Auth.hasMany(models.User, {
    //            onDelete: "cascade"
    //        });
    //    };
    return Auth;
}
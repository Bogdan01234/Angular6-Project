module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.TEXT
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        url: {
            type: Sequelize.STRING

        },
        admin: {
            type: Sequelize.INTEGER,
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        activated: {
            type: Sequelize.INTEGER
        },

        admins: {
            type: Sequelize.INTEGER
        }
 
    });

    User.associate = (models) => {
        User.hasMany(models.posts);
        User.hasMany(models.comment);
      };
 
    return User;
 
}
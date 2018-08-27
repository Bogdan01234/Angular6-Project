module.exports = function(sequelize, Sequelize) {
 
    var Posts = sequelize.define('posts', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        postname: {
            type: Sequelize.STRING
        },
 
        categories: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING
        },

        url: {
            type: Sequelize.STRING

        },
 
        content: {
            type: Sequelize.TEXT
        },

        numSteps: {
            type: Sequelize.INTEGER
        }        
 
    });

    Posts.associate = (models) => {
        Posts.belongsTo(models.user, {
            foreignKey: {
              allowNull: false,
            },
        });
        Posts.hasMany(models.steps);
        Posts.hasMany(models.comment);        
      };
 
    return Posts;
 
}
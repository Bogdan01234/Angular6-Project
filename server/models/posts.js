module.exports = function(sequelize, Sequelize) {
 
    var Posts = sequelize.define('posts', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        postName: {
            type: Sequelize.TEXT
        },
 
        categories: {
            type: Sequelize.STRING,
            allowNull: false
        },

        url: {
            type: Sequelize.STRING

        },
 
        content: {
            type: Sequelize.TEXT
        }        
 
    });

    Posts.associate = (models) => {
        Posts.belongsTo(models.user, {
            foreignKey: {
              allowNull: false,
            },
        });
        Posts.hasMany(models.steps);
        Posts.hasMany(models.comments);        
      };
 
    return Posts;
 
}
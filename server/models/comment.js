module.exports = function(sequelize, Sequelize) {
 
    var Comment = sequelize.define('comment', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        username: {
            type: Sequelize.STRING
        },
 
        content: {
            type: Sequelize.TEXT
        }        
 
    });

    Comment.associate = (models) => {

        Comment.belongsTo(models.user, {
                foreignKey: {
                allowNull: false,
            },
        });

        Comment.belongsTo(models.posts, {
            foreignKey: {
              allowNull: false,
            },
        });
    };
 
    return Comment;
 
}
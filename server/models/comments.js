module.exports = function(sequelize, Sequelize) {
 
    var Comments = sequelize.define('comments', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        content: {
            type: Sequelize.TEXT
        }        
 
    });

    Comments.associate = (models) => {

        Comments.belongsTo(models.user, {
                foreignKey: {
                allowNull: false,
            },
        });

        Comments.belongsTo(models.posts, {
            foreignKey: {
              allowNull: false,
            },
        });
    };
 
    return Comments;
 
}
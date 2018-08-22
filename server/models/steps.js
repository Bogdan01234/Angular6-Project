module.exports = function(sequelize, Sequelize) {
 
    var Steps = sequelize.define('steps', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        stepName: {
            type: Sequelize.TEXT
        },

        url: {
            type: Sequelize.STRING

        },
 
        content: {
            type: Sequelize.TEXT
        }        
 
    });

    Steps.associate = (models) => {
        Steps.belongsTo(models.posts, {
          foreignKey: {
            allowNull: false,
          },
        });
    }

    return Steps;
 
}
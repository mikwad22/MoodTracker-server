module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timeOfDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    })
    return Log;
}
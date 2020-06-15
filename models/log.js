module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        date: {
            type: DataTypes.DATE,
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
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Log;
}
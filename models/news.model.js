module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue:'0'
        }
    });
    return News;
};
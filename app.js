require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
    }
});
/*
* One to One Relationships
*/

/*
* One to Many Relationships
*/ 

/*
* Many to Many Relationships
*/ 

((async() => {
    await sequelize.sync();
})());
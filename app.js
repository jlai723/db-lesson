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
* One to One Relations
*/
const Profile = sequelize.define("Profile", {
    birthday: {
        type: DataTypes.DATE,
    }
});

User.hasOne(Profile, {
    onDelete: "CASCADE",
});
Profile.belongsTo(User);

/*
* One to Many Relations
*/ 
const Order = sequelize.define("Order", {
    shipDate: {
        type: DataTypes.DATE,
    }
});

User.hasMany(Order);
Order.belongsTo(User);

/*
* Many to Many Relations
*/ 
const Class = sequelize.define("Class", {
    className: {
        type: DataTypes.STRING,
    },
    startDate: {
        type: DataTypes.DATE,
    }
});

User.belongsToMany(Class, { through: 'Users_Classes' });
Class.belongsToMany(User, { through: 'Users_Classes' });

((async() => {
    await sequelize.sync({force: true});

    let myUser = await User.create({
        username: "Jackie123"
    });
    let myProfile = await Profile.create({
        birthday: new Date() 
    });
    console.log(await myUser.getProfile());
    await myUser.setProfile(myProfile);
    console.log(await myUser.getProfile());

    let resultUser = await User.findOne({
        where: {
            id: 1
        }
    });
    console.log(await resultUser.getProfile());

})());
// models/User.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "USER",
      {
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM(
            "user",
            "admin",
          ),
          allowNull: false,
          defaultValue: "user",
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique : true,
          required : true, 
        },
      },
      {
        timestamps: true,
      }
    );
  
    return User;
  };
  
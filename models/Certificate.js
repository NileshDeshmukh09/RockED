// models/User.js
module.exports = (sequelize, Sequelize) => {
  const Certificate = sequelize.define(
    "CERTIFICATE",
    {
      certificate_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      certificate_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      issuer: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      overview : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate : {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate : {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status : {
        type: Sequelize.ENUM(
            "DRAFT",
            "PUBLISHED",
            "ACTIVE",
            "EXPIRED",
          ),
          allowNull: true,
          defaultValue: "PUBLISHED",
      }, 
      isEditable : {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue : false,
      },
      
    },
    {
      timestamps: true,
    }
  );

  return Certificate;
};

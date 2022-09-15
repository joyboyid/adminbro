"use strict";
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: DataTypes.STRING,
      logo: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        refrence: {
          model: "Users",
          key: "id",
        },
      },
    },
    {}
  );

  Company.associate = function (models) {
    Company.belongsTo(models.User, { ForeignKey: "user_id" });
  };
  return Company;
};

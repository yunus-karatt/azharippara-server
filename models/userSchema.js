import { DataTypes } from "sequelize";

const ROLES = {
  ADMIN: 1,
  OFFICE_ADMIN: 2,
};

export const createUserModel = async (sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: ROLES.OFFICE_ADMIN,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return User;
};

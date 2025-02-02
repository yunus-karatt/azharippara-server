import { DataTypes } from "sequelize";

export const createHouseModel = async (sequelize) => {
  const House = sequelize.define("House", {
    mahalluNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    houseNo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 
  });
  return House;
};

import { Sequelize } from "sequelize";
import { createUserModel } from "../models/userSchema.js";
import { createHouseModel } from "../models/houseSchema.js";

const sequelize = new Sequelize("azharippara", "postgres", "967697", {
  host: "localhost",
  dialect: "postgres",
});


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connectDB,sequelize };

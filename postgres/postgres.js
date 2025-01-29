
import { Sequelize } from "sequelize";
import { createUserModel } from "../models/userSchema.js";

const sequelize = new Sequelize("azharippara", "postgres", "967697", {
  host: "localhost",
  dialect: "postgres",
});

let UserModel = null;
const connnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    UserModel = await createUserModel(sequelize);
    await sequelize.sync();
    console.log("database synced");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connnection, UserModel };

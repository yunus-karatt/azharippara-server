import { sequelize } from "../postgres/postgres.js";
import { createHouseModel } from "./houseSchema.js";
import { createUserModel } from "./userSchema.js";

const initializeModels = async () => {
  const UserModel = await createUserModel(sequelize);
  const HouseModel = await createHouseModel(sequelize);

  return { UserModel, HouseModel };
};

// Initialize and export models properly
const db = await initializeModels();
export default db;
 
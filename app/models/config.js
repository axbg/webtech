import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "action.db",
});

export const synchronizeDatabase = async () => {
  await db.authenticate();
  await db.sync();
};


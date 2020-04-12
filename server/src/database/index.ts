import { Sequelize } from "sequelize";

export const database = new Sequelize({
  dialect: "postgres",
  storage: ":memory:",
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

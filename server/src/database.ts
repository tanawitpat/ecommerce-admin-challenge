import { Sequelize, DataTypes } from "sequelize";
import { User } from "./models/User.model";

export const createPostgresConnection = (): void => {
  const database = new Sequelize({
    dialect: "postgres",
    storage: ":memory:",
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });

  User.init(
    {
      id: {
        type: new DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(256),
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      tokenVersion: {
        type: new DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      sequelize: database,
    }
  );

  User.sync({ force: true }).then(() => console.log("User table created"));

  return;
};

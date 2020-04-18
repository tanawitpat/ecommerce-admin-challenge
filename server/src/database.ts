import { Sequelize, DataTypes } from "sequelize";
import { User } from "./models/User.model";
import { Product } from "./models/Product.model";
import { mockDatabaseData } from "./mockDatabase";

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

  Product.init(
    {
      id: {
        type: new DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
      },
      description: {
        type: new DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
      },
      price: {
        type: new DataTypes.FLOAT(),
        allowNull: false,
        defaultValue: 0,
      },
      imagePath: {
        type: new DataTypes.STRING(256),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "products",
      sequelize: database,
    }
  );

  setupDatabase();
  return;
};

const setupDatabase = async () => {
  await User.sync({ force: true }).then(() =>
    console.log("User table created")
  );
  await Product.sync({ force: true }).then(() =>
    console.log("Product table created")
  );

  // FOR DEVELOPMENT
  await mockDatabaseData();
};

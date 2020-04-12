import { Model, DataTypes } from "sequelize";
import { database } from ".";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User extends Model<User> {
  @Field()
  id!: number;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  name!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: "users",
    sequelize: database,
  }
);

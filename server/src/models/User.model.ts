import { Model } from "sequelize";
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

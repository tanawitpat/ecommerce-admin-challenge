import { Model } from "sequelize";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Product extends Model<Product> {
  @Field()
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  imagePath!: string;
}

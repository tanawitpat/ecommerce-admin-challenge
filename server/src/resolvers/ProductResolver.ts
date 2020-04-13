import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Product } from "../models/Product.model";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    const products = await Product.findAll();
    return products;
  }

  @Mutation(() => Boolean)
  async createProduct(
    @Arg("name") name: string,
    @Arg("descirption") description: string,
    @Arg("price") price: number,
    @Arg("imagePath") imagePath: string
  ) {
    const product = new Product({
      name,
      description,
      price,
      imagePath,
    });

    try {
      await product.save();
    } catch (err) {
      console.log(err);
      throw new Error("Cannot create a new product");
    }

    return true;
  }

  @Mutation(() => [Product])
  async updateProduct(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("descirption") description: string,
    @Arg("price") price: number,
    @Arg("imagePath") imagePath: string
  ) {
    try {
      const [, updatedProducts] = await Product.update(
        { name, description, price, imagePath },
        {
          where: {
            id,
          },
          returning: true,
        }
      );
      return updatedProducts;
    } catch (err) {
      console.log(err);
      throw new Error("Cannot update a product");
    }
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: number) {
    try {
      const productId = await Product.destroy({
        where: {
          id,
        },
      });
      return productId;
    } catch (err) {
      console.log(err);
      throw new Error("Cannot delete a product");
    }
  }
}

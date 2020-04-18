import { Resolver, Mutation, Arg, Query, UseMiddleware } from "type-graphql";
import { Product } from "../models/ProductModel";
import { isAuth } from "../isAuth";

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  @UseMiddleware(isAuth)
  async products() {
    const products = await Product.findAll();
    return products;
  }

  @Query(() => Product)
  @UseMiddleware(isAuth)
  async product(@Arg("id") id: number) {
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createProduct(
    @Arg("name") name: string,
    @Arg("description") description: string,
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
  @UseMiddleware(isAuth)
  async updateProduct(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
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
  @UseMiddleware(isAuth)
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

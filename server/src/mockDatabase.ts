import { User } from "./models/UserModel";
import { hash } from "bcryptjs";
import { Product } from "./models/ProductModel";

const ADMIN_EMAIL = "test@test.com";
const ADMIN_PASSWORD = "test";
const ADMIN_NAME = "Test user";

export const mockDatabaseData = async () => {
  const hashedPassword = await hash(ADMIN_PASSWORD, 12);

  const user = new User({
    email: ADMIN_EMAIL,
    password: hashedPassword,
    name: ADMIN_NAME,
  });

  try {
    await user.save();
    console.log("An admin user is created");
  } catch (err) {
    console.log(err);
    throw new Error("Cannot create an admin user");
  }

  const product = new Product({
    name: "Product name",
    price: 4000,
    imagePath: "http://google.com",
    description: "Product description",
  });

  try {
    await product.save();
    console.log("An initial product is created");
  } catch (err) {
    console.log(err);
    throw new Error("Cannot create an initial product");
  }
};

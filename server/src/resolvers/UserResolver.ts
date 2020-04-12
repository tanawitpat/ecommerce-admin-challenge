import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User } from "../database/User.model";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await User.findAll();
    return users;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string
  ) {
    const user = new User({
      email,
      password,
      name,
    });

    try {
      await user.save();
    } catch (err) {
      console.log(err);
      throw new Error("Cannot create a new user");
    }

    return true;
  }
}

import {
  Resolver,
  Mutation,
  Arg,
  Query,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User } from "../models/User.model";
import { MyContext } from "src/context";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: String;

  @Field(() => User)
  user: User;
}

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
    const hashedPassword = await hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
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

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Could not find the user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("Bad password");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}

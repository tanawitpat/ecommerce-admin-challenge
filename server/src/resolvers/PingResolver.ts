import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { isAuth } from "../isAuth";
import { Context } from "../context";

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping() {
    return "pong";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  pingAuth(@Ctx() { payload }: Context) {
    return `Your user id is ${payload!.userId}`;
  }
}

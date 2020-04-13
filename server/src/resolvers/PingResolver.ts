import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { isAuth } from "../isAuth";
import { MyContext } from "../context";

@Resolver()
export class PingResolver {
  @Query(() => String)
  ping() {
    return "pong";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  pingAuth(@Ctx() { payload }: MyContext) {
    return `Your user id is ${payload!.userId}`;
  }
}

import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/PingResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { createPostgresConnection } from "./database";
import { verify } from "jsonwebtoken";
import { User } from "./models/User.model";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "./auth";
import cookieParser from "cookie-parser";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.get("/ping", (_req, res) => res.send("pong"));

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ where: { id: payload.userId } });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  createPostgresConnection();

  let apolloServer = null;
  try {
    apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [PingResolver, UserResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    });
  } catch (e) {
    console.error(e);
    throw new Error("Generating schema error");
  }

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Express server started");
  });
})();

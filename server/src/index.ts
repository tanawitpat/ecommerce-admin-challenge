import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/PingResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { createPostgresConnection } from "./database";

(async () => {
  const app = express();
  app.get("/ping", (_req, res) => res.send("pong"));

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

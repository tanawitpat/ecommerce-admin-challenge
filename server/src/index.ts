import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/Ping";

(async () => {
  const app = express();
  app.get("/ping", (_req, res) => res.send("pong"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Express server started");
  });
})();

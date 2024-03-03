import express from "express";
import { DB_MONGOOSE } from "./DB.js";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolve.js";
import cors from "cors"
import * as dotenv from "dotenv";

const corsOptions = {
  origin: "*",
};

dotenv.config();
const initialServer = async () => {
  const app = express();
  app.use(cors(corsOptions));
  const apolloServer = new ApolloServer({
    typeDefs, resolvers,
    cors: true
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: "/graphql"
  })


  await DB_MONGOOSE()
  const PORT = 5000;
  app.listen(PORT, () => console.log(PORT))

}


initialServer()

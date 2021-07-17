import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import Cors from "micro-cors";
import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }]
    },
  },
}

const cors = Cors({
  origin: "https://studio.apollographql.com",
  allowCredentials: true,
});

const apolloServer = new ApolloServer({ typeDefs, resolvers })

module.exports = apolloServer.start().then(() => {
  const apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });
  return cors((req: NextApiRequest, res: NextApiResponse) =>
    req.method === "OPTIONS" ? res.end() : apolloHandler(req, res)
  );
});

// // Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

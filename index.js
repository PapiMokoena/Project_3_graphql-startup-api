const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Hardcoded array of startups
const startups = [
  { id: 1, name: 'Deviare', industry: 'Software', founded: 2002 },
  { id: 2, name: 'ABSA', industry: 'Banking', founded: 1998 },
  { id: 3, name: 'Discovery', industry: 'Insurance', founded: 1992 }
];

// Define the GraphQL schema
const typeDefs = gql`
  type Startup {
    id: ID!
    name: String!
    industry: String!
    founded: Int!
  }

  type Query {
    startups: [Startup]
    startup(id: ID!): Startup
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    startups: () => startups,
    startup: (_, { id }) => startups.find(startup => startup.id === parseInt(id))
  }
};

// Create an instance of ApolloServer
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Integrate ApolloServer with Express
  const app = express();
  server.applyMiddleware({ app });

  // Run the server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();

const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  # Entry Points
  type Query {
    launches: [Launch]
    launch(id: Int!): Launch
  }

  # Types
  type Launch {
    flight_number: Int!
    mission_name: String!
    details: String
    links: LaunchLinks
    rocket: LaunchRocket
  }
  type LaunchLinks {
    flickr_images: [String]
  }
  type LaunchRocket {
    rocket_name: String!
  }
`;
const launches = [{}]

const resolvers = {
    Query: {
        launches: (obj, args, context) => launches,
        launch: (obj, args, context) =>
            launches.find(launch => args.id === launch.flight_number)
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at: ${url}`));

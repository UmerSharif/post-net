const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB } = require("./dbconfig");
//const Post = require("./models/Post");
const resolvers = require("./graphql/Resolvers/resolvers");
const typeDefs = require("./graphql/TypeDefs/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    //req destructured
    return { req }; //return the req body, contain headers and stuff
  }
});
const port = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    server.listen(port);
  })
  .then(res => {
    console.log(`Server running at port ${port}`);
  });

//test
/* const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`; */

/* const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(err);
      }
    }
  }
}; */
//test

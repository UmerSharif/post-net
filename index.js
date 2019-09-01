const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./dbconfig");

//test
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];
//test

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    retriveBooks: [Book]
  }
`;

const resolvers = {
  Query: {
    retriveBooks: () => {
      return books;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const port = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    server.listen(port);
  })
  .then(res => {
    console.log(`Server running at port ${port}`);
  });

const postResolver = require("./post");
const userResolver = require("./user");

module.exports = {
  Query: {
    ...postResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation
  }
};

/* const Post = require("../../models/Post");
const resolvers = {
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
};

module.exports = resolvers; */

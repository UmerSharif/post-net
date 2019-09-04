const postResolver = require("./post");
const userResolver = require("./user");
const commentResolver = require("./comment");

module.exports = {
  Post: {
    // calculate counts for like and posts on the server
    likeCount: parent => {
      return parent.likes.length;
    },
    commentCount: parent => {
      return parent.comments.length;
    }
    // calculate counts for like and posts on the server
  },
  Query: {
    ...postResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation
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

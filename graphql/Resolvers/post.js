const Post = require("../../models/Post");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    //for single post
    getPost: async (_, { postId }) => {
      const post = await Post.findById(postId);
      return post;
    }
  }
};

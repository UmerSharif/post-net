const Post = require("../../models/Post");
const isAuth = require("../../Utils/is-auth");
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    //for single post
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post does not exist");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = isAuth(context);
      if (!user) {
        throw new Error("Authorization Failed...!");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      try {
        const postResult = await newPost.save();
        return postResult;
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePost: async (_, { postId }) => {
      const post = await Post.findById(postId);
    }
  }
};

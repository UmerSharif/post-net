const Post = require("../../models/Post");
const isAuth = require("../../Utils/is-auth");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");
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
      if (args.body.trim() === "") {
        throw new Error("Post body must not be empty..!");
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
    deletePost: async (_, { postId }, context) => {
      const user = isAuth(context);

      if (!user) {
        throw new Error("Invalid credential for this operation...!");
      }
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          //cheeck if the user is the same who created the post
          await post.delete();
          return "Post deleted successfully..!";
        } else {
          throw new AuthenticationError(
            "You are not authorize to delete this post...!"
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    //Likes post mutation
    likePost: async (_, { postId }, context) => {
      const user = isAuth(context);
      if (!user) {
        throw new Error("Authentication failed...!");
      }
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find(like => like.username === user.username)) {
          //likes also stores the user information who liked the post
          // we check here if the loged in user is the same as the one who liked the post
          //if true means that the user has already liked the post
          //now unlike the post if already liked (the logic for likes work as toggle)
          // logic for unlike
          post.likes = post.likes.filter(
            like => like.username !== user.username
          );
          await post.save();
          return post;
        } else {
          //add the new like to post.likes array if its not liked
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString()
          });
          await post.save();
          return post;
        }
      } else {
        throw new UserInputError("Post does not exist..!");
      }
    }
  }
};

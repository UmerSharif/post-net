const Post = require("../../models/Post");
const isAuth = require("../../Utils/is-auth");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const user = isAuth(context);
      if (!user) {
        throw new Error("Authorization Failed..!");
      }
      if (body.trim() === "") {
        throw new UserInputError("Comment is Empty..!", {
          errors: { body: "Empty comment is not allowed..!" }
        });
      }

      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post does not exist..!");
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const user = isAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        //if post exist find the find the index of the comment whose id is passed in the arguments
        const commentIndex = post.comments.findIndex(
          comment => comment.id === commentId
        );
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Can not delete comment..!");
        }
      } else {
        throw new UserInputError("Post not found..!");
      }
    }
  }
};

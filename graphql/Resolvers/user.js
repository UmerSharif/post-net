const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../dbconfig");
const { UserInputError } = require("apollo-server");
const validateRegisterInputs = require("../../Utils/validation");

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } } = args, //multilevel descruturing args
      context,
      info
    ) => {
      // try {
      //Validate userdata
      const { errors, valid } = validateRegisterInputs(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new Error("Inputs are not valid", { errors });
      }
      //check for existing data
      const user = await User.findOne({ username });
      if (user) {
        //return error if username is taken
        throw new UserInputError("Username is taken", {
          //payload with error object
          errors: {
            username: "This username is taken"
          }
        });
      }
      if (username.trim().length === 0) {
        throw new Error("username length should not be zero");
      }

      // try {
      //hasing password
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      });
      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return { ...res._doc, id: res._id, token };
      // } catch (err) {}
    }
  }
};

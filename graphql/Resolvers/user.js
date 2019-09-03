const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../dbconfig");
const { UserInputError } = require("apollo-server");
const validateRegisterInputs = require("../../Utils/validation");
const validateLoginInputs = require("../../Utils/validation");

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } } = args, //multilevel descruturing args
      context,
      info
    ) => {
      // try {
      //Validate userdata for registration
      const { errors, valid } = validateRegisterInputs(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Register Inputs are not valid", { errors });
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
      // res token for registeration
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
    },
    //login mutation
    login: async (
      _,
      { loginInput: { username, password } } = args,
      context,
      info
    ) => {
      //Validate userdata for login
      const { errors, valid } = validateLoginInputs(username, password);
      if (!valid) {
        throw new UserInputError("Login Inputs errors", { errors });
      }

      //checking for existing username
      const user = await User.findOne({ username });
      if (!user) {
        //return error if username is taken
        errors.general = "User not found!";
        throw new UserInputError("User does not exist!", {
          //payload with error object
          errors
        });
      }
      //check for password matching of the existing user
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        errors.general = "Wrong Password!";
        throw new UserInputError("Password is incorrect!", {
          //payload with error object
          errors
        });
      }
      //user token for login
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return { ...user._doc, id: user._id, token };
    } // login ends here
  }
};

const User = require("../../models/User");

module.exports = {
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmPassword } } = args,
      context,
      info
    ) => {
      try {
        //Validate userdata
        //check for existing data
        //password hash and generate token
      } catch (err) {}
    }
  }
};

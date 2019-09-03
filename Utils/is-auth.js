const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../dbconfig");

module.exports = context => {
  //context contain header required for authorization context = {...stuff and header}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //Authorization: Bearer tokenValue... Token value at index 1
    if (token) {
      try {
        const verifiedUser = jwt.verify(token, SECRET_KEY);
        return verifiedUser;
      } catch (err) {
        throw new AuthenticationError("Invalid Token!");
      }
    }
    throw new Error("Authentication token must be  bearer [token]!");
  }
  throw new Error("Authorization header must be valid!");
};

//login input validation

module.exports = validateLoginInputs = (username, password) => {
  const errors = {};
  if (username.trim().length === 0) {
    errors.username = "Username must not be empty!";
  }
  if (password.trim().length === 0) {
    errors.password = "Password must not be empty!";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

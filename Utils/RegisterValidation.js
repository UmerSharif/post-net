//register input validation

module.exports = validateRegisterInputs = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim().length === 0) {
    errors.username = "Username must not be empty!";
  }
  if (email.trim().length === 0) {
    errors.email = "Email must not be empty!";
  } else {
    const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailR)) {
      errors.email = "Email must be valid email adress!";
    }
  }
  if (password.trim().length === 0) {
    errors.password = "Password must not be empty!";
  } else {
    if (password !== confirmPassword) {
      errors.password = "Passwords must match!";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

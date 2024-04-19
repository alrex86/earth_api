const Users = require("./../models/users");

const register = async (req, res, next) => {
  const { username, password } = req.body;
  const validateUsername = isUsernameSafe(username);

  if (!validateUsername.error) {
    return res.status(401).json({ validateUsername });
  }

  const user = await Users.createUser(username, password);
  if (user.error) {
    console.log("User Registration Error: ", user.message);
    return res.status(500).json({
      error: true,
      message: "Unable to complete registration. Please contact support team.",
    });
  }

  return res.json(user);
};

function isUsernameSafe(username) {
  // Check if the username is null or empty
  if (!username) {
    return { error: true, message: "Username cannot be empty" };
  }

  // Check if the username length is between 4 and 32 characters
  if (username.length < 4 || username.length > 32) {
    return {
      error: true,
      message: "Username must be between 4 and 32 characters",
    };
  }

  // Check if the username contains only alphanumeric characters and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      error: true,
      message: "Username can only contain letters, numbers, and underscores",
    };
  }

  // All checks passed, username is safe
  return { error: false };
}

module.exports = {
  // login,
  // getUserData,
  register,
  // getUserById,
};

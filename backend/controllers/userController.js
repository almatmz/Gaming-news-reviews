const User = require("../models/User");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    // Передаем ошибку в errorMiddleware
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // 1. Проверка уникальности username
      if (req.body.username && req.body.username !== user.username) {
        const usernameExists = await User.findOne({
          username: req.body.username,
        });
        if (usernameExists) {
          res.status(400);
          throw new Error("Username already taken");
        }
        user.username = req.body.username;
      }

      // 2. Проверка уникальности email
      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
          res.status(400);
          throw new Error("Email already in use");
        }
        user.email = req.body.email;
      }

      // 3. Обновление пароля
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (err) {
    // Передаем ошибку в errorMiddleware
    next(err);
  }
};

module.exports = { getUserProfile, updateUserProfile };

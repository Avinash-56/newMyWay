const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  forgotPasswordToken: {
    type: String,
    default: ''
  },
  tokenExpires: {
    data: String
  },

  created_at: { type: Date, default: Date.now() },
});

// Update the updated_at field on save

module.exports = User = mongoose.model("User", userSchema);

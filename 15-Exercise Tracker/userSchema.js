const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: String,
  exercises: [ 
    {
    description: String,
    duration: Number,
    date: {type: Date, default: Date.now}
    }
  ]
});

module.exports = mongoose.model("user", UserSchema, "users");
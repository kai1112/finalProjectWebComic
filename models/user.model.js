const mongoose = require("./dbConnection");

const UserSchema = mongoose.Schema(
  {
    avatar: String,
    username: String,
    password: String,
    discription: String,
    dateOfBirth: Date,
    token: String,
    email: String,
    loginExpired: Date,
    monney: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'banned'], default: 'active' },
    role: { type: String, enum: ['user', 'admin', 'author'], default: 'user' },
    avatar: { type: String, default: 'public/static/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg' }
  },
  { collection: "User", timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;

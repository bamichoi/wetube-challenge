import bycrpt from "bcrypt";
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default:"uploads/avatars/default.jpeg"},
  bio: {type: String, default:"Write your profile message."},
  videos : [ { type: mongoose.Schema.Types.ObjectId, required:true, ref:"Video" } ],
});

userSchema.pre('save', async function() {
    this.password = await bycrpt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;


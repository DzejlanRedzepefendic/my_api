import mongoose from 'mongoose'
/* @ts-ignore */
import findOrCreate from 'mongoose-findorcreate'

const userSchema = new mongoose.Schema({
  googleId: String,
  userName: String,
});

userSchema.plugin(findOrCreate);

export const User = mongoose.model("User", userSchema);

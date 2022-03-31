import mongoose from "mongoose";
/* @ts-ignore */
import findOrCreate from "mongoose-findorcreate";

const GoogleUserSchema = new mongoose.Schema({
  googleId: String,
  userName: String,
});

GoogleUserSchema.plugin(findOrCreate);

export const GoogleUser = mongoose.model("GoogleUser", GoogleUserSchema);

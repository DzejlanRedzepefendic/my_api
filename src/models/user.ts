import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: { unique: true },
      required: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    collection: 'user',
    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
  }
)

export const User = mongoose.model('User', UserSchema)
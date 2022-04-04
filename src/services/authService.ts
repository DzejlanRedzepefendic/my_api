import { User } from "../models/user";
import bcrypt from "bcrypt";

const createUser = (email: string, password: string, name: string) => {
  User.create({ email, password, name });
};

const findUser = (email: string): any => {
  return User.findOne({ email: email });
};

const hashPassword = (plainTextPassword: string) => {
  return bcrypt.hash(plainTextPassword, 7);
};

const compareHash = (plainPassword: string, hasedDataBasePassword: string) => {
  return bcrypt.compare(plainPassword, hasedDataBasePassword);
};

const findByEmailAndChangePassword = (email: string, newPassword: string) => {
  return User.findOneAndUpdate({ email: email }, { password: newPassword });
};

export { createUser, findUser, hashPassword, compareHash, findByEmailAndChangePassword };

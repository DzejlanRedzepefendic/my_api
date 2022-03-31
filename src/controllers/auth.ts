import { Request, Response } from "express";
import {
  hashPassword,
  createUser,
  compareHash,
  findUser,
} from "../services/authService";

const register = async (req: Request, res: Response) => {
  const { email, password: plainTextPassword, name } = req.body;
  const password = await hashPassword(plainTextPassword);

  try {
    await createUser(email, password, name);
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ status: "Error", error: "Email already in use" });
    }
    throw error;
  }
  res
    .status(200)
    .json({ status: "ok", message: "You have been registred successfully" });
};

export { register };

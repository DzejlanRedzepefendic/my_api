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

const login = async (req: Request, res: Response) => {
  const { email, password: plainTextPassword } = req.body;
  const user = await findUser(email);
  try {
    if (!user) {
      return res
        .status(203)
        .json({ status: "error", error: "Invalid username or password" });
    }
    if (await compareHash(plainTextPassword, user.password)) {
      return res.status(200).json({ message: "you have been successfully logged in" });
    }
    return res
      .status(203)
      .json({ status: "error", error: "Invalid username or password" });
  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
};

export { register,login };

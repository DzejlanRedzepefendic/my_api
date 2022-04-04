import { Request, Response } from "express";
import {
  hashPassword,
  createUser,
  compareHash,
  findUser,
  findByEmailAndChangePassword,
} from "../services/authService";

import {
  createJwtToken,
  verifyJwtToken,
  decodeJwtToken,
} from "../services/jwtService";

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
        .status(401)
        .json({ status: "error", error: "Invalid username or password" });
    }
    if (await compareHash(plainTextPassword, user.password)) {
      const accessToken = await createJwtToken(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        "2m"
      );
      const refreshToken = await createJwtToken(
        { id: user._id },
        process.env.REFRES_TOKEN_SECRET
      );
      return res.status(200).json({
        message: "you have been successfully logged in",
        accessToken,
        refreshToken,
      });
    }
    return res
      .status(401)
      .json({ status: "error", error: "Invalid username or password" });
  } catch (error) {
    return res.status(500).json({ error: "error" });
  }
};

const changePassword = async (req: Request, res: Response) => {
  const secretToken = req.body.token;
  const newPassword = req.body.password;
  if (!verifyJwtToken(secretToken, process.env.ACCESS_TOKEN_SECRET))
    return res.status(403).json({ status: "error", message: "Token expired!" });
  try {
    const decodedJwt: any = await decodeJwtToken(secretToken);
    const user = await findUser(decodedJwt?.email);
    if (!user)
      return res
        .status(400)
        .json({ status: "error", message: "No such email" });
    const password = await hashPassword(newPassword);
    if(await findByEmailAndChangePassword(user.email,password)) return res.status(200).json({status:'ok',message:"Password changed!"})
    } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// const token = asnyc (req,res) =>{}

export { register, login, changePassword};

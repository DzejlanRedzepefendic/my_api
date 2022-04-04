import express from "express";
import { login,register,changePassword } from "../controllers/auth";
const router = express.Router();

router.post("/v1/auth/login",login);
router.post("/v1/auth/register",register)
router.post("/v1/auth/change-password",changePassword)

export default router;

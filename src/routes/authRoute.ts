import express from "express";
import { login,register } from "../controllers/auth";
const router = express.Router();

router.post("/v1/auth/login",login);
router.post("/v1/auth/register",register)

export default router;

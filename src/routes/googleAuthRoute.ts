import express from "express";
import { callback,logout } from "../controllers/googleAuthControllers";
import { googleAuthMiddleware,googleAuthCallbackMiddleware } from "../middlewares/google/googleMiddlewares";

const router = express.Router();

router.get("/auth/google/callback",googleAuthCallbackMiddleware,callback);
router.get("/auth/google",googleAuthMiddleware);
router.get("/auth/logout",logout)

export default router;
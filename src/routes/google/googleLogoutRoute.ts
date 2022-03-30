import express from "express";
import { logout } from "../../controllers/googleAuthControllers";

const router = express.Router();

router.route("/").get(logout);

export default router;
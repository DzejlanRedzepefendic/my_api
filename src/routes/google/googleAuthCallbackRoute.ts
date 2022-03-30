import express from "express";
import { callback } from "../../controllers/googleAuthControllers";

const router = express.Router();

router.route("/").get(callback);

export default router;
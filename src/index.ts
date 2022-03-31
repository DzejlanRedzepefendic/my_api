import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import { DBConnect } from "./db/connect";
import { notFound } from "./middlewares/notFound";
import googleLogoutRoute from "./routes/google/googleLogoutRoute";
import googleAuthCallbackRoute from "./routes/google/googleAuthCallbackRoute";
import googleAuthRoute from "./routes/google//googleAuthRoute";
import registerAuth from "./routes/auth/register";
import {
  googleAuthMiddleware,
  googleAuthCallbackMiddleware,
} from "./middlewares/google/googleMiddlewares";
import { corsOptionsConstant } from "./constants/corsOptionsConstant";
dotenv.config();

require("./services/passport");

DBConnect(process.env.MONGO_URL);
const app = express();

app.use(cors(corsOptionsConstant));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT;

app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});

app.use(
  "/auth/google/callback",
  googleAuthCallbackMiddleware,
  googleAuthCallbackRoute
);
app.use("/auth/google", googleAuthMiddleware, googleAuthRoute);
app.use("/auth/logout", googleLogoutRoute);
app.use("/v1/auth/register", registerAuth);

app.use(notFound);

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

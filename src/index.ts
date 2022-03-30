import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import passport from "passport";
import { DBConnect } from "./db/connect";

require('./services/passport')

dotenv.config();


DBConnect(process.env.MONGO_URL)

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
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

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    if (req.user) res.send(req.user.userName);
  }
);

app.get("/auth/logout", (req: Request, res: Response) => {
  req.logout();
  req.session = null;

  res.send(req.user);
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

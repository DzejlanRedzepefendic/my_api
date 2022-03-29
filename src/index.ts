import express, {Request, Response } from "express";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import mongoose, { ConnectOptions } from "mongoose";
import cookieSession from "cookie-session";
/* @ts-ignore */
import findOrCreate from "mongoose-findorcreate";
import bodyParser from "body-parser";


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }as ConnectOptions)
  .then((res) => {
    console.log("Connected to Distribution API Database - Initial Connection");
  })
  .catch((err) =>
    console.log(
      `Initial Distribution API Database connection error occured -`,
      err
    )
  );

const userSchema = new mongoose.Schema({
  googleId: String,
  userName: String,
});

userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
const GoogleStrategy = Strategy;

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      /* @ts-ignore */
      User.findOrCreate(
        { googleId: profile.id, userName: profile.displayName },
        function (err: any, user: any) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/redirect",
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

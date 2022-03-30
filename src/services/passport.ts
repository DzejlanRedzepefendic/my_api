import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/user";
import dotenv from "dotenv";
dotenv.config();

const GoogleStrategy = Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
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

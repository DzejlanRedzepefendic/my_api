import passport from "passport";

export const googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
});

export const googleAuthCallbackMiddleware = passport.authenticate("google");

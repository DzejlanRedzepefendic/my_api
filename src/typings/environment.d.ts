import * as express from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRES_TOKEN_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      COOKIE_SECRET: string;
      MONGO_URL: string;
    }
  }
}
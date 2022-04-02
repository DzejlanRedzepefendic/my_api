import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import passport from "passport";
import cors from "cors";
import { DBConnect } from "./db/connect";
import { notFound } from "./middlewares/notFound";
import googleRoute from './routes/googleAuthRoute'
import authRoute from './routes/authRoute';
import { corsOptionsConstant } from "./constants/corsOptionsConstant";
import morgan from 'morgan'

dotenv.config();

require("./services/passport");

DBConnect(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptionsConstant));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.get("/ping", (req: Request, res: Response) => {
  res.send("PONG");
});


app.use(googleRoute);
app.use(authRoute);

app.use(notFound);

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

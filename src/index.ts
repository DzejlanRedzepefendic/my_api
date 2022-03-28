import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("w/e");
});

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});

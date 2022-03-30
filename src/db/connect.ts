import mongoose, { ConnectOptions } from "mongoose";

export const DBConnect = (databaseURL:string) =>{
    return mongoose
    .connect(databaseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions)
    .then((res) => {
      console.log("Connected to Distribution API Database - Initial Connection");
    })
    .catch((err) =>
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      )
    );
}
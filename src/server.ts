import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

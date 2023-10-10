import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import generateFakeContact from "./utils/seed";
import referral from "./models/referral";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Connected to database");
    // Uncomment this line to seed the database
    // referral.insertMany(generateFakeContact(132));
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

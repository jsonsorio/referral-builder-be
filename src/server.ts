import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import generateFakeContact from "./utils/seed";
import contact from "./models/contact";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Connected to database");
    // Uncomment this line to seed the database
    // contact.insertMany(generateFakeContact(100));
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

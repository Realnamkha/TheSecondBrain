import { app } from "./app";
import connectDb from "./db/index";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 8001;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Db connection error", err);
  });

import dotenv from "dotenv";
dotenv.config({quiet: true});

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

app.listen("8080", () => {
  console.log(`Listening to post http://localhost:8080`);
});

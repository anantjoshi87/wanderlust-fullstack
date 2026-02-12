import Listing from "../src/models/listing.model.js";
import initdata from "./data.js";
import connectDB from "../src/db/db.js";

await connectDB();

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
};

await initDB();

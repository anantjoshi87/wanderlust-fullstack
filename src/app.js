import express from "express";
import path from "path";
import methodOverride from "method-override";
// import mongoose from "mongoose";
import ejsMate from "ejs-mate";
import Listing from "./models/listing.model.js";

import { fileURLToPath } from "url";

const app = express();
const router = express.Router();

// __dirname replacement (IMPORTANT)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// main()
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

// app.use((req, res, next) => {
//   req.time = new Date(Date.now());
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

router.get("/", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

router.post("/", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.use("/listings", router);

app.use((req, res, next) => {
  res.status(404).render("error/404.ejs");
});

export default app;

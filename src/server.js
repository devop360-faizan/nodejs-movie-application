import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
config();
connectDB();
const app = express();

import movieRoutes from "./routes/movieRoutes.js";

app.use("/movies", movieRoutes);

const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    disconnectDB();
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  server.close(() => {
    disconnectDB();
    process.exit(0);
  });
});
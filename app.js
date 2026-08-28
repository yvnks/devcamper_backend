import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import router from "./routes/bootcamp.routes.js";
import connectDB from "./config/db.bootcamp.js";
import customErrorHandler from "./middleware/customErrorHandler.js";

configDotenv({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

const app = express();

// Body parser middleware.
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", router);
app.use(customErrorHandler);

// Connect env to atlas.
connectDB();

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} and on port: 
    ${PORT}; visit http://localhost:${PORT}`,
  ),
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`ERROR: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});

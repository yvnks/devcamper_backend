import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.NODE_ENV} and on port: 
    ${PORT}; visit http://localhost:${PORT}`,
  ),
);

import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';

// import routes
import router from './routes/bootcamp.routes.js';

configDotenv({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', router);

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} and on port: 
    ${PORT}; visit http://localhost:${PORT}`,
  ),
);

import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;

const app = express();

// create routes
app.get('/api/v1/bootcamps', (req, res) => {
  res.json({
    enroll: true,
    msg: `GET bootcamp ${req.params.id}`,
  });
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.json({
    enroll: true,
    msg: `GET single bootcamp ${req.params.id}`,
  });
});

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(201).json({
    enroll: true,
    msg: `POST bootcamp`,
  });
});

app.patch('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
});

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.NODE_ENV} and on port: 
    ${PORT}; visit http://localhost:${PORT}`,
  ),
);

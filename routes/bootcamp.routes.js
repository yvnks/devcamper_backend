import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    enroll: true,
    msg: `GET bootcamp ${req.params.id}`,
  });
});

router.get('/:id', (req, res) => {
  res.json({
    enroll: true,
    msg: `GET single bootcamp ${req.params.id}`,
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    enroll: true,
    msg: `POST bootcamp`,
  });
});

router.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
});

export default router;

import express from 'express';
import {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcampInRadius,
  getBootcamps,
  updateBootcamp,
} from '../controllers/bootcamp.controller.js';

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .patch(updateBootcamp)
  .delete(deleteBootcamp);

export default router;

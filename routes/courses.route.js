import express from 'express';
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courses.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse);

export default router;

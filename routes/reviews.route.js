import express from 'express';
import Review from '../models/reviews.models.js';
import {
  getReview,
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from '../controllers/reviews.controller.js';
import advancedresults from '../middleware/advanced-result.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedresults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews,
  )
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

export default router;

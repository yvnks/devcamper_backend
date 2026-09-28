import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

import User from '../models/user.model.js';

import advancedresults from '../middleware/advanced-result.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedresults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser );

export default router;

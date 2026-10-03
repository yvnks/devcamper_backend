import express from 'express';
import {
  login,
  register,
  getMe,
  resetPassword,
  forgotPassword,
  updateDetails,
  updatePassword,
  logout,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
export default router;

import express from 'express';
import { register, login, logout } from '../controller/authController.js';


const router = express.Router();

//Register route handler
router.post('/register', register);

//Login route handler
router.post('/login', login);

//Logout
router.post('/logout', logout);

export default router;
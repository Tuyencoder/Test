import express from 'express';
import * as auth from '../controllers/auth.js';
import { requireSignin } from '../middlewares/auth.js';
const router = express.Router();

router.post('/register', auth.register)

router.post('/login', auth.login)

router.get("/current-user", requireSignin, auth.currentUser);

export default router; 
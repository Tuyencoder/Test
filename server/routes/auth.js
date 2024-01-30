const express = require('express');
const auth = require('../controllers/auth');
const { requireSignin } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', auth.register);

router.post('/login', auth.login);

router.get('/current-user', requireSignin, auth.currentUser);

module.exports = router;

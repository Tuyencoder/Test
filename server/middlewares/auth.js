const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const requireSignin = (req, res, next) =>{
    try {
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Invalid or expired token'});
    }
}

module.exports = { requireSignin };

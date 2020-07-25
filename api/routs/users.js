const express  = require('express');
const router = express.Router();

const {
    signup,
    login,
    getAllUsers
} = require('../controllers/users');

router.post('/signup',signup)
router.post('/login',login)
router.get('/',getAllUsers)

module.exports = router;
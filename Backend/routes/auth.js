const express = require('express')
const router = express.Router()

const authToken = require('../middlewares/auth')

const { createUser, login } = require('../controllers/auth')

// api/auth/login
// api/auth/register

router.route('/register').post(createUser)
router.route('/login').post(login)


module.exports = router;
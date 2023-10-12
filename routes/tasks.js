const express = require('express')
const router = express.Router()
const { createTask, getAllTasks, getUserTasks } = require('../controllers/tasks')
const authToken = require('../middlewares/auth')

//api/tasks/ - createtask POst request

router.route('/').post(authToken, createTask)
router.route('/').get(authToken, getAllTasks)
router.route('/:id').get(authToken, getUserTasks)

module.exports = router;
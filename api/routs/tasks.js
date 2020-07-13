const express  = require('express');
const router = express.Router();
const checkAuth= require('../middlewares/checkAuth');
 const {
   getTask,
    getAllTasks,
    CreateNewTask,
    UpdateTask,
    DeleteTask
 } = require('../controllers/tasks');
router.get('/',checkAuth, getAllTasks);
router.get('/:taskId',checkAuth, getTask);
router.post('/',checkAuth, CreateNewTask);
router.patch('/:taskId',checkAuth, UpdateTask);
router.delete('/:taskId',checkAuth, DeleteTask);



module.exports = router;

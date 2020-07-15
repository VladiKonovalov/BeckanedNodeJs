const mongoose = require('mongoose');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllTasks: (req, res) => {

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token, { complete: true });
        isAdmin = decoded.payload.isAdmin;
        creater = decoded.payload.username;


        if (isAdmin) {
            Task.find().then((tasks) => {
                res.status(200).json({
                    tasks
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });

        }
        else {
            Task.find({ creater }).then((tasks) => {
                res.status(200).json({
                    tasks
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });

        }

    },


    getTask: (req, res) => {
        const taskId = req.params.taskId
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token, { complete: true });
        isAdmin = decoded.payload.isAdmin;
        creater = decoded.payload.username;

        Task.findById(taskId).then((task) => {
            if (!task) {
                return res.status(404).json({
                    message: 'This task not found'
                });
            }
            if (task.creater !== creater && (!isAdmin)) {
                return res.status(404).json({
                    message: 'This task not found'
                });

            }
                Task.findOne({ _id: taskId }).then((task) => {
                return res.status(200).json({
                    task
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
        

},

    CreateNewTask: (req, res) => {

        const { title, description } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token, { complete: true });
        creater = decoded.payload.username;
        const createdDate=Date.now();
        if (title === '' || description === '') {
            return res.status(500).json({
                message: "Error The title or description are empty"
            })
        }
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            creater,
            createdDate
        });

        res.status(200).json({
            message: 'new Task Created',
            task
        })
        return task.save();

    },

        UpdateTask: (req, res) => {
            const taskId = req.params.taskId;
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.decode(token, { complete: true });
            isAdmin = decoded.payload.isAdmin;
            creater = decoded.payload.username;

            Task.findById(taskId).then((task) => {
                if (!task) {
                    return res.status(404).json({
                        message: 'This task not found'
                    });
                }
                if ((!isAdmin) && creater !== task.creater) {
                    return res.status(500).json({
                        message: 'This task not found'
                    });
                }
                Task.updateOne({ _id: taskId }, req.body).then(() => {
                    res.status(200).json({
                        message: `This task been updated- ${taskId} Updated`
                    })
                }).catch(error => {
                    res.status(500).json({
                        message: 'This task not found'
                    })

                });
            }).catch(error => {
                res.status(500).json({
                    message: 'This task not found'
                })
            });


        },
            DeleteTask: (req, res) => {
                const taskId = req.params.taskId
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.decode(token, { complete: true });
                isAdmin = decoded.payload.isAdmin;
                creater = decoded.payload.username;

                Task.findById(taskId).then((task) => {
                    if (!task) {
                        return res.status(500).json({
                            message: `This task not found`
                        });
                    }
                    if ((!isAdmin) && creater !== task.creater) {
                        return res.status(500).json({
                            message: 'This task not found'
                        });
                    }

                    Task.deleteOne({ _id: taskId }).then(() => {
                        res.status(200).json({
                            message: `task id- ${taskId} been Deleted`
                        })
                    }).catch(error => {
                        res.status(500).json({
                            error
                        })

                    });
                }).catch(error => {
                    res.status(500).json({
                        message: `This task not found`
                    })

                });


            }
}




const express = require('express');
const app = express();

const tasks = require('./api/routs/tasks');
const users = require('./api/routs/users');

require("dotenv").config();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@profitproject.0vxpt.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    res.header("Access-Control-allow-Headers", "Origin,X=reqiested-With,Content-Type,Accept,Autorization");
        return res.status(200).json({});
    }
    next();
});


//Routes


app.use('/tasks', tasks);
app.use('/users', users);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;

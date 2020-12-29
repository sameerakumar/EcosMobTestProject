const express = require('express');
const mongoose = require('mongoose');
const RestRouter = require('./route'); //we just call router here
const app = express();
const port = 5000;
global.CronJob = require('./schedulers'); //When node js server starts this jobs automatically starts by calling here.
app.use(express.json());

app.use('/api/user', RestRouter);
const uri = "mongodb://localhost:27017/ecosmob"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
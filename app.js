//Express.js Framework configuation
const express = require("express");
const app = express();
const path = require('path');

//bodyparser configuation
const bodyparser = require("body-parser");

//App Setting is here (e.g. port)
require("dotenv").config({ path: "./config/dev.env" })

//Database connection
require("./config/db");

//Static files configuration
app.use(express.static(__dirname + "/public"));

app.use(bodyparser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});


//All routes configuation (Version: 1.0.0)
app.use("/api/v1", require("./routes/Index"));


//Create a server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// initialize front end project
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/notice', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/logout', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
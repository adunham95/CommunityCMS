const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database'+config.database)
});

// On Error
mongoose.connection.on('err', (err)=>{
    console.log('Database error: ' + err)
});

const app = express();
const houseHold = require('./routes/householdRoute');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Body Pareser Middleware
app.use(bodyParser.json());

// Pssport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/household', houseHold);

// Set Static Folder
app.use(express.static(path.join(__dirname, './public')));

// Index Route
app.get('/', (req, res) =>{
    res.send("Invaled End point")
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Start Server
app.listen(port, () => {
    console.log("Server Started on port " + port)
});

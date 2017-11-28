const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// HouseHold Schema
const HouseHoldSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Household = module.exports = mongoose.model('Household', HouseHoldSchema);

module.exports.getHouseHoldById = function (id, callback) {
    Household.findById(id, callback);
};

module.exports.getHouseHoldByName = function (username, callback) {
    const query = {username: username};
    Household.findOne(query, callback);
};

module.exports.addHouseHold = function (newHouseHold, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newHouseHold.password, salt, (err, hash) => {
            if (err) throw err;
            newHouseHold.password = hash;
            newHouseHold.save(callback)
        })
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
};
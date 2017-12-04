const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Community Schema
const CommunitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    }
});

const Community = module.exports = mongoose.model('Community', CommunitySchema);

module.exports.getHouseHoldByName = function (name, callback) {
    const query = {name: name};
    Community.findOne(query, callback);
};

module.exports.getCommunityByID = function (id, callback) {
    Community.findById(id, callback);
};

module.exports.addCommunity = function (newCommunity, callback) {
    newCommunity.save(callback);
};

module.exports.getAllCommunities= function (callback) {
    Community.find(callback);
};


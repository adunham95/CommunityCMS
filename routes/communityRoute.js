const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const CommunityModel = require('../models/communityModel');
const config = require('../config/database');

// Register Route
router.post('/new', (req, res, next) => {
    let newCommunity = new CommunityModel({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state
    });

    CommunityModel.addCommunity(newCommunity, (err, Communuity) =>{
        if(err){
            res.json({success: false, msg: "Failed to register Community"})
        }
        else {
            res.json({success: true, msg: "Registered Community"})
        }
    })
});

// Profile
router.get('/profile/:name', (req, res, next) => {
   const name = req.params.name;
   CommunityModel.getHouseHoldByName(name, (err, CommunityInfo) =>{
       if(err){
           res.json({success: false, msg: "Failed to get profile"})
       }
       else {
           res.json({
               success: true,
               community: {
                   id: CommunityInfo._id,
                   name: CommunityInfo.name,
                   city: CommunityInfo.city,
                   state: CommunityInfo.state
               }
           })
       }
   })
});

//Gets all Communities
router.get('/all', (req, res, next) =>{
    CommunityModel.getAllCommunities((err, Community) =>{

        if (err) {
            res.json({success: false, msg: "Error retrieving Communities"});
        }
        if (Community) {
            res.json({communities: Community})
        }
        else {
            res.json({success: false, msg: "Failed to retrieve Communities"});
        }
    })
});

module.exports = router;
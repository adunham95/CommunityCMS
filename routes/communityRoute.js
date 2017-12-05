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

// Profile by name
router.get('/profileName/:name', (req, res, next) => {
   const name = req.params.name;
   CommunityModel.getHouseHoldByName(name, (err, CommunityInfo) =>{
       if(err){
           res.json({success: false, msg: "Failed to get profile"})
       }
       else {
           res.json({
               success: true,
               community: CommunityInfo
           })
       }
   })
});

//Profile by id
router.get('/profileID/:id', (req, res, next) =>{
    const id = req.params.id;
    CommunityModel.getCommunityByID(id, (err, CommunityInfo) =>{
        if(err){
            res.json({success: false, msg: "Failed to get profile"})
        }
        else {
            res.json({
                success: true,
                community: CommunityInfo
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


//Events
router.post('/events/new', (req, res, next) =>{
    let communityID = req.body.communityID;
    let newEvent = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        createdByID: req.body.createdByID
    };

    CommunityModel.addEvent(communityID, newEvent, (err) =>{
        if(err){
            res.json({success: false, msg: "Failed to register Event", err: err})
        }
        else {
            res.json({success: true, msg: "Registered Event"})
        }
    });
});


module.exports = router;
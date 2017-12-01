const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const HouseHold = require('../models/householdModel');
const config = require('../config/database');

// Register Route
router.post('/:communityID/register', (req, res, next) => {
  let newHouseHold = new HouseHold({
    name: req.body.name,
    communityID: req.params.communityID,
    admin: req.body.admin,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  HouseHold.addHouseHold(newHouseHold, (err, HouseHold) =>{
    if(err){
      res.json({success: false, msg: "Failed to register HouseHold", error: err})
    }
    else {
      res.json({success: true, msg: "Registered HouseHold"})
    }
  })
});

// Authentication
router.post('/:communityID/authentication', (req, res, next) => {
  const communityID = req.params.communityID;
  const username = req.body.username;
  const password = req.body.password;

  HouseHold.getHouseHoldByUsername(username, communityID, (err, HouseHoldInfo) =>{
    if(err) throw err;
    if(!HouseHoldInfo){
      return res.json({success: false, msg: 'HouseHold not found'})
    }

    HouseHold.comparePassword(password, HouseHoldInfo.password, (err, isMatch) => {
      if (err) {throw err}
      if(isMatch){
        const token = jwt.sign({data: HouseHoldInfo}, config.secret, {
          expiresIn: 604800 //Week in seconds
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          HouseHold: {
            id: HouseHoldInfo.id,
            communityID: HouseHoldInfo.communityID,
            admin: HouseHoldInfo.admin,
            name: HouseHoldInfo.name,
            username: HouseHoldInfo.username,
            email: HouseHoldInfo.email
          }
        })
      }
      else {
        return res.json({success: false, msg: 'Wrong Password'})
      }
    })
  });

});


// Get current Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({HouseHold: req.HouseHold})
});


//Gers a  Profile
router.get('/profile/:userID', (req, res, next) => {
  const userID = req.params.userID;
  HouseHold.getHouseHoldById(userID, (err, SingleHouseHold) =>{
      if (err) {
          res.json({success: false, msg: "Error retrieving Households", error: err});
      }
      if (SingleHouseHold) {
          res.json({Household: SingleHouseHold})
      }
      else {
          res.json({success: false, msg: "Failed to retrieve Households"});
      }
  });
});

router.get('/:communityID/members', (req, res, next) => {
    const communityID =req.params.communityID;
    HouseHold.getHouseHoldByCommunity(communityID, (err, Households) =>{
        if (err) {
            res.json({success: false, msg: "Error retrieving Households"});
        }
        if (Households) {
            res.json({Households: Households})
        }
        else {
            res.json({success: false, msg: "Failed to retrieve Households"});
        }
    })

});

module.exports = router;
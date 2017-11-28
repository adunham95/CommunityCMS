const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const HouseHold = require('../models/household');
const config = require('../config/database');

// Register Route
router.post('/register', (req, res, next) => {
  let newHouseHold = new HouseHold({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  HouseHold.addHouseHold(newHouseHold, (err, HouseHold) =>{
    if(err){
      res.json({success: false, msg: "Failed to register HouseHold"})
    }
    else {
      res.json({success: true, msg: "Registered HouseHold"})
    }
  })
});

// Authentication
router.post('/authentication', (req, res, next) => {
  const HouseHoldname = req.body.HouseHoldname;
  const password = req.body.password;

  HouseHold.getHouseHoldByName(HouseHoldname, (err, HouseHold) =>{
    if(err) throw err;
    if(!HouseHold){
      return res.json({success: false, msg: 'HouseHold not found'})
    }

    HouseHold.comparePassword(password, HouseHold.password, (err, isMatch) => {
      if (err) throw err;
      if(isMatch){
        const token = jwt.sign(HouseHold, config.secret, {
          expiresIn: 604800 //Week in seconds
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          HouseHold: {
            id: HouseHold.id,
            name: HouseHold.name,
            HouseHoldname: HouseHold.HouseHoldname,
            email: HouseHold.email
          }
        })
      }
      else {
        return res.json({success: false, msg: 'Wrong Password'})
      }
    })
  });

});


// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({HouseHold: req.HouseHold})
});

module.exports = router;
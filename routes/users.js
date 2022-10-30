//getting the endpoints from client request for showing the profile
//manualy registrate and saving the user
//log in and log out
const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');

//map
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({accessToken: 'pk.eyJ1IjoiODJhbm5hOTkiLCJhIjoiY2w5cDF3Zm8xMGs4NzQxazRobWV5dzdzYyJ9.56YYw7_4YiNrJGrWd8QSjw'})

router.get('/profile', async (req,res)=>{
    if(!req.user){
        req.flash('error', 'First you need to sign up!');
        res.redirect('/');
    }else{
        res.render('users/profile',{user: req.user});
    }    
})

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password, adress, role } = req.body;
        const user = new User({ email, username, adress, role });
        const geoData = await geocoder.forwardGeocode({
            query: req.body.adress,
            limit: 1
        }).send()
        user.geometry = geoData.body.features[0].geometry;
        console.log(user)
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome in eHealth app!');
            res.redirect(`/profile`);
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
        }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/profile',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res,next) 
})

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err); 
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
})

module.exports = router;
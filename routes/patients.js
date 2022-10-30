//getting the endpoints from client request to get only the patient and their therapies
const express = require('express');
const session = require('express-session');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

//map
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({accessToken: 'pk.eyJ1IjoiODJhbm5hOTkiLCJhIjoiY2w5cDF3Zm8xMGs4NzQxazRobWV5dzdzYyJ9.56YYw7_4YiNrJGrWd8QSjw'})

const User = require('../models/user');
const Record = require('../models/record');
const Data = require('../models/data')
const Note = require('../models/note')

router.get('/index', isLoggedIn, catchAsync(async (req, res) => {
    const patients = await User.find({'role': 'patient'});
    res.render('patients/index', { patients })
}));


router.get('/:id/records', isLoggedIn, catchAsync(async (req, res) => {
    const logUser = res.locals.currentUser.role
    console.log(logUser)
    const { id } = req.params;
    const user = await User.findById(id)
    const records = await Record.find({'author': user}).populate('author');
    const data = await Data.find({'author': user}).populate('author')
    const notes = await Note.find({'datas': data.id}).populate('author')
    console.log(id)
    console.log(records);
    console.log(data)
    console.log(notes)
    res.render('patients/records', {logUser, records, data, user, notes})
}));


module.exports = router;
const express = require('express');
const session = require('express-session');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware');

const User = require('../models/user');
const Record = require('../models/record');
const Data = require('../models/data')
const Note = require('../models/note')

router.post('/:id', isLoggedIn, catchAsync(async (req, res, next) =>{
    const { id } = req.params;
    const user = await User.findById(id)
    console.log(id)
    const info = await Data.find({'author': user})
    console.log(info)
    const note = new Note(req.body.note)
    console.log(note)
    note.author = res.locals.currentUser;
    note.datas = info.id
    await note.save()
    console.log(note)
    req.flash('success', 'Created new note!');
    res.redirect(`/patients/${user.id}/records`);
}))

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();
const catchAsync = require('../utils/catchAsync'); 
const { isLoggedIn } = require('../middleware');
const multer = require('multer')
const csv = require('csvtojson')

const Data = require('../models/data');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
})

const uploads = multer({ storage: storage })

router.get('/show', isLoggedIn, catchAsync(async (req, res) => {
  const datas = await Data.find({'author': req.user.id}).populate('author');
  console.log(datas)
  res.render('datas/show', { datas })
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('datas/new');
});

router.post('/', isLoggedIn, uploads.single('csvFile'), async(req, res) => { 
  ///make a table but does not work for me
  // csv('csvFile')
  //     .fromFile(req.file.path)
  //     .then((response) => {
  //     //console.log(response)
  //     Table.insertMany(response).then (function(){
  //     }).catch(function (error){
  //       console.log(error)
  //     }) 
  //   })
    const data = new Data()
    data.author = req.user.id
    data.filename = req.file.filename
    await data.save()
    console.log(data)
    res.redirect('datas/show');
});

module.exports = router;
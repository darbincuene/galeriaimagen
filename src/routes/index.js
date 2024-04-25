const express = require('express');
const router = express.Router();
const Image=require('../models/image')

router.get('/', async (req, res) => {
   const images= await Image.find();
   res.render('index',{images})
});

router.get('/uploads', (req, res) => {
    res.render('upload');
});

router.post('/uploads',async (req, res) => {


    const image=new Image()
    image.title=req.body.title;
    image.descripcion=req.body.descripcion;
    image.filename=req.file.filename;
    image.path='/img/uploads/' + req.file.filename;
    image.originalname=req.file.originalname;
    image.mimetype=req.file.mimetype;
    image.size = req.file.size;

     await image.save();
    res.redirect('/');
    });

router.get('/image/:id/delete', (req, res) => {
    res.send('profile image');
});

module.exports = router;

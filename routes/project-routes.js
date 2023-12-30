const express = require('express');
const Project = require('../models/project');
const axios = require('axios');


const router = express.Router();

//Dashboard page
router.get('/' , async (req , res) => {
    const projects = await Project.find({});

    try{
        res.render('dashboard', {projects})
    }
    catch(err){
        console.log(err)
    }
})


//Create operation
router.get('/new' , async (req , res) => {
    const projects = await Project.find({});

    try{
        res.render('new', {projects})
    }
    catch(err){
        console.log(err)
    }
})

router.post('/new' , async (req , res) => {
    const {title , description} = req.body;


    //API fetch for acquiring images 
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=6');
    const body = await response.json();
    const imageUrls = body.map(image => image.download_url);

    //Obtain random image from the set of images 
    const randomIndex = Math.floor(Math.random() * 6);
    const newProject = new Project({
        title : title,
        description : description,
        thumbnail : imageUrls[randomIndex],
        date : Date()
    })

    await newProject.save();
    res.redirect('/')
})


//Update operation
router.get('/:id/update' , async (req , res) => {
    const projects = await Project.find({});

    try{
        const id = req.params.id;
        const project = await Project.findById(id)
        res.render('edit' , {project , projects})
    }
    catch(err){
        console.log(err)
    }

    
})

router.put('/:id/update' , async (req , res) => {
    const id = req.params.id;
    const {title , description} = req.body;
    const editProject = await Project.findByIdAndUpdate(id , {'title' : title , 'description' : description});
    await editProject.save();
    res.redirect(`/${id}`);
})



//delete operation
router.get('/:id/delete' , async(req , res) => {

    const projects = await Project.find({});
    const id = req.params.id;
    try{
        const project = await Project.findById(id)
        res.render('delete', {projects , project});
    }
    catch(err){
        console.log(err)
    }
})

router.delete('/:id' , async(req , res) => {
    const id = req.params.id;

    await Project.findByIdAndDelete(id);
    res.redirect('/')
})


//Read operation
router.get('/:id' , async (req , res) => {

    const projects = await Project.find({});

    try{
        const id = req.params.id;
        const project = await Project.findById(id);
        res.render('show', {projects , project})
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router
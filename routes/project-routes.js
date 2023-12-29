const express = require('express');
const Project = require('../models/project');
const axios = require('axios');


const router = express.Router();

//Dashboard page
router.get('/' , async (req , res) => {
    const projects = await Project.find({});

    try{
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6')
        const images = response.data;
        res.render('dashboard', {projects , images})
    }
    catch(err){
        console.log(err)
    }
})


//Create operation
router.get('/new' , async (req , res) => {
    const projects = await Project.find({});

    try{
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6')
        const images = response.data;
        res.render('new', {projects , images})
    }
    catch(err){
        console.log(err)
    }
})

router.post('/new' , async (req , res) => {
    const {title , description} = req.body;
    const newProject = new Project({
        title : title,
        description : description,
        date : Date()
    })

    await newProject.save();
    res.redirect('/')
})


//Update operation
router.get('/:id/update' , async (req , res) => {
    const projects = await Project.find({});

    try{
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6')
        const images = response.data;
        const id = req.params.id;
        const project = await Project.findById(id)
        res.render('edit' , {project , projects , images})
    }
    catch(err){
        console.log(err)
    }

    
})

router.put('/:id/update' , async (req , res) => {
    const id = req.params.id;
    const {title , creator} = req.body;
    const editProject = await Project.findByIdAndUpdate(id , {'title' : title , 'creator' : creator});
    await editProject.save();
    res.redirect('/:id');
})



//delete operation
router.get('/:id/delete' , async(req , res) => {

    const projects = await Project.find({});
    const id = req.params.id;
    try{
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6')
        const images = response.data;
        const project = await Project.findById(id)
        res.render('delete', {projects , project ,images});
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
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6')
        const id = req.params.id;
        const project = await Project.findById(id);
        const images = response.data;
        res.render('show', {projects , project ,images})
    }
    catch(err){
        console.log(err)
    }

})

module.exports = router
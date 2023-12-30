if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const routes = require('./routes/project-routes');
const dbUrl = process.env.DB_URL;

const app = express();

app.set('view engine' , 'ejs')
app.engine('ejs' , ejsMate)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.static(path.join(__dirname , 'views')))
app.use(express.static(path.join(__dirname , 'assets')))
app.use(methodOverride('_method'))

// mongodb://127.0.0.1:27017/Seequenze_Assignment

mongoose.connect(dbUrl).then(() => {
    console.log('Database connection successfull')
}).catch(err => {
    console.log('Database connection failed!' , err)
})

app.use('/' , routes);


app.listen(3000 , () => {
    console.log('Listening on port 3000')
})
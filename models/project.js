const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title : String,
    thumbnail : String,
    description : String,
    date : Date
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    row : {type : Object, required : true},
    assignedTo : {type: mongoose.Schema.Types.ObjectId , ref:'Agents'},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref:'Admin'}
});

module.exports= mongoose.model('Tasks', TaskSchema);
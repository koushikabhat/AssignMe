const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
    agentName : {type:String, required:true},
    agentEmail:{type : String, required:true},
    agentPassword : {type : String, required:true},

    createdBy:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Admin', 
        required : true}

});

module.exports = mongoose.model("Agent",AgentSchema);
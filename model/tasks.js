const mongoose = require('mongoose');


const TaskScheme = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Must provide name'],
        trim:true,
        length:[20, "Name can not be more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Task",TaskScheme);
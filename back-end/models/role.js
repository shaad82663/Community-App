const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
        unique : [true,"name must be unique"]
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Role', roleSchema);